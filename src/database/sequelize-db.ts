import { Sequelize } from "sequelize";
import LOG from "../library/Logging";
import { CONFIG } from "../config/config";

const sequelize = new Sequelize(CONFIG.DATABASE.NAME, CONFIG.DATABASE.USERNAME, CONFIG.DATABASE.PASSWORD, {
  host: CONFIG.DATABASE.HOST,
  dialect: "mysql",
  logging: (...msg) => LOG.info(msg[0]), // log the query with all the information, to disable set to false
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000
  },
  define: {
    freezeTableName: true // prevent sequelize from pluralizing table names
  }
});

export { sequelize };
