export async function getSkills(){
    const response = await fetch(
        `https://localhost:7049/api/skills`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch skills")
    }

    return response.json()
}

export async function createSkill(name: string) {
    const response = await fetch(
        `https://localhost:7049/api/skills`,
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