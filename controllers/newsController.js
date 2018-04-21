var express = require("express");

var router = express.Router();
var db = require("../models");
var mongoose = require("mongoose");
// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(articles) {
      console.log("articles scraped:", articles);
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", articles)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

router.post("/api/news", function(req, res) {
  db.Article.create([
      "name", "read"
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/news/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  db.Article.update({
    scraped: true
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
