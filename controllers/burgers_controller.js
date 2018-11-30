var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    // Check to see intital data is good
    // console.log(data);
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/api/test", (req, res) => {
  res.json({body: {
    "test":"test"}
  })
})

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(result) {
    console.log("**controller Post test**");
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("**controller Put test**");
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
    
  }, condition, function(result) {
    console.log("**controller Update test**");
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      console.log("error with db")
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;