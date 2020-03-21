const { CloudinaryImage, Relationship } = require('@keystonejs/fields')
const { userIsEditorOrOwner, userIsAdmin } = require('../lib/access-control')
const { cloudinaryAdapter } = require('../lib/adapters')

export default {
  fields: {
    product: { type: Relationship, ref: 'Product', isRequired: true },
    data: { type: CloudinaryImage, adapter: cloudinaryAdapter },
  },
  access: {
    create: true, // TODO: Check that only product owner or manager can edit the product
    read: userIsEditorOrOwner,
    update: userIsEditorOrOwner,
    delete: userIsAdmin,
  },
}

// TODO: add hook to delete old image on update/delete