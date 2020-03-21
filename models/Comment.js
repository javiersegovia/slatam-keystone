import striptags from 'striptags'
import { Markdown, Checkbox, Integer, Relationship } from '@keystonejs/fields'
import { byTracking, atTracking } from '@keystonejs/list-plugins'
import { userIsEditorOrOwner, userIsAdmin } from '../lib/access-control'

export default {
  fields: {
    body: {
      Type: Markdown,
      schemaDoc: 'The commentary',
      isRequired: true,
    },
    approved: {
      type: Checkbox,
      schemaDoc: 'Only approved comments are shown',
      access: {
        read: true,
        create: isUserAdmin,
        update: isUserAdmin,
      },
    },
    claps: {
      type: Integer,
      schemaDoc: 'Number of claps',
    },
    post: {
      type: Relationship,
      ref: 'Post.comments',
      isRequired: true,
    },
    user: {
      type: Relationship,
      ref: 'User',
    },
  },
  plugins: [atTracking(), byTracking()],
  access: {
    read: (payload) => {
      if (userIsAdmin(payload)) {
        return true // Don't filter items for admin users
      }
      // Return only approved comments for non-admin users
      return {
        approved: true,
      }
    },
    create: true,
    update: userIsEditorOrOwner,
    delete: userIsEditorOrOwner,
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      if (resolvedData.body) {
        return {
          ...resolvedData,
          date: new Date().toISOString(),
          body: striptags(resolvedData.body), // Don't allow any HTML
        }
      }
      return resolvedData
    },
  },
}
