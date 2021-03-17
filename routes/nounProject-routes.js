const Client = (module.exports = function(config) {
  let request = require("request"),
    // Util = require("./util"),
    baseUrl = "https://api.thenounproject.com",
    oauth = {
      key: "f4ccd694d2e94c689a6dbcc115c7fcea",
      secret: "30a16b190c3848d1aa6f7e16e2b00da5"
    },
    self = this;

  //collection: Operations on collection endpoints
  this.getCollectionIconsById = function(id, options, callback) {
    const path = ["/collection/", id, "/icons"].join("");
    self.get(path, options, callback);
  };

  this.getCollectionIconsBySlug = function(slug, options, callback) {
    const path = ["/collection/", slug, "/icons"].join("");
    self.get(path, options, callback);
  };

  this.getCollectionById = function(id, callback) {
    const path = ["/collection/", id].join("");
    self.get(path, callback);
  };

  this.getCollectionBySlug = function(slug, callback) {
    const path = ["/collection/", slug].join("");
    self.get(path, callback);
  };

  //icon : Operations on icon endpoints
  this.getIconById = function(id, callback) {
    const path = ["/icon/", id].join("");
    self.get(path, callback);
  };

  this.getIconByTerm = function(term, callback) {
    const path = ["/icon/", term].join("");
    self.get(path, callback);
  };

  //icons : Operations on icons endpoints
  this.getRecentIcons = function(options, callback) {
    self.get("/icons/recent_uploads", options, callback);
  };

  this.getIconsByTerm = function(term, options, callback) {
    const path = ["/icons/", term].join("");

    //this argument 500's if not an int
    if (options.limit_to_public_domain === true) {
      options.limit_to_public_domain = "1";
    }

    self.get(path, options, callback);
  };

  //oauth : Operations on oauth endpoints
  this.getUsage = function(callback) {
    self.get("/oauth/usage", callback);
  };

  //user : Operations on user endpoints
  this.getUserCollection = function(userId, slug, callback) {
    const path = ["/user/", userId, "/collections/", slug].join("");
    self.get(path, callback);
  };

  this.getUserCollections = function(userId, callback) {
    const path = ["/user/", userId, "/collections"].join("");
    self.get(path, callback);
  };

  this.getUserUploads = function(username, options, callback) {
    const path = ["/user/", username, "/uploads"].join("");
    self.get(path, options, callback);
  };

  this.get = function(path, options, callback) {
    let url;
    //no options provided
    if (Util.isFunction(options)) {
      callback = options;
      options = {};
    }

    url = baseUrl + path + Util.objectToQueryString(options);
    console.log("url", url);

    request.get(
      {
        url: encodeURI(url),
        oauth: oauth
      },
      (err, response, body) => {
        if (err) {
          callback(new Error("Noun Project API: " + err));
        } else if (response.statusCode !== 200) {
          callback(response.statusCode + " HTTP response code");
        } else {
          callback(null, JSON.parse(body));
        }
      }
    );
  };
});
