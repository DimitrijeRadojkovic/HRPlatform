export async function getCandidates(page = 1, pageSize = 10) {
    const response = await fetch(
        `https://localhost:7049/api/candidates?page=${page}&pageSize=${pageSize}`
    )

    if (!response.ok) {
        throw new Error("Failed to fetch candidates")
    }

    return response.json()
}