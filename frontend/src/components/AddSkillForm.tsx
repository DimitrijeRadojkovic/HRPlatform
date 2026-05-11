import { useEffect, useState } from "react"
import Button from "./Button"
import { createSkill } from "../api/skills"
import { toast } from "sonner"
import type { Skill } from "../types/types"

export default function AddSkillForm({ visible, setVisible, setSkills }: {
    visible: boolean,
    setVisible: (v: boolean) => void,
    setSkills: React.Dispatch<React.SetStateAction<Skill[]>>
}) {

    const [name, setName] = useState("")

    async function handleCreateSkill() {
        try {
            var s = await createSkill(name)

            setName("")
            setVisible(false)
            setSkills(prev => [...prev, s])
            toast.success("Skill added successfully.")
        }
        catch (error) {
            console.error(error)
            toast.error("Failed to create a skill.")
            setName("")
        }
    }

    useEffect(() => {
        setName("")
    }, [visible])

    return (
        <>
            {visible &&
                <div className="
                    fixed inset-0
                    backdrop-blur-sm
                    bg-white/10
                    z-[1000]
                    flex items-center justify-center
                " onClick={() => setVisible(false)}>

                    <div className="
                        w-[95%] md:w-[80%] lg:w-[50%]
                        rounded-[36px]
                        bg-white/50
                        backdrop-blur-3xl
                        border border-white/20
                        p-[28px]
                        shadow-[0_8px_40px_rgba(0,0,0,0.15)]
                        flex flex-col items-center gap-[20px]
                    "
                    onClick={(e) => e.stopPropagation()}>

                        <input
                            type="text"
                            className="w-full shadow-lg border border-white/20 bg-white/80 focus:outline-none focus:ring-0 py-[10px] px-[42px] rounded-[30px]"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <div className="w-full flex items-center justify-center">
                            <Button
                                onClick={handleCreateSkill}
                                text="Add a Skill"
                                className="
                                    w-full
                                    md:w-auto
                                    bg-[#99E3FF]
                                    text-[#002D3D]
                                    text-black/70
                                    font-bold
                                    py-[12px]
                                    hover:bg-[#7edbff]
                                    hover:cursor-pointer
                                "
                            />
                        </div>

                    </div>
                </div>
            }
        </>
    )
}