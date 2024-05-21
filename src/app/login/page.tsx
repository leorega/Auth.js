"use client";

// ** React Imports
import { ReactNode } from "react";

// ** MUI Components
import { Divider, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";

// ** Layout Import

// **  Components
import LoginForm from "./login-form";

// ** Import your third-party login functions

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
                    mb: (theme) => `${theme.spacing(7.5)} !important`,
                }}
            >
                o
            </Divider>
        </>
    );
};

LoginPage.getLayout = (page: ReactNode) => ({ page });

LoginPage.guestGuard = true;

export default LoginPage;
