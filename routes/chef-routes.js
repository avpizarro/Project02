const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = (app) => {
  app.get("/chef", async (req, res) => {
    try {
      const dishIdArray = [];
      const orderedDishes = await db.TableDish.findAll({});
      const parsedOrderedDishes = orderedDishes.map((dish) => {
        const dishId = dish.dishId;
        dishIdArray.push(dishId);
        const tableId = dish.tableId;
        const isReady = dish.isReady;
        return {
          dishId,
          tableId,
          isReady,
        };
      });
      console.log(`Dishes orderd: ${dishIdArray}`);
      const orderTitles = await db.Dish.findAll({
        where: { id: { [Op.in]: dishIdArray } },
      });

      const returnedTarget = parsedOrderedDishes.map((item) => {
        const { title } = orderTitles.find(({ id }) => id === item.dishId);
        return {
          title,
          dishId: item.dishId,
          tableId: item.tableId,
          isReady: item.isReady,
        };
      });

      console.log("this is my order:" + JSON.stringify(orderTitles));
      console.log("This is my merged array" + returnedTarget);

      res.render("chef", { dishes: returnedTarget });
    } catch (err) {
      console.error(err);
    }
  });

  app.put("/api/chef/ready", async (req, res) => {
    const dishId = req.body.dishId;
    const tableId = req.body.tableId;

    if (dishId === undefined || tableId === undefined) {
      return res.status(400).json({
        err: "No dish or table selected",
      });
    }
    await db.TableDish.update(
      { isReady: true },
      { where: { tableId, dishId } }
    ).then((rowsUpdated) => {
      res.json(rowsUpdated);
    });
  });
};
