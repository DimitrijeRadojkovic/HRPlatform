import { useState, useEffect } from "react"
import { getCandidates } from "../api/candidates";
import type { Candidate } from "../types/types";
import CandidateCard from "../components/CandidateCard";
import Nav from "../components/Nav";

export default function Candidates(){

    const [candidates, setCandidates] = useState<Candidate[]>([])

    useEffect(() => {
        async function fetchCandidates() {
            try {
                const data = await getCandidates()

                setCandidates(data)
            }
            catch (error) {
                console.error(error)
            }
        }

        fetchCandidates()
    }, []);

    return (
        <div className="bg-[#4A7DFF]">
            <Nav />
            {candidates.map((candidate, idx) => (
                <CandidateCard contactNumber={candidate.contactNumber} dateOfBirth={new Date(candidate.dateOfBirth).toLocaleDateString("en-GB")} email={candidate.email} fullName={candidate.fullName} id={candidate.id} skills={candidate.skills} key={idx} />
            ))}
        </div>
    )
}