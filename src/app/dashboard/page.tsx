import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@mui/material";

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Link href={"api/auth/signout"}>
                <Button variant="contained" sx={{ height: "50%" }}>
                    Sign out
                </Button>
            </Link>
        </div>
    );
};

export default Dashboard;
