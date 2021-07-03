export class Product {

    id!:string;
    name!:string;
    price!:number;
    description!:string;
    unitsInStock!:number;
    category!:string;
    imgUrl!:string;
    last_update!:Date;


	constructor(id:string,name:string,price:number,des:string,unit:number,cate:string,img:string,last:Date) {
        this.id=id;
        this.name=name;
        this.description=des;
        this.unitsInStock=unit;
        this.category=cate;
        this.imgUrl=img;
        this.last_update=last;
	}
    


}
