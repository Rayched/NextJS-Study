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
                    <Link href={"/details/movies"}>Movies</Link>
                    {PathName === "/movies" ? "👈" : null}
                </li>
            </ul>
        </nav>
    );
};