export async function getCategories() {
    const response = await fetch('http://localhost:3000/categories')
    const data = await response.json()
    return data
}

export async function storeCategory(category) {
    const response = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
    if (response.ok) {
        return {
            created: true,
            message: "Saved"
        }
    } else {
        return {
            created: false,
            message: "Error"
        }
    }
}