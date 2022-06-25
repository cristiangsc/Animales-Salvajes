 import Aguila from "./Aguila.js"
 import Leon from "./Leon.js"
 import Lobo from "./Lobo.js"
 import Oso from "./Oso.js"
 import Serpiente from "./Serpiente.js"

 // seleccionar los ID de los elementos que serán agregados con los datos json
 const animalesId = document.getElementById('Animales');
 const animalSelect = document.getElementById("animal");
 const edadId = document.getElementById("edad");
 const comentariosId = document.getElementById("comentarios");
 const previewId = document.getElementById("preview");
 const btnRegistrar = document.getElementById("btnRegistrar");

 let arrayAnimales = [] // array de animales para el modal y la ventana principal
 let newAnimal = {} // objeto que almacenará las instancias de las clases creadas

 btnRegistrar.addEventListener('click', (event) => {
     event.preventDefault() // prevenir la recarga de la pagina
     informacionSeleccionada() // ejecuta funciona que valida la selecciones SELECT y crea la instancias para cada animal
 })

 let listaAnimales = (() => { // función asincronica que recupera los animales desde el archivo json
     const getData = async() => {
         const respuesta = await fetch("animales.json");
         const datos = await respuesta.json();
         return datos;
     };
     return { getData };
 })();

 const informacionSeleccionada = async() => { // función asincrónica que valida la selección del select, busca el animal y sonido  proveniente de la respuesta crea las instaciás según animal 

     const { animales } = await listaAnimales.getData() // recuperamos promesa desestructurando en animales los datos recuperados del json 

     if (animalSelect.value === "Seleccione un animal") {
         alert("Debe seleccionar un nombre de animal.");
     } else if (edadId.value === "Seleccione un rango de años") {
         alert("Debe seleccionar la edad del animal");
     } else if (comentariosId.value == "") {
         alert("Debe seleccionar uno o mas comentarios");
     } else {
         try {
             const imagenAnimal = animales.find((animal) => animal.name === animalSelect.value).imagen;
             const sonidoAnimal = animales.find((animal) => animal.name === animalSelect.value).sonido;

             if (animalSelect.value == "Leon") {
                 newAnimal = new Leon(animalSelect.value, edadId.value, `/Animales-Salvajes/tree/master/assets/imgs/${imagenAnimal}`, comentariosId.value, `/Animales-Salvajes/tree/master/assets/sounds/${sonidoAnimal}`);
             }
             if (animalSelect.value == "Lobo") {
                 newAnimal = new Lobo(animalSelect.value, edadId.value, `/Animales-Salvajes/tree/master/assets/imgs/${imagenAnimal}`, comentariosId.value, `/Animales-Salvajes/tree/master/assets/sounds/${sonidoAnimal}`);
             }
             if (animalSelect.value == "Oso") {
                 newAnimal = new Oso(animalSelect.value, edadId.value, `/Animales-Salvajes/tree/master/assets/imgs/${imagenAnimal}`, comentariosId.value, `/Animales-Salvajes/tree/master/assets/sounds/${sonidoAnimal}`);
             }
             if (animalSelect.value == "Serpiente") {
                 newAnimal = new Serpiente(animalSelect.value, edadId.value, `/Animales-Salvajes/tree/master/assets/imgs/${imagenAnimal}`, comentariosId.value, `/Animales-Salvajes/tree/master/assets/sounds/${sonidoAnimal}`);
             }
             if (animalSelect.value == "Aguila") {
                 newAnimal = new Aguila(animalSelect.value, edadId.value, `/Animales-Salvajes/tree/master/assets/imgs/${imagenAnimal}`, comentariosId.value, `/Animales-Salvajes/tree/master/assets/sounds/${sonidoAnimal}`);
             }

             arrayAnimales.push(newAnimal);
             mostrarAnimal(); // llama a la función animal donde despliega los animales en ventana modal
             limpiarFor(); // lllama a función que setea los select, limpia el preview, y los comentarios
         } catch (error) {
             console.error(error);
             console.log(
                 "Error al agregar el animal a su clase."
             );
         }
     }
 }

 const mostrarAnimal = () => { // función, recorre el arreglo de animales y activa sonido , y activa ventana modal
     animalesId.innerHTML = "";
     arrayAnimales.forEach((elemento, index) => {
         animalesId.innerHTML += `<div class="${elemento.nombre} ml-3 mr-3">
                <img src="${elemento.img}" onclick="mostrarModal(${index})" width="200" height="200 "alt="">
                <br>
                <img src="assets/imgs/audio.svg" onclick="document.querySelector('.${elemento.nombre} audio').play()" 
                width="200" height="40" style="background-color: gray" class="pb-1 pt-1" />
                <audio>
                    <source src="${elemento.sonido}" type="audio/mpeg"></source>
                </audio>
            </div>`;
     });
 };

 const limpiarFor = () => { // funcion para setear los select, comentarios y el preview del animal
     animalSelect.selectedIndex = 0;
     edadId.selectedIndex = 0;
     comentariosId.value = "";
     document.querySelector("#preview").innerHTML = "";
     document.querySelector("#preview").style.backgroundImage = "/Animales-Salvajes/tree/master/assets/imgs/lion.svg";
 };

 window.mostrarModal = (index) => { // muestra modal con el animal seleccionados a traves del index del arreglo
     let modal = arrayAnimales[index];
     let modalBody = document.querySelector(".modal-body");
     modalBody.innerHTML = `
    <div class="text-center text-light  mx-auto">
        <div class="modal-body">
            <img src="${modal.img}" class="rounded mx-auto d-block" width="100%" height ="100%" />           
            <p class="mt-2">${modal.edad}</p>
            <p>Comentarios:</p>
            <p>${modal.comentarios}</p> 
        </div>
    </div>`;
     $("#exampleModal").modal("toggle");
 };

 (() => { // funcion anominma que escucha los comabio del select animal, luego consulta el json, y genera el preview del animal seleccionado cada vez que cambia la seleccion el usuario.
     animalSelect.addEventListener("change", async(Animal) => {
         const { animales } = await listaAnimales.getData();
         const nombreAnimal = Animal.target.value;
         const imagen = animales.find((data) => data.name == nombreAnimal).imagen;
         previewId.innerHTML = `<img class="previewAnimal"  src="/Animales-Salvajes/tree/master/assets/imgs/${imagen}" />`;
     });
 })();
