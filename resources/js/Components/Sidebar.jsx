import React from "react";
import { motion } from "framer-motion";
import menuItems from "@/Config/menuItems";
import { usePage, Link } from "@inertiajs/react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [expandedSection, setExpandedSection] = React.useState("");
    const { url } = usePage(); // Get current URL from Inertia.js

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? "" : section);
    };

    const isActivePath = (path) => url.startsWith(path);

    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? 0 : "-100%" }}
            transition={{ stiffness: 100 }}
            className={`fixed top-0 left-0 w-80 h-full bg-[#181C32] shadow-lg z-30 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 lg:block lg:w-80`}
        >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 h-16 text-white bg-[#13131b]">
                <Link href="/dashboard" className="text-lg font-bold">
                    DKPP
                </Link>
                <button
                    className="text-white lg:hidden"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
            </div>

            {/* Sidebar Content */}
            <div className="p-4 space-y-3 text-sm leading-5 text-white">
                {menuItems.map((item) => (
                    <div key={item.link}>
                        {item.submenu ? (
                            <button
                                className={`flex items-center w-full py-2 text-left ${
                                    isActivePath(item.link) ||
                                    expandedSection === item.link
                                        ? "text-white"
                                        : "text-gray-400"
                                } hover:text-white`}
                                onClick={() => toggleSection(item.link)}
                            >
                                {/* Render icon if available */}
                                {item.icon && <item.icon className="mr-2" />}
                                <span className="flex-1">{item.name}</span>
                                {item.submenu && (
                                    <span
                                        className={`transition-transform duration-300 ml-2 ${
                                            expandedSection === item.link
                                                ? "rotate-90"
                                                : ""
                                        }`}
                                    >
                                        ➤
                                    </span>
                                )}
                            </button>
                        ) : (
                            <Link
                                href={item.link}
                                className={`flex items-center w-full py-2 text-left ${
                                    isActivePath(item.link)
                                        ? "text-white"
                                        : "text-gray-400"
                                } hover:text-white`}
                            >
                                {/* Render icon if available */}
                                {item.icon && <item.icon className="mr-2" />}
                                <span className="flex-1">{item.name}</span>
                            </Link>
                        )}

                        {item.submenu && expandedSection === item.link && (
                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="pl-8 mt-2"
                            >
                                {item.submenu.map((subitem) => (
                                    <li
                                        key={subitem.link}
                                        className="flex items-center py-1"
                                    >
                                        <span className="flex items-center justify-center w-1.5 h-1.5 mr-2 bg-[#9899ac] rounded-full"></span>
                                        <Link
                                            href={subitem.link}
                                            className="text-[#9899ac] hover:text-white"
                                        >
                                            {subitem.name}
                                        </Link>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Sidebar;
