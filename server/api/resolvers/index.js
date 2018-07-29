const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const authMutations = require('./auth')
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
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async borrowItem(parent, args, { token, pgResource }, info) {
        try {
          const itemid = args.item
          const user = await jwt.decode(token, app.get('JWT_SECRET'))
          const updatedItem = await pgResource.borrowItem({
            itemid,
            user
          })
          return updatedItem
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    }
  }
}
