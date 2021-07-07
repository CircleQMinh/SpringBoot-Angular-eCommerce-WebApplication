import { OrderBill } from "./order-bill"
import { Product } from "./product"

export class OrderDetail {
    id!:number
    product!:Product
    quantity!:number
    order!:OrderBill
    
}
