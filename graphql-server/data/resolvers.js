import { Clientes } from './db';

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
        }
    }
}