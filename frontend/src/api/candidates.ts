const API_URL = import.meta.env.VITE_API_URL

export async function getCandidates(name: string, skills: string[], page = 1, pageSize = 10) {
    const skillsQuery = skills.join(",")

    const params = new URLSearchParams({
        name: name,
        skills: skillsQuery,
        page: page.toString(),
        pageSize: pageSize.toString()
    })

    const response = await fetch(
        `${API_URL}/candidates/search?${params.toString()}`
    )


    if (!response.ok) {
        throw new Error("Failed to fetch candidates")
    }

    return response.json()
}

export async function createCandidate(data: any) {
    const res = await fetch(`${API_URL}/candidates`, {
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

export async function addSkillToCandidate(candidateId: number, skillId: number) {
    const res = await fetch(
        `${API_URL}/candidates/${candidateId}/skills/${skillId}`,
        {
            method: "POST"
        }
    )

    if (!res.ok) {
        throw new Error(await res.text())
    }
}

export async function removeSkillFromCandidate(candidateId: number, skillId: number) {
    const res = await fetch(
        `${API_URL}/candidates/${candidateId}/skills/${skillId}`,
        {
            method: "DELETE"
        }
    )

    if (!res.ok) {
        console.log("ERROR RESPONSE U REMOVE SKILL", res)
        throw new Error(await res.text())
    }
}

export async function deleteCandidate(candidateId: number){
    const res = await fetch(
        `${API_URL}/candidates/${candidateId}`,
        {
            method: "DELETE"
        }
    )

    if (!res.ok) {
        console.log("ERROR RESPONSE U REMOVE CANDIDATE", res)
        throw new Error(await res.text())
    }
}