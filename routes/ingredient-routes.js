const db = require("../models");
const sequelize = require("sequelize");

module.exports = app => {
  app.get("/ingredients", async (req, res) => {
    try {
      // get the ingredients where are greater from the minimun quantity
      const inStock = await db.Ingredient.findAll({
        where: {
          quantity: { [sequelize.Op.gt]: sequelize.col("minimumQuantity") }
        }
      });
      // get the ingredients where are less or equal from the minimun quantity
      const lowStock = await db.Ingredient.findAll({
        where: {
          quantity: { [sequelize.Op.lte]: sequelize.col("minimumQuantity") }
        }
      });
      res.render("ingredients", { lowStock, inStock });
    } catch (err) {
      console.error(err);
    }
  });

  app.put("/api/ingredients/:id", (req, res) => {
    db.Ingredient.update(
      { quantity: sequelize.literal("quantity + minimumQuantity*2") },
      {
        where: { id: req.params.id }
      }
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  });

  app.put("/api/ingredients/add/Icon", (req, res) => {
    db.Ingredient.update(
      { url: req.body.url },
      {
        where: { name: req.body.name }
      }
    )
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => console.log(err));
  });
};
