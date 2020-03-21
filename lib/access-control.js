const userIsAuthenticated = ({ authentication: { item } }) => !!item

const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.permission === 'ADMIN')

const userIsEditor = ({ authentication: { item: user } }) =>
  Boolean(user && ['ADMIN', 'EDITOR'].includes(user.permission))

// return either false if there is no user, or a graphql where clause
// const userIsOwner = ({ authentication: { item: user } }) => {
//   if (!user) return false

//   return { owner: { id: user.id } }
// }

const userIsAdminOrOwner = (payload) => {
  const {
    authentication: { item },
    existingItem = null,
  } = payload
  if (!item) return false
  
  const isAdmin = userIsAdmin(payload)

  if (existingItem) {
    const userIsOwner =
      item.id === existingItem.id ||
      (existingItem && existingItem.owner && item.id === existingItem.owner) 
  
    return Boolean(isAdmin || userIsOwner)
  }

  return { owner: { id: user.id} }
}

const userIsEditorOrOwner = (payload) => {
  const {
    authentication: { item },
    existingItem = null,
  } = payload
  if (!item) return false
  
  const isEditor = userIsEditor(payload)

  if (existingItem) {
    const userIsOwner =
      item.id === existingItem.id ||
      (existingItem && existingItem.owner && item.id === existingItem.owner) 
  
    return Boolean(isEditor || userIsOwner)
  }

  return { owner: { id: user.id} }
}

// return either false if there is no user, or a graphql where clause
const userIsUser = ({ authentication: { item: user } }) => {
  return user && { id: user.id }
}

const userCanUpdateItem = (payload) => {
  const isOwner = userIsUser(payload)
  const isCool = ['ADMIN', 'EDITOR'].includes(
    payload.authentication.item.permissions
  )

  return isCool || isOwner || userOwnsItem(payload)
}

module.exports = {
  userIsAuthenticated,
  userIsAdmin,
  userIsEditor,
  userIsUser,
  userIsEditorOrOwner,
  userIsAdminOrOwner,
  userCanUpdateItem,
}
