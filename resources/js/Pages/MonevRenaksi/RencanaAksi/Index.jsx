import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import DropdownMenu from "@/Components/DropdownMenu";
import Modal from "@/Components/Modal";
import { router, useForm, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";

export default function Index({ id, auth, dataRencanaAksi }) {
    console.log(dataRencanaAksi);

    const { flash } = usePage().props;

    const [openModal, setOpenModal] = React.useState(false);
    const [mode, setMode] = React.useState("create");

    const {
        data,
        setData,
        post,
        patch,
        put,
        delete: destroy,
        processing,
        transform,
        errors,
        setError,
        reset,
        clearErrors,
    } = useForm({
        rencana_aksi: "",
        target: "",
        realisasi: "",
        capaian: "",
        catatan: "",
        tindak_lanjut: "",
        bukti_pendukung: null,
        feedback: null,
        feedback_by: null,
    });

    const columns = React.useMemo(
        () => [
            {
                header: "No",
                id: "rowNumber",
                cell: (info) => {
                    const rowNumber =
                        (dataRencanaAksi.current_page - 1) *
                            dataRencanaAksi.per_page +
                        info.row.index +
                        1;
                    return <div>{rowNumber}</div>;
                },
            },
            {
                accessorKey: "rencana_aksi",
                header: "Rencana Aksi",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorKey: "target",
                header: "Target",
            },
            {
                accessorKey: "realisasi",
                header: "Realisasi",
            },
            {
                accessorKey: "capaian",
                header: "Capaian",
            },
            {
                accessorKey: "catatan",
                header: "Capaian Monev",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorKey: "tindak_lanjut",
                header: "Tindak Lanjut",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorKey: "feedback",
                header: "Feedback",
                cell: (info) => {
                    return <div className="w-32">{info.getValue() ?? "-"}</div>;
                },
            },
            {
                accessorKey: "feedback_by",
                header: "FeedbackBy",
                cell: (info) => {
                    return (
                        <div className="w-32">
                            {info.getValue()?.name ?? "-"}
                        </div>
                    );
                },
            },
            {
                header: "Bukti Pendukung",
                cell: (info) => {
                    const file = info.row.original.bukti_pendukung;

                    return (
                        <a
                            href={`/storage/data-laporan-monev-renaksi/${file}`}
                            target="_blank"
                        >
                            <PrimaryButton disabled={file == null}>
                                Lihat
                            </PrimaryButton>
                        </a>
                    );
                },
            },
            {
                id: "actions",
                header: "Aksi",
                cell: (info) => {
                    const row = info.row.original;

                    return (
                        <DropdownMenu
                            buttonText="View"
                            menuItems={[
                                {
                                    label: "Feedback",
                                    onClick: () => {
                                        router.visit(
                                            route(
                                                "data-laporan-monev-renaksi.rencana-aksi.edit",
                                                {
                                                    data_laporan_monev_renaksi:
                                                        id,
                                                    rencana_aksi: row.id,
                                                }
                                            )
                                        );
                                    },
                                },
                                {
                                    label: "Ubah",
                                    onClick: () => {
                                        setMode("edit");
                                        setData((prev) => ({
                                            ...prev,
                                            id: row.id,
                                            rencana_aksi: row.rencana_aksi,
                                            target: row.target,
                                            realisasi: row.realisasi,
                                            capaian: row.capaian,
                                            catatan: row.catatan,
                                            tindak_lanjut: row.tindak_lanjut,
                                        }));
                                        setOpenModal(true);
                                    },
                                },
                                {
                                    label: "Hapus",
                                    onClick: () => {
                                        handleDelete(id, row.id);
                                    },
                                },
                            ]}
                        />
                    );
                },
            },
        ],
        [dataRencanaAksi.current_page, dataRencanaAksi.per_page]
    );

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }

        flash.success = null;
        flash.error = null;
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("data-laporan-monev-renaksi.rencana-aksi.store", id), {
                forceFormData: true,
                onSuccess: () => {
                    flash.success = null;
                    closeModal();
                },
            });
        }

        if (mode === "edit") {
            transform((formData) => ({
                ...formData,
                _method: "PUT",
            }));

            post(
                route("data-laporan-monev-renaksi.rencana-aksi.update", {
                    data_laporan_monev_renaksi: id,
                    rencana_aksi: data.id,
                }),
                {
                    forceFormData: true,
                    onSuccess: () => {
                        flash.success = null;
                        closeModal();
                    },
                }
            );
        }
    };

    const handleDelete = (monevRenaksiId, rencanaAksi) => {
        if (confirm("Are you sure you want to delete this data?")) {
            destroy(
                route("data-laporan-monev-renaksi.rencana-aksi.destroy", {
                    data_laporan_monev_renaksi: monevRenaksiId,
                    rencana_aksi: rencanaAksi,
                }),
                {
                    onSuccess: () => {
                        flash.success = null;
                    },
                    onError: () => {
                        flash.error = null;
                    },
                }
            );
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
            title="Data Laporan Monev Renaksi - Data Rencana Aksi"
        >
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
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                            onClick={() => {
                                setOpenModal(true);
                                setMode("create");
                            }}
                        >
                            Tambah Data
                        </button>
                    </div>
                </div>

                <Table columns={columns} rows={dataRencanaAksi} />
            </div>

            <Modal show={openModal} onClose={closeModal}>
                <form className="p-6" onSubmit={submit}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Laporan Monev Renaksi
                    </h2>

                    <div className="flex flex-col gap-4 mt-6">
                        <div>
                            <InputLabel className="mb-2">
                                Rencana Aksi
                            </InputLabel>
                            <TextInput
                                id="rencana_aksi"
                                className="w-full"
                                placeholder="Rencana Aksi"
                                value={data.rencana_aksi}
                                onChange={handleValueChange}
                                isFocused
                            />
                            <InputError
                                message={errors.rencana_aksi}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Target</InputLabel>
                            <TextInput
                                id="target"
                                className="w-full"
                                placeholder="Target"
                                value={data.target}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.target}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Realisasi</InputLabel>
                            <TextInput
                                id="realisasi"
                                className="w-full"
                                placeholder="Realisasi"
                                value={data.realisasi}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.realisasi}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Capaian</InputLabel>
                            <TextInput
                                id="capaian"
                                className="w-full"
                                placeholder="Capaian"
                                value={data.capaian}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.capaian}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Capaian Monev
                            </InputLabel>
                            <TextInput
                                id="catatan"
                                className="w-full"
                                placeholder="Capaian Monev"
                                value={data.catatan}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.catatan}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Tindak Lanjut
                            </InputLabel>
                            <TextInput
                                id="tindak_lanjut"
                                className="w-full"
                                placeholder="Tindak Lanjut"
                                value={data.tindak_lanjut}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.tindak_lanjut}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Bukti Pendukung
                            </InputLabel>
                            <FileUploader
                                id="bukti_pendukung"
                                classes="full-width-uploader"
                                label="Upload Bukti Pendukung"
                                maxSize={5}
                                hoverTitle="Klik atau seret file"
                                handleChange={(file) => {
                                    setData((prev) => ({
                                        ...prev,
                                        bukti_pendukung: file,
                                    }));
                                }}
                                onSizeError={(file) => {
                                    setError(
                                        "bukti_pendukung",
                                        "Upload file tidak boleh lebih dari 5MB"
                                    );
                                }}
                            />
                            <div></div>
                            <InputError
                                message={errors.bukti_pendukung}
                                className="mt-1"
                            />
                        </div>

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
