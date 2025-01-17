const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [1],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    minimumQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  });
  //Ingredient table with Dish Table connect "many to many"
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Dish, {
      through: "IngredientDishes",
      as: "dishes",
      foreignKey: "ingredientId",
      otherKey: "dishId",
    });
  };
  //Ingredient table with Supplier Table connect "many to many"
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Supplier, {
      through: "IngredientSuppliers",
      as: "suppliers",
      foreignKey: "ingredientId",
      otherKey: "supplierId",
    });
  };
  return Ingredient;
};
