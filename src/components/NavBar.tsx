import Link from "next/link";
import React from "react";
import { auth, signOut } from "@/auth";
import { Button } from "@mui/material";

const NavBar = async () => {
    const session = await auth();

    return (
        <nav id="navBar">
            <ul>
                <li>
                    <Link href={"/"}>Home</Link>
                </li>
                <li>
                    <Link href={"/dashboard"}>Dashboard</Link>
                </li>
                {session?.user && (
                    <li>
                        <form
                            action={async () => {
                                "use server";
                                await signOut();
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ height: "50%" }}
                            >
                                Sign out
                            </Button>
                        </form>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
