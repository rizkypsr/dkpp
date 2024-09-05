import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

export default function Index() {
    return (
        <AuthenticatedLayout title="Data Laporan Monev Renaksi">
            <div className="p-10 bg-white">
                <div className="flex items-center justify-between my-10">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg
                            className="absolute w-5 h-5 text-gray-400 left-3 top-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <div className="space-x-2">
                        <button className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg">
                            Filter
                        </button>
                        <button className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg">
                            Export
                        </button>
                        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">
                            Tambah Data
                        </button>
                    </div>
                </div>

                <table className="w-full overflow-hidden bg-white">
                    <thead className="font-semibold border-b border-dashed text-[#B5B5C3] text-sm tracking-wider text-left uppercase">
                        <tr>
                            <th className="px-6 py-3">No</th>
                            <th className="px-6 py-3">Kinerja</th>
                            <th className="px-6 py-3">
                                Indikator Kinerja Individu
                            </th>
                            <th className="px-6 py-3">Rencana Aksi</th>
                            <th className="px-6 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 divide-dashed text-[#7E8299] font-semibold">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">1</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                Meningkatnya pertumbuhan cadangan pangan
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                Persentase cadangan pangan masyarakat
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link>
                                    <PrimaryButton>Lihat</PrimaryButton>
                                </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                Coming Soon
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}
