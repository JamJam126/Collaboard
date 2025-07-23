import AuthenticatedLayout from "../layout/AuthenticatedLayout"
import { useState, useEffect, useRef } from "react"

const BoardView = () => {

    const [ value, setValue ] = useState("Title")
    const [ isEditing, setIsEditing ] = useState(false)
    const [ inputWidth, setInputWidth ] = useState(0)
    const spanRef = useRef(null)

    useEffect(() => {
        if (spanRef.current) {
            let newWidth = 0;

            if (!isEditing) newWidth = spanRef.current.offsetWidth + 4;
            if (isEditing) newWidth = spanRef.current.offsetWidth + 24;

            setInputWidth(newWidth);        
        }
    }, [value])

    const handleEditing = () => {
        setIsEditing(true);
        setInputWidth(inputWidth + 24);
    };

    const handleStopEditing = () => {
        setIsEditing(false)
        setInputWidth(inputWidth - 24)
    }

    return (
        <AuthenticatedLayout hideNav={true} hideBar={true}>
            <div className="h-14 p-3 bg-[#132734] text-white flex justify-between">

                {/* BOARD TITLE AND EDIT BAN */}
                <div className="font-bold text-lg px-3 flex items-center hover:bg-slate-700 rounded-md relative">
                    <span
                        ref={spanRef}
                        className="absolute invisible whitespace-pre"
                        style={{ font: "inherit", padding: "0 2px" }}
                    > {value || ""}
                    </span>

                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={handleEditing} 
                        onBlur={handleStopEditing}
                        className={`bg-transparent outline-none transition-all duration-150
                                    ${isEditing ? "border px-4 rounded bg-[#0b171f] text-[#afabab]" : ""} 
                                    font-bold text-lg`}
                        style={{ width: `${inputWidth}px` }}
                    />
                </div>

                {/*  */}
                <div className="bg-white text-black">
                    <button>Invite</button>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default BoardView