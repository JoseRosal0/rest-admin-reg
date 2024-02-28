const formC = document.querySelector('#form-create')
const forml = document.querySelector('#form-login')
const createInput = document.querySelector('#create-input')
const loginInput = document.querySelector('#login-input')
const notificacion = document.querySelector('.notification')

formC.addEventListener('submit', async e => {
    e.preventDefault();

    const url = 'http://localhost:3000/usuarios'

    //Crud create=post,read = get,update=patch,delete=delete

    const respuesta = await fetch(url, { method: 'get' });
    const users = await respuesta.json();
    // console.log(users)

    const user = users.find(i => i.username == createInput.value)

    //validacion 1 
    if (!createInput.value) {
        //el campo esta vacio
        console.log('campo vacio')
        notificacion.innerHTML = 'el campo usuario esta vacio '
        notificacion.classList.add('show-notification');
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 2000)

    } else if (user) {
        console.log('el usuario existe');
        notificacion.innerHTML = 'El usuario ya existe '
        notificacion.classList.add('show-notification');
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 2000)
    } else {
        //console.log('agregar usuario')
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                username: createInput.value,
                rol:"cliente"
             })


        })

        notificacion.innerHTML = 'el usuario fue creado '
        notificacion.classList.add('show-notification');
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 2000)
    }
})

forml.addEventListener("submit",async e=>{
    e.preventDefault();
    const url = 'http://localhost:3000/usuarios'
    
    const respuesta = await fetch(url, { method: 'get' });
    const users = await respuesta.json();

    const user=users.find(user=>user.username==loginInput.value);
    //console.log(user,"user en find")
    if(!user){
        notificacion.innerHTML = 'El usuario no existe '
        notificacion.classList.add('show-notification');
        setTimeout(() => {
            notificacion.classList.remove('show-notification')
        }, 2000)
    }else{
        console.log(user,"user en condi");
        if(user.rol=="cliente"){
            console.log("es un cliente")
            window.location.href ="/restaurant_app/index.html";

        }else if(user.rol=="admin"){
            console.log("es adnin")
            window.location.href ="/adminPanel/index.html";

        }
        localStorage.setItem("user",JSON.stringify(user));
    }
})