import Nav from "../components/Nav"
import SideBar from "../components/SideBar"

const AuthenticatedLayout = ({ children, hideNav = false, hideBar = false }) => {

    return(
        <div className="h-screen flex flex-col">
            {!hideNav ? <Nav /> : null }
            <div className="flex flex-1">
                {!hideBar ? <SideBar/> : null}
                <div className="content flex-1 overflow-hidden"> 
                    <div className="bg-background-primary h-full">
                        {children}
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default AuthenticatedLayout