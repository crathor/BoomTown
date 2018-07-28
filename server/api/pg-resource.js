var strs = require('stringstream')

function tagsQueryString(tags, itemid, result) {
  const length = tags.length
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        )
}

module.exports = function(postgres) {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
        values: [fullname, email, password]
      }
      try {
        const user = await postgres.query(newUserInsert)
        return user.rows[0]
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.'
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.'
          default:
            throw 'There was a problem creating your account.'
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE email = $1 ',
        values: [email]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1',
        values: [id]
      }
      try {
        const user = await postgres.query(findUserQuery)
        if (!user) throw 'User was not found.'
        return user.rows[0]
      } catch (e) {
        throw 'User was not found.'
      }
    },
    async getItems(idToOmit) {
      let text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
      FROM items item
      INNER JOIN uploads up
      ON up.itemid = item.id
      ORDER BY item.created DESC`
      if (idToOmit) {
        text = `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
        FROM items item
        INNER JOIN uploads up
        ON up.itemid = item.id
        WHERE item.ownerid <> $1 AND item.borrowerid IS NULL
        ORDER BY item.created DESC`
      }

      const query = {
        text: text,
        values: idToOmit ? [idToOmit] : []
      }
      try {
        const items = await postgres.query(query)
        return items.rows
      } catch (error) {
        throw 'No Items Found'
      }
    },
    async getItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id
          WHERE ownerid = $1
          ORDER BY created DESC`,
          values: [id]
        })
        return items.rows
      } catch (error) {
        throw 'No Items Found'
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          text: `SELECT item.id, item.title,item.description,item.created, item.ownerid, item.borrowerid, up.data as imageurl 
          FROM items item
          INNER JOIN uploads up
          ON up.itemid = item.id
          WHERE borrowerid = $1
          ORDER BY created DESC`,
          values: [id]
        })
        return items.rows
      } catch (error) {
        throw 'No Borrowed Items'
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags')
        return tags.rows
      } catch (error) {
        throw "Couldn't retrieve tags"
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT item.itemid, t.id, t.title 
        FROM itemtags item
        INNER JOIN tags t
        ON t.id = item.tagid
        WHERE itemid = $1`,
        values: [id]
      }
      try {
        const tags = await postgres.query(tagsQuery)
        return tags.rows
      } catch (error) {
        throw 'No Tags on Item'
      }
    },
    async saveNewItem({ item, image, user }) {
      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', err => {
              // Convert image (file stream) to Base64
              const imageStream = image.stream.pipe(strs('base64'))

              let base64Str = 'data:image/*;base64, '
              imageStream.on('data', data => {
                base64Str += data
              })

              imageStream.on('end', async () => {
                // Image has been converted, begin saving things
                const { title, description, tags } = item
                const itemQuery = {
                  text:
                    'INSERT INTO items (title, description, ownerid) VALUES ($1, $2, $3) RETURNING *',
                  values: [title, description, user.id]
                }

                const newItem = await client.query(itemQuery)
                const itemId = newItem.rows[0].id

                const imageUploadQuery = {
                  text:
                    'INSERT INTO uploads (itemid, filename, mimetype, encoding, data) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                  values: [
                    itemId,
                    image.filename,
                    image.mimetype,
                    'base64',
                    base64Str
                  ]
                }

                // Upload image
                await client.query(imageUploadQuery)

                const tagsQuery = {
                  text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                    [...tags],
                    itemId,
                    ''
                  )}`,
                  values: tags.map(tag => tag.id)
                }
                await client.query(tagsQuery)

                // Commit the entire transaction!
                client.query('COMMIT', err => {
                  if (err) {
                    throw err
                  }
                  // release the client back to the pool
                  done()
                  resolve(newItem.rows[0])
                  // -------------------------------
                })
              })
            })
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err
              }
              // release the client back to the pool
              done()
            })
            switch (true) {
              case /uploads_itemid_key/.test(e.message):
                throw 'This item already has an image.'
              default:
                throw e
            }
          }
        })
      })
    }
  }
}
