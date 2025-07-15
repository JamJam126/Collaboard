import Nav from "../components/Nav"
import SideBar from "../components/SideBar"

const AuthenticatedLayout = ({ children }) => {

    return(
        <div>
            <Nav />
            <div className="flex">
                <SideBar />
                <div className="content flex-1"> 
                    <div className="bg-[#2D3142] h-[695px]">
                        {children}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default AuthenticatedLayout