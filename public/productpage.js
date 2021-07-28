// localhost:3000/productpage/923i0394iq203

const url = window.location.href.split("/");
console.log(url);
const regex = /([^A-z0-9])/g
let id = url[url.length - 1];
id = id.replace(regex, "");
console.log(id);
if (!document.cookie) {
  $(".add-to-cart").attr("disabled", "disabled")
  $(".add-to-cart").text("Login to add to cart!")
}
$.get("/products/" + id).then(function (data) {
  const price = data.price.toString().split(".")
  $(".title").text(data.name);
  $(".price").text("$" + price[0]).append("<small>" + price[1] + "</small>");
  $(".product-image").attr("src", "../" + data.imagepath);
  data.reviews.forEach((e) => {
    const reviewContainer = $(".current-reviews");
    let starArr = [];
    for (let i = 0; i < e.star; i++) {
      starArr.push("<i class='fas fa-star' style='color: #fd4'></i>");
    }
    while (starArr.length < 5) {
      starArr.push("<i class='fas fa-star'></i>");
    }
    reviewContainer.append(
      $("<h2 class='review-user'>" + e.username + "</h2>")
    );
    const starContainer = $("<h2 class='star'></h2>")
    reviewContainer.append(starContainer);
    reviewContainer.append($("<h2 class='review-title'>" + e.title + "</h2>"));
    reviewContainer.append($("<p class='review-body'>" + e.body + "</p>"));
    starArr.forEach((star) => {
     starContainer.append(star);
    });
  });
});

$(".fa-star").on("click", function () {
  $("form").addClass("active");
});
$(".post-review").on("click", function () {
  let star = 0;
  if ($("#rate-5").is(":checked")) {
    star = 5;
  } else if ($("#rate-4").is(":checked")) {
    star = 4;
  } else if ($("#rate-3").is(":checked")) {
    star = 3;
  } else if ($("#rate-2").is(":checked")) {
    star = 2;
  } else if ($("#rate-1").is(":checked")) {
    star = 1;
  }
  const review = {
    star: star,
    title: $("#review-title-input").val(),
    body: $("#review-body-input").val(),
    productid: id,
  };
  $.post("/newreview", review).then(function () {
    $.get("/products/" + id).then(function (data) {
        $(".current-reviews").empty()
        data.reviews.forEach((e) => {
          const reviewContainer = $(".current-reviews");
          let starArr = [];
          for (let i = 0; i < e.star; i++) {
            starArr.push("<i class='fas fa-star' style='color: #fd4'></i>");
          }
          while (starArr.length < 5) {
            starArr.push("<i class='fas fa-star'></i>");
          }
          reviewContainer.append(
            $("<h2 class='review-user'>" + e.username + "</h2>")
          );
          const starContainer = $("<h2 class='star'></h2>")
          reviewContainer.append(starContainer);
          reviewContainer.append($("<h2 class='review-title'>" + e.title + "</h2>"));
          reviewContainer.append($("<p class='review-body'>" + e.body + "</p>"));
          starArr.forEach((star) => {
            starContainer.append(star);
          });
        });
    });
  });
});

