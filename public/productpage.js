// localhost:3000/productpage/923i0394iq203

const url = window.location.href.split("/");
console.log(url);
const id = url[url.length - 1];
console.log(id);

$.get("/products/" + id).then(function (data) {
  $(".title").text(data.name);
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
    reviewContainer.append($("<h2 class='star'></h2>"));
    reviewContainer.append($("<h2 class='review-title'>" + e.title + "</h2>"));
    reviewContainer.append($("<p class='review-body'>" + e.body + "</p>"));
    starArr.forEach((star) => {
      $(".star").append(star);
    });
  });
});

$(".fa-star").on("click", function () {
  $("form").addClass("active");
});
$(".post").on("click", function () {
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
          reviewContainer.append($("<h2 class='star'></h2>"));
          reviewContainer.append($("<h2 class='review-title'>" + e.title + "</h2>"));
          reviewContainer.append($("<p class='review-body'>" + e.body + "</p>"));
          starArr.forEach((star) => {
            $(".star").append(star);
          });
        });
    });
  });
});
