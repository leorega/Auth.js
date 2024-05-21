// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { auth } from "@/auth";
import { Button } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        redirect("/login");
    }

    return (
        <Grid container spacing={6} sx={{ justifyContent: "center" }}>
            <Container
                maxWidth="xs"
                sx={{
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h1>Home</h1>
                {session ? (
                    <Container
                        maxWidth="xs"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Link href={"api/auth/signout"}>
                            <Button variant="contained" sx={{ height: "50%" }}>
                                Sign out
                            </Button>
                        </Link>
                    </Container>
                ) : (
                    <Link href={"/login"}>
                        <Button variant="contained" sx={{ height: "50%" }}>
                            Login
                        </Button>
                    </Link>
                )}
            </Container>
            <pre>{JSON.stringify(session)}</pre>

            <Grid item xs={12} sx={{ padding: 0 }}>
                <Card>
                    <CardHeader title="Kick start your project 🚀"></CardHeader>
                    <CardContent>
                        <Typography sx={{ mb: 2 }}>
                            All the best for your new project.
                        </Typography>
                        <Typography>
                            Please make sure to read our Template Documentation
                            to understand where to go from here and how to use
                            our template.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Home;
