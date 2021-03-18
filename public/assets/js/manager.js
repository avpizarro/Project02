document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  ///////////EMPLOYEE section in Manager Page///////////

  // delete Employee
  const deleteEmp = document.querySelectorAll(".deleteEmp");
  if (deleteEmp) {
    deleteEmp.forEach((emp) => {
      emp.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");
        const id = emp.getAttribute("data-id");
        console.log(id);

        fetch(`/api/employees/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          alert("The employee has been removed successfully!!");
          window.location.replace("/manager");
        });
      });
    });
  }

  //add new employee functionality
  const addEmpBtn = document.getElementById("addEmpBtn");

  if (addEmpBtn) {
    addEmpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(addEmpBtn);
      const newEmployee = {
        firstName: $("#firstName")
          .val()
          .trim(),
        lastName: $("#lastName")
          .val()
          .trim(),
        email: $("#email")
          .val()
          .trim(),
        phone: $("#phone")
          .val()
          .trim(),
        pinNumber: $("#pinNumber")
          .val()
          .trim(),
        position: $("#position")
          .val()
          .trim(),
        managerId: $("#managerId")
          .val()
          .trim(),
      };
      console.log("this is " + newEmployee);
      fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      })
        .then(() => {
          alert("Added employee successfully");
          window.location.replace("/manager");
        })
        .catch((err) => console.error(err));
    });
  }

  ///////////MENU section in Manager Page///////////
  //add new dish functionality
  const addDishBtn = document.getElementById("addDishBtn");

  if (addDishBtn) {
    addDishBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(addDishBtn);
      const newDish = {
        title: $("#title")
          .val()
          .trim()
          .toUpperCase(),
        price: $("#price")
          .val()
          .trim(),
      };
      fetch("/api/newDishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDish),
      })
        .then(() => {
          alert("Added dish successfully");
          window.location.replace("/viewDish");
        })
        .catch((err) => console.error(err));
    });
  }

  // delete Dish
  const deleteDish = document.querySelectorAll(".deleteDish");
  if (deleteDish) {
    deleteDish.forEach((dishes) => {
      dishes.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");
        const id = dishes.getAttribute("data-id");
        console.log(id);

        fetch(`/api/dish/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          alert("The dish has been removed successfully!!");
          window.location.replace("/viewDish");
        });
      });
    });
  }
  ///////////INGREDIENT section in Manager Page///////////
  //add new dish functionality
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const addIcon = document.querySelector(".addIcon");
  const addIng = document.querySelector(".addIng");
  const addIconBtn = document.getElementById("addIconBtn");
  const ingName = document.getElementById("name");
  const iconToChoose = document.querySelectorAll(".iconToChoose");
  const pickIcon = document.querySelectorAll(".pickIcon");

  if (addIngredientBtn) {
    addIngredientBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(ingName.value);
      getIcon(ingName.value);
      const newIngredient = {
        name: $("#name")
          .val()
          .trim()
          .toUpperCase(),
        quantity: $("#quantity")
          .val()
          .trim(),
        minimumQuantity: $("#minimumQuantity")
          .val()
          .trim(),
      };
      fetch("/api/newIngredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      })
        .then(() => {
          addIng.setAttribute("style", "display: none");
          addIcon.setAttribute("style", "display: block");
        })
        .catch((err) => console.error(err));
    });
  }

  // Choose an Icon and add url to database
  if (addIconBtn) {
    addIconBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let url = "";
      pickIcon.forEach((radioBtn) => {
        if (radioBtn.checked) {
          url = radioBtn.previousSibling.getAttribute("src");
        }
      });
      console.log(url);
      const newIcon = {
        name: ingName.value,
        url,
      };
      console.log(newIcon);
      fetch("/api/ingredients/add/Icon", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIcon),
      }).then((response) => {
        if (response.ok) {
          window.location.replace("/viewIngredient");
          alert("Added ingredient successfully");
        } else {
          alert("something went wrong!");
        }
      });
    });
  }

  // function to get Icon
  const getIcon = (searchTerm) => {
    fetch(`/api/icons/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          for (i = 0; i < 5; i++) {
            iconToChoose[i].setAttribute("src", data[i]);
          }
          console.log(`Icons to choose urls: ${iconToChoose}`);
        }
      });
  };

  // delete Dish
  const deleteIngredient = document.querySelectorAll(".deleteIngredient");
  if (deleteIngredient) {
    deleteIngredient.forEach((ingredient) => {
      ingredient.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("clicked");
        const id = ingredient.getAttribute("data-id");
        console.log(id);

        fetch(`/api/ingredient/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => {
          alert("The ingredient has been removed successfully!!");
          window.location.replace("/viewIngredient");
        });
      });
    });
  }
});
