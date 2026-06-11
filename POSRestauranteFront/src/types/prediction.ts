export interface ProductoIA {
  id: string;
  nombre: string;
  precio: number;
}

export interface PrediccionVenta {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

export interface PrediccionVentasResponse {
  producto_id: string;
  dias_predichos: number;
  predicciones: PrediccionVenta[];
}
