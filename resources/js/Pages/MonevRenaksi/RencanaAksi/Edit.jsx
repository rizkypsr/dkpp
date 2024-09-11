import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Edit({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            title="Data Laporan Monev Renaksi - Data Rencana Aksi"
        >
            ds
        </AuthenticatedLayout>
    );
}
