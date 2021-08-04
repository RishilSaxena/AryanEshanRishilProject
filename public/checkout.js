function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive 1 - 10 will output 1-9
}

if (document.cookie) {
  $.get("/getcart").then((data) => {
    if (!data.length) {
      alert("Nothing to checkout");
      window.location.href = "/shop/all";
    } else {
      let randomNum = getRandomInt(
        100000000000000000000000,
        1000000000000000000000000
      );
      let sub = 0;
      data.forEach((e) => {
        sub += e.price;
        $(".items").append(`<div class="item">
          <span class="item-title">${e.name} - ${e.color}</span
          ><span class="item-price">${e.price}</span>
        </div>
        <div>---------------------------------------------</div>`);
      });
      const date = new Date().toString();
      $(".time").text("Date: " + date);
      $(".sub .price").text(sub.toFixed(2));
      $(".tax .price").text((sub * 0.05).toFixed(2));
      $(".total .price").text((sub * 1.05).toFixed(2));
      $(".item-num").text("Total Number of Items Sold: " + data.length);
      const image = `<img
    src="https://www.cognex.com/api/Sitecore/Barcode/Get?data=${randomNum}&code=BCL_CODE128&width=600&imageType=PNG&foreColor=%23000000&backColor=%23FFFFFF&rotation=RotateNoneFlipNone"
    width="600"
    class="barcode"
    alt="barcode image"/>`;
      $(".bar-container").append(image);
    }
  });
} else {
  alert("You Must be logged in to checkout");
  window.location.href = "/login";
}
