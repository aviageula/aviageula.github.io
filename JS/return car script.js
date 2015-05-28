function returnCarValidation() {
    if ($("[name='carNumber']").val().trim().length < 4) {
        $("[name='carNumber']").next().removeClass("classForDisplayNone");
        $("[name='carNumber']").select();
    } else {
        alert("now you just need bring us the car!");
        location.replace("index.html");
    }
}
/*if the car number is invalid - tell it to the user, if not - complete the process*/

$(document).ready(function () {
    getOnlyNumbers($("[name='carNumber']"));
    /*this input will get only numbers*/

    $("[value='return this car']").on("click", function () {
        returnCarValidation();
    });
    /*when submited make the validation*/

    $("[name='carNumber']").on("keyup", function () {
        $(this).next().addClass("classForDisplayNone")
    });
    /*when the user is type - hide the validation message*/
});