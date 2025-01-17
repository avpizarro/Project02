// const { response } = require("express");
const db = require("../models");

module.exports = app => {
  /////////Employee/////////

  //Main page render for view employee
  app.get("/manager", (req, res) => {
    db.Employee.findAll({}).then(response => {
      console.log(response);
      res.render("manager", {
        em: response
      });
    });
  });

  //This route will render add employee page if clicked the add new employee button
  app.get("/newEmployee", (req, res) => {
    res.render("addEmpForm");
  });

  //html route to render to delete employee
  app.get("/deleteEmployee", (req, res) => {
    db.Employee.findAll({}).then(response => {
      res.render("deleteEmp", {
        em: response
      });
    });
  });

  //Add new employee
  app.post("/api/employees", (req, res) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      position,
      pinNumber,
      managerId
    } = req.body;

    const newEmployee = {
      firstName,
      lastName,
      email,
      phone,
      position,
      pinNumber,
      managerId
    };
    console.log(newEmployee);
    db.Employee.create(newEmployee).then(emp => {
      console.log(`Added employee ${emp.firstName} ${emp.lastName}`);
      res.json({ id: emp.id });
    });
  });

  // Delete the Employee with the id available to us in req.params.id
  app.delete("/api/employees/:employeeId", (req, res) => {
    db.Employee.destroy({
      where: {
        employeeId: req.params.employeeId
      }
    }).then(emp => {
      //Remove employee with id
      console.log(`Remove employee with id ${emp.employeeId}`);
      res.end();
      // res.json(emp)
    });
  });

  /////////Menu/////////
  //Main page render for view dish
  app.get("/viewDish", (req, res) => {
    db.Dish.findAll({}).then(response => {
      console.log(response);
      res.render("viewDish", {
        dishes: response
      });
    });
  });

  //This route will render add dish page if clicked
  app.get("/newDish", (req, res) => {
    res.render("addDishForm");
  });

  //html route to render to delete dish
  app.get("/deleteDish", (req, res) => {
    db.Dish.findAll({}).then(response => {
      res.render("deleteDish", {
        dishes: response
      });
    });
  });

  //Add new dish api
  app.post("/api/newDishes", (req, res) => {
    const { id, title, price, isReady } = req.body;

    const newDish = {
      id,
      title,
      price,
      isReady
    };
    console.log(newDish);
    db.Dish.create(newDish).then(dishes => {
      console.log(`Added employee ${dishes.title}`);
      res.json(dishes);
    });
  });

  //Delete Dish
  app.delete("/api/dish/:id", (req, res) => {
    db.Dish.destroy({
      where: {
        id: req.params.id
      }
    }).then(dishes => {
      //Remove dish with id
      console.log(`Remove employee with id ${dishes.id}`);
      res.end();
    });
  });

  /////////Ingredients/////////

  //Main page render for view Ingredients
  app.get("/viewIngredient", (req, res) => {
    db.Ingredient.findAll({}).then(response => {
      console.log(response);
      res.render("viewIngredient", {
        ing: response
      });
    });
  });

  //This route will render add ingredient page if clicked
  app.get("/addIngredients", (req, res) => {
    res.render("addIngredientForm");
  });

  //Add new ingredient api
  app.post("/api/newIngredients", (req, res) => {
    const { id, name, quantity, minimumQuantity } = req.body;

    const newIngredient = {
      id,
      name,
      quantity,
      minimumQuantity
    };
    console.log(newIngredient);
    db.Ingredient.create(newIngredient).then(ing => {
      console.log(`Added ingredient ${ing.name}`);
      res.json(ing);
    });
  });

  //html route to render to delete ingredient
  app.get("/deleteIngredient", (req, res) => {
    db.Ingredient.findAll({}).then(response => {
      res.render("deleteIngredient", {
        ing: response
      });
    });
  });

  //Delete Ingredient
  app.delete("/api/ingredient/:id", (req, res) => {
    db.Ingredient.destroy({
      where: {
        id: req.params.id
      }
    }).then(ingredient => {
      //Remove ingredient with id
      console.log(`Remove ingredient with id ${ingredient.id}`);
      res.end();
    });
  });
};
