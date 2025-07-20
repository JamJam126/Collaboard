import "./index.css"
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import BoardsPage from "./pages/BoardsPage";
import PersonalPage from "./pages/PersonalPage";
import LoginPage from "./pages/LoginPage";
import { SidebarProvider } from "./context/SidebarContext";
import ProtectedRoute from "./components/protectedRoute";

function App() {
    return (
        <SidebarProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <HomePage/>
                            </ProtectedRoute>
                        } />   
                        <Route path="/boards" element={<BoardsPage />} />
                        <Route path="/personal" element={<PersonalPage />} />
                        <Route path="/login" element={<LoginPage/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </SidebarProvider>  
    );
}

export default App;
