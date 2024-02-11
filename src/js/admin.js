import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const btnLogout=document.getElementById("logout")
btnLogout.addEventListener("click",() => {
    localStorage.setItem("userOnline", JSON.stringify(""))
    localStorage.setItem("isAutorizated", JSON.stringify(false))
    window.location.href = "/"
})