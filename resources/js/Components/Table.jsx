import React from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";

export default function Table({ columns, rows }) {
    const table = useReactTable({
        columns,
        data: rows.data,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
            <table className="w-full bg-white">
                <thead className="font-semibold border-b border-dashed text-[#B5B5C3] text-xs tracking-wider text-left uppercase">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="py-3"
                                    style={{ width: `${header.getSize()}px` }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 divide-dashed text-[#7E8299] font-semibold text-sm">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="py-4 whitespace-nowrap"
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

            {/* <div className="flex justify-center mt-6">
                <div className="inline-flex">
                    {rows.links.map((link, index) => {
                        const isDisabled = link.url === null;

                        return (
                            <Link
                                key={index}
                                href={link.url || ""}
                                className={`mx-1 px-4 py-2 border rounded ${
                                    link.active
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-gray-700 border-gray-300"
                                } ${
                                    isDisabled
                                        ? "cursor-not-allowed opacity-50"
                                        : "hover:bg-blue-100"
                                } transition ease-in-out duration-150`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={isDisabled}
                            />
                        );
                    })}
                </div>
            </div> */}
        </>
    );
}
