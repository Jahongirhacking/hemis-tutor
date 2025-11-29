import { RootState } from "@/store/store";
import { GraduationCap } from "lucide-react";
import { useSelector } from "react-redux";

const TutorLogo = ({ className }: { className?: string }) => {
    const themeColor = useSelector((store: RootState) => store.themeSlice.color);
    return (
        <div className={`flex items-center gap-3 group cursor-pointer ${className || ''}`}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:animate-pulse-glow transition-all group-hover:scale-110">
                <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors ${themeColor === 'light' ? 'text-black' : 'text-white'}`}>
                tyutor<span className="text-teal-500">.hemis.uz</span>
            </span>
        </div>
    )
}

const SmallLogo = ({ className }: { className?: string }) => {
    return (
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:animate-pulse-glow transition-all group-hover:scale-110 ${className || ''}`}>
            <GraduationCap className="w-6 h-6 text-white" />
        </div>
    )
}

TutorLogo.Small = SmallLogo
export default TutorLogo