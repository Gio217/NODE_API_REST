import express from "express";
import mongoose from "mongoose";
import routes from "./routes";

class App{
  constructor(){
    this.server = express();
    mongoose.connect('mongodb+srv://testeapi:NP8TOmpMGlkurxzB@testeapi.b1yzdjv.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    this.middlewares();
    this.routes(); // chamando as funções para que elas possam ser executadas.
  }
  middlewares() {
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}
export default new App().server;

