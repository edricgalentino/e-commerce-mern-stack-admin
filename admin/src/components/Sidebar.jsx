import React from "react";
import { Link } from "react-router-dom";
import { MdLineStyle, MdTimeline, MdTrendingUp, MdPermIdentity, MdStorefront, MdAttachMoney, MdBarChart, MdMailOutline, MdDynamicFeed, MdChatBubbleOutline, MdWorkOutline, MdReport } from "react-icons/md";

const Sidebar = () => {
    const content = [
        {
            title: "dashboard",
            contents: [
                {
                    title: "home",
                    icon: <MdLineStyle key={"MdLineStyle"} color="rgb(55 48 163)" />,
                    link: "/",
                },
                {
                    title: "analytics",
                    icon: <MdTimeline key={"MdTimeline"} color="rgb(55 48 163)" />,
                    link: "/analytics",
                },
                {
                    title: "sales",
                    icon: <MdTrendingUp key={"MdTrendingUp"} color="rgb(55 48 163)" />,
                    link: "/sales",
                },
            ],
        },
        {
            title: "menu",
            contents: [
                {
                    title: "users",
                    icon: <MdPermIdentity key={"MdPermIdentity"} color="rgb(55 48 163)" />,
                    link: "/user-list",
                },
                {
                    title: "products",
                    icon: <MdStorefront key={"MdStorefront"} color="rgb(55 48 163)" />,
                    link: "/product-list",
                },
                {
                    title: "transactions",
                    icon: <MdAttachMoney key={"MdAttachMoney"} color="rgb(55 48 163)" />,
                    link: "/transactions",
                },
                {
                    title: "reports",
                    icon: <MdBarChart key={"MdBarChart"} color="rgb(55 48 163)" />,
                    link: "/reports",
                },
            ],
        },
        {
            title: "notifications",
            contents: [
                {
                    title: "mail",
                    icon: <MdMailOutline key={"MdMailOutline"} color="rgb(55 48 163)" />,
                    link: "/mail",
                },
                {
                    title: "feedback",
                    icon: <MdDynamicFeed key={"MdDynamicFeed"} color="rgb(55 48 163)" />,
                    link: "/feedback",
                },
                {
                    title: "messages",
                    icon: <MdChatBubbleOutline key={"MdChatBubbleOutline"} color="rgb(55 48 163)" />,
                    link: "/messages",
                },
            ],
        },
        {
            title: "staff",
            contents: [
                {
                    title: "manage",
                    icon: <MdWorkOutline key={"MdWorkOutline"} color="rgb(55 48 163)" />,
                    link: "/manage",
                },
                {
                    title: "analytics",
                    icon: <MdTimeline key={"MdTimelines"} color="rgb(55 48 163)" />,
                    link: "/analytics",
                },
                {
                    title: "reports",
                    icon: <MdReport key={"MdReport"} color="rgb(55 48 163)" />,
                    link: "/reports",
                },
            ],
        },
    ];
    return (
        <>
            <div className="flex flex-col justify-start text-start capitalize gap-2 border-r-2 bg-white border-slate-200 h-screen pt-16 w-1/5 fixed p-5">
                {content.map((c) => {
                    return (
                        <>
                            <h1 key={c.title} className=" text-slate-400 font-semibold mt-2 text-md">
                                {c.title}
                            </h1>
                            <ul className=" flex flex-col gap-1">
                                {c.contents.map((a) => {
                                    return (
                                        <>
                                            <Link to={`${a.link}`} key={a.title} className=" text-slate-800 ml-2 px-1 pl-2 rounded-full text-lg flex justify-start gap-2 items-center hover:bg-indigo-100 capitalize">
                                                {a.icon}
                                                {a.title}
                                            </Link>
                                        </>
                                    );
                                })}
                            </ul>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default Sidebar;
