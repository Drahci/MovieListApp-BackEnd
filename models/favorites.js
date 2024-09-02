const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Favorite = sequelize.define(
  "favoritos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    poster_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_favorito: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Favorite;
