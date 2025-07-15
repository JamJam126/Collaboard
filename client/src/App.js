import "./index.css"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import BoardsPage from "./pages/BoardsPage";
import PersonalPage from "./pages/PersonalPage";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
    return (
        <SidebarProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />   
                    <Route path="/boards" element={<BoardsPage />} />
                    <Route path="/personal" element={<PersonalPage />} />
                </Routes>
            </BrowserRouter>
        </SidebarProvider>  
    );
}

export default App;
