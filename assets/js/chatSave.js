$(document).ready(function () {
  let form = document.getElementById("chat_box_text");
  $("#chat_box_text").submit(function (e) {
    console.log("chatsave");

    e.preventDefault();
    const formData = new FormData(form);

    submitFormData(formData);
  });
  function submitFormData(formData) {
    fetch("/chatsave", {
      method: "POST",
      body: formData,
    });
  }
});
