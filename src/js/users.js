import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const formLogin = document.getElementById("form-login")
const email = document.getElementById("email")
const password = document.getElementById("password")

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    const user=await showUser(email.value)
    if (user===undefined) {
        alert("el email no esta registrado")
    }else{
        if (user.password === password.value) {
            localStorage.setItem("userOnline",JSON.stringify(user))
            window.location.href="../admin/administrator.html"
        }else{
            alert("login incorrecto")
        }
    }
})

async function showUser(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`)
    const data = await response.json()
    if (data.length === 1) {
        return data[0]
    }
}