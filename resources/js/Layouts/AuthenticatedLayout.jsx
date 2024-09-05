import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Authenticated({ user, title, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Sidebar starts closed on mobile
    const [isMobile, setIsMobile] = React.useState(false);

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Effect to handle window resize and set mobile state
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Set to true if the width is less than or equal to 768px
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true); // Open sidebar by default on desktop
            } else {
                setIsSidebarOpen(false); // Close sidebar by default on mobile
            }
        };

        handleResize(); // Initial check

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Cleanup the event listener
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main Content */}
            <div
                className={`flex-1 min-h-screen transition-all duration-300 ease-in-out ${
                    isSidebarOpen ? "ml-80" : "ml-0"
                } lg:ml-80`}
            >
                {/* Header */}
                <div className="flex items-center justify-between h-16 px-8">
                    <button
                        className="text-gray-800 lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <GiHamburgerMenu />
                    </button>
                    <p className="text-lg font-semibold">{title}</p>
                    <Link
                        href={route("logout")}
                        className="text-sm underline cursor-pointer"
                        method="post"
                        as="button"
                    >
                        ADMIN
                    </Link>
                </div>

                {/* Content */}
                <div className="p-8 bg-[#F5F8FA] min-h-[calc(100vh-80px)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
