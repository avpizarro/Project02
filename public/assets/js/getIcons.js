document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded! 🚀");

  const icon = document.querySelector(".icon");
  const addIcon = document.querySelector(".CHICKEN");

  let urls = [];

  icon.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    getIcon();
  });

  const getIcon = () => {
    fetch("/api/icons")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          for (i = 0; i < 5; i++) {
            urls.push(data[i]);
          }
          console.log(urls);
          addIcon.setAttribute("src", urls[0]);
        }
      });
  };
});
