var counter = 1;
setInterval(function () {
    document.getElementById('i' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 4000);


