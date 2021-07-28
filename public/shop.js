
const url = window.location.href.split("/");
//ravaerv / shop / all
console.log(url);
const regex = /([^A-z0-9])/g
let id = url[url.length - 1];
id = id.replace(regex, "");
console.log(id);

if (id == 'all') {
  $(".type .all").addClass("active")
  submit()
} else if (id == 'accessories') {
  $(".type .accessories").addClass("active")
  submit()
} else if (id == 'tshirts') {
  $(".type .tshirt").addClass("active")
  submit()
} else if (id == 'hoodies') {
  $(".type .hoodies").addClass("active")
  submit()
}
submit()
$(".type h3").on("click", function () {
  $(".type h3 i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  $(".type .dropdown").toggleClass("active");
});

$(".price h3").on("click", function () {
  $(".price h3 i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  $(".price .dropdown").toggleClass("active");
});
$(".type .dropdown ul li.option").on("click", function () {
  if ($(this).hasClass("all")) {
    $(".price .dropdown ul li.option.active").removeClass("active");
    $(".type .dropdown ul li.option.active").removeClass("active");
    $(".all").addClass("active");
  } else if (!$(this).hasClass("active")) {
    //if this isnt already active we will change it to be active
    $(".type .dropdown ul li.option.active").removeClass("active");
    $(this).addClass("active");
  }
});
$(".price .dropdown ul li.option").on("click", function () {
  if (!$(this).hasClass("active")) {
    //if this isnt already active we will change it to be active
    $(".price .dropdown ul li.option.active").removeClass("active");
    $(this).addClass("active");
  }
});
$(".dropdown ul li.option").on("click", function () {
  submit();
});
const complementary = {
  green: ["rgb(0,255,114)", "#00b752"],
  black: ["#555", "#222"],
  white: ["#555", "#ddd"],
};
$.get("/products").then(function (data) {
  $(".tile-holder").empty();
  data.forEach((e) => {
    appendData(e);
  });
});

function submit() {
  $(".no-data").empty()
  const category = $(".type .dropdown ul li.option.active")
    .text()
    .toLowerCase();
  let price = $(".price .dropdown ul li.option.active").text();
  price = price.replace(/([$])/g, "");
  let greaterThanPrice = parseFloat(price.slice(0, price.indexOf("-")));
  let lessThanPrice = parseFloat(price.slice(price.indexOf("-") + 1));
  if (price == "All") {
    greaterThanPrice = 0;
    lessThanPrice = 100;
  }
  if (category == "all") {
    $.get("/products").then(function (data) {
      $(".tile-holder").empty();
      //append data
      data.forEach((e) => {
        if (e.price > greaterThanPrice && e.price < lessThanPrice) {
          //append data{
            appendData(e);
        }
      });
    });
  } else {
    $.get("/productsByCategory/" + category).then(function (data) {
      $(".tile-holder").empty();
      let count = 0;
      data.forEach((e) => {
        if (e.price > greaterThanPrice && e.price < lessThanPrice) {
          //append data
          appendData(e);
          count++;
        }
      });
      if (count == 0) {
        $(".no-data").empty()
        $(".no-data").append(`<h1>We found no data!</h1>
        <h2>Maybe try updating your filters</h2>
        <h1>Popular Products:</h1>`)
        $.get("/productsByCategory/tshirt").then(function (data2) {
          $(".tile-holder").empty();
          //append data
          data2.forEach((e2) => {
              appendData(e2);
          });
        });
      }
    });
  }
}
function appendData(data) {
  let color = [];
  if (data.color == "green") {
    color = complementary.green;
  } else if (data.color == "black") {
    color = complementary.black;
  } else if (data.color == "white") {
    color = complementary.white;
  }
  $(".tile-holder").append(`<div class="card" style="background: ${color[1]};">
    <div class="before" style="background: ${color[0]};"></div>
    <div class="img-box">
        <img src="../${data.imagepath}">
    </div>
    <div class="content-box">
        <h3>${data.name}</h3>
        <h2 class="price">$${data.price}</h2>
        <a href="/productpage/${data._id}" class="buy" style="background: ${color[0]};">Buy Now</a>
    </div>
    <div class="anchor"></div>
    </div>`);
}
// .././assets