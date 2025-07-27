import { useState, useEffect, useRef } from "react"
import AddUserIcon from "./icons/AddUserIcon"
import Logo from "../components/Logo"
import Avatar from "./Avatar";
import DefaultAvatar from "../assets/avatars/avatar4.jpg"

const BoardHeader = ({ share, title, members }) => {

    const [ value, setValue ] = useState(title)
    const [ boardTitle, setBoardTitle ] = useState('')
    const [ isEditing, setIsEditing ] = useState(false)
    const [ inputWidth, setInputWidth ] = useState(0)
    const [ boardMembers, setBoardMembers ] = useState([])
    const spanRef = useRef(null)

    useEffect(() => {
        if (spanRef.current) {
            const newWidth = spanRef.current.offsetWidth + (isEditing ? 24 : 4);
            setInputWidth(newWidth);
        }
        setBoardMembers(members)
    }, [boardTitle, isEditing]);

    useEffect(() => {
        if (!isEditing) {
            setBoardTitle(title);
        }
    }, [title]);

    const handleEditing = () => {
        setIsEditing(true);
        setInputWidth(inputWidth + 24);
    };

    const handleStopEditing = () => {
        setIsEditing(false)
        setInputWidth(inputWidth - 24)
    }
    
    const handleClickShare = () => {
        share()
    }

    return (
        <div className="h-14 p-3 bg-[#0000003d] text-white flex justify-between"
        >
            
            <div className="flex items-center">
                <Logo size={48}/>
                {/* BOARD TITLE AND EDIT BAN */}
                <div
                    className={`font-bold text-lg px-3 rounded-md relative
                                hover:${ isEditing ? "" : "bg-slate-700"} flex items-center`}
                >
                    <span
                        ref={spanRef}
                        className="absolute invisible whitespace-pre"
                        style={{ font: "inherit", padding: "0 2px" }}
                    > {boardTitle || ""}
                    </span>

                    <input
                        type="text"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        onFocus={handleEditing}
                        onBlur={handleStopEditing}
                        className={`bg-transparent outline-none transition-all duration-150
                                    ${ isEditing ? "border px-4 rounded bg-[#0b171f] text-[#afabab]"
                                    : "cursor-pointer"} font-bold text-lg`}
                        style={{ width: `${inputWidth}px` }}
                    />
                </div>

            </div>
            <div className="flex gap-4">
                <div className="flex gap-1">
                    {boardMembers?.map((member) => (
                        <Avatar 
                            src={member?.User?.UserProfile?.secure_url || DefaultAvatar}
                            alt={member.User.name}
                        />
                    ))}
                </div>
                <button
                    onClick={handleClickShare}
                    className="h-8 px-3 py-1.5 text-sm font-medium bg-brand-yellow hover:bg-brand-yellow-hover 
                            text-[#11151E] rounded flex items-center gap-2"
                >
                    <AddUserIcon />
                    <span>Share</span>
                </button>
            </div>
        </div>
    );
};

export default BoardHeader