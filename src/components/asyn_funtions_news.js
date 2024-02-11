export async function getNews() {
    const response = await fetch("http://localhost:3000/news")
    const data = await response.json()
    return data
}