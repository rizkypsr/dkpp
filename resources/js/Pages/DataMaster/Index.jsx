import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Select from "react-select";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Table from "@/Components/Table";
import DropdownMenu from "@/Components/DropdownMenu";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import InputLabel from "@/Components/InputLabel";

export default function Index({ auth, dataMaster, options }) {
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [mode, setMode] = React.useState("create");
    const [loadingCreateJabatan, setLoadingCreateJabatan] =
        React.useState(false);

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
        nip: "",
        name: "",
        password: "",
        feedback: false,
        jabatan: null,
        penilaianKeJabatan: [],
    });
    const { flash } = usePage().props;

    const columns = React.useMemo(
        () => [
            {
                header: "No",
                id: "rowNumber",
                size: 50,
                cell: (info) => {
                    // Calculate continuous row number
                    const rowNumber =
                        (dataMaster.current_page - 1) * dataMaster.per_page +
                        info.row.index +
                        1;
                    return <div>{rowNumber}</div>;
                },
            },
            {
                accessorKey: "users.nip",
                header: "NIP",
            },
            {
                accessorKey: "users.name",
                header: "Nama",
                cell: (info) => {
                    return <div className="w-72">{info.getValue()}</div>;
                },
            },
            {
                accessorFn: (row) => row.users?.jabatan?.nama ?? "-",
                header: "Jabatan",
            },
            {
                accessorKey: "feedback",
                header: "Feedback",
                cell: (info) => {
                    return info.getValue() == 1 ? (
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
                    row.penilaian_jabatan
                        .map((data) => data?.jabatan?.nama)
                        .join(", "),
                header: "Penilaian ke",
                size: 300,
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
                                            nip: row.users.nip,
                                            name: row.users.name,
                                            jabatan: row.users.jabatan && {
                                                value: row.users.jabatan_id,
                                                label: row.users.jabatan.nama,
                                            },
                                            feedback:
                                                row.feedback == 1
                                                    ? true
                                                    : false,
                                            penilaianKeJabatan:
                                                row.penilaian_jabatan.map(
                                                    (data) => ({
                                                        value: data.jabatan.id,
                                                        label: data.jabatan
                                                            .nama,
                                                    })
                                                ),
                                        }));

                                        setOpenCreateModal(true);
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
        [dataMaster.current_page, dataMaster.per_page]
    );

    React.useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const closeModal = () => {
        reset();
        clearErrors();

        setOpenCreateModal(false);
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
            penilaianKeJabatan:
                formData.penilaianKeJabatan.length > 0
                    ? formData.penilaianKeJabatan.map(
                          (jabatan) => jabatan?.value
                      )
                    : null,
        }));

        if (mode === "create") {
            post(route("data-master.store"), {
                onSuccess: () => {
                    closeModal();
                },
            });
        }

        if (mode === "edit") {
            patch(route("data-master.update", data.id), {
                onSuccess: () => {
                    closeModal();
                },
            });
        }
    };

    const handleCreateJabatan = (inputValue) => {
        setLoadingCreateJabatan(true);
        router.post(
            route("jabatan.store"),
            {
                nama: inputValue,
            },
            {
                onSuccess: (response) => {
                    const newOption = response.props.options.find(
                        (option) => option.label === inputValue
                    );

                    if (newOption) {
                        setData((prev) => ({
                            ...prev,
                            jabatan: {
                                value: newOption.value,
                                label: newOption.label,
                            },
                        }));
                    }
                    setLoadingCreateJabatan(false);
                },
                onError: (error) => {
                    console.error(error);
                    setLoadingCreateJabatan(false);
                },
            }
        );
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this data?")) {
            destroy(route("data-master.destroy", id), {
                onSuccess: () => {
                    flash.success = null;
                },
                onError: () => {
                    flash.error = null;
                },
            });
        }
    };

    console.log(errors);

    if (!data.feedback) {
        data.penilaianKeJabatan = [];
    }

    return (
        <AuthenticatedLayout user={auth.user} title="Data Master">
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
                                setMode("create");
                                setOpenCreateModal(true);
                            }}
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
                            <InputLabel className="mb-2">NIP</InputLabel>
                            <TextInput
                                id="nip"
                                type="number"
                                className="w-full"
                                placeholder="NIP Pegawai"
                                value={data.nip}
                                onChange={handleValueChange}
                                isFocused
                            />
                            <InputError message={errors.nip} className="mt-1" />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Nama</InputLabel>
                            <TextInput
                                id="name"
                                type="text"
                                className="w-full"
                                placeholder="Nama Pegawai"
                                value={data.name}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Password</InputLabel>
                            <TextInput
                                id="password"
                                type="password"
                                className="w-full"
                                placeholder="Password"
                                value={data.password}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Jabatan</InputLabel>
                            <CreatableSelect
                                name="jabatan"
                                isClearable
                                options={options}
                                value={data.jabatan}
                                onChange={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        jabatan: value,
                                    }));
                                }}
                                onCreateOption={handleCreateJabatan}
                                isDisabled={loadingCreateJabatan}
                                isLoading={loadingCreateJabatan}
                            />

                            <InputError
                                message={errors.jabatan}
                                className="mt-1"
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
                                <InputLabel className="mb-2">
                                    Penilaian ke Jabatan
                                </InputLabel>
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
                                    className="mt-1"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-center mt-6 space-x-3">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton disabled={processing}>
                            {processing ? "Loading..." : "Submit"}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
