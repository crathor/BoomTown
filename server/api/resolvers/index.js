/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const authMutations = require('./auth')
// -------------------------------
const { UploadScalar, DateScalar } = require('../custom-types')

module.exports = function(app) {
  return {
    Upload: UploadScalar,
    //Date: DateScalar,

    Query: {
      viewer(parent, args, { token }, info) {
        if (token) {
          const user = jwt.decode(token, app.get('JWT_SECRET'))
          return user
        }
        return null
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
        // -------------------------------
      },
      async tags(parent, {}, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags()
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    User: {
      async items(parent, args, { pgResource }, info) {
        try {
          const items = await pgResource.getItemsForUser(parent.id)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async borrowed(parent, args, { pgResource }, info) {
        try {
          const items = pgResource.getBorrowedItemsForUser(parent.id)
          return items
        } catch (e) {
          throw new ApolloError(e)
        }
        // -------------------------------
      }
    },

    Item: {
      async itemowner(item, args, { pgResource }, info) {
        try {
          const owner = pgResource.getUserById(item.ownerid)
          return owner
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async tags(item, args, { pgResource }, info) {
        try {
          const tags = pgResource.getTagsForItem(item.id)
          return tags
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async borrower(item, args, { pgResource }, info) {
        try {
          if (item.borrowerid) {
            const items = pgResource.getUserById(item.borrowerid)
            return items
          }
          return null
        } catch (e) {
          throw new ApolloError(e)
        }
      }
      // async imageurl({ imageurl, imageid, mimetype, data }) {
      //   if (imageurl) return imageurl
      //   if (imageid) {
      //     return `data:${mimetype};base64, ${data}`
      //   }
      // }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, args, { token, pgResource }, info) {
        try {
          const image = await args.image
          const user = await jwt.decode(token, app.get('JWT_SECRET'))
          const newItem = await pgResource.saveNewItem({
            item: args.item,
            image,
            user
          })
          return newItem
        } catch (error) {
          console.log(error)
        }
        /**
         *  @TODO: Destructuring
         *
         *  The 'args' and 'context' parameters of this resolver can be destructured
         *  to make things more readable and avoid duplication.
         *
         *  When you're finished with this resolver, destructure all necessary
         *  parameters in all of your resolver functions.
         *
         *  Again, you may look at the user resolver for an example of what
         *  destructuring should look like.
         */
      }
    }
  }
}
