$(document).ready(function(){

   var userTable = $("#users tbody"); // $("#users").find("tbody")

   var nameField = $("#name");
   var emailField = $("#email");
   var phoneField = $("#phone");

   var add_btn = $("#add");
   var clearAll_btn = $("#clearAll");

   userTable.on("click", "button.remove", function(){
      var btn = $(this);
      btn.parents("tr").remove();
   });

   add_btn.on("click", function(){

      var name = nameField.val();
      var email = emailField.val();
      var phone = phoneField.val();

      if (email.match(/^.+?\@.+\..+?$/)) {
            emailField.removeClass("invalid");
               // if (phone.match(/^\d{10}/)) {
               //    phoneField.removeClass("invalid");


         addUser({
            name: name,
            email: email,
            phone: phone
         });

      nameField.val("");
      emailField.val("");
      phoneField.val("");
   // }
   } else {
      emailField.addClass("invalid");
      phoneField.addClass("invalid");
   }
   });

   function addUser(user) {

      var userRow = $(
         "<tr>" +
            "<td>" + user.name + "</td>" +
            "<td>" + user.email + "</td>" +
            "<td>" + user.phone + "</td>" +
            "<td><button class='remove btn btn-primary btn-xs'>remove</button></td>" +
         "</tr>");

      userTable.append(userRow);

   };

   clearAll_btn.on('click', function(){
      userTable.empty();
   });

});
