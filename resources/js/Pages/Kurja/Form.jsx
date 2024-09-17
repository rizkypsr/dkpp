import React from "react";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";

import { useForm } from "@inertiajs/react";

export default function Form() {
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
        target: "",
        capaian: "",
        realisasi: "",
        penjelasan: "",
        alternatif: "",
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        if (mode === "create") {
            post(route("data-laporan-kurja.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    clearErrors();
                    setOpenModal(false);
                },
            });
        }

        if (mode === "edit") {
            patch(route("data-laporan-kurja.update", data.id), {
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
                        Tambah Data Laporan Kurja
                    </h2>

                    <div className="flex flex-col gap-4 mt-6">
                        <div>
                            <InputLabel className="mb-2">Kinerja</InputLabel>
                            <TextInput
                                id="kinerja"
                                className="w-full"
                                placeholder="Kinerja"
                                value={data.kinerja}
                                onChange={handleValueChange}
                                isFocused
                            />
                            <InputError
                                message={errors.kinerja}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">
                                Indikator Kinerja Individu
                            </InputLabel>
                            <TextInput
                                id="indikator_kinerja_individu"
                                className="w-full"
                                placeholder="Indikator Kinerja Individu"
                                value={data.indikator_kinerja_individu}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.indikator_kinerja_individu}
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
                            <InputLabel className="mb-2">Penjelasan</InputLabel>
                            <TextInput
                                id="penjelasan"
                                className="w-full"
                                placeholder="Penjelasan"
                                value={data.penjelasan}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.penjelasan}
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <InputLabel className="mb-2">Alternatif</InputLabel>
                            <TextInput
                                id="alternatif"
                                className="w-full"
                                placeholder="Alternatif"
                                value={data.alternatif}
                                onChange={handleValueChange}
                            />
                            <InputError
                                message={errors.alternatif}
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
