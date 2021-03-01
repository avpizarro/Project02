module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    // Giving the Employee model a name of type STRING
    employeeId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    pinNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    position: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    managerId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    }
  });
  return Employee;
};
