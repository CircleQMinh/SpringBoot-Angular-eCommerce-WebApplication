import { User } from "./user"

export class OrderBill {
    id!:number
    user!:User
    contactName!:string
    address!:string
    phone!: string
    email!: string
    orderDate!:string
    paymentMethod!: string
    status!: number
    totalItem!:number
    totalPrice!:number
}
