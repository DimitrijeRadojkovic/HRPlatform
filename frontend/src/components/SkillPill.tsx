import { Plus, Minus } from "lucide-react"

export default function SkillPill({
    id,
    name,
    showActionIcon,
    isAdd,
    onAdd,
    onRemove,
    isActive
}: {
    id: number
    name: string
    showActionIcon: boolean
    isAdd: boolean
    isActive?: boolean
    onAdd: (name: string) => void
    onRemove: (name: string) => void
}) {
    return (
        <div
            onClick={() => {
                if (!showActionIcon) return
                isAdd ? onAdd(name) : onRemove(name)
            }}
            className={`
                flex items-center gap-[10px]
                px-[16px] py-[10px]
                rounded-full
                backdrop-blur-xl
                border
                text-white font-semibold
                transition-all duration-300
                hover:cursor-pointer

                ${isActive ? "bg-white/30 border-white/40" : "bg-white/15 border-white/20 hover:bg-white/25"}
            `}
        >
            <span>{name}</span>

            {showActionIcon && (
                <div className="w-[22px] h-[22px] rounded-full bg-white/20 flex items-center justify-center">
                    {isAdd ? <Plus size={14} /> : <Minus size={14} />}
                </div>
            )}
        </div>
    )
}