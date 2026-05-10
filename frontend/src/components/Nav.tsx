import { Link } from "react-router-dom"

export default function Nav(){
    return (
        <div
            className="
            group
            fixed top-[50px]
            z-[1000]
            lg:left-[200px] lg:right-[200px]
            md:left-[60px] md:right-[60px]
            left-[30px] right-[30px]

            flex items-center justify-center

            rounded-[50px]
            px-[24px] py-[16px]

            border border-white/20
            bg-white/10
            backdrop-blur-xl

            shadow-lg

            transition-all duration-1000 ease-in-out

            hover:bg-white/20
            hover:shadow-2xl
            hover:border-white/40
            "
        >
            <Link to={'/'}><p
                className="
                text-white
                text-[16px] md:text-[24px] lg:text-[28px]
                font-bold

                opacity-50
                transition-all duration-1000 ease-in-out

                group-hover:opacity-100
                hover:cursor-pointer
                tracking-wide
                "
            >
                HRPlatform
            </p></Link>
        </div>
    )
}