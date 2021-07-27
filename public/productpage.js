// localhost:3000/productpage/923i0394iq203

const url = window.location.href.split("/")
console.log(url);
const id = url[url.length - 1];
console.log(id);

$.get("/products/" + id).then(function(data){
    $(".title").text(data.name);
    $(".product-image").attr("src", "../" + data.imagepath);
    data.reviews.forEach(e => {
        const reviewContainer = $("<div class='review-container'></div>")
        reviewContainer.append($("<h2 class='review-title'>" + e.title + "</h2>"));
        reviewContainer.append($("<p class='review-body'>" + e.body + "</p>"))
    })
})
