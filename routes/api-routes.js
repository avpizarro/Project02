const NounProject = require("the-noun-project");

module.exports = app => {
  app.get("/api/icons", (req, res) => {
    const nounProject = new NounProject({
      key: process.env.API_KEY,
      secret: process.env.API_SECRET
    });
    nounProject.getIconsByTerm("chicken", { limit: 5 }, async (err, data) => {
      const icons = await data.icons;
      console.log(icons);

      const previewUrls = icons.map(icon => icon.preview_url_42);

      res.json(previewUrls);
    });
  });
};
