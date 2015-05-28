onmessage = function (e) {
    var numberOfKm = e.data[0];
    var carGeer = e.data[1];
    var priseForThisKm;
    if (numberOfKm <= 90) {
        priseForThisKm = numberOfKm * 1.2;
    } else {
        priseForThisKm = numberOfKm * 0.9;
    }
    if (carGeer == "shift") {
        priseForThisKm = priseForThisKm - (priseForThisKm / 10);
    }
    postMessage(priseForThisKm);
}