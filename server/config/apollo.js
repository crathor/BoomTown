const { ApolloServer } = require('apollo-server')
const { apolloUploadExpress } = require('apollo-upload-server')
const { makeExecutableSchema } = require('graphql-tools')
const { AuthDirective } = require('../api/custom-directives')

const typeDefs = require('../api/schema')
let resolvers = require('../api/resolvers')

module.exports = function({ app, pgResource }) {
  resolvers = resolvers(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  })

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      const tokenName = app.get('JWT_COOKIE_NAME')
      const token = req ? req.cookies[tokenName] : undefined

      return {
        req,
        token,
        pgResource
      }
    },
    schema
  })

  apolloServer.applyMiddleware({
    app,
    uploads: true,
    cors: app.get('CORS_CONFIG'),
    uploads: apolloUploadExpress({
      maxFileSize: 10000000 // 10mb
    })
  })
}
