const { Text, Select, Password, CloudinaryImage, Relationship } = require('@keystonejs/fields')
const { byTracking, atTracking } = require('@keystonejs/list-plugins')
const {
  userIsAuthenticated,
  userIsAdminOrOwner,
  userIsEditorOrOwner,
  userIsAdmin,
} = require('../lib/access-control')
const { cloudinaryAdapter } = require('../lib/adapters')

export default {
  fields: {
    // TODO: create company model
    owner: { type: Relationship, ref: 'Company', isRequired: true },
    title: { type: Text, isRequired: true },
    images: { type: Relationship, ref: 'ProductImage', many: true },
    rating: {
      type: Relationship,
      ref: 'ProductRating',
    },
    priceRanges: {
      type: Relationship,
      ref: 'ProductPriceRange',
      isRequired: true,
      many: true,
    },
    descriptionDetails: {
      type: Text,
      many: true,
    },
  },
  access: {
    create: userIsAuthenticated,
    read: true,
    update: userIsEditorOrOwner,
    delete: userIsEditorOrOwner,
  },
  plugins: [atTracking(), byTracking()],
}
