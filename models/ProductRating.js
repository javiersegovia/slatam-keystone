const { Integer, Float, Relationship } = require('@keystonejs/fields')
const { userIsEditorOrOwner } = require('../lib/access-control')

export default {
  fields: {
    product: { type: Relationship, ref: 'Product', isRequired: true },
    average: {
      type: Float,
      isRequired: true,
      defaultValue: 0,
    },
    reviewsCount: {
      type: Integer,
      isRequired: true,
      defaultValue: 0,
    },
    reviews: {
      // TODO: add hook to validate max and min range
      type: Relationship,
      ref: 'ProductReview',
      many: true,
    },
  },
  access: {
    create: true, // TODO: Check that only product owner or manager can create/edit the product price
    read: true,
    update: userIsEditorOrOwner,
    delete: userIsEditorOrOwner, // validate that it is not the last item
  },
}
