export function mostraAlerta(mensaje){
    const formulario = document.querySelector('#formulario');

    const alerta=document.querySelector(".bg-red-100");
    if(!alerta){
        const alert=document.createElement("p");
        alert.classList.add("bg-red-100","text-center","text-red-700",
        "border-red-400","rounded","px-4","py-3");
        alert.innerHTML=`<strong>Error!<span>${mensaje}</span></strong>`
        
        formulario.appendChild(alert);

        setTimeout(()=>{
            alert.remove();
        },3000)
    }
}