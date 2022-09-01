
var overlay = document.getElementById('overlayUno')
var popup = document.getElementById('popupUno');
var btnCerrarPopup = document.getElementById('btn-cerrar-popup-uno');
var elemUno = document.getElementsByClassName("btnpop");

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

for (var i = 0; i < elemUno.length; i++) {
    (function () {
        elemUno[i].addEventListener("click", function() {
			overlay.classList.add('active'),
			popup.classList.add('active');
		}, false);
    }()); 
}

function cambiarboton(nombre_cat){
    var i=document.getElementById("nombrecat-actual").value = nombre_cat;
}

// POP UP - SUB CATEGORIA

var overlayDos = document.getElementById('overlayDos')
var popupDos = document.getElementById('popupDos');
var btnCerrarPopupDos = document.getElementById('btn-cerrar-popup-dos');
var elemDos = document.getElementsByClassName("btnpop-dos");

btnCerrarPopupDos.addEventListener('click', function(e){
	e.preventDefault();
	overlayDos.classList.remove('active');
	popupDos.classList.remove('active');
});

for (var i = 0; i < elemDos.length; i++) {
    (function () {
       
        elemDos[i].addEventListener("click", function() {
			overlayDos.classList.add('active'),
			popupDos.classList.add('active');
		}, false);
    }()); 
}

function cambiarbotonDos(nombre_cat,nombre_subcat){
    document.getElementById("nombrecat-actual-dos").value = nombre_cat;
	document.getElementById("nombresubcat-actual-dos").value = nombre_subcat;
}