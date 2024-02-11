import { smallAlertError, smallAlertSuccess } from '../components/alerts'
import { destroyCategory, getCategories, showCategory, storeCategory, updateCategory } from '../components/async_funtions_categories'
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
let idTemp

const indexCatergories = (data) => {
    if (data.length === 0) {
        categoriesTbody.innerHTML = `
        <tr>
            <td colspan="4">there are no registered categories</td>
        </tr>
        `
    } else {
        categoriesTbody.innerHTML = ""
        data.forEach((element, index) => {
            categoriesTbody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${element.name}</td>
            <td>${element.description}</td>
            <td>
                <button class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#modal-category" data-id="${element.id}">Edit</button>
                <button class="btn btn-danger delete" data-id="${element.id}">Delete</button>
            </td>
        </tr>
        `
        })
    }

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

formCategory.addEventListener("submit", async (event) => {
    event.preventDefault()
    const category = {
        name: nameCategory.value,
        description: descriptionCategory.value
    }

    if (idTemp === undefined) {
        const response = await storeCategory(category)
        if (response.status) {
            closeModal.click()
            formCategory.reset()
            indexCatergories(await getCategories())
            smallAlertSuccess(response.message)
        } else {
            smallAlertError(response.message)
        }
    } else {
        const response = await updateCategory(idTemp, category)
        if (response.status) {
            closeModal.click()
            formCategory.reset()
            indexCatergories(await getCategories())
            smallAlertSuccess(response.message)
            idTemp = undefined
        } else {
            smallAlertError(response.message)
        }

    }
})


categoriesTbody.addEventListener("click", async (event) => {
    if (event.target.classList.contains("edit")) {
        idTemp = event.target.getAttribute("data-id")
        const categoryEdit = await showCategory(idTemp)
        nameCategory.value = categoryEdit.name
        descriptionCategory.value = categoryEdit.description
    }

    if (event.target.classList.contains("delete")) {
        const id = event.target.getAttribute("data-id")
        const response = await destroyCategory(id)
        if (response.status) {
            indexCatergories(await getCategories())
            smallAlertSuccess(response.message)
        } else {
            indexCatergories(await getCategories())
            smallAlertError(response.message)
        }
    }
})

btnLogout.addEventListener("click", () => {
    localStorage.setItem("userOnline", JSON.stringify(""))
    localStorage.setItem("isAutorizated", JSON.stringify(false))
    window.location.href = "/"
})

document.addEventListener("DOMContentLoaded", async () => {
    const news = await getNews()
    const categories = await getCategories()

    if (!categories.ok) {
        smallAlertError(categories.statusText)
    } else {
        indexCatergories(categories.data)
    }

    // if (!news.ok) {
    //     smallAlertError(categories.statusText)
    // } else {
    //     indexNews(news)
    // }
})


