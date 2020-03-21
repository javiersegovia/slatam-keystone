const { Integer, Markdown, Relationship } = require('@keystonejs/fields')
const { userIsEditorOrOwner, userIsEditor } = require('../lib/access-control')

export default {
  fields: {
    productRating: { type: Relationship, ref: 'ProductRating', isRequired: true },
    user: { type: Relationship, ref: 'User', isRequired: true },
    rating: {
      type: Integer,
      isRequired: true,
      // TODO check the value is between 1 and 5
    },
    body: {
      Type: Markdown,
      schemaDoc: 'The review',
      isRequired: true,
    },
  },
  plugins: [atTracking(), byTracking()],
  access: {
    create: true, // TODO: Check that only a verified customer can leave a review
    read: true,
    update: userIsEditorOrOwner,
    delete: userIsEditor,
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      if (resolvedData.body) {
        return {
          ...resolvedData,
          body: striptags(resolvedData.body), // Don't allow any HTML
        }
      }
      return resolvedData
    },
  },
}
