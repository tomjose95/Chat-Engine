$(document).ready(function () {
  $("#userSearch").on("keyup", function (e) {
    console.log("e :>> ", e);
    var value = $(this).val().toLowerCase();
    $(".chat_friend_list").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
