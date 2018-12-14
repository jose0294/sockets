import { SERVE_PORT } from "../globals/enviroment";
import express from 'express';

export default class server{
    public app:express.Application;
    public port:number;
   constructor(){
       this.app=express();
       this.port=SERVE_PORT;
   }
   //funcion para crear el servidor
   public start(callback:Function) {
       this.app.listen(this.port,callback);
   }
}