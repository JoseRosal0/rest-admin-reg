import { nuevoProducto } from "./api.js";
import { mostraAlerta } from "./mostraralerta.js";


const formulario = document.querySelector('#formulario');
formulario.addEventListener('submit', validarProducto);

async function validarProducto(e) {
    e.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const Precio = document.querySelector("#precio").value;
    const categoria = document.querySelector("#categoria").value;

    const producto = {
        nombre,
        Precio,
        categoria
    }

    if (validacion(producto)) {
        //console.log('todos los campos son obligatorios');
        mostraAlerta("todos los campos son obligatorios")

    } else {
        await nuevoProducto(producto);
        window.location.href = 'index.html'
        console.log('campos llenos');
    }

}

function validacion(obj) {
    return !Object.values(obj).every(i => i !== '');
}