import { SERVE_PORT } from "../globals/enviroment";
import express from 'express';
import http from 'http';
import SocketIO  from "socket.io";

export default class server{
    public app:express.Application;
    public port:number;
    private httpServer:http.Server;
    public io:SocketIO.Server

   constructor(){
       this.app=express();
       this.port=SERVE_PORT;
       //configurando el nuevo servidir web a travez del http
       this.httpServer =new http.Server(this.app)
       this.io=SocketIO(this.httpServer)
       this.escucharSockets()
   }
   //funcon ara escuchar las conecxiones 
   public escucharSockets(){
       console.log("lsisto conexiones o sockets o clientes")
       // el servidr escucha r el evento conncet y recibe sl cliente conectado 
       this.io.on('connect',cliente=>{
           console.log("nuevo cliente conenctado")
           // eñ cliente que se a desconectado previamnte, escucha si deconecion
           cliente.on('disconnect',()=>{
               console.log("el cliente se a desconectado")
           });
           //el cliente que se ha conectad escuha un evento de nombre :'mensaje'
           cliente.on('mensaje',contenido=>{
                console.log("entrada",contenido)
                this.io.emit('mensaje-nuevo',contenido)
           })
        })
   }
   //funcion para crear el servidor
   public start(callback:Function) {
       this.httpServer.listen(this.port,callback);
   }
}