import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const columns = [
    {
        accessorKey: "kinerja",
        header: "Kinerja",
    },
    {
        accessorKey: "indikator",
        header: "Indikator Kinerja Individu",
    },
    {
        header: "Tribulan",
        cell: (info) => {
            return (
                <Link href={route("data-laporan-renaksi.tribulan")}>
                    <PrimaryButton>Lihat</PrimaryButton>
                </Link>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Aksi",
        cell: (info) => {
            return (
                <div className="flex items-center space-x-2">Coming Soon</div>
            );
        },
    },
];

const data = {
    data: [
        {
            kinerja: "Kinerja 1",
            indikator: "Indikator Kinerja 1",
        },
        {
            kinerja: "Kinerja 2",
            indikator: "Indikator Kinerja 2",
        },
        {
            kinerja: "Kinerja 3",
            indikator: "Indikator Kinerja 3",
        },
        {
            kinerja: "Kinerja 4",
            indikator: "Indikator Kinerja 4",
        },
        {
            kinerja: "Kinerja 5",
            indikator: "Indikator Kinerja 5",
        },
    ],
};

export default function Index() {
    return (
        <AuthenticatedLayout title="Data Laporan Renaksi">
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
                    <div className="space-x-2 text-sm">
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

                <Table columns={columns} rows={data} />
            </div>
        </AuthenticatedLayout>
    );
}
