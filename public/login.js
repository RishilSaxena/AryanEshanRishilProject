$("#submit").on("click", function(e){
    e.preventDefault();
    $.post("/login", {username: $("#username").val(), password: $("#password").val()}).then(function(data){
        if(data == "Successfully logged in."){
            window.location.href = "/"
            console.log("Succesfully logged in.")
        } else{
            alert("Invalid credentials.");
        }
    });

})