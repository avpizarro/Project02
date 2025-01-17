const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Dish = sequelize.define("Dish", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  // Table table with Dish Table connect "many to many"
  Dish.associate = function(models) {
    Dish.belongsToMany(models.RestaurantTable, {
      through: models.TableDish,
      as: "tables",
      foreignKey: "dishId",
      otherKey: "tableId"
    });
  };
  //Table table with Ingredient Table connect "many to many"
  Dish.associate = function(models) {
    Dish.belongsToMany(models.Ingredient, {
      through: "IngredientDishes",
      as: "Ingredients",
      foreignKey: "dishId",
      otherKey: "IngredientId"
    });
  };
  return Dish;
};
