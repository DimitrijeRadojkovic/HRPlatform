import { useEffect, useState } from "react"
import Button from "./Button"
import { toast } from "sonner"
import { createCandidate } from "../api/candidates"
import type { Candidate } from "../types/types"

export default function AddCandidateForm({
    visible,
    setVisible,
    setCandidates
}: {
    visible: boolean,
    setVisible: (v: boolean) => void,
    setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>
}) {

    const [fullName, setFullName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")

    function validate() {
        if (!fullName || !dateOfBirth || !contactNumber || !email) {
            toast.error("All fields are required")
            return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            toast.error("Invalid email format")
            return false
        }

        const phoneRegex = /^\+?[0-9]{7,15}$/
        if (!phoneRegex.test(contactNumber)) {
            toast.error("Invalid phone number")
            return false
        }

        return true
    }

    async function handleCreateCandidate() {
        if (!validate()) return

        try {
            const dto = {
                fullName,
                dateOfBirth: new Date(dateOfBirth).toISOString(),
                contactNumber,
                email
            }

            const c = await createCandidate(dto)

            setCandidates(prev => [...prev, c])

            setFullName("")
            setDateOfBirth("")
            setContactNumber("")
            setEmail("")
            setVisible(false)

            toast.success("Candidate created successfully!")
        }
        catch (error) {
            console.error(error)
            toast.error("Failed to create candidate.")
        }
    }

    useEffect(() => {
        if (visible) {
            setFullName("")
            setDateOfBirth("")
            setContactNumber("")
            setEmail("")
        }
    }, [visible])

    if (!visible) return null

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

                <input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full shadow-lg border border-white/20 bg-white/80 py-[10px] px-[20px] rounded-[30px]"
                />

                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="w-full shadow-lg border border-white/20 bg-white/80 py-[10px] px-[20px] rounded-[30px]"
                />

                <input
                    type="text"
                    placeholder="Contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full shadow-lg border border-white/20 bg-white/80 py-[10px] px-[20px] rounded-[30px]"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full shadow-lg border border-white/20 bg-white/80 py-[10px] px-[20px] rounded-[30px]"
                />

                <Button
                    onClick={handleCreateCandidate}
                    text="Add Candidate"
                    className="
                        w-full md:w-auto
                        bg-[#99E3FF]
                        text-[#002D3D]
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    "
                    disabled={!fullName || !dateOfBirth || !contactNumber || !email}
                />
            </div>
        </div>
    )
}