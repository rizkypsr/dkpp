import React from "react";

export default function SidebarMenuItem({ name, link, icon, active }) {
    return (
        <div className="menu-item">
            <a className="menu-link" href={link}>
                <span className="menu-icon">
                    <span className="svg-icon svg-icon-2">{icon}</span>
                </span>
                <span className="menu-title">{name}</span>
            </a>
        </div>
    );
}
