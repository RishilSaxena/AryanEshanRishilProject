if (document.cookie) {
    $(".center").empty()
    $(".center").append(`<div class="center padding">
    <h1>You are already logged in.</h1>
    <input type="submit" id="home" value="Home">
  </div>`)
}

$("#submit").on("click", function(e){
    e.preventDefault();
    $.post("/login", {username: $("#username").val(), password: $("#password").val()}).then(function(data){
        if(data == "Successfully logged in."){
            window.location.href = "/"
            console.log("Succesfully logged in.")
        } else{
            alert(data);
        }
    });

})
$("#home").on("click", function() {
    window.location.href = "/"
})