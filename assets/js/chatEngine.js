class ChatEngine {
  constructor(chatBoxId, userEmail, userAvatar, userName) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.userAvatar = userAvatar;
    this.userName = userName;
    this.socket = io.connect("http://localhost:5000");

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        user_name: self.userName,
        user_avatar: self.userAvatar,
        chatroom: "chatzip",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined :>>", data);
      });
    });
    $("#send-message").click(function () {
      // console.log("Send message clicked");
      let msg = $("#chat_box_input").val();
      // console.log("msg :>> ", msg);
      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          user_name: self.userName,
          user_avatar: self.userAvatar,
          chatroom: "chatzip",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      // let newMessage = $("<li>");
      let newMessage = $("<div>");
      console.log("newMessage :>> ", newMessage);
      // let messageType = "other-message";

      let messageType = "chat_box_container";
      if (data.user_email == self.userEmail) {
        messageType = "chat_box_mainuser";
        newMessage.append(
          $("<p>", {
            html: data.message,
          })
        );
      }

      // newMessage.append(
      //   $("<span>", {
      //     html: data.message,
      //   })
      // );
      else {
        newMessage.append(
          $(`<img src="${data.user_avatar}" alt="" class="chat_box_chatimg">
        <div class="chat_box_friend">
            <div class="chat_box_chatuser">${data.user_name}</div>
            ${data.message}
        </div>`)
        );
      }

      newMessage.addClass(messageType);

      $("#chat_box_main").append(newMessage);
    });
  }
}
