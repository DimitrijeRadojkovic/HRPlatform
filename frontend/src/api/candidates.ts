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

export async function createCandidate(data: any) {
    const res = await fetch("https://localhost:7049/api/candidates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!res.ok){ 
        console.log("GRESKA U CREATE CANDIDATE", res)
        throw new Error("Failed")
    }

    return await res.json()
}