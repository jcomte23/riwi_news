import { getNews } from '../components/async_funtions_news'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const btnLogout = document.getElementById("logout")
const categoriasTbody = document.getElementById("categorias-tbody")
const newsTbody = document.getElementById("news-tbody")

btnLogout.addEventListener("click", () => {
    localStorage.setItem("userOnline", JSON.stringify(""))
    localStorage.setItem("isAutorizated", JSON.stringify(false))
    window.location.href = "/"
})

const indexNews = (data) => {
    newsTbody.innerHTML = ""
    data.forEach(element => {
        newsTbody.innerHTML += `
        <tr>
            <td>
                <img src="${element.image}"
                    alt="photo" height="50" width="50" class="rounded-circle" />
            </td>
            <td>${element.title}</td>
            <td>${element.content}</td>
            <td>${element.publicationDate}</td>
            <td>Kevin Mejia</td>
            <td>Tecnología</td>
            <td>
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    const news = await getNews()
    indexNews(news)
})