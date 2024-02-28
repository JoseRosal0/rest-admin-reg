import { listaProductos, eliminarProducto } from "./api.js";

(function () {
    const listado = document.querySelector("#listado-Productos");

    document.addEventListener("DOMContentLoaded", mostrarProductos);

    listado.addEventListener("click", confirmarEliminar);

    async function mostrarProductos() {
        const producto = await listaProductos();
        //console.log(producto);

        producto.forEach(product => {
            const { nombre, Precio, categoria, id } = product;
            const row = document.createElement('tr');
            row.innerHTML += `
                <td class="px-6 py-4 border-b border-gray-200">
                    <p class="text-sm font-medium text-gray-700 text-lg font-bold">${nombre}</p>
                </td>

                <td class="px-6 py-4 border-b border-gray-200">
                    <p class="text-sm font-medium text-gray-700 text-lg font-bold">${Precio}$</p>
                </td>

                <td class="px-6 py-4 border-b border-gray-200">
                    <p class="text-sm font-medium text-gray-700 text-lg font-bold">${categoria}</p>
                </td>

                <td class="px-6 py-4 border-b border-gray-200
                whitespace-no-wrap">
                    <a class="text-teal-600 hover:text-teal-900 mr-5" 
                    href="editar-producto.html?id=${id}">editar</a>
                    <a class="text-red-600 hover:text-red-900 eliminar" 
                    href="#" data-producto="${id}">eliminar</a>
                </td>    
            `



            listado.appendChild(row)
        });

    }



    async function confirmarEliminar(e) {
        if (e.target.classList.contains('eliminar')) {
            const productoId = parseInt(e.target.dataset.producto);
            console.log(productoId)

            const confirmar = confirm("quieres eliminar este producto");
            console.log(confirmar)
            if (confirmar) {
                await eliminarProducto(productoId);
            }
        }
    }
})()

