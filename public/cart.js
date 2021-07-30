if (document.cookie) {
  $.get("/getcart").then(function (data) {
    let sub = 0;
    data.forEach((e) => {
        sub += e.price
        const price = e.price.toString().split(".")
        $(".container3").append(`<div class="cart-item">
            <img src="${e.imagepath}" alt="" />
            <div class="text">
              <h2 class="title">${e.name}<span class="color"> - ${e.color}</span></h2>
              <h3>$${price[0]}<small>${price[1]}</small></h3>
            </div>
            <div class="remove">Remove From Cart</div>
          </div> `)
    });
    $(".subtotal").text('$'+sub.toFixed(2))
  });
}
 else {
  alert("You must be logged in to access cart")
  window.location.href = "/login";
}