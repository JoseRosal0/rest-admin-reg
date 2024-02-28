import { mostraAlerta } from "./mostraralerta.js";
import { obtenerProducto, editarProducto } from "./api.js";

const nombreInput = document.querySelector("#nombre");
const precioInput = document.querySelector("#precio");
const categoriaInput = document.querySelector("#categoria");
const idInput = document.querySelector("#id");

document.addEventListener("DOMContentLoaded", async () => {
    //verificar que el producto exista
    const parametroUrl = new URLSearchParams(window.location.search);
    //console.log(parametroUrl);
    //console.log(window.location.search);
    const idProducto = parseInt(parametroUrl.get('id'));
    //console.log(idProducto)

    const producto = await obtenerProducto(idProducto);
    //console.log(producto)
    mostrarProducto(producto);
    //registrar la actualizacion del producto;
    const formulario = document.querySelector("#formulario");

    formulario.addEventListener('submit', validarProducto)
})

async function validarProducto(e) {
    e.preventDefault();
    const producto = {
        nombre: nombreInput.value,
        Precio: precioInput.value,
        categoria: categoriaInput.value,
        id: idInput.value
    }

    if (validacion(producto)) {
        //console.log('todos los campos son obligatorios');
        mostraAlerta("todos los campos son obligatorios")

    } else {
        await editarProducto(producto);
        window.location.href = 'index.html'
        console.log('campos llenos')
    }
}

function validacion(obj) {
    return !Object.values(obj).every(i => i !== '');
}

function mostrarProducto(producto) {
    const { nombre, Precio, categoria, id } = producto;

    nombreInput.value = nombre;
    precioInput.value = Precio;
    categoriaInput.value = categoria;
    idInput.value = id;


}
