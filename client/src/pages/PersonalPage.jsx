import { useEffect, useState } from "react"
import AuthenticatedLayout from "../layout/AuthenticatedLayout"
import { getPersonalBoard, getListsByBoardId } from "../services/api"

const PersonalPage = () => {

    const [ boardData, setBoardData ] = useState(null)
    const [ lists, setLists ] = useState([])

    const fetchPersonalBoard = async () => {
        try {
            const data = await getPersonalBoard()
            setBoardData(data) 

            if (data?.id) {
                const listData = await getListsByBoardId(data.id)
                setLists(listData)
            }
        } catch (error) {
            console.error("Error fetching personal board and lists:", error)
        }
    }
    
    useEffect(() => {
        fetchPersonalBoard()
    }, [])
    
    return(
        <AuthenticatedLayout>
            <div className="p-4 flex gap-4 h-full">
                {lists.map((list, idx) => (
                    <div 
                        className="w-72 h-fit p-2.5 bg-[#1F2432] rounded-xl shadow-md text-[#E2E8F0] flex flex-col 
                                gap-1.5"
                        key={list.id}
                    >

                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    )
}

export default PersonalPage