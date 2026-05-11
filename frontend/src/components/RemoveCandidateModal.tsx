import { useState, useEffect } from "react"
import { deleteCandidate } from "../api/candidates"
import Button from "./Button"
import { toast } from "sonner"
import type { Candidate } from "../types/types"

export default function RemoveCandidateModal({
    visible,
    setVisible,
    candidateId,
    setCandidates
} : {
    visible: boolean,
    setVisible: (v: boolean) => void,
    candidateId: number,
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
}){

    async function handleDelete() {
        try {

            await deleteCandidate(candidateId)

            setCandidates(prev => prev.filter(c => c.id !== candidateId))

            setVisible(false)

            toast.success("Candidate deleted successfully!")
        }
        catch (error) {
            console.error(error)
            toast.error("Failed to delete candidate.")
        }
    }

    if(!visible) return null

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
                className="
                    w-[95%] md:w-[80%] lg:w-[50%]
                    rounded-[36px]
                    bg-white/50
                    backdrop-blur-3xl
                    border border-white/20
                    p-[28px]
                    shadow-[0_8px_40px_rgba(0,0,0,0.15)]
                    flex flex-col items-center gap-[14px]
                "
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="font-bold text-[36px] text-center text-black/70">
                    Are you sure you want to delete a candidate?
                </h1>
                <div className="flex flex-col md:flex-row items-center justify-center gap-[20px]">
                    <Button text="Continue" onClick={handleDelete} className="
                        w-full md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    " />
                    <Button text="Cancel" onClick={() => setVisible(false)} className="
                        w-full md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    " />
                </div>
            </div>

        </div>
    )
}