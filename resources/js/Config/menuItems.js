import DashboardIcon from "../Icons/dashboardIcon.svg?react";

const menuItems = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: DashboardIcon,
    },
    {
        name: "Data Master",
        link: "/data-master",
        icon: DashboardIcon,
    },
    {
        name: "Data Laporan",
        link: "/data-laporan",
        icon: DashboardIcon,
        submenu: [
            {
                name: "Data Laporan Renaksi",
                link: "/data-laporan-renaksi",
            },
            {
                name: "Data Laporan Monev Renaksi",
                link: "/data-laporan-monev-renaksi",
            },
            {
                name: "Data Laporan Kurja",
                link: "/data-laporan-kurja",
            },
        ],
    },
    {
        name: "Data Laporan Kerja",
        link: "/data-laporan-kerja",
        icon: DashboardIcon,
    },
    {
        name: "Data Laporan Monev",
        link: "/laporan-monev",
        icon: DashboardIcon,
    },
    {
        name: "Laporan",
        link: "/laporan",
        icon: DashboardIcon,
    },
    {
        name: "Cetak Laporan",
        link: "/cetak-laporan",
        icon: DashboardIcon,
    },
];

export default menuItems;
