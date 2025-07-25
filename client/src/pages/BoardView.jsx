import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { getBoardById } from "../services/api"
import AuthenticatedLayout from "../layout/AuthenticatedLayout"
import BoardHeader from "../components/BoardHeader"
import CollapseIcon from "../components/icons/CollapseIcon"
import ShareBoardModal from "../components/ShareBoardModal"

const BoardView = () => {

    const { id } = useParams()
    const [ board, setBoard ] = useState({})
    const [ boardLists, setBoardLists ] = useState([])
    const [ activeListIndex, setActiveListIndex ] = useState(1)
    const [ isAddingList, setIsAddingList ] = useState(false)
    const [ isAddingCard, setIsAddingCard ] = useState(false)
    const [ newList, setNewList ] = useState('')
    const [ newCard, setNewCard ] = useState('')
    const [ modalActive, setModalActive ] = useState(false)

    const spanRefs = useRef({});
    const inputRef = useRef(null);

    const fetchBoard = async () => {
        try {
            const data = await getBoardById(id)
            console.log(data)
            setBoard(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchBoard()
    }, [id])

    const getTitleWidth = (idx) => {
        const span = spanRefs.current[idx];
        if (span) {
            return span.offsetWidth + 4;
        }
        return 50;
    }

    const handleAddList = () => {
        if (!newList.trim()) return;

        const newListObj = {
            title: newList.trim(),
            isCollapsed: false,
            tasks: [],
        };

        setBoardLists([...boardLists, newListObj]);
        setNewList('');
        setIsAddingList(false);
    };

    const handleAddTask = () => {
        if (!newCard.trim() || activeListIndex === null || !boardLists[activeListIndex]) return;

        const updatedLists = [...boardLists]

        const newTaskCard = {
            title: newCard.trim()
        } 

        updatedLists[activeListIndex].tasks.push(newTaskCard);
        setBoardLists(updatedLists);
        setNewCard('');
        setIsAddingCard(false);
        setActiveListIndex(null);
    }

    const handleClickShare = () => {
        setModalActive(true)
    } 

    {/* bg-[#8B5CF6] Purple Color */}
    return (
        <AuthenticatedLayout hideNav={true} hideBar={true}>
            
            <div className="h-screen flex flex-col">
                <BoardHeader title={board.title} share={handleClickShare}/>

                <div className="p-4 flex gap-4 h-full">
                    {boardLists.map((list, idx) => (
                        
                        // LIST MUY MUY
                        <div 
                            className="w-72 h-fit p-2.5 bg-[#1F2432] rounded-xl shadow-md text-[#E2E8F0] flex flex-col 
                                        gap-1.5"
                            key={idx} 
                        >
                            {/* LIST HEADER */}
                            <div className="flex justify-between w-full">
                                {/* <div className="h-8 px-2 text-sm font-semibold text-bran flex items-center">
                                    {list.title}
                                </div> */}

                                <div className="h-8 px-2 text-sm font-semibold text-bran flex items-center">
                                    <div className="relative">
                                        <span
                                            ref={(el) => (spanRefs.current[idx] = el)}
                                            className="absolute invisible whitespace-pre"
                                            style={{ font: "inherit", padding: "0 2px" }}
                                        >
                                            {list.title}
                                        </span>

                                        <input
                                            value={list.title}
                                            onChange={(e) => {
                                                const updatedLists = [...boardLists];
                                                updatedLists[idx].title = e.target.value;
                                                setBoardLists(updatedLists);
                                            }}
                                            className="bg-transparent outline-none font-semibold text-sm cursor-pointer"
                                            style={{ width: `${getTitleWidth(idx)}px` }}
                                        />
                                    </div>
                                </div>

                                <button className="h-8 w-8 p-2 flex items-center justify-center">
                                    <CollapseIcon style={{ transform: 'rotate(90deg)' }} />
                                </button>
                            </div>

                            {/* LIST BODY */}
                            <div className="w-full flex flex-col gap-1">

                                {/* TASK CARDS */}
                                {list.tasks?.map((task, tIdx) => (
                                    <div key={tIdx} className="text-sm text-[#B6C2CF] bg-[#2B3244] p-2 rounded-md mb-1 border border-[#323B4C]">
                                        {task.title}
                                    </div>
                                ))}

                                {/* START TO ADD NEW CARD BUTTON  */}
                                {(!isAddingCard || (isAddingCard && idx !== activeListIndex)) && (
                                    <button 
                                        onClick={() => {
                                            setIsAddingCard(true);
                                            setIsAddingList(false);
                                            setNewCard('')
                                            setActiveListIndex(idx);
                                        }}
                                        className="h-8 w-full text-[#A0AEC0] hover:text-white px-2 py-1.5 flex items-center 
                                                    text-sm font-medium hover:bg-[#2D3748] rounded-md"
                                    >+ Add Card
                                    </button>
                                )}

                                {/* ADD NEW CARD BUTTON */}
                                {isAddingCard && idx === activeListIndex && (
                                    <div className="flex flex-col w-full gap-2">
                                        <textarea 
                                            className="p-2 bg-[#1A1F2A] text-[#CBD5E1] placeholder-slate-400 text-sm rounded-lg 
                                                        focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                                            type="text" 
                                            value={newCard}
                                            placeholder="Task Title"
                                            onChange={(e) => setNewCard(e.target.value)}
                                        />
                                        <div className="w-full flex gap-4">                                        
                                            <button
                                                onClick={handleAddTask}
                                                className="h-8 px-3 py-1.5 text-sm font-medium bg-[#FCD34D] hover:bg-[#FBBF24] text-[#1F2937] rounded"
                                            >
                                                Add card
                                            </button>
                                            <button
                                                onClick={() => {setIsAddingCard(false)}}
                                                className="h-8 px-3 py-1.5 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white/80 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isAddingList && (
                        <div className="w-72 p-2.5 h-fit bg-list-background rounded-xl shadow-lg flex flex-col gap-3"
                        >
                            <input
                                value={newList}
                                onChange={(e) => setNewList(e.target.value)}
                                ref={inputRef}
                                type="text"
                                placeholder="Enter list title..."
                                className="h-10 px-3 rounded bg-slate-900 text-[#afabab] font-medium 
                                        placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
      
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddList}
                                    className="h-8 px-3 py-1.5 text-sm font-medium bg-brand-yellow hover:bg-brand-yellow-hover text-black rounded"
                                >
                                    Add list
                                </button>
                                <button
                                    onClick={() => setIsAddingList(false)}
                                    className="h-8 px-3 py-1.5 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white/80 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    {!isAddingList && (
                        <button
                            onClick={() => {
                                setIsAddingList(true); 
                                setIsAddingCard(false)}}
                            className="w-72 h-12 p-3 bg-[#e5e5e55f] rounded-xl text-[#afb3b8] font-medium 
                                    flex gap-1.5 items-center hover:bg-[#c9c9c950]"
                        >
                            <p className="text-lg">+</p> Add a list
                        </button>
                    )}
                </div>
            </div>
            <ShareBoardModal 
                boardMembers={board.BoardMembers}
                active={modalActive}
                onClose={() => setModalActive(false)}
            />
        </AuthenticatedLayout>
    )
}

export default BoardView