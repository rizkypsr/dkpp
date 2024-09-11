import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoChevronDownOutline } from "react-icons/io5";

export default function DropdownMenu({ buttonText, menuItems }) {
    return (
        <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-[#F5F8FA] py-1.5 px-3 text-xs font-semibold text-[#7E8299] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#eff3f5] data-[focus]:outline-1 data-[focus]:outline-white">
                {buttonText}
                <IoChevronDownOutline className="size-4 fill-white/60" />
            </MenuButton>
            <MenuItems
                anchor="bottom"
                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black shadow-md transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                transition
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index}>
                        {/* <a
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                            href={item.href}
                        >
                            {item.label}
                        </a> */}
                        <button
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100"
                            onClick={item.onClick}
                        >
                            {item.label}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
}
