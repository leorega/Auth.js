"use client";
import { ReactNode } from "react";
import { Button, Divider, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import GoogleIcon from "@mui/icons-material/Google";
import LoginForm from "./login-form";
import { signIn } from "next-auth/react";

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: "0.18px",
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const LoginPage = () => {
    return (
        <>
            <Box sx={{ mb: 6 }}>
                <TypographyStyled variant="h5">{`¡Bienvenido a Juridify! 👋🏻`}</TypographyStyled>
                <Typography variant="body2">
                    Por favor inicie sesión en su cuenta para comenzar
                </Typography>
            </Box>
            <LoginForm />
            <Divider
                sx={{
                    "& .MuiDivider-wrapper": {
                        px: 4,
                    },
                    mt: (theme) => `${theme.spacing(5)} !important`,
                    mb: (theme) => `${theme.spacing(5)} !important`,
                }}
            >
                o
            </Divider>
            <Box display="flex" justifyContent="center" gap={2}>
                <Button
                    title="Microsoft"
                    variant="contained"
                    color="primary"
                    startIcon={<MicrosoftIcon />}
                    onClick={() => signIn("microsoft-entra-id")}
                ></Button>
                <Button
                    title="Google"
                    variant="contained"
                    color="primary"
                    endIcon={<GoogleIcon />}
                    onClick={() => signIn("google")}
                ></Button>
            </Box>
        </>
    );
};

LoginPage.getLayout = (page: ReactNode) => ({ page });

LoginPage.guestGuard = true;

export default LoginPage;
