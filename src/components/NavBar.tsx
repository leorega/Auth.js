import Link from "next/link";
import React from "react";
import { auth } from "@/auth";

const NavBar = async () => {
    const session = await auth();

    return (
        <nav id="navBar">
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                {!session && (
                    <li>
                        <Link href={"/login"}>Login</Link>
                    </li>
                )}
                <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
