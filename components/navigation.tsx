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
                    <Link href={"/movies"}>Movies / Server Side</Link>
                    {PathName === "/movies" ? "👈" : null}
                </li>
                <li>
                    <Link href={"/movies2"}>Movies / Client Side</Link>
                    {PathName === "/movies2" ? "👈" : null}
                </li>
            </ul>
        </nav>
    );
}