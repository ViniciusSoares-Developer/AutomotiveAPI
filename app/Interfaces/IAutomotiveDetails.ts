export interface Iautomotive {
  used: boolean
  model: string
  price: number
  stock: number
  details: {
    type: string
    especie: string
    category: string
    fuel_type: string
    bodywork: string
    engine_type: string
    fuel_per_kilometer: number
    quantity_passangers: number
  }
}
