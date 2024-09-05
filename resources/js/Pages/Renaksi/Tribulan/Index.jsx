import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";

const columns = [
    {
        accessorKey: "rencana_aksi",
        header: "Rencana Aksi",
    },
    {
        accessorKey: "target",
        header: "Target",
    },
    {
        accessorKey: "feedback",
        header: "Feedback",
    },
    {
        accessorKey: "feedback_by",
        header: "Feedback Oleh",
        cell: (info) => info.getValue()?.name ?? "-",
    },
    {
        accessorKey: "actions",
        header: "Aksi",
        cell: (info) => {
            return (
                <Link href={route("data-laporan-renaksi.feedback")}>
                    <PrimaryButton>Feedback</PrimaryButton>
                </Link>
            );
        },
    },
];

const rows = {
    data: [
        {
            rencana_aksi: "Rencana Aksi 1",
            target: "1 Kali",
            feedback: "Diperbaiki",
            feedback_by: {
                name: "John Doe",
            },
        },
        {
            rencana_aksi: "Rencana Aksi 2",
            target: "1 Kali",
            feedback: null,
            feedback_by: null,
        },
        {
            rencana_aksi: "Rencana Aksi 3",
            target: "1 Kali",
            feedback: "Diperbaiki",
            feedback_by: {
                name: "John Doe",
            },
        },
        {
            rencana_aksi: "Rencana Aksi 4",
            target: "1 Kali",
            feedback: null,
            feedback_by: null,
        },
        {
            rencana_aksi: "Rencana Aksi 5",
            target: "1 Kali",
            feedback: "Diperbaiki",
            feedback_by: {
                name: "John Doe",
            },
        },
    ],
};

export default function Index() {
    return (
        <AuthenticatedLayout title="Data Laporan Renaksi - Tribulan (1-4)">
            <div className="p-10 bg-white">
                <h1 className="mb-6 text-lg font-bold text-center">
                    Tribulan 1
                </h1>

                <Table columns={columns} rows={rows} />
            </div>

            <div className="p-10 mt-6 bg-white">
                <h1 className="mb-6 text-lg font-bold text-center">
                    Tribulan 2
                </h1>

                <Table columns={columns} rows={rows} />
            </div>

            <div className="p-10 mt-6 bg-white">
                <h1 className="mb-6 text-lg font-bold text-center">
                    Tribulan 3
                </h1>

                <Table columns={columns} rows={rows} />
            </div>

            <div className="p-10 mt-6 bg-white">
                <h1 className="mb-6 text-lg font-bold text-center">
                    Tribulan 4
                </h1>

                <Table columns={columns} rows={rows} />
            </div>
        </AuthenticatedLayout>
    );
}
