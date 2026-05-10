export type Skill = {
    id: number
    name: string
}

export type Candidate = {
    id: number
    fullName: string
    email: string
    contactNumber: string
    dateOfBirth: string
    skills: Skill[]
}

export type PagedResult = {
    items: Candidate[],
    totalCount: number,
    page: number,
    pageSize: number,
    totalPages: number
}