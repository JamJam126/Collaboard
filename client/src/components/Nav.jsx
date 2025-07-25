import SearchBar from "./SearchBar"
import Avatar from "./Avatar"
import Avatar3 from "../assets/avatars/avatar3.png"

const Nav = () => {

    return(
        <div className="bg-background-primary h-20 border-b-2 border-border py-4 px-6 
                        flex justify-between items-center flex-shrink-0"
        >
            <h1 className="font-extrabold text-brand-yellow text-2xl">LOGO</h1>
            <SearchBar />
            <Avatar src={Avatar3}/>
        </div>
    )
}

export default Nav