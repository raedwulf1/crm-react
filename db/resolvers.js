// Resolvers
const resolvers = {
    Query: {
      obtenerCursos: (_,{input}, ctx, info) => {
        const resultado = cursos.filter(curso => curso.tecnologia === input.tecnologia)
        return resultado;
      }
    }
}

module.exports = resolvers;