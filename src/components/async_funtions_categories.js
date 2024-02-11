export async function getCategories() {
    const response = await fetch('http://localhost:3000/categories')
    const data = await response.json()
    return data
}