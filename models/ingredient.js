module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    supplier: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    }
  });
  //Ingredient table with Menu Table connect "many to many"
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Menu, {
      through: 'IngredientMenus',
      as: 'menus',
      foreignKey: 'ingredientId',
      otherKey: 'menuId'
    });
  };
  return Ingredient;
};