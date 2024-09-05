import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const rows = {
    data: [
        {
            kinerja: "Meningkatnya pertumbuhan cadangan pangan",
            indikator: "Persentase cadangan pangan masyarakat",
            target: "91.86%",
            capaian: 27,
        },
    ],
};

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
        accessorKey: "target",
        header: "Target",
    },
    {
        accessorKey: "capaian",
        header: "Capaian (%)",
    },
    {
        header: "Keterkaitan Dengan Komponen Perencanaan",
        cell: (info) => {
            return (
                <Link>
                    <PrimaryButton>Lihat</PrimaryButton>
                </Link>
            );
        },
        size: 200,
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

export default function Index() {
    return (
        <AuthenticatedLayout title="Data Laporan Kurja">
            <div className="p-10 bg-white">
                <div className="flex items-center justify-between my-10">
                    <div className="">
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

                <div className="overflow-x-auto">
                    <Table columns={columns} rows={rows} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
