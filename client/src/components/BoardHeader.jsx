import { useState, useEffect, useRef } from "react"
import AddUserIcon from "./icons/AddUserIcon"
import Logo from "../components/Logo"
import Avatar from "./Avatar";
import DefaultAvatar from "../assets/avatars/avatar4.jpg"
import { updateBoard, deleteBoard } from "../services/api";

const BoardHeader = ({ id, share, title, members }) => {

    const [ boardId, setBoardId ] = useState(null)
    const [ boardTitle, setBoardTitle ] = useState('')
    const [ boardMembers, setBoardMembers ] = useState([])
    const [ isEditing, setIsEditing ] = useState(false)
    const [openMenu, setOpenMenu] = useState(false);
    const [ inputWidth, setInputWidth ] = useState(0)
    const spanRef = useRef(null)

    useEffect(() => {
        if (spanRef.current) {
            const newWidth = spanRef.current.offsetWidth + (isEditing ? 24 : 4);
            setInputWidth(newWidth);
        }
        setBoardMembers(members)
        setBoardId(id)
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

    const handleStopEditing = async () => {
        setIsEditing(false)
        setInputWidth(inputWidth - 24)

        if (boardTitle !== title) {
            try {
                const response = await updateBoard(boardId, { title: boardTitle });
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleDeleteBoard = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this board?");
        if (!confirmed) return;

        try {
            await deleteBoard(boardId);
            window.location.href = '/';
        } catch (error) {
            console.error("Failed to delete board:", error);
            alert("Failed to delete the board.");
        }
    };
    
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

                <div className="relative">
                    <button
                        className="h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-600 rounded-lg"
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v.01M12 12v.01M12 18v.01" />
                        </svg>
                    </button>

                    {openMenu && (
                        <div className="absolute right-0 mt-2 w-40 bg-[#11151e] shadow-lg rounded-lg z-10 py-2 text-sm">
                            <button
                                onClick={handleDeleteBoard}
                                className="block w-full text-left text-[#F56565] hover:bg-[#1e2433] px-4 py-2 rounded"
                            >
                                Delete Board
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoardHeader