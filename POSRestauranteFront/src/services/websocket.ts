import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient: Client | null = null;

export const connectPedidosSocket = (
  restauranteId: string,
  callback: () => void,
) => {
  const socket = new SockJS("http://localhost:8080/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("WebSocket conectado");

      stompClient?.subscribe(`/topic/pedidos/${restauranteId}`, () => {
        callback();
      });
    },
  });

  stompClient.activate();
};

export const disconnectPedidosSocket = () => {
  stompClient?.deactivate();
};
