const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql", // ou 'sqlite', 'postgres', 'mssql'
});

module.exports = sequelize;
