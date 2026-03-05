import { Navbar } from "./Components/Navbar";
import { Outlet } from "react-router-dom";

export function Layout({ isLoggedIn, handleLogout }) {
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <main>
                <Outlet />
            </main>
        </>
    )
}