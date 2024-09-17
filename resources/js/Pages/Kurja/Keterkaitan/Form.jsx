import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Form() {
    const { kurjaId } = usePage().props;

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
        program: "",
        anggaran: "",
        realisasi_rupiah: "",
        realisasi_persentase: "",
    });

    console.log(errors);

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("data-laporan-kurja.keterkaitan.store", kurjaId), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();
                    setOpenModal(false);
                },
            });
        }

        if (mode === "edit") {
            patch(route("data-laporan-kurja.keterkaitan", data.id), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();
                    setOpenModal(false);
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

    const onHandleCreate = () => {
        setMode("create");
        setOpenModal(true);
    };

    const onHandleClose = () => {
        reset();
        clearErrors();

        setOpenModal(false);
    };

    return (
        <>
            <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                onClick={onHandleCreate}
            >
                Tambah Data
            </button>

            <Modal show={openModal} onClose={onHandleClose}>
                <form className="p-6 overflow-y-auto" onSubmit={onHandleSubmit}>
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Keterkaitan
                    </h2>

                    <div className="flex flex-col gap-4 mt-6">
                        <div>
                            <InputLabel className="mb-2">Program</InputLabel>
                            <TextInput
                                id="program"
                                className="w-full"
                                placeholder="Program"
                                value={data.program}
                                onChange={handleValueChange}
                                isFocused
                            />
                            <InputError
                                message={errors.program}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Anggaran</InputLabel>
                            <TextInput
                                id="anggaran"
                                type="number"
                                className="w-full"
                                placeholder="Anggaran"
                                value={data.anggaran}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.anggaran}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Realisasi (Rp)
                            </InputLabel>
                            <TextInput
                                id="realisasi_rupiah"
                                type="number"
                                className="w-full"
                                placeholder="Realisasi (Rp)"
                                value={data.realisasi_rupiah}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.realisasi_rupiah}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Realisasi (%)
                            </InputLabel>
                            <TextInput
                                id="realisasi_persentase"
                                type="number"
                                className="w-full"
                                placeholder="Realisasi (%)"
                                value={data.realisasi_persentase}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.realisasi_persentase}
                                className="mt-1"
                            />
                        </div>

                        <div className="flex items-center justify-center mt-6 space-x-3">
                            <SecondaryButton onClick={onHandleClose}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton disabled={processing}>
                                {processing ? "Loading..." : "Submit"}
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
