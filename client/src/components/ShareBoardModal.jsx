
const ShareBoardModal = ({ active, onClose, onCreate }) => {

    if (!active) return null

    const handleClose = () => {
        onClose()
    }
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center text-white bg-zinc-800 
                        bg-opacity-70">
            <div className="bg-background-primary w-[1080px] p-6 rounded-xl shadow-lg 
                            relative flex flex-col gap-4"
            >

                <div className="flex justify-between items-center space-x-2 mt-6">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Close
                    </button>
                    <button 
                        // onClick={handleCreate}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create
                    </button>

                    
                </div>
            </div>
        </div>
    )
}

export default ShareBoardModal