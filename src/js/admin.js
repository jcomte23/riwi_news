import { getCategories, storeCategory } from '../components/async_funtions_categories'
import { getNews } from '../components/async_funtions_news'
import '../scss/style.scss'
import * as bootstrap from 'bootstrap'

const btnLogout = document.getElementById("logout")
const categoriesTbody = document.getElementById("categorias-tbody")
const newsTbody = document.getElementById("news-tbody")
const formCategory = document.getElementById("form-category")
const nameCategory = document.getElementById("nameCategory")
const descriptionCategory = document.getElementById("descriptionCategory")
const closeModal = document.querySelector(".close-modal")

const indexCatergories = (data) => {
    categoriesTbody.innerHTML = ""
    data.forEach((element, index) => {
        categoriesTbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>
                <button class="btn btn-primary">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </td>
        </tr>
        `
    })
}

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
    const categories = await getCategories()
    indexNews(news)
    indexCatergories(categories)
})

btnLogout.addEventListener("click", () => {
    localStorage.setItem("userOnline", JSON.stringify(""))
    localStorage.setItem("isAutorizated", JSON.stringify(false))
    window.location.href = "/"
})

formCategory.addEventListener("submit", async (event) => {
    event.preventDefault()
    const newCategory = {
        name: nameCategory.value,
        description: descriptionCategory.value
    }

    const response = await storeCategory(newCategory)
    if (response.created) {
        closeModal.click()
        indexCatergories(await getCategories())
    } else {
        alert(response.message)
    }

})



