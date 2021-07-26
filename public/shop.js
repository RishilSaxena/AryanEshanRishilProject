
$(".type h3").on("click", function() {
  $(".type .dropdown").toggleClass("active")
})
$(".price h3").on("click", function() {
  $(".price .dropdown").toggleClass("active")
})

const complementary = {
  green: ["rgb(0,255,114)", "#00b752"],
  black: ["#555", "#222"],
  white: ["#555", "#ddd"]
}
$.get("/products").then(function (data) {
  $(".tile-holder").empty();
  data.forEach((data) => {
    let color = [];
    if (data.color == "green") {
      color = complementary.green
    } else if (data.color == "black") {
      color = complementary.black
    } else if (data.color == "white") {
      color = complementary.white
    }
    $(".tile-holder").append(`<div class="card" style="background: ${color[1]};">
    <div class="before" style="background: ${color[0]};"></div>
    <div class="img-box">
        <img src="${data.imagepath}">
    </div>
    <div class="content-box">
        <h3>${data.name}</h3>
        <h2 class="price">$${data.price}</h2>
        <a href="/product/${data._id}" class="buy" style="background: ${color[0]};">Buy Now</a>
    </div>
    <div class="anchor"></div>
    </div>`);
  });
});






$(".submit").on("click", function (e) {
    $(".tile-holder").empty();
  e.preventDefault();
  const category = $(
    "input[name=clothes-filter]:checked",
    "#filter-form"
  ).val();
  const price = $("select").find(":selected").attr("value");
  let greaterThanPrice = parseFloat(price.slice(0, price.indexOf("-")));
  let lessThanPrice = parseFloat(price.slice(price.indexOf("-") + 1));
  console.log(category);
  if(price == "all"){
    greaterThanPrice = 0;
    lessThanPrice = 100;
  }

  if (category == "all") {
    $.get("/products").then(function (data) {
      $(".tile-holder").empty();
      data.forEach((e) => {
        if (e.price > greaterThanPrice && e.price < lessThanPrice) {
            console.log(e);
          const tile = $("<div class='tile'></div>");
          const title = $("<h1>" + e.name + "</h1>");
          const image = $("<img src='" + e.imagepath + "'>");
          tile.append(title);
          tile.append(image);
          $(".tile-holder").append(tile);
        }
      });
    });
  } else{
    $.get("/productsByCategory/" + category).then(function (data) {
        $(".tile-holder").empty();
        data.forEach((e) => {
            console.log(e);
          if (e.price > greaterThanPrice && e.price < lessThanPrice) {
            const tile = $("<div class='tile'></div>");
            const title = $("<h1>" + e.name + "</h1>");
            const image = $("<img src='" + e.imagepath + "'>");
            tile.append(title);
            tile.append(image);
            $(".tile-holder").append(tile);
          }
        });
      });
  }
});
