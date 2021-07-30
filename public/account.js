$("#update-user-btn").on("click", function () {
  $(".update-user .inps").append(`<div class="txt_field user-confirm">
    <input type="password" required id="confirm-pass" />
    <label>Confirm Password</label>
  </div>`);
  $("#update-user-btn").attr("id", "confirm-user-btn");
});
$("#confirm-user-btn").on("click", function () {
  const password = $("#confirm-pass").val();
  const username = $("#new-username").val();
  if (password != "" && username != "") {
    const data = {
      updatedUsername: username,
      password: password,
    };
    $.post("/updateusername", data);
  } else {
    alert("Invalid Inputs");
  }
});

$(document).on("click", "#update-pass-btn", function () {
  $(".update-pass .inps").append(`<div class="txt_field pass-confirm">
<input type="password" required id="confirm-new-pass"/>
<label>Confirm New Password</label>
</div>`);
  $("#update-pass-btn").attr("id", "confirm-update-pass-btn");
});
$(document).on("click", "#confirm-update-pass-btn" ,function () {
  $(".update-pass .inps").append(`<div class="txt_field pass-confirm">
    <input type="password" required id="old-pass" />
    <label>Confirm Old Password</label>
  </div>`);
  $("#confirm-update-pass-btn").attr("id", "confirm-old-pass-btn");
});
$("#confirm-old-pass-btn").on("click", function () {
  const newPass = $("#new-pass").val();
  const oldPass = $("#old-pass").val();
  if (newpass == $("#confirm-new-pass").val()) {
    if (newPass != "" && oldPass != "") {
      const data = {
        newPassword: newPass,
        oldPassword: oldPass,
      };
      $.post("/updatepassword", data);
    } else {
      alert("Invalid Inputs");
    }
  } else {
    alert("Invalid Inputs");
  }
});
$(".fa-user-edit").on("click", function () {
  $(".form-cont").empty();
  $(".form-cont").append(`<h1>Edit Your Profile</h1>
    <section class="update-user">
      <div class="inps">
        <div class="txt_field">
          <input type="text" required id="new-username"/>
          <label>New Username</label>
        </div>
      </div>
      <!-- <div class="txt_field user-confirm">
        <input type="password" required />
        <label>Confirm Password</label>
      </div> -->
      <input type="submit" id="update-user-btn" value="Update Username" />
    </section>
    <section class="update-pass">
      <div class="inps">
        <div class="txt_field">
          <input type="password" required id="new-pass" />
          <label>New Password</label>
        </div>
        <!-- <div class="txt_field pass-confirm">
          <input type="password" required />
          <label>Confirm New Password</label>
        </div> -->
        <!-- <div class="txt_field pass-confirm">
          <input type="password" required />
          <label>Confirm Old Password</label>
        </div> -->
      </div>
      <input type="submit" value="Update Password"  id="update-pass-btn"/>
    </section><div class="signup_link"></div>`);
});
$(".fa-user-times").on("click", function () {
  $(".form-cont").empty();
  $(".form-cont").append(`<h1>Advanced Settings</h1>
    <div class="area">
      <button id="del">Delete Account Forever</button>
    </div>`);
});
$(document).on("click", "#del", function () {
  $(".area").prepend(`<div class="txt_field">
    <input type="text" required id="confirm-pass-del" />
    <label>Confirm Password to Delete</label>
  </div>`);
  $("#del").attr("id", "del-confirm")
});
$(document).on("click", "#del-confirm", function () {
    if (confirm("Are you sure you want to delete...")) {
        const delPass = $("#confirm-pass-del").val()
        $.post("/deleteaccount", {password: delPass})
    }
})
