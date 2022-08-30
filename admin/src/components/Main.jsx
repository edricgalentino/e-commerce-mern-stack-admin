import React from "react";
import { FaRegEye } from "react-icons/fa";
import { Chart } from "react-google-charts";

const Main = () => {
    const data = [
        ["Year", "Sales", "Active User"],
        ["Jan", 1000, 400],
        ["Feb", 1170, 460],
        ["Mar", 660, 1120],
        ["Apr", 1030, 540],
        ["Mei", 1030, 540],
        ["Jun", 1030, 540],
        ["Jul", 1030, 540],
        ["Aug", 1030, 540],
        ["Sep", 1030, 540],
        ["Okt", 1030, 540],
        ["Nov", 1030, 540],
        ["Des", 1030, 540],
    ];

    const options = {
        curveType: "function",
        legend: { position: "none" },
        chartArea: { width: "90%", height: "80%" },
        series: {
            0: { color: "#f44336" },
            1: { color: "#2196f3" },
        },
    };
    return (
        <>
            <div className="flex flex-col gap-7 w-full h-full p-8 pb-16">
                <div className="top-info flex gap-8 w-full">
                    <div className="flex p-2 text-start justify-start hover:shadow-xl shadow-md transition-all w-full bg-white basis-1/3 rounded-lg">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    </div>
                    <div className="flex p-2 text-start justify-start hover:shadow-xl shadow-md transition-all w-full bg-white basis-1/3 rounded-lg">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    </div>
                    <div className="flex p-2 text-start justify-start hover:shadow-xl shadow-md transition-all w-full bg-white basis-1/3 rounded-lg">
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://placeimg.com/128/128/people" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">86%</div>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-desc text-secondary">31 tasks remaining</div>
                        </div>
                    </div>
                </div>
                <div className="chart flex flex-col bg-white w-full p-4 rounded-lg hover:shadow-xl shadow-md transition-all">
                    <h1 className=" text-start text-2xl font-semibold text-slate-800">User Analytics</h1>
                    <div className="chart w-full p-0 ">
                        <Chart chartType="LineChart" width="100%" height="400px" data={data} options={options} />
                    </div>
                </div>
                <div className="transaction-info flex gap-8 w-full">
                    <div className="flex flex-col justify-start items-start gap-5 p-4 hover:shadow-xl shadow-md transition-all w-full bg-white rounded-lg basis-2/5">
                        <h1 className=" text-start text-2xl font-semibold text-slate-800">New Join Members</h1>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="item-info flex justify-between px-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col text-start">
                                    <h1 className=" font-semibold">Anna Stocking</h1>
                                    <span className=" text-slate-500">Software Engineer</span>
                                </div>
                                <div className="flex bg-slate-200 cursor-pointer rounded-xl px-3 justify-center items-center gap-3 text-start">
                                    <span className=" text-slate-500">
                                        <FaRegEye size={"25px"} />
                                    </span>
                                    <h1 className=" font-semibold">Display</h1>
                                </div>
                            </div>
                            <div className="item-info flex justify-between px-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col text-start">
                                    <h1 className=" font-semibold">Anna Stocking</h1>
                                    <span className=" text-slate-500">Software Engineer</span>
                                </div>
                                <div className="flex bg-slate-200 cursor-pointer rounded-xl px-3 justify-center items-center gap-3 text-start">
                                    <span className=" text-slate-500">
                                        <FaRegEye size={"25px"} />
                                    </span>
                                    <h1 className=" font-semibold">Display</h1>
                                </div>
                            </div>
                            <div className="item-info flex justify-between px-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col text-start">
                                    <h1 className=" font-semibold">Anna Stocking</h1>
                                    <span className=" text-slate-500">Software Engineer</span>
                                </div>
                                <div className="flex bg-slate-200 cursor-pointer rounded-xl px-3 justify-center items-center gap-3 text-start">
                                    <span className=" text-slate-500">
                                        <FaRegEye size={"25px"} />
                                    </span>
                                    <h1 className=" font-semibold">Display</h1>
                                </div>
                            </div>
                            <div className="item-info flex justify-between px-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col text-start">
                                    <h1 className=" font-semibold">Anna Stocking</h1>
                                    <span className=" text-slate-500">Software Engineer</span>
                                </div>
                                <div className="flex bg-slate-200 cursor-pointer rounded-xl px-3 justify-center items-center gap-3 text-start">
                                    <span className=" text-slate-500">
                                        <FaRegEye size={"25px"} />
                                    </span>
                                    <h1 className=" font-semibold">Display</h1>
                                </div>
                            </div>
                            <div className="item-info flex justify-between px-2">
                                <div className="avatar">
                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                        <img
                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                            alt="Avatar Tailwind CSS Component"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col text-start">
                                    <h1 className=" font-semibold">Anna Stocking</h1>
                                    <span className=" text-slate-500">Software Engineer</span>
                                </div>
                                <div className="flex bg-slate-200 cursor-pointer rounded-xl px-3 justify-center items-center gap-3 text-start">
                                    <span className=" text-slate-500">
                                        <FaRegEye size={"25px"} />
                                    </span>
                                    <h1 className=" font-semibold">Display</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-start items-start gap-5 p-4 hover:shadow-xl shadow-md transition-all w-full bg-white rounded-lg basis-3/5">
                        <h1 className=" text-start text-2xl font-semibold text-slate-800">Transaction List</h1>
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            <div className="flex gap-3 items-center">
                                                <div className="avatar rounded-full">
                                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <h1 className="font-semibold">Jason Wetoken</h1>
                                            </div>
                                        </th>
                                        <td>2 Jul 2022</td>
                                        <td>$ 120.00</td>
                                        <td>
                                            <div className="badge badge-success p-3">Approved</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div className="flex gap-3 items-center">
                                                <div className="avatar rounded-full">
                                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <h1 className="font-semibold">Jason Wetoken</h1>
                                            </div>
                                        </th>
                                        <td>2 Jul 2022</td>
                                        <td>$ 120.00</td>
                                        <td>
                                            <div className="badge badge-error p-3">Declined</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <div className="flex gap-3 items-center">
                                                <div className="avatar rounded-full">
                                                    <div className="mask mask-squircle rounded-full w-12 h-12">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                                <h1 className="font-semibold">Jason Wetoken</h1>
                                            </div>
                                        </th>
                                        <td>2 Jul 2022</td>
                                        <td>$ 120.00</td>
                                        <td>
                                            <div className="badge badge-primary p-3">Pending</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;
