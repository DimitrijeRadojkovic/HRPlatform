import { Plus, Minus } from "lucide-react"

export default function SkillPill({
    id,
    name,
    showActionIcon,
    isAdd
}: {
    id: number
    name: string
    showActionIcon: boolean
    isAdd: boolean
}) {
    return (
        <div
            className="
                flex items-center gap-[10px]

                px-[16px]
                py-[10px]

                rounded-full

                bg-white/15
                backdrop-blur-xl

                border border-white/20

                text-white
                font-semibold

                transition-all duration-300

                hover:bg-white/25
                hover:cursor-pointer
            "
        >
            <span>{name}</span>

            {showActionIcon && (
                <div
                    className="
                        w-[22px]
                        h-[22px]

                        rounded-full

                        bg-white/20

                        flex items-center justify-center
                    "
                >
                    {isAdd ? (
                        <Plus size={14} />
                    ) : (
                        <Minus size={14} />
                    )}
                </div>
            )}
        </div>
    )
}