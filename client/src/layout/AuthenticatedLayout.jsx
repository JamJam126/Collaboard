import Nav from "../components/Nav"
import SideBar from "../components/SideBar"

const AuthenticatedLayout = ({ children }) => {

    return(
        <div>
            <Nav />
            <div className="flex">
                <SideBar />
                <div className="content flex-1 overflow-hidden"> 
                    <div className="bg-background-primary py-6">
                        {children}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default AuthenticatedLayout