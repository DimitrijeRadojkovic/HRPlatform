import Button from "./Button"
import SkillPill from "./SkillPill"

type Skill = {
    id: number
    name: string
}

export default function CandidateCard({
    id,
    fullName,
    email,
    contactNumber,
    dateOfBirth,
    skills,
    onModify,
    onRemove
}: {
    id: number
    fullName: string
    email: string
    contactNumber: string
    dateOfBirth: string
    skills: Skill[],
    onModify: () => void,
    onRemove: () => void
}) {
    return (
        <div
            className="
                w-full
                max-w-[500px]

                rounded-[36px]

                bg-white/10
                backdrop-blur-2xl

                border border-white/20

                p-[28px]

                shadow-[0_8px_40px_rgba(0,0,0,0.15)]

                transition-all duration-300
                hover:bg-white/15
                hover:scale-[1.02]
                hover:shadow-[0_12px_60px_rgba(0,0,0,0.25)]

                flex flex-col justify-between
            "
        >
            {/* Header */}
            <div className="flex items-start justify-between gap-[20px]">
                <div>
                    <h2
                        className="
                            text-white
                            text-[28px]
                            font-extrabold
                            leading-tight
                        "
                    >
                        {fullName}
                    </h2>

                </div>
            </div>

            {/* Candidate info */}
            <div className="mt-[28px] flex flex-col gap-[14px]">
                <InfoRow label="Email" value={email} />
                <InfoRow label="Phone" value={contactNumber} />
                <InfoRow label="Birth Date" value={dateOfBirth} />
            </div>

            {/* Skills */}
            <div className="mt-[30px] flex flex-wrap gap-[12px]">
                {skills && skills.map(skill => (
                    <SkillPill
                        key={skill.id}
                        id={skill.id}
                        name={skill.name}
                        showActionIcon={false}
                        isAdd={true}
                        onAdd={(n:string) => {}}
                        onRemove={(n:string) => {}}
                        
                    />
                ))}
            </div>

            {/* Actions */}
            <div className="mt-[36px] flex flex-col  gap-[14px]">
                <Button
                    text="Modify Skills"
                    onClick={onModify}
                    className="
                        flex-1
                        w-full
                        bg-[#99E3FF]
                        text-[#002D3D]
                        text-black/70
                        font-bold
                        py-[12px]
                        hover:bg-[#7edbff]
                        hover:cursor-pointer
                    "
                />

                <Button
                    text="Remove"
                    onClick={onRemove}
                    animatedBorder={false}
                    className="
                        flex-1
                        w-full
                        bg-[#FF6B81]
                        text-white
                        font-bold
                        py-[12px]
                        hover:bg-[#ff5570]
                        hover:cursor-pointer
                    "
                />
            </div>
        </div>
    )
}

function InfoRow({
    label,
    value
}: {
    label: string
    value: string
}) {
    return (
        <div className="flex flex-col gap-[2px]">
            <span className="text-white/50 text-[13px] font-medium">
                {label}
            </span>

            <span className="text-white text-[16px] font-semibold break-all">
                {value}
            </span>
        </div>
    )
}