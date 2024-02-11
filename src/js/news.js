import '../scss/style.scss'
import * as bootstrap from 'bootstrap'
import { getNews } from '../components/async_funtions_news'

const containerNews = document.getElementById("container-news")

const indexNews = (data) => {
    containerNews.innerHTML = ""
    data.forEach(element => {
        containerNews.innerHTML += `
        <section class="card mb-3" style="max-width: 540px">
            <article class="row g-0">
            <div class="col-md-4">
                <img src="${element.image}" class="img-fluid rounded-start" alt="image news" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">
                    ${element.content}
                </p>
                <p class="card-text">
                    <small class="text-body-secondary">${element.publicationDate}</small>
                </p>
                </div>
            </div>
            </article>
        </section>
        `
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const news = await getNews()
    indexNews(news)
})


