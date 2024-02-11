import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import { smallAlertError } from '../components/alerts'

const formLogin = document.getElementById("form-login")
const email = document.getElementById("email")
const password = document.getElementById("password")

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    const userFound = await showUserWithEmail(email.value)
    if (userFound.validatedEmail === false) {
        smallAlertError(userFound.message)
    } else {
        if (userFound.data.password === password.value) {
            localStorage.setItem("userOnline", JSON.stringify(userFound.data))
            window.location.href = "../admin/administrator.html"
        } else {
            smallAlertError("Contraseña incorrecta")
        }
    }
})

async function showUserWithEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`)
    if (!response.ok) {
        return {
            validatedEmail: false,
            message: "Hubo un error al obtener los datos del usuario"
        }
    } else {
        const data = await response.json()
        if (data.length === 1) {
            return {
                validatedEmail: true,
                data: data[0]
            }
        } else {
            return {
                validatedEmail: false,
                message: "No se encontró ningún usuario con ese email"
            }
        }
    }
}


