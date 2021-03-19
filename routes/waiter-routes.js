const db = require("../models");

module.exports = app => {
  // Route to get the tables, menu and orders to display on the waiter page
  app.get("/waiter", async (req, res) => {
    try {
      const dishes = await db.Dish.findAll();
      const tableOrders = await db.TableDish.findAll();
      const tables = await db.RestaurantTable.findAll();
      const parsedTables = tables.map(table => {
        const [width, height] = table.dataValues.dimension.split("x");
        const id = table.dataValues.id;
        const isAvailable = table.dataValues.isAvailable;
        return {
          dimension: {
            width,
            height
          },
          id,
          isAvailable
        };
      });
      const returnedTarget = tableOrders.map(item => {
        dishes.map(info => {
          if (info.id === item.dishId) {
            item.title = info.title;
          }
          return info.title;
        });
        return {
          title: item.title,
          dishId: item.dishId,
          tableId: item.tableId,
          isReady: item.isReady
        };
      });

      res.render("waiter", {
        dishes,
        tables: parsedTables,
        tableOrders: returnedTarget
      });
    } catch (err) {
      console.error(err);
    }
  });

  // Route to get all the dishes
  app.get("/api/dishes", (req, res) => {
    db.Dish.findAll()
      .then(response => {
        return res.json(response);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  });

  // Route to get the dishes that belong to a specific table
  app.get("/waiter/table/Order/:id", (req, res) => {
    db.TableDish.findAll({
      where: { tableId: req.params.id }
    })
      .then(response => {
        return res.json(response);
      })
      .catch(err => {
        console.error(err);
      });
  });

  // Route to add a dish to a table
  app.get("/api/table/:id/add-dish/:id2", async (req, res) => {
    try {
      const table = await db.RestaurantTable.findOne({
        where: { id: req.params.id }
      });
      const dish = await db.Dish.findOne({
        where: { id: req.params.id2 }
      });
      console.log(res);
      return table.addDish([dish]);
    } catch (err) {
      console.error(err);
    }
  });

  // Route to delete a dish from a table
  app.get("/api/table/:id/remove-dish/:id2", async (req, res) => {
    try {
      const table = await db.RestaurantTable.findOne({
        where: { id: req.params.id }
      });
      const dish = await db.Dish.findOne({
        where: { id: req.params.id2 }
      });
      console.log(res);
      return table.removeDish([dish]);
    } catch (err) {
      console.error(err);
    }
  });

  // Route to get all the tables
  app.get("/api/tables", (req, res) => {
    db.RestaurantTable.findAll()
      .then(response => {
        return res.json(response);
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  });

  // Route to update the table availability to false
  app.put("/api/table/not-available/:id", (req, res) => {
    if (typeof parseInt(req.params.id) === "number") {
      db.RestaurantTable.update(
        { isAvailable: false },
        {
          where: { id: req.params.id }
        }
      )
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    }
  });

  // Route to update the table availability to true
  app.put("/api/table/available/:id", (req, res) => {
    if (typeof parseInt(req.params.id) === "number") {
      db.RestaurantTable.update(
        { isAvailable: true },
        {
          where: { id: req.params.id }
        }
      )
        .then(() => {
          res.sendStatus(200);
        })
        .catch(err => {
          console.log(err);
          return res.json(err);
        });
    }
  });
};
