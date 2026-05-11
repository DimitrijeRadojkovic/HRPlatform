import type { Candidate } from "../types/types";
import CandidateCard from "./CandidateCard";
import Button from "./Button";

export default function CandidateCardList({candidates, currentPage, setCurrentPage, maxPage} : {
    candidates: Candidate[],
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    maxPage: number
}){
    return (
        <div className="mt-[30px] max-w-[80%] mx-auto flex flex-col items-center justify-center gap-[50px] pb-[30px]">
            <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[20px]">
                {candidates.map((c, idx) => <CandidateCard id={c.id} contactNumber={c.contactNumber} dateOfBirth={new Date(c.dateOfBirth).toLocaleDateString('en-US')} email={c.email} fullName={c.fullName} skills={c.skills} key={idx} />)}
            </div>
            <div className="flex items-center justify-center gap-[5px]">
                <Button text="<" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className={`rounded-full flex items-center justify-center py-[16px] px-[24px] shadow-lg border border-white/20 bg-white/40 ${currentPage === 1 ? 'hover:cursor-not-allowed ' : "hover:cursor-pointer hover:scale-[110%]"}`}>
                    
                </Button>
                <Button text=">" disabled={currentPage === maxPage || maxPage === 0} onClick={() => setCurrentPage(prev => prev + 1)} className={`rounded-full flex items-center justify-center py-[16px] px-[24px] shadow-lg border border-white/20 bg-white/40 ${currentPage === maxPage || maxPage === 0 ? 'hover:cursor-not-allowed ' : "hover:cursor-pointer hover:scale-[110%]"}`}>
                   
                </Button>
            </div>
        </div>
    )
}