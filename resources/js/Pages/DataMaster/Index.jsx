import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import TextInput from "@/Components/TextInput";
import Select from "react-select";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Table from "@/Components/Table";

const columns = [
    {
        accessorKey: "users.nip",
        header: "NIP",
    },
    {
        accessorKey: "users.name",
        header: "Nama",
    },
    {
        accessorFn: (row) => row.users?.jabatan?.name ?? "-",
        header: "Jabatan",
    },
    {
        accessorKey: "feedback",
        header: "Feedback",
        cell: (info) => {
            console.log("info", info);

            return info.getValue() ? (
                <div className="text-[#50cd89] bg-[#E8FFF3] rounded-sm text-xs py-1 font-bold w-16 text-center">
                    Ya
                </div>
            ) : (
                <div className="text-[#F1416C] bg-[#FFF5F8] w-16 text-center rounded-sm text-xs py-1 font-bold">
                    Tidak
                </div>
            );
        },
    },
    {
        accessorFn: (row) =>
            row.penilaian_jabatan.map((data) => data.jabatan.nama).join(", "),
        header: "Penilaian ke",
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

export default function Index({ dataMaster, options }) {
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [selectedJabatan, setSelectedJabatan] = React.useState([]);
    const [showFeedback, setShowFeedback] = React.useState(false);
    const { data, setData, post, processing, transform, errors, clearErrors } =
        useForm({
            nip: "",
            name: "",
            password: "",
            feedback: false,
            jabatan: null,
            penilaianKeJabatan: [],
        });

    const closeModal = () => {
        setOpenCreateModal(false);

        clearErrors();
    };

    const handleChange = (selected) => {
        setSelectedJabatan(selected);
    };

    const handleValueChange = (e) => {
        const { id, value } = e.target;

        setData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();

        transform((formData) => ({
            ...formData,
            jabatan: formData.jabatan?.value,
            penilaianKeJabatan: formData.penilaianKeJabatan.map(
                (jabatan) => jabatan?.value
            ),
        }));

        post(route("data-master.store"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    console.log(dataMaster);

    return (
        <AuthenticatedLayout title="Data Master">
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
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                            onClick={() => setOpenCreateModal(true)}
                        >
                            Tambah Data
                        </button>
                    </div>
                </div>

                <Table columns={columns} rows={dataMaster} />
            </div>

            <Modal show={openCreateModal} onClose={closeModal}>
                <form className="p-6" onSubmit={submit}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Master
                    </h2>

                    <div className="flex flex-col gap-4 mt-6">
                        <div>
                            <TextInput
                                id="nip"
                                type="number"
                                className="w-full"
                                name="nip"
                                value={data.nip}
                                onChange={handleValueChange}
                                isFocused
                                placeholder="NIP Pegawai"
                            />
                            <InputError message={errors.nip} className="mt-2" />
                        </div>

                        <div>
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                className="w-full"
                                value={data.name}
                                onChange={handleValueChange}
                                placeholder="Nama Pegawai"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="w-full"
                                onChange={handleValueChange}
                                placeholder="Password"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <Select
                                name="jabatan"
                                options={options}
                                value={data.jabatan}
                                onChange={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        jabatan: value,
                                    }));
                                }}
                            />
                            <InputError
                                message={errors.jabatan}
                                className="mt-2"
                            />
                        </div>

                        <label className="flex items-center">
                            <Checkbox
                                id="feedback"
                                checked={data.feedback}
                                onChange={(e) => {
                                    setData((prev) => ({
                                        ...prev,
                                        feedback: e.target.checked,
                                    }));
                                }}
                            />
                            <span className="text-sm text-gray-600 ms-2">
                                Feedback
                            </span>
                        </label>

                        {data.feedback && (
                            <div>
                                <Select
                                    isMulti
                                    name="jabatan"
                                    options={options}
                                    value={data.penilaianKeJabatan}
                                    onChange={(value) => {
                                        setData((prev) => ({
                                            ...prev,
                                            penilaianKeJabatan: value,
                                        }));
                                    }}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                />
                                <InputError
                                    message={errors.penilaianKeJabatan}
                                    className="mt-2"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center mt-6 space-x-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton>
                            {processing ? "Loading..." : "Submit"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
