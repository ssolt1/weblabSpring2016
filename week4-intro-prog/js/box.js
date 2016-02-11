$( document ).ready(function() {
   var box = $(".box"); // creates reference to cache selector

   box.on("click", function(event) {
      // console.log(this);
      var el = $(this);

      el.animate ({
         "margin-left": 900,  // '-' <= the dash is an illegal character, can use camel case instead like marginLeft
         "background-color": "red"
      }, 3000, 'easeInOutElastic', function() {
         el.css({
            "margin-left": 20,
            "background-color": "white"
         });
      });
      // alert("click");
   });
   // document.getElementById();  <=
   // document.getElementsByClassName();
});

// function getRandom() {
//    Math.random()
// }

// both do the same, wait until jquery is ready then run the function. second  is a shortcut.
// $(function() {
//
// });
