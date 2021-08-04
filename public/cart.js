if (document.cookie) {
  load();
} else {
  alert("You must be logged in to access cart");
  window.location.href = "/login";
}
$(document).on("click", ".remove", function () {
  $.post("/removefromcart", { productid: $(this).attr("data-id") }).then(load);
});
function load() {
  $(".container3").empty();
  $(".container3").append(
    `<h1>Your Cart <span class="subtotal-holder">Subtotal: <span class="subtotal">$0.00</span></span></h1>`
  );

  $.get("/getcart").then(function (data) {
    if (data.length == 0) {
      $(".container3").append(`<div style='text-align:center;' class='empty'>
      <img src='./assets/images/empty.png'/>
      <h2>Your Cart is Empty!</h2>
      <h5>Looks Like You Haven't Added Anything to Your Cart Yet</h5>
      <div class='shop'>Shop Now</div>
      `)
    } else {
      let sub = 0;
      data.forEach((e) => {
        sub += e.price;
        const price = e.price.toString().split(".");
        $(".container3").append(`<div class="cart-item">
        <img src="${e.imagepath}" alt="" />
        <div class="text">
        <h2 class="title">${e.name}<span class="color"> - ${e.color}</span></h2>
        <h3>$${price[0]}<small>${price[1]}</small></h3>
        </div>
        <div class="remove" data-id='${e._id}'>Remove From Cart</div>
        </div> `);
      });
      $(".subtotal").text("$" + sub.toFixed(2));
      $(".container3").append(`<div class='checkout'>Checkout</div>`);
    }
  });
  $(document).on("click", ".checkout", function () {
    window.location.href = "/checkout";
  });
  $(document).on("click", ".shop", function () {
    window.location.href = "/shop/all";
  });
}
