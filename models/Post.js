const {
  Text,
  Slug,
  Integer,
  Relationship,
} = require('@keystonejs/fields')
const { byTracking, atTracking } = require('@keystonejs/list-plugins')
const {
  userIsAdminOrOwner,
  userIsEditorOrOwner,
  userIsAdmin,
  userIsEditor,
} = require('../lib/access-control')

export default {
  schemaDoc: 'Post data',
  fields: {
    owner: {
      Type: Relationship,
      ref: 'User',
    },
    title: {
      Type: Text,
      schemaDoc: 'Title of post',
      access: {
        create: userIsAdmin,
        update: userIsAdminOrOwner,
        delete: userIsAdminOrOwner,
      },
    },
    path: {
      type: Slug,
      schemaDoc: 'Unique path for post',
      from: 'title',
      isRequired: true,
    },
    claps: {
      type: Integer,
      schemaDoc: 'Number of claps',
    },
    comments: {
      type: Relationship,
      ref: 'Comment.post',
      many: true,
    },
  },
  access: {
    read: true,
    create: userIsEditor,
    update: userIsEditorOrOwner,
    delete: userIsEditorOrOwner,
  },
  plugins: [atTracking(), byTracking()],
}
