const btnBuscar = document.getElementById('btnBuscar');
const inputArtista = document.getElementById('inputArtista');
const inputTitulo = document.getElementById('inputTitulo');
const inputLanzamiento = document.getElementById('lanzamiento');

console.log(btnBuscar);

btnBuscar.addEventListener("click" ,  () =>{

    let artist = inputArtista.value;
    let title = inputTitulo.value;
    let launch = inputLanzamiento.value;
    let urlInputs = "";

    if (artist == '' && title == '' && launch == '') {
        urlInputs += (urlData ? "/" : "");
        return
    } // termina porque no se ingreso nada en ningun input

    if (artist) {
        urlInputs += (urlInputs ? "&" : "" ) + `artist=${artist}`;
    }
    if (title) {
        urlInputs += (urlInputs ? "&" : "" ) + `title=${title}`;
    }
    if (launch) {
        urlInputs += (urlInputs ? "&" : "" ) + `launch=${artist}`;
    }

    console.log(urlInputs);

    window.location.href = `/grilla?${urlInputs}`// URL que se envia

});