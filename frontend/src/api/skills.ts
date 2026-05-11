const API_URL = import.meta.env.VITE_API_URL

export async function getSkills(){
    const response = await fetch(
        `${API_URL}/skills`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch skills")
    }

    return response.json()
}

export async function createSkill(name: string) {
    const response = await fetch(
        `${API_URL}/skills`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name })
        }
    )

    if (!response.ok) {
        throw new Error("Failed to create skill")
    }

    return response.json()
}