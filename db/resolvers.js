const Usuario = require('../models/Usuarios');
const Producto = require('../models/Producto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: __dirname + '/variables.env'})

const crearToken = (user, secret, expiresIn) => {
  const {id, email, nombre, apellido} = user;
  return jwt.sign({id, email, nombre, apellido}, secret, { expiresIn } )
}

// Resolvers
const resolvers = {
    Query: {
      obtenerUsuario: async  (_,{ token }) => {
        const usuarioId = await jwt.verify(token, process.env.SECRET);
        return usuarioId;


      }
    },
    Mutation: {
      // Usuarios
      nuevoUsuario: async (_, { input } ) => {

        const { email, password } = input;
        // Review if user is not registered
        const existeUsuario = await Usuario.findOne({email});
        if(existeUsuario) {
          throw new Error('Usuario Registrado');
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);


        // Save Data
        try{
          const usuario = new Usuario(input);
          usuario.save();
          return usuario;
        }catch(err){
          console.log(err);
        }
      },
      autenticarUsuario: async (_, { input }) => {

        const { email, password } = input;
        // Check if user Exist
        // Review if user is not registered
        const existeUsuario = await Usuario.findOne({email});
        if(!existeUsuario) {
          throw new Error('Usuario no existe');
        }


        //Review if user is correct
        const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
        if(!passwordCorrecto){
          throw new Error('Password incorrecto');
        }

        // Create Token
        return {
          token: crearToken(existeUsuario, process.env.SECRET, '24h')
        }
      },
      // Productos
      nuevoProducto: async (_, { input }) => {
        try{
          const producto = new Producto(input);

          // save
          const result = await producto.save();
          return result;
        } catch(err){
          console.log(err);
        }
      }
    }
}

module.exports = resolvers;