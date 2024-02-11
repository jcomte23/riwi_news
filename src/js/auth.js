import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import { smallAlertError } from '../components/alerts'
import { showUserWithEmail } from '../components/async_funtions_auth'

const formLogin = document.getElementById("form-login")
const email = document.getElementById("email")
const password = document.getElementById("password")

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault()
    const userFound = await showUserWithEmail(email)
    if (userFound.validatedEmail === false) {
        smallAlertError(userFound.message)
    } else {
        if (userFound.data.password === password.value) {
            localStorage.setItem("userOnline", JSON.stringify(userFound.data))
            localStorage.setItem("isAutorizated", JSON.stringify(true))
            window.location.href = "../admin/administrator.html"
        } else {
            password.classList.add("is-invalid")
            smallAlertError("Contraseña incorrecta")
        }
    }
})




