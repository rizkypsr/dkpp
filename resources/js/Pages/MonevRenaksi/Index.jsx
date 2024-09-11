import React from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import Table from "@/Components/Table";
import DropdownMenu from "@/Components/DropdownMenu";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import { toast } from "react-toastify";

export default function Index({ auth, dataMonevRenaksi }) {
    const { flash } = usePage().props;

    const [openModal, setOpenModal] = React.useState(false);
    const [mode, setMode] = React.useState("create");

    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        transform,
        errors,
        reset,
        clearErrors,
    } = useForm({
        kinerja: "",
        indikator_kinerja_individu: "",
    });

    const columns = React.useMemo(
        () => [
            {
                header: "No",
                id: "rowNumber",
                size: 50,
                cell: (info) => {
                    // Calculate continuous row number
                    const rowNumber =
                        (dataMonevRenaksi.current_page - 1) *
                            dataMonevRenaksi.per_page +
                        info.row.index +
                        1;
                    return <div>{rowNumber}</div>;
                },
            },
            {
                accessorKey: "kinerja",
                header: "Kinerja",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorKey: "indikator_kinerja_individu",
                header: "Indikator Kinerja Individu",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                header: "Rencana Aksi",
                cell: (info) => {
                    return (
                        <Link
                            href={route(
                                "data-laporan-monev-renaksi.rencana-aksi.index",
                                {
                                    id: info.row.original.id,
                                }
                            )}
                        >
                            <PrimaryButton>Lihat</PrimaryButton>
                        </Link>
                    );
                },
            },
            {
                id: "actions",
                header: "Aksi",
                cell: (info) => {
                    const row = info.row.original;
                    const id = info.row.original.id;

                    return (
                        <DropdownMenu
                            buttonText="View"
                            menuItems={[
                                {
                                    label: "Ubah",
                                    onClick: () => {
                                        setMode("edit");
                                        setData((prev) => ({
                                            ...prev,
                                            id: row.id,
                                            kinerja: row.kinerja,
                                            indikator_kinerja_individu:
                                                row.indikator_kinerja_individu,
                                        }));
                                        setOpenModal(true);
                                    },
                                },
                                {
                                    label: "Hapus",
                                    onClick: () => {
                                        handleDelete(id);
                                    },
                                },
                            ]}
                        />
                    );
                },
            },
        ],
        [dataMonevRenaksi.current_page, dataMonevRenaksi.per_page]
    );

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

    const submit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("data-laporan-monev-renaksi.store"), {
                onSuccess: () => {
                    flash.success = null;
                    closeModal();
                },
            });
        }

        if (mode === "edit") {
            patch(route("data-laporan-monev-renaksi.update", data.id), {
                onSuccess: () => {
                    flash.success = null;
                    closeModal();
                },
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this data?")) {
            destroy(route("data-laporan-monev-renaksi.destroy", id), {
                onSuccess: () => {
                    toast.success("Data berhasil dihapus");
                },
                onError: () => {
                    toast.error("Data gagal dihapus");
                },
            });
        }
    };

    const handleValueChange = (e) => {
        const { id, value } = e.target;

        setData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const closeModal = () => {
        reset();
        clearErrors();

        setOpenModal(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Data Laporan Monev Renaksi"
        >
            <div className="p-10 bg-white">
                <div className="flex items-center justify-between my-10">
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
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                            onClick={() => {
                                setMode("create");
                                setOpenModal(true);
                            }}
                        >
                            Tambah Data
                        </button>
                    </div>
                </div>

                <Table columns={columns} rows={dataMonevRenaksi} />
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <form className="p-6" onSubmit={submit}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Laporan Monev Renaksi
                    </h2>

                    <div className="flex flex-col gap-4 mt-6">
                        <TextInput
                            id="kinerja"
                            placeholder="Kinerja"
                            value={data.kinerja}
                            onChange={handleValueChange}
                            isFocused
                        />
                        <InputError message={errors.kinerja} className="mt-2" />

                        <TextInput
                            id="indikator_kinerja_individu"
                            placeholder="Indikator Kinerja Individu"
                            value={data.indikator_kinerja_individu}
                            onChange={handleValueChange}
                        />
                        <InputError
                            message={errors.indikator_kinerja_individu}
                            className="mt-2"
                        />

                        <div className="flex items-center justify-center mt-6 space-x-3">
                            <SecondaryButton onClick={closeModal}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton disabled={processing}>
                                {processing ? "Loading..." : "Submit"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
