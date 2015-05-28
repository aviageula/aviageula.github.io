function ifTheUserLogedIn() {
    if (localStorage.getItem("firstName") != null) {
        $(".divUserConnected span").text(localStorage.getItem("firstName"));
        $(".divUserConnected").css("visibility", "visible");
        $(".divLog a").text("log out").attr("title", "click to log out");
    }
}
/*if the item first name is exist in the local storage - say to the user 
that he is a connected and change the log in href to log out*/

function quickPicUpValidation() {
    if (localStorage.getItem("firstName") == null ){
        alert("You need to login first");
    } else if ($("[name='startLocation']").val().trim().length < 1) {
        $("[name='startLocation']").next().removeClass("classForDisplayNone");
        $("[name='startLocation']").focus();
    } else if ($("[name='startDate']").val().trim().length < 1) {
        $("[name='startDate']").next().removeClass("classForDisplayNone");
        $("[name='startDate']").focus();
    } else if ($("[name='endDate']").val().trim().length < 1) {
        $("[name='endDate']").next().removeClass("classForDisplayNone");
        $("[name='endDate']").focus();
    } else {
        location.assign("choose car.html");
    }
}
/*make sure that the user is loged in ans that all the fileds are filleds*/

function chooseCarValidation() {

}

$(document).ready(function () {

    ifTheUserLogedIn();

    $("[value='Find a car']").on("click", function (e) {
        e.preventDefault();
        quickPicUpValidation();
    });
    /*make the validation*/

    $("aside input").on("keyup", function () {
        $(this).next().addClass("classForDisplayNone");
    });
    /*when the user start type - hide the validation message*/

    $("[href='choose car.html']").on("click", function (e) {
        if (localStorage.getItem("firstName") == null) {
            e.preventDefault();
            alert("You need to login first");
        }
    });
    /*if the user dont log in tell him that he need to log in before he choose car*/

});
