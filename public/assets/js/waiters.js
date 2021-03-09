// Wait until the DOM is loaded to start the script
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get the html elements from the waiter.handlebar
  const tableBtn = document.querySelectorAll(".tableBtn");
  const orderTitle = document.querySelectorAll(".orderTitle");
  const orderBody = document.querySelectorAll(".orderBody");
  const menuDish = document.querySelectorAll(".menuDish");
  const orderedDish = document.querySelectorAll(".orderedDish");

  let tableId = "";
  let dishBelongsTo = "";
  let toShow = "";

  //Function to hide the dish once it is served -- needs update route
  orderedDish.forEach(dish => {
    dish.addEventListener("click", e => {
      e.preventDefault();
      console.log("clicked");
      const orderedDishId = parseInt(e.target.getAttribute("data-id"));
      removeDishes(tableId, orderedDishId);
      dish.textContent = "";
    });
  });

  // Make the table buttons clickable
  tableBtn.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      orderTitle.forEach(title => {
        title.setAttribute("style", "display: none");
      });
      orderBody.forEach(item => {
        item.setAttribute("style", "display: none");
      });
      console.log("clicked");
      tableId = parseInt(e.target.textContent);
      console.log(tableId);
      for (i = 0; i < orderedDish.length; i++) {
        dishBelongsTo = parseInt(orderedDish[i].getAttribute("data-tableId"));
        if (tableId === dishBelongsTo) {
          toShow = document.querySelectorAll(`.order${tableId}`);
          toShow.forEach(data => {
            data.setAttribute("style", "display: block");
          });
        }
        getDishes(tableId);
      }
    });
  });

  // Make the dishes clickable to order a dish
  menuDish.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      console.log("clicked");
      const dishId = parseInt(e.target.getAttribute("data-id"));
      console.log(dishId);
      orderDishes(tableId, dishId);
    });
  });

  //Function to get the dishes ordered by a table
  const getDishes = item => {
    fetch(`/waiter/table/Order/${item}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  //Function to order Dishes
  const orderDishes = (table, dish) => {
    fetch(`api/table/${table}/add-dish/${dish}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  // Function to remove a dish
  const removeDishes = (table, dish) => {
    fetch(`api/table/${table}/remove-dish/${dish}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };
});
