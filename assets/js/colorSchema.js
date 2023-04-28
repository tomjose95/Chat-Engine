$(document).ready(function () {
  $("#moon").click((e) => {
    $("#moon").hide();
    $("#sun").show();
    $(".chat").css("background-color", " #091827");
  });
  $("#sun").click((e) => {
    $("#sun").hide();
    $("#moon").show();
  });
});
