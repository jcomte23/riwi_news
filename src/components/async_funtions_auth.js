export async function showUserWithEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email}`)
    if (!response.ok) {
        return {
            validatedEmail: false,
            message: "Hubo un error al obtener los datos del usuario"
        }
    } else {
        const data = await response.json()
        if (data.length === 1) {
            return {
                validatedEmail: true,
                data: data[0]
            }
        } else {
            return {
                validatedEmail: false,
                message: "No se encontró ningún usuario con ese email"
            }
        }
    }
}