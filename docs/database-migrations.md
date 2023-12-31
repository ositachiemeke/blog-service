# Migrations

We use `sequilize` as a 3rd party library to manage the db changes

## How to create a migration script

- run `npx sequelize-cli migration:generate --name [name_of_the_migration_file]`
- go to `/src/database/migrations` and see the latest migration file created
- add you migration command into the file

The file generated by the command above should have the following format `XXXXXXXXXXXXXX-create-user.js`

## Migration template

When you run the command the generate a migration file this is the content that should be generated:

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
```

## How to run the migration

There are 3 commands in the `package.json` to run the migration, revert the last migration or revert all

- `npm run migrate:up`
- `npm run migrate:undo`
- `npm run migrate:undo:all`

## Links

[Sequelize documentation](https://sequelize.org/docs/v6/)
[Sequelize migration](https://sequelize.org/docs/v6/other-topics/migrations/)
[QueryInterface object](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface)
