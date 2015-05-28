var newUser = {};
/*global object for new user*/

function registerValidation() {
    if ($("[name='firstName']").val().trim().length < 1) {
        $("[name='firstName']").next().removeClass("classForDisplayNone");
        $("[name='firstName']").focus();
    } else if ($("[name='lastName']").val().trim().length < 1) {
        $("[name='lastName']").next().removeClass("classForDisplayNone");
        $("[name='lastName']").focus();
    } else if (($("[name='email']").val().trim().indexOf("@") < 3) || ($("[name='email']").val().trim().indexOf(".") < 1)) {
        $("[name='email']").next().removeClass("classForDisplayNone");
        $("[name='email']").select();
    } else if (localStorage.getItem($("[name='email']").val()) != null) {
        $("[name='email']").next().addClass("classForDisplayNone");
        $("[name='email']").next().next().removeClass("classForDisplayNone");
        $("[name='email']").select();
    } else if ($("[name='dateOfBirth']").val().trim().length < 1) {
        $("[name='dateOfBirth']").next().removeClass("classForDisplayNone");
        $("[name='dateOfBirth']").focus();
    } else if (($("[name='mobilePhone']").val().trim().length < 4) && ($("[name='homePhone']").val().trim().length < 4)) {
        $("[name='mobilePhone']").next().removeClass("classForDisplayNone");
        $("[name='mobilePhone']").select();
    } else if ($("[name='licenseNumber']").val().trim().length < 5) {
        $("[name='licenseNumber']").next().removeClass("classForDisplayNone");
        $("[name='licenseNumber']").select();
    } else {
        makeUserObject();
        saveObjectToLocalStorage(newUser.email, JSON.stringify(newUser));
        makeTheRegisterToLogInUser($("[name='firstName']").val());
        resetAllRegisterFildes();
    }
}
/*make sure that all fileds are validate*/

function getOnlyNumbers(onlyNumbersInput) {
    $(onlyNumbersInput).on("keypress", function (e) {
        var whichKey = e.charCode;
        if (((whichKey > 57) || (whichKey < 48)) && (whichKey != 13)) {
            e.preventDefault();
        }
    });
}
/*the input filde get only numbers*/

var User = function (firstName, lastName, email, dateOfBirth, mobilePhone, homePhone, licenseNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
    this.mobilePhone = mobilePhone;
    this.homePhone = homePhone;
    this.licenseNumber = licenseNumber;
};
/*make a User object*/

function makeUserObject() {
    var newFirstName = $("[name='firstName']").val();
    var newLastName = $("[name='lastName']").val();
    var newEmail = $("[name='email']").val();
    var newDateOfBirth = $("[name='dateOfBirth']").val();
    var newMobilePhone = $("[name='mobilePhone']").val();
    var newHomePhone = $("[name='homePhone']").val();
    var newLicenseNumber = $("[name='licenseNumber']").val();
    newUser = new User(newFirstName, newLastName, newEmail, newDateOfBirth, newMobilePhone, newHomePhone, newLicenseNumber);
}
/*take all the inputs and save them in object*/

function saveObjectToLocalStorage(itemName, valueToSave) {
    if (typeof (Storage) != "undefined") {
        localStorage.setItem(itemName, valueToSave);
    } else {
        alert("sorry,your browser does not support Web Storage...");
    }
}
/*if the user browser support local storage - save the object to local storage, if not - tell it to the user*/

function makeTheRegisterToLogInUser(firstName) {
    localStorage.setItem("firstName", firstName);
    location.assign("index.html");
}
/*save the first name in local storage and then change the location to home page*/


function resetAllRegisterFildes() {
    $("[name='firstName']").val("");
    $("[name='lastName']").val("");
    $("[name='email']").val("");
    $("[name='dateOfBirth']").val("");
    $("[name='mobilePhone']").val("");
    $("[name='homePhone']").val("");
    $("[name='licenseNumber']").val("");
}
/*make reset to all the registerFildes*/

function toLogIn() {
    if (localStorage.getItem($("[name='userName(email)']").val()) != null) {
        var userFromLocalStorage = JSON.parse(localStorage.getItem($("[name='userName(email)']").val()));
        localStorage.setItem("firstName", userFromLocalStorage.firstName);
        location.assign("index.html");
        $("[name='userName(email)']").val("");
    } else {
        $("[name='userName(email)']").next().removeClass("classForDisplayNone");
        $("[name='userName(email)']").select();
    }
}
/*if the email is a exist user - go to home page and say to the user that he is connected,
else - say to the user that the emaik is not valid*/

function toLogOut(logOutButton) {
    $(logOutButton).text("log in");
    localStorage.removeItem("firstName");
    location.replace("index.html");
}
/*change the text to log in, delete the item first name and go to the home page*/

$(document).ready(function () {

    getOnlyNumbers($("[name='mobilePhone']"));
    getOnlyNumbers($("[name='homePhone']"));
    getOnlyNumbers($("[name='licenseNumber']"));
    /*make that the inputs for numbers will get only numbers*/

    $(".divForInputsRegister input").on("keyup", function () {
        $(this).nextAll(".divValidationClass").addClass("classForDisplayNone");
    });
    /*when the user start typing - make the validation disappear*/

    $(".divForLogInInput input").on("keyup", function () {
        $(this).next().addClass("classForDisplayNone");
    });
    /*when the user start typing - make the validation disappear*/

    $("[value='Register']").on("click", function (e) {
        e.preventDefault();
        registerValidation();
    });
    /*prevent the submit and make validation*/

    $("[value='Sing in']").on("click", function (e) {
        e.preventDefault();
        toLogIn();
    });
    /*prevent the submit and run toLogIn*/

    $(".divLog a").on("click", function (e) {
        if ($(this).text() == "log out") {
            e.preventDefault();
            toLogOut(".divLog a");
        }
    });
    /*if the text is log out - dont change the location and make the user log out*/

});

/*ליצור אובייקט עם כל השדות שהמשתמש החדש הכניס כפרופטיז.
לשמור את האובייקט בלוקל סטורג' כאשר השם שלו יהיה האימייל של המשתמש.
ככה כאשר ארצה לבדוק אם אימייל כל שהוא תפוס אבדוק בלוקל סטורג' אם יש אייטם
בשם של האימייל הזה
ואם יש אז אגיד למשתמש שהאימייל תפוס כבר.
*/