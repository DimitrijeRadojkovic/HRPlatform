export async function getSkills(){
    const response = await fetch(
        `https://localhost:7049/api/skills`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch skills")
    }

    return response.json()
}