import mongoose from "mongoose";
mongoose.connect("mongodb://localhost/clientes", {useNewUrlParser: true});
mongoose.set("setFindAndModify", false);

// definir el schema de clientes

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    empresa: String,
    emails: Array({
        email: String
    }),
    edad: Number,
    tipo: String,
    pedidos: Array  
});

const productosSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number
});

const Clientes = mongoose.model("Clientes", clientesSchema);
const Productos = mongoose.model("productos", productosSchema);

export { Clientes, Productos };