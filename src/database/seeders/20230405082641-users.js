"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        id: "0168d265-6d0d-4d60-9f9c-db4b4ba5da68",
        name: "Delores Ortiz",
        email: "delores.ortiz@example.com"
      },
      {
        id: "32212ef0-94bf-4508-97c0-1397777508f4",
        name: "Angel Lane",
        email: "angel.lane@example.com"
      },
      {
        id: "3ac04b36-3d4b-47c5-8e00-3c2616b57c29",
        name: "Clinton Henderson",
        email: "clinton.henderson@example.com"
      },
      {
        id: "52a0ff0d-396c-4b1c-9f0f-a43e01a80d46",
        name: "Evan Arnold",
        email: "evan.arnold@example.com"
      },
      {
        id: "d296fc65-2c45-4aab-9eb5-af73b3dc8a11",
        name: "Antonio Adams",
        email: "antonio.adams@example.com"
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  }
};
