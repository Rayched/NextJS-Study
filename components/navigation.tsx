"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation(){
    const PathName = usePathname();

    return (
        <nav>
            <ul>
                <li>
                    <Link href={"/"}>
                        Home
                    </Link>
                    {PathName === "/" ? "👈" : null}
                </li>
                <li>
                    <Link href={"/details"}>Details</Link>
                    {PathName === "/details" ? "👈" : null}
                </li>
                <li>
                    <Link href={"/dsdsdedds"}>Not Found</Link>
                    {PathName === "/dsdsdedds" ? "👈" : null}
                </li>
            </ul>
        </nav>
    );
};