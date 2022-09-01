// function alerta() {
//     var mensaje;
//     var opcion = confirm("Clicka en Aceptar o Cancelar");
//     if (opcion == true) {
//         mensaje = "Has clickado OK";
//     } else {
//         mensaje = "Has clickado Cancelar";
//     }
//     document.getElementById("ejemplo").innerHTML = mensaje;
// }

var elems = document.getElementsByClassName('confirmation');
    var confirmIt = function (e) {
        if (!confirm('¿Está seguro que desea eliminar la solicitud?')) e.preventDefault();
    };
    for (var i = 0, l = elems.length; i < l; i++) {
        elems[i].addEventListener('click', confirmIt, false);
    }
//onsubmit="return confirmation()"