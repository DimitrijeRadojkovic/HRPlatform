import Nav from "../components/Nav"
import Button from "../components/Button"
import { Link } from "react-router-dom"

export default function Home(){
    return (
        <div className="min-h-screen font-manrope bg-[#4A7DFF] overflow-hidden relative flex justify-center items-center">
            <Nav />

            <div className="flex flex-col items-center justify-center gap-[20px]">
                <h1 className="text-center font-extrabold lg:text-[72px] md:text-[48px] text-[32px] text-[#f6fff9]">Where talent meets opportunity.</h1>
                <Link to={'/candidates'}><Button animatedBorder={true} text={"Dive in"} onClick={() => {}} className={"bg-[#99E3FF] text-black/70 md:text-[30px] font-bold hover:bg-[#7edbff] transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] hover:cursor-pointer"} /></Link>
            </div>

            {/* Glow */}
            <div className="
                absolute
                bottom-[-200px]
                left-1/2
                -translate-x-1/2
                w-[120%]
                h-[300px]
                bg-white/30
                blur-3xl
                rounded-full
            " />

        </div>
    )
}