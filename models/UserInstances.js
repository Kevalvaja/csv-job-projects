const { DataTypes } = require("sequelize");
const { sequelize } = require("./db");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

(async () => {
  try {
    await User.sync({ force: false });
    console.log("User table has been synced.");
  } catch (error) {
    console.error("Unable to sync User table:", error);
  }
})();

module.exports = User;
