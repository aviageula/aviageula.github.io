var workerFile;

function getCalculate() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (workerFile) == "undefined") {
            workerFile = new Worker("calculate worker.js");
        }
        workerFile.onmessage = function (e) {
            $("input").prop('disabled', false);//make the inputs not disabled
            $("audio").trigger("pause");//pause audio
            $("audio").prop("currentTime", 0);//get audio to start time
            $(".loadingImage").addClass("classForDisplayNone");
            $("#spanForPriceOfPlan").text(parseInt(e.data) + "$");
            $("#totalPrice").text(parseInt(e.data) + parseInt(localStorage.getItem("carPrise").replace('$','')) + "$");
            switchMessagesDivs($(".divMessageBox"), $(".lestStepBox"));
        };
    } else {
        $("#divMessageBox").html("Sorry! No Web Worker support.");
    }
}
/*if the browser support worker - hide the loading message, put the data of the worker in the span of the price and
run the swictch function, if not- say it to the client*/

function calcRoute(callbackSuccess) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var start = $(".startPointInput").val();
    var end = $(".endPointInput").val();
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var answer = (response.routes[0].legs[0].distance.value) / 1000;
            callbackSuccess(answer);
        }else{
            $(".divForValidationOfCity").removeClass("classForDisplayNone");
            $("input").prop('disabled', false);//make the inputs not disabled
            $("audio").trigger("pause");//pause audio
            $("audio").prop("currentTime", 0);//get audio to start time
            $(".loadingImage").addClass("classForDisplayNone");//make the image to display none
            $("[name='startPoint']").select();
        }
    });
}
/*if the status is ok - get the distance with google maps,and giv him in parameter to the callback function,
because if we dont do it with callback, the answer will be undefined when the rest of the code will run.
else - tell to the user that he neet to enter city name and cancel all the actions for the calculate button*/

function putCarPriseAndKmInTheSpans(distance) {
    $("#spanForPriceOfCar").text(localStorage.getItem("carPrise"));
    $("#spanForPlanLength").text(distance);
}
/*take the prise of the car and put him in the span that belong him*/

function switchMessagesDivs(divToShow,divToHide) {
    $(divToShow).removeClass("classForDisplayNone");
    $(divToHide).addClass("classForDisplayNone");

}
/*switch the display between two divs*/

function priceCalculateValidation() {
    if ($("[name='startPoint']").val().trim().length < 1) {
        $("[name='startPoint']").next().removeClass("classForDisplayNone");
        $("[name='startPoint']").focus();
    } else if ($("[name='endPoint']").val().trim().length < 1) {
        $("[name='endPoint']").next().removeClass("classForDisplayNone");
        $("[name='endPoint']").focus();
    } else {
        var theGeer = localStorage.getItem("carGeer");//get the car geer from local storage
        $("audio").trigger("play");//play audio
        $(".loadingImage").removeClass("classForDisplayNone");//show loading message
        $("input").prop('disabled', true);//make the inputs disabled
        setTimeout(getCalculate, 4000);//do it after 4 second  because  i want the loading message to be display
        calcRoute(function (theKm) {
            setTimeout(function () { workerFile.postMessage([theKm, theGeer]) }, 5000);//send the geer and the km to the worker( after 5 second)
            setTimeout(function () { putCarPriseAndKmInTheSpans(theKm); }, 5000);//change the km and car price after 5 second
        });
        /*run getCalculate and send the answer to the worker and the dom*/
    }
}
/*make sure that all the fildes are fill before make the calaulate*/

$(document).ready(function () {

    $("[value='calculate']").on("click", function () {
        priceCalculateValidation();     
    });

    $(".selectsDiv input").on("keyup", function () {
        $(this).next().addClass("classForDisplayNone");
        $(".divForValidationOfCity").addClass("classForDisplayNone");
    });
    /*make the validation message disappear*/

    $(".continueRentalButton").on("click", function () {
        alert("the car was successfully ordered");
        location.assign("index.html");
    });

    $(".cancelRentalButton").on("click", function () {
        location.assign("index.html");
    });
    
});