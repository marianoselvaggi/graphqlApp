import { Clientes, Productos } from './db';

export const resolvers = {
    Query: {
        getClientes: async(root, { limite, offset }) => {
            try {
                const clientes = await Clientes.find().limit(limite).skip(offset);
                return clientes;
               
            } catch (err) {
                throw new Error(err.message);
            }
        },
        getCliente: async(root, { id }) => {
            try {
                const client = await Clientes.findById(id);

                if (!client) {
                    throw new Error('Client not found.');
                }
                return client;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        totalClientes: async(root, {}) => {
            try {
                const total = await Clientes.countDocuments();
                return total;
            } catch (err) {
                throw new Error(err.message);   
            }
        },
        getProductos: async(root, { limite, offset }) => {
            try {
                const productos = await Productos.find().limit(limite).skip(offset);
                return productos;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        getProducto: async(root, { id }) => {
            try {
                const producto = await Productos.findById(id);
                return producto;
            } catch (err) {
                throw new Error(err.message);
            }
        },
        totalProductos: async(root, {}) => {
            try {
                const total = await Productos.countDocuments();
                return total;
            } catch (err) {
                throw new Error(err.message);
            }
        }
    },
    Mutation: {
        crearCliente: async (root, { input }) => {  
            const cliente = new Clientes({
                nombre: input.nombre,
                apellido: input.apellido,
                empresa: input.empresa,
                emails: input.emails,
                edad: input.edad,
                tipo: input.tipo,
                pedidos: input.pedidos
            });
            return await cliente.save();
        },
        actualizarCliente: async (root, { input }) => {
            try {
                const client = await Clientes.findById(input.id);
                if (!client) {
                    throw new Error('Client not found.');
                }
                client.nombre = input.nombre;
                client.apellido = input.apellido;
                client.emails = input.emails;
                client.edad = input.edad,
                client.empresa = input.empresa;
                client.tipo = input.tipo;
                return await client.save();
            } catch (err) {
                throw new Error(err.message);
            }
        },
        borrarCliente: async (root, { id }) => {
            try {
                const client = await Clientes.findById(id);
                if (!client) {
                    throw new Error('Cliente not found.');
                }
                await client.remove();
                return "success";
            } catch (err) {
                throw new Error(err.message);
            }
        },
        nuevoProducto: async (root, {input}) => {
            try {
                const nuevoProducto = new Productos({
                    nombre: input.nombre,
                    precio: input.precio,
                    stock: input.stock
                });
                nuevoProducto.id = nuevoProducto._id;
                return await nuevoProducto.save();
            } catch (err) {
                throw new Error(err.message);
            }
        },
        actualizarProducto: async(root, {input}) => {
            try {
                const product = await Productos.findById(input.id);
                if (!product) {
                    throw new Error('Product not found.');
                }
                product.nombre = input.nombre || product.nombre;
                product.precio = input.precio || product.precio;
                product.stock = input.stock || product.stock;
                return await product.save();
            } catch (err) {
                throw new Error(err.message);
            }
        },
        borrarProducto: async(root, {id}) => {
            try {
                const product = await Productos.findById(id);
                if (!product) {
                    throw new Error('Product not found.');
                }
                await product.remove();
                return 'success';
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}