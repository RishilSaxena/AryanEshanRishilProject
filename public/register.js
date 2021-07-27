$("#submit").on("click", function(e){
    e.preventDefault();
    if($("#password").val() == $("#confirm-password").val()){
        $.post("/adduser", {username: $("#username").val(), password: $("#password").val(), cart: []});
        window.location.href = "/login";
    } 
})

function checkPassword(){
    if($("#password").val() == $("#confirm-password").val() && $("#username").val() != ""){
        $("#submit").removeAttr("disabled");
    } else{
        $("#submit").attr("disabled", "disabled");
    }
}