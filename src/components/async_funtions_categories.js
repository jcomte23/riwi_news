export async function getCategories() {
    const response = await fetch('http://localhost:3000/categories')
    if (response.ok) {
        const data = await response.json()
        return {
            ok: response.ok,
            data: data,
            statusText: response.statusText
        }
    } else {
        return {
            ok: response.ok,
            statusText: response.statusText
        }
    }
}

export async function showCategory(id) {
    const response = await fetch(`http://localhost:3000/categories/${id}`)
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

    return {
        ok: response.ok,
        statusText: response.statusText
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
    return {
        ok: response.ok,
        statusText: response.statusText
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