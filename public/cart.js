if (document.cookie) {
  $.get("/getcart").then(function (data) {
    data.forEach((e) => {});
  });
}
 else {
  alert("You must be logged in to access cart")
  let __dirname = "https://youtu.be/"
  window.location.href = __dirname + "dQw4w9WgXcQ";
}