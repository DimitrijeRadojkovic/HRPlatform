export default function Button({
    text,
    onClick,
    className,
    animatedBorder = false,
    disabled = false
} : {
    text: string,
    onClick: () => void | null,
    className?: string,
    animatedBorder?: boolean,
    disabled?: boolean
}){
    return (
        <div
            className={`
                relative
                rounded-[34px]
                p-[3px]
                overflow-hidden
                transition-all duration-300

                ${
                    animatedBorder
                    ? `
                        before:absolute
                        before:inset-[-100%]
                        before:bg-[conic-gradient(from_0deg,#ffffff,#99E3FF,#4A7DFF,#ffffff)]
                        before:animate-[spin_3s_linear_infinite]
                        before:content-['']

                        hover:scale-105
                        hover:shadow-[0_0_35px_rgba(153,227,255,0.7)]
                    `
                    : ""
                }
            `}
        >
            <button
                onClick={() => {
                    if(!disabled)
                        onClick()
                }}
                disabled={disabled}
                className={`
                    relative
                    z-10

                    flex justify-center items-center
                    py-[10px] px-[42px]

                    rounded-[30px]

                    transition-all duration-300

                    ${className}
                `}
            >
                {text}
            </button>
        </div>
    )
}