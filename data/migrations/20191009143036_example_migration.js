// This script currently makes no changes to table structures
// but is provided as an example of a Knex migration.

// Since Knex keeps track of migrations that have been applied,
// and we automatically run migrations on start, changes to this
// file will not be applied. You need to create a new migration
// file or remove this migration first with: `npx knex migrate:down`

// See: http://knexjs.org/#Migrations-CLI

exports.up = knex => {
  return knex.schema.table("Page", t => {
    // Add a text field "newTextField" to the table
    // t.text("newTextField");
    return true;
  });
};

exports.down = knex => {
  return knex.schema.table("Page", t => {
    // Remove field "newTextField" from the table
    // t.dropColumn("newTextField");
    return true;
  });
};
