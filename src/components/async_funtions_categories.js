export async function getCategories() {
    const response = await fetch('http://localhost:3000/categories')
    const data = await response.json()
    return data
}

export async function showCategory(category) {
    const response = await fetch(`http://localhost:3000/categories/${category}`)
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
            status: true,
            message: "Saved"
        }
    } else {
        return {
            status: false,
            message: "Error"
        }
    }
}

export async function updateCategory(id, category) {
    const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    })
    if (response.ok) {
        return {
            status: true,
            message: "update"
        }
    } else {
        return {
            status: false,
            message: "Error"
        }
    }
}

export async function destroyCategory(category) {
    const response = await fetch(`http://localhost:3000/categories/${category}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })

    if (response.ok) {
        return {
            status: true,
            message: "Delete"
        }
    } else {
        return {
            status: false,
            message: "Error"
        }
    }
}