// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-eat").on("click", function(event) {
      
      var id = $(this).data("id");
      var newEaten = $(this).data("neweaten");
  
      
      var newEatenState = {
        devoured: !newEaten
      };
      console.log(newEatenState);
      // Send the PUT request.
      $.ajax({
        url: `/api/burgers/${id}`,
        method: "PUT",
        data: newEatenState
      }).then(
        function() {
          console.log("changed burger to", newEaten);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#bn").val(),
        devoured: $("[name=devoured]:checked").val()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("You made a new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {

      console.log("click test 1");

      var id = $(this).data("id");

      console.log("click test 2");
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("burger deleted", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  