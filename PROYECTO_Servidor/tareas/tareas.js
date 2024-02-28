//desde el min 19
const user=JSON.parse(localStorage.getItem("user"));
const form=document.querySelector("#form-todos");
const lista=document.querySelector("#todos-list");
const inputf=document.querySelector("#form-input");
const cerrarBtn=document.querySelector("#cerrar-btn");
//console.log(user);

if(!user){
    window.location.href="../home/index.html";
}

form.addEventListener("submit",async e=>{
    e.preventDefault();
    const url="http://localhost:3000/tareas";
    await fetch(url,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({text:inputf.value,user:user.username})
    })
    obtenerLista();
})
obtenerLista();


async function obtenerLista(){
    const url="http://localhost:3000/tareas"
    const resultado=await fetch(url,{method: "get" });
    const list=await resultado.json();
    const userList=list.filter(lista=>lista.user==user.username)
    //console.log(list,"list")
    //console.log(userList,"userlist")
    limpiarHtml();
    userList.forEach(li => {
        const listado=document.createElement("li")
        listado.innerHTML=`
        <li id=${li.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        <p id="pboton">${li.text}</p>
        <button class="check-btn">&#10003;</button>
        </li>`;
        
    
        lista.appendChild(listado);
        inputf.value="";
    });

   

}


cerrarBtn.addEventListener("click",async e=>{
    localStorage.removeItem("user");
    window.location.href="../home/index.html"
})

lista.addEventListener("click",async e=>{
    //console.log("ingrese a lista event");
    var pboton=document.querySelector("#pboton");
    if(e.target.classList.contains("delete-btn")){
        //console.log("ingrese a la condicion target");
        const id=e.target.parentElement.id;
        //console.log(id);
        await fetch(`http://localhost:3000/tareas/${id}`,{
            method:"DELETE"})
        e.target.parentElement.remove()
    }else if(e.target.classList.contains("check-btn")){
       //console.log("ingrese a check")
       const id=e.target.parentElement.id;
        //console.log(id);

        const respuestaJson=await fetch(`http://localhost:3000/tareas/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({checked:e.target.parentElement.classList.contains("check-todo")?false:true})
        })
        e.target.parentElement.classList.toggle("check-todo");
    }
})

function limpiarHtml(){
    while(lista.firstChild){
        lista.removeChild(lista.firstChild);
    }
}
