import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Link } from "@inertiajs/react";

export default function Table({ columns, rows }) {
    const table = useReactTable({
        columns,
        data: rows.data,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: "onChange",
    });

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                    <thead className="text-xs text-[#B5B5C3] uppercase border-b border-dashed font-semibold tracking-wider">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        scope="col"
                                        className={`px-6 py-3 ${
                                            header.id === "actions"
                                                ? "sticky right-0 bg-white z-10" // Make actions column sticky
                                                : ""
                                        }`}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="text-[#7E8299] font-semibold text-sm">
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="bg-white border-b border-dashed hover:bg-gray-50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        scope="row"
                                        className={`px-6 py-4 ${
                                            cell.column.id === "actions"
                                                ? "sticky right-0 bg-white z-1" // Make actions column sticky
                                                : ""
                                        }`}
                                        style={{
                                            width: `${cell.column.getSize()}px`,
                                        }}
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav
                className="flex flex-wrap items-center justify-between pt-4 flex-column md:flex-row"
                aria-label="Table navigation"
            >
                <span className="block w-full mb-4 text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto">
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                        {rows.from} - {rows.to}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                        {rows.total}
                    </span>
                </span>

                <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
                    {rows.links.map((link, index) => {
                        const isDisabled = link.url === null;

                        return (
                            <Link
                                key={index}
                                href={link.url || ""}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                                className={`flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-blue-100 hover:text-gray-700 ${
                                    link.active
                                        ? "bg-blue-50 text-blue-600 border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300"
                                } ${
                                    isDisabled
                                        ? "cursor-not-allowed opacity-50"
                                        : ""
                                } transition ease-in-out duration-150`}
                                disabled={isDisabled}
                            />
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
