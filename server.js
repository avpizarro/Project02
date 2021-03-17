const express = require("express");
require("dotenv").config();

// console.log(process.env);

const PORT = process.env.PORT || 8080;
const db = require("./models");

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./routes/routes");
const ingredientRoutes = require("./routes/ingredient-routes.js");
const managerRoutes = require("./routes/manager-routes");
const waiterRoutes = require("./routes/waiter-routes");
const loginRoutes = require("./routes/login-routes");
const chefRoutes = require("./routes/chef-routes");
const apiRoutes = require("./routes/api-routes");
const nounRoutes = require("./routes/nounProject-routes");

ingredientRoutes(app);
managerRoutes(app);
routes(app);
waiterRoutes(app);
loginRoutes(app);
chefRoutes(app);
apiRoutes(app);
nounRoutes(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
