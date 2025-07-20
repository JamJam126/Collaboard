import AuthenticatedLayout from "../layout/AuthenticatedLayout"
import BoardCard from "../components/BoardCard"
import ChillGuy from "../assets/avatars/ChillGuy.jpg"
import Nero from "../assets/avatars/Nero.jpg"
import Chopper from "../assets/avatars/Chopper.jpg"
import Avatar1 from "../assets/avatars/avatar1.png"
import Avatar2 from "../assets/avatars/avatar2.png"
import Avatar3 from "../assets/avatars/avatar3.png"
import Avatar4 from "../assets/avatars/avatar4.jpg"

const dummyData = [
  {
    title: "Marketing Strategy",
    isStarred: true,
    progress: 60,
    tasks: {
      total: 10,
      inProgress: 3,
    },
    users: [
      { name: "Alice", avatar: ChillGuy },
      { name: "Bob", avatar: Nero },
    ],
    others: 3,
  },
  {
    title: "UI Revamp",
    isStarred: false,
    progress: 40,
    tasks: {
      total: 15,
      inProgress: 5,
    },
    users: [
      { name: "Carol", avatar: Chopper },
      { name: "Alice", avatar: Avatar1 },
    ],
    others: 1,
  },
  {
    title: "Product Launch",
    isStarred: true,
    progress: 80,
    tasks: {
      total: 20,
      inProgress: 2,
    },
    users: [
      { name: "Nero", avatar: Avatar3 },
      { name: "Bob", avatar: Avatar2 },
    ],
    others: 4,
  },
  {
    title: "Team Onboarding",
    isStarred: false,
    progress: 25,
    tasks: {
      total: 8,
      inProgress: 4,
    },
    users: [
      { name: "Luna", avatar: Nero },
      { name: "Carol", avatar: Avatar4 },
    ],
    others: 2,
  },
];

const BoardsPage = () => {
    return(
        <AuthenticatedLayout>
            <div className="px-6 flex flex-col gap-6">
                
                {/* FOR BOARD TITLE AND SUB-TEXT*/}
                <div className="flex flex-col gap1">
                    <h1 className="text-white font-bold text-2xl">Boards</h1>
                    <h1 className="text-[#9CA3AF] font-medium text-sm">Boards you're part of, shared with you, or owned by you.</h1>
                </div> 

                {/* STARRED BOARDS */}
                <div className="py-2 flex flex-col gap-4">
                    <h1 className="text-[#E5E5E5] font-semibold text-xl">Starred Boards</h1>
                    <div className="flex gap-6 text-white overflow-x-auto scrollbar-hidden"
                    >
                        {dummyData.map((data, idx) => (
                            <BoardCard 
                                isStarred={data.isStarred}
                                title={data.title}
                                users={data.users}
                                progress={data.progress}
                                tasks={data.tasks}
                                others={data.others}
                            />
                        ))}
                    </div>
                </div>

				{/* RECENTLY VIEWED BOARDS */}
                <div className="py-2 flex flex-col gap-4">
                    <h1 className="text-[#E5E5E5] font-semibold text-xl">Recently Viewed Boards</h1>
                    <div className="flex gap-6 text-white overflow-x-auto scrollbar-hidden"
                    >
                        {dummyData.map((data, idx) => (
                            <BoardCard 
                                isStarred={data.isStarred}
                                title={data.title}
                                users={data.users}
                                progress={data.progress}
                                tasks={data.tasks}
                                others={data.others}
                            />
                        ))}
                    </div>
                </div>

				{/* YOUR WORKSPACES */}
                <div className="py-2 flex flex-col gap-4">
                    <h1 className="text-[#E5E5E5] font-semibold text-xl">Your Workspaces</h1>
                    <div className="flex gap-6 text-white overflow-x-auto scrollbar-hidden"
                    >
                        {dummyData.map((data, idx) => (
                            <BoardCard 
                                isStarred={data.isStarred}
                                title={data.title}
                                users={data.users}
                                progress={data.progress}
                                tasks={data.tasks}
                                others={data.others}
                            />
                        ))}
                    </div>
                </div>
            
			</div>
        </AuthenticatedLayout>
    )
}

export default BoardsPage