import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Table from "@/Components/Table";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import React from "react";

const columns = [
    {
        accessorKey: "kinerja",
        header: "Kinerja",
    },
    {
        accessorKey: "indikator",
        header: "Indikator Kinerja Individu",
    },
];

const rows = {
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

const tribulanColumns = [
    {
        accessorKey: "rencana_aksi",
        header: "Rencana Aksi",
    },
    {
        accessorKey: "target",
        header: "Target",
    },
    // {
    //     accessorKey: "feedback",
    //     header: "Feedback",
    // },
    // {
    //     accessorKey: "feedback_by",
    //     header: "Feedback Oleh",
    //     cell: (info) => info.getValue()?.name ?? "-",
    // },
];

const tribulanRows = {
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

export default function Feedback() {
    const { data, setData, post, processing, transform, errors, clearErrors } =
        useForm({
            feedback: "",
        });

    return (
        <AuthenticatedLayout>
            <div className="p-10 bg-white">
                <Table columns={columns} rows={rows} />
            </div>

            <div className="p-10 mt-6 bg-white">Coming Soon</div>

            <div className="mt-6 bg-white">
                <form className="p-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <TextInput
                                id="feedback"
                                type="text"
                                className="w-full"
                                name="feedback"
                                value={data.feedback}
                                onChange={(e) =>
                                    setData("feedback", e.target.value)
                                }
                                placeholder="Feedback"
                            />
                            <InputError message={errors.nip} className="mt-2" />
                        </div>
                    </div>

                    <div className="mt-6">
                        <PrimaryButton>
                            {processing ? "Loading..." : "Submit"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
