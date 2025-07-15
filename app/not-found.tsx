"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import "./style.css";

export default function NotFound(){
    const PathNm= usePathname();

    return (
        <div className="NotFoundWrapper">
            <h3>404 Errors : Cannot find "{PathNm}" pages</h3>
        </div>
    );
};