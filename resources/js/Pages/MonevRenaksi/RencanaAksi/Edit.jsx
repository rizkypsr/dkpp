import React from "react";
import Table from "@/Components/Table";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function Edit({ auth, dataMonevRenaksi, dataRencanaAksi }) {
    const { data, setData, put, processing, transform, errors } = useForm({
        feedback: dataRencanaAksi.feedback,
    });

    const submit = (e) => {
        e.preventDefault();

        put(
            route(
                "data-laporan-monev-renaksi.rencana-aksi.update-feedback",
                dataRencanaAksi.id
            )
        );
    };

    if (data)
        return (
            <AuthenticatedLayout
                user={auth.user}
                title="Data Laporan Monev Renaksi - Data Rencana Aksi"
            >
                <div className="p-10 mb-6 bg-white">
                    <table className="text-sm text-left rtl:text-right">
                        <thead className="text-xs text-[#B5B5C3] uppercase font-semibold tracking-wider">
                            <tr>
                                <th className="py-3">Kinerja</th>
                                <th className="py-3">
                                    Indikator Kinerja Individu
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-[#7E8299] font-semibold text-sm">
                                <td className="py-4 pr-4">
                                    {dataMonevRenaksi.kinerja}
                                </td>
                                <td className="py-4 pr-4">
                                    {
                                        dataMonevRenaksi.indikator_kinerja_individu
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-10 mb-6 bg-white">
                    <div className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-6">
                        <h1>Rencana Aksi</h1>
                        <p className="text-[#7E8299] text-justify">
                            {dataRencanaAksi.rencana_aksi}
                        </p>

                        <h1>Target</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.target}
                        </p>

                        <h1>Realisasi</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.realisasi}
                        </p>

                        <h1>Capaian</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.capaian}
                        </p>

                        <h1>Capaian Monev</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.catatan}
                        </p>

                        <h1>Tindak Lanjut</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.tindak_lanjut}
                        </p>

                        <h1>Bukti Pendukung</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi.target}
                        </p>

                        <h1>Feedback</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi?.feedback ?? "-"}
                        </p>

                        <h1>Feedback By</h1>
                        <p className="text-[#7E8299]">
                            {dataRencanaAksi?.feedbackBy ?? "-"}
                        </p>
                    </div>
                </div>

                <form className="p-10 bg-white" onSubmit={submit}>
                    <InputLabel className="mb-2">Feedback</InputLabel>

                    <TextInput
                        id="feedback"
                        className="w-full"
                        placeholder="Feedback"
                        value={data.feedback}
                        onChange={(e) => setData("feedback", e.target.value)}
                    />

                    <InputError message={errors.feedback} className="mt-1" />

                    <PrimaryButton className="mt-6" disabled={processing}>
                        {processing ? "Loading..." : "Submit"}
                    </PrimaryButton>
                </form>
            </AuthenticatedLayout>
        );
}
