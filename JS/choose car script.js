var Car = function (carNumber, company, model, year, geer, prise) {
    this.carNumber = carNumber;
    this.company = company;
    this.model = model;
    this.year = year;
    this.geer = geer;
    this.prise = prise;
}
/*Structure of car object*/

var Mazda6 = new Car("19-333-66", "mazda", "mazda6", "2014", "auto", "30$");
var Chevrolet_Savana = new Car("29-333-66", "chevrolet", "savana", "2014", "auto", "40$");
var Volkswagen_Passat = new Car("39-333-66", "Volkswagen", "passat", "2014", "shift", "30$");
var Toyota_Corolla = new Car("49-333-66", "toyota", "corolla", "2014", "auto", "30$");
var Volkswagen_Sicrocco = new Car("59-333-66", "Volkswagen", "scirocco", "2014", "shift", "40$");
var Volkswagen_Golf = new Car("69-333-66", "volkswagen", "golf", "2014", "auto", "30$");
var Chevrolet_Spark = new Car("79-333-66", "chevrolet", "Spark", "2014", "auto", "20$");
var Toyota_Hilux = new Car("89-333-66", "toyota", "Hilux", "2014", "shift", "40$");
var Chevrolet_Silverado = new Car("99-333-66", "chevrolet", "silverado", "2014", "shift", "30$");
var Mazda_CX = new Car("09-333-66", "mazda", "CX-5", "2014", "auto", "40$");
/*all cars object*/

var carsArray = [Mazda6, Chevrolet_Savana, Volkswagen_Passat, Toyota_Corolla, Volkswagen_Sicrocco,
    Volkswagen_Golf, Chevrolet_Spark, Toyota_Hilux, Chevrolet_Silverado, Mazda_CX];
/*array of cars to put in the local storage*/

function storeTheArrayInLocalStorage() {
    if (localStorage.getItem("carsArrayInLocalStorage") == null) {
        localStorage.setItem("carsArrayInLocalStorage", JSON.stringify(carsArray));
    }
}
/*check if the array is in the local storage,if not - store it there*/

var counter = 2;
/*global variable to switch on the images and cars*/

function replaceImageAndHighlightCurrentCar() {
    $(".divForImages > div").css("display", "none");
    $("#divImage" + counter).fadeIn(800);
    $(".carsClass").removeClass("classForCurrentCar");
    $("#" + counter).addClass("classForCurrentCar");
    counter++;
    if (counter > 10) {
        counter = 1;
    }
}
/*make all the images to display none and make the current one fade in(כמו שאסף רוצה!!),
and also highlight the current car*/

function saveThePriseOfTheCar(currentId) {
    var theDivWithThePrise = $(".divForImages").children(currentId).children().children()[4];
    var carPrise = $(theDivWithThePrise).find(":contains('$')").text();
    var theDivWithTheGeer = $(".divForImages").children(currentId).children().children()[3];
    var carGeer = $(theDivWithTheGeer).children(":contains('geer')").next().text();
    localStorage.setItem("carPrise", carPrise);
    localStorage.setItem("carGeer", carGeer);
}
/*save the price and the geer of the car and store they at local storage*/

$(document).ready(function () {

    storeTheArrayInLocalStorage();

    var timer = setInterval(replaceImageAndHighlightCurrentCar, 3000);
    /*switch cars every 3.2 second*/

    $("[title='click to choose this car']").on("click", function () {
        clearInterval(timer);
        var numberIdForDisplayTheCorrectImage = $(this).parent().attr("id");
        var theChoosenCar = $(this).text();
        $(".carsClass").removeClass("classForCurrentCar");
        $("#" + numberIdForDisplayTheCorrectImage).addClass("classForCurrentCar");
        $(".divForImages > div").css("display", "none");
        $("#divImage" + numberIdForDisplayTheCorrectImage).fadeIn(800);
        $(".divForAskIfItsOkay span").text(" " + theChoosenCar + " ");
        $(".divForAskIfItsOkay,.continueButton,.cancelButton").removeClass("allDivImagesClass");
        saveThePriseOfTheCar("#divImage" + numberIdForDisplayTheCorrectImage);
    });
    /*stop the switch of the images, highlight the choosen car, display the image of the choosen car,
    put the name of the choosen car in the span that ask if the client is sure, display the
    question and the buttons and execute saveThePriseOfTheCar function.*/

    $("[value='continue']").on("click", function () {
        location.assign("price calculate.html");
    });
    /*go to calculate price*/

    $("[value='cancel']").on("click", function () {
        $(".divForAskIfItsOkay,.continueButton,.cancelButton").addClass("allDivImagesClass");
        timer = setInterval(replaceImageAndHighlightCurrentCar, 3000);
    });
    /*make the question and the buttons disappear and continue the switch of the images*/

});