export interface Product{
  id : number;
  name : string;
  brand : string;
  price : number;
  category : string;
  promotion : boolean;
  description:string;
  imagePath: string;
  quantity?: number;
  showDescription?: boolean;


}


export interface PageProduct{
  products : Product[];
  page : number;
  size : number;
  totalPages : number;
}
export interface User{
  user_id?:number;
  username:string;
  email:string;
  address:string;
  password:string;
  role:string;
}
