import { useState, useEffect } from "react"
import { getCandidates } from "../api/candidates";
import type { Candidate, Skill } from "../types/types";
import Nav from "../components/Nav";
import Search from "../components/Search";
import { getSkills } from "../api/skills";
import CandidateCardList from "../components/CandidateCardList";
import Button from "../components/Button";
import AddSkillForm from "../components/AddSkillForm";
import AddCandidateForm from "../components/AddCandidateForm";

export default function Candidates(){

    const [candidates, setCandidates] = useState<Candidate[]>([])
    const [searchName, setSearchName] = useState("")
    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [skills, setSkills] = useState<Skill[]>([])
    const [maxPage, setMaxPage] = useState(0)

    const [visibleAddSkill, setVisibleAddSkill] = useState(false)
    const [visibleAddCandidate, setVisibleAddCandidate] = useState(false)

    function addSkill(skill: string) {
        setSelectedSkills(prev =>
            prev.includes(skill) ? prev : [...prev, skill]
        )
    }

    function removeSkill(skill: string) {
        setSelectedSkills(prev =>
            prev.filter(s => s !== skill)
        )
    }

    useEffect(() => {
        async function fetchCandidates() {
            try {
                const data = await getCandidates(searchName, selectedSkills, currentPage)

                setCandidates(data.items)
                setMaxPage(data.totalPages)
            }
            catch (error) {
                console.error(error)
            }
        }

        console.log(searchName, selectedSkills)

        const timeout = setTimeout(() => {
            fetchCandidates()
        }, 300);
        
        return () => clearTimeout(timeout)

    }, [searchName, selectedSkills, currentPage]);

    useEffect(() => {
        async function getAllSkills() {
            try {
                const data = await getSkills()

                setSkills(data)
            }
            catch (error) {
                console.error(error)
            }
        }
        getAllSkills()
    }, [])

    return (
        <div className="bg-[#4A7DFF] min-h-screen pt-[150px]">
            <Nav />
            <Search addSkill={addSkill} name={searchName} removeSkill={removeSkill} selectedSkills={selectedSkills} setName={(name: string) => setSearchName(name)} skills={skills}  />
            <div className="max-w-[80%] mx-auto my-[20px] flex md:items-center items-start flex-col md:flex-row">
                <Button onClick={() => setVisibleAddSkill(true)} text="Add a Skill" className="
                        w-full
                        md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        text-black/70
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    "  />
                    <Button onClick={() => setVisibleAddCandidate(true)} text="Add a Candidate" className="
                        w-full
                        md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        text-black/70
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    "  />
            </div>
            <AddSkillForm visible={visibleAddSkill} setVisible={setVisibleAddSkill} setSkills={setSkills} />
            <AddCandidateForm visible={visibleAddCandidate} setVisible={setVisibleAddCandidate} setCandidates={setCandidates} />
            <CandidateCardList candidates={candidates} currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage}  />
        </div>
    )
}