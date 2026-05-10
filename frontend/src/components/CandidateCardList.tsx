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
        <div className="mt-[30px] max-w-[80%] mx-auto flex flex-col items-center justify-center gap-[20px]">
            <div className="w-full flex md:flex-row flex-col md:flex-wrap items-center gap-[20px]">
                {candidates.map((c, idx) => <CandidateCard id={c.id} contactNumber={c.contactNumber} dateOfBirth={c.dateOfBirth} email={c.email} fullName={c.fullName} skills={c.skills} key={idx} />)}
            </div>
            <div className="flex items-center justify-center gap-[5px]">
                <Button text="<" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="rounded-full flex items-center justify-center py-[16px] px-[24px] shadow-lg border border-white/20 bg-white/80">
                    
                </Button>
                <Button text=">" disabled={currentPage === maxPage} onClick={() => setCurrentPage(prev => prev + 1)} className="rounded-full flex items-center justify-center py-[16px] px-[24px] shadow-lg border border-white/20 bg-white/80">
                   
                </Button>
            </div>
        </div>
    )
}