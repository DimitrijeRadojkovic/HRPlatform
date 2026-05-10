import type { Skill } from "../types/types"
import SkillPill from "./SkillPill"

export default function Search({name, setName, skills, selectedSkills, addSkill, removeSkill} : {
    name: string,
    setName: (name: string) => void,
    skills: Skill[],
    selectedSkills: string[],
    addSkill: (skill: string) => void,
    removeSkill: (skill: string) => void
}){
    return (
        <div className="max-w-[80%] mx-auto flex flex-col items-start justify-center gap-[20px]">
            <input type="text" className="w-full shadow-lg border border-white/20 bg-white/80 focus:outline-none focus:ring-0 rounded py-[10px] px-[42px] rounded-[30px]" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="flex items-center gap-[20px] flex-wrap">
                {skills.map((s, idx) => <SkillPill key={idx} id={s.id} isAdd={!selectedSkills.includes(s.name)} name={s.name} onAdd={() => addSkill(s.name)} onRemove={() => removeSkill(s.name)} showActionIcon={true} isActive={selectedSkills.includes(s.name)} />)}
            </div>
        </div>
    )
}