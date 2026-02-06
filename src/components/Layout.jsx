import { Outlet } from "react-router-dom";
import { Navbar }from "./Navbar.jsx";
import '../styles/Layout.scss';

export const Layout = () => {
    return(
        <div className="page">
            <Navbar />
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
};