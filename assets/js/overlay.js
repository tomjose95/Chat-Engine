$(document).ready(function () {
  $(".chat_current_user").click((e) => {
    $(".overlay").show();
    $(".overlay_main").slideDown();
  });
  $(".overlay").click((e) => {
    $(".overlay").hide();
    $(".overlay_main").slideUp();
  });

  $(".overlay_main").click((e) => {
    e.stopPropagation();
  });
});
