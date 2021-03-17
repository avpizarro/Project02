document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  // Get the html elements from the waiter.handlebar
  const orderButton = document.querySelectorAll(".orderedDish");
  const signUpBtn = document.getElementById("signUpBtn");

  signUpBtn.setAttribute("style", "display: none");

  // Make the dishes clickable to change the status from not ready to ready
  orderButton.forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      console.log("clicked");
      const dishId = e.target.getAttribute("data-id");
      const tableId = e.target.getAttribute("data-table_id");
      fetch("/api/chef/ready", {
        method: "PUT",
        body: JSON.stringify({
          tableId,
          dishId
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          location.reload();
        });
    });
  });
});
