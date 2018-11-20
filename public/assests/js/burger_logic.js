// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-eat").on("click", function(event) {
      var id = $(this).data("id");
      var newBurger = $(this).data("newburg");
  
      var newBurgerState = {
        eaten: newBurger
      };
  
      // Send the PUT request.
      $.ajax("/api/burger/" + id, {
        type: "PUT",
        data: newBurgerState
      }).then(
        function() {
          console.log("changed burger to", newBurger);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#bn").val().trim(),
        devoured: $("[name=eaten]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".devour-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  