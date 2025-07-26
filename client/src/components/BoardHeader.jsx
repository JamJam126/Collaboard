import { useState, useEffect, useRef } from "react"
import AddUserIcon from "./icons/AddUserIcon"

const BoardHeader = ({ share, title }) => {

    const [ value, setValue ] = useState(title)
    const [ boardTitle, setBoardTitle ] = useState('')
    const [ isEditing, setIsEditing ] = useState(false)
    const [ inputWidth, setInputWidth ] = useState(0)
    const spanRef = useRef(null)

    useEffect(() => {
        if (spanRef.current) {
            const newWidth = spanRef.current.offsetWidth + (isEditing ? 24 : 4);
            setInputWidth(newWidth);
        }
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
                                : ""} font-bold text-lg`}
                    style={{ width: `${inputWidth}px` }}
                />
            </div>

            <div className="flex gap-2">
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