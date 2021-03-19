module.exports = (sequelize, DataTypes) => {
  const TableDish = sequelize.define("TableDish", {
    isReady: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        len: [1]
      }
    }
  });
  return TableDish;
};
