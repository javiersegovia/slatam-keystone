const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { KnexAdapter } = require('@keystonejs/adapter-knex')
const { userIsAdmin } = require('./lib/access-control')
const models = require('./models')

const keystone = new Keystone({
  name: 'Slatam API',
  adapter: new KnexAdapter({ dropDatabase: true }),
})

// TEST IF WORKS !
// Should generate the list of models

if (models && models.length) {
  models.forEach(model => {
    keystone.createList(model[0], model[1])
  })
}

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
      // Only allow admin to access the UI:
      // isAccessAllowed: userIsAdmin, 
    }),
  ],
}
