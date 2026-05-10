export async function getCandidates(name: string, skills: string[], page = 1, pageSize = 10) {
    const skillsQuery = skills.join(",")

    const params = new URLSearchParams({
        name: name,
        skills: skillsQuery,
        page: page.toString(),
        pageSize: pageSize.toString()
    })

    console.log(`https://localhost:7049/api/candidates/search?${params.toString()}`)
    const response = await fetch(
        `https://localhost:7049/api/candidates/search?${params.toString()}`
    )


    if (!response.ok) {
        throw new Error("Failed to fetch candidates")
    }

    return response.json()
}