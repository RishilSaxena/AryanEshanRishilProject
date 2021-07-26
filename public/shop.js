$.get("/products").then(function (data) {
  $(".tile-holder").empty();
  data.forEach((e) => {
    const tile = $("<div class='tile'></div>");
    const title = $("<h1>" + e.name + "</h1>");
    const image = $("<img src='" + e.imagepath + "'>");
    tile.append(title);
    tile.append(image);
    $(".tile-holder").append(tile);
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
