import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { toast } from "react-toastify";
import Form from "./Form";

export default function Index({ dataKurja }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            flash.success = null;
        }
        if (flash.error) {
            toast.error(flash.error);
            flash.error = null;
        }
    }, [flash]);

    const columns = React.useMemo(
        () => [
            {
                accessorKey: "kinerja",
                header: "Kinerja",
            },
            {
                accessorKey: "indikator_kinerja_individu",
                header: "Indikator Kinerja Individu",
            },
            {
                accessorKey: "target",
                header: "Target",
            },
            {
                accessorKey: "realisasi",
                header: "Realisasi s.d Tribulan 1",
            },
            {
                accessorKey: "capaian",
                header: "Capaian (%)",
            },
            {
                header: "Keterkaitan Dengan Komponen Perencanaan",
                cell: (info) => {
                    return (
                        <Link
                            href={route(
                                "data-laporan-kurja.keterkaitan.index",
                                info.row.original.id
                            )}
                        >
                            <PrimaryButton>Lihat</PrimaryButton>
                        </Link>
                    );
                },
            },
            {
                accessorKey: "penjelasan",
                header: "Penjelasan",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorKey: "alternatif",
                header: "ALTERNATIF/ UPAYA YANG TELAH DILAKUKAN",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },

            {
                accessorKey: "actions",
                header: "Aksi",
                cell: (info) => {
                    return (
                        <div className="flex items-center space-x-2">
                            Coming Soon
                        </div>
                    );
                },
            },
        ],
        [dataKurja.current_page, dataKurja.per_page]
    );

    return (
        <AuthenticatedLayout title="Data Laporan Kurja">
            <div className="p-10 bg-white">
                <div className="flex items-center justify-between my-10">
                    {/* Search */}
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none rtl:inset-r-0 rtl:right-0 ps-3">
                            <svg
                                className="w-5 h-5 text-gray-500"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search for items"
                        />
                    </div>

                    <div className="space-x-2 text-sm">
                        <button className="px-4 py-2 text-blue-600 bg-blue-100 rounded-lg">
                            Export
                        </button>
                        <Form />
                    </div>
                </div>

                <Table columns={columns} rows={dataKurja} />
            </div>
        </AuthenticatedLayout>
    );
}
