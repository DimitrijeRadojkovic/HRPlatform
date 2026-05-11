import { useEffect, useState } from "react"
import type { Candidate, Skill } from "../types/types"
import SkillPill from "./SkillPill"
import {
    addSkillToCandidate,
    removeSkillFromCandidate
} from "../api/candidates"
import { toast } from "sonner"
import Button from "./Button"

export default function ModifyCandidateSkillsModal({
    visible,
    setVisible,
    candidate,
    allSkills,
    setCandidates
}: {
    visible: boolean
    setVisible: (v: boolean) => void
    candidate: Candidate
    allSkills: Skill[]
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
}) {

    const [candidateSkills, setCandidateSkills] = useState<Skill[]>([])
    const [originalSkills, setOriginalSkills] = useState<Skill[]>([])

    useEffect(() => {
        if (candidate) {
            setCandidateSkills(candidate.skills)
            setOriginalSkills(candidate.skills)
        }
    }, [candidate])

    if (!visible || !candidate) return null

    const availableSkills = allSkills.filter(
        s => !candidateSkills.some(cs => cs.id === s.id)
    )

    function handleAdd(skill: Skill) {
        setCandidateSkills(prev => [...prev, skill])
    }

    function handleRemove(skill: Skill) {
        setCandidateSkills(prev =>
            prev.filter(s => s.id !== skill.id)
        )
    }

    async function handleSave() {
        try {

            const addedSkills = candidateSkills.filter(
                s => !originalSkills.some(os => os.id === s.id)
            )

            const removedSkills = originalSkills.filter(
                s => !candidateSkills.some(cs => cs.id === s.id)
            )

            await Promise.all([
                ...addedSkills.map(skill =>
                    addSkillToCandidate(candidate.id, skill.id)
                ),

                ...removedSkills.map(skill =>
                    removeSkillFromCandidate(candidate.id, skill.id)
                )
            ])

            setCandidates(prev =>
                prev.map(c =>
                    c.id === candidate.id
                        ? { ...c, skills: candidateSkills }
                        : c
                )
            )

            toast.success("Skills updated")

            setVisible(false)
        }
        catch (error) {
            console.error(error)
            toast.error("Failed to update skills")
        }
    }

    return (
        <div
            className="
                fixed inset-0
                backdrop-blur-sm
                bg-white/10
                z-[1000]
                flex items-center justify-center
            "
            onClick={() => setVisible(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="
                    w-[95%] md:w-[80%] lg:w-[50%]
                    rounded-[36px]
                    bg-[#4A7DFF]/30
                    backdrop-blur-3xl
                    border border-white/20
                    p-[28px]
                    shadow-[0_8px_40px_rgba(0,0,0,0.15)]
                    flex flex-col gap-[24px]
                "
            >

                <div>
                    <h2 className="text-[28px] font-bold text-white">
                        {candidate.fullName}
                    </h2>

                    <p className="text-white/70">
                        Manage skills
                    </p>
                </div>

                <div className="flex flex-col gap-[12px]">
                    <h3 className="text-white font-semibold">
                        Current Skills
                    </h3>

                    <div className="flex flex-wrap gap-[10px]">
                        {candidateSkills.length === 0 && (
                            <p className="text-white/70">
                                No skills assigned
                            </p>
                        )}

                        {candidateSkills.map(skill => (
                            <SkillPill
                                key={skill.id}
                                id={skill.id}
                                name={skill.name}
                                showActionIcon={true}
                                isAdd={false}
                                onAdd={() => {}}
                                onRemove={() => handleRemove(skill)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-[12px]">
                    <h3 className="text-white font-semibold">
                        Available Skills
                    </h3>

                    <div className="flex flex-wrap gap-[10px]">
                        {availableSkills.map(skill => (
                            <SkillPill
                                key={skill.id}
                                id={skill.id}
                                name={skill.name}
                                showActionIcon={true}
                                isAdd={true}
                                onAdd={() => handleAdd(skill)}
                                onRemove={() => {}}
                            />
                        ))}
                    </div>
                </div>

                <Button
                    text="Save"
                    onClick={handleSave}
                    className="
                        w-full md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    "
                />

            </div>
        </div>
    )
}