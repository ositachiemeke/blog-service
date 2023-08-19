import { QueryTypes, BindOrReplacements } from "sequelize";
import { sequelize } from "../database/sequelize-db";

import { Users } from "./../models/Users";

const querySelect = async (query: string, replacements: BindOrReplacements) => {
  return await sequelize.query(query, {
    replacements: replacements,
    raw: true,
    type: QueryTypes.SELECT
  });
};

export default {
  raw: sequelize,

  select: querySelect,

  users: Users,

  syncAll: async function () {
    let opts;

    await this.users.sync(opts);
  }
};
