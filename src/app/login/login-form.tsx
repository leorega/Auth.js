// ** React and Next
import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

// Material-UI
import {
    Button,
    Checkbox,
    TextField,
    InputLabel,
    IconButton,
    Box,
    FormControl,
    OutlinedInput,
    InputAdornment,
    Typography,
    FormHelperText,
} from "@mui/material";

import MuiFormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";

import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
    ({ theme }) => ({
        "& .MuiFormControlLabel-label": {
            fontSize: "0.875rem",
            color: theme.palette.text.secondary,
        },
    })
);

function LoginForm() {
    const [rememberMe, setRememberMe] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (res?.error) {
            alert(res.error);
            return;
        } else {
            router.push("/");
        }
        reset();
    });

    return (
        <form noValidate autoComplete="off" onSubmit={onSubmit}>
            <FormControl
                fullWidth
                sx={{
                    mb: 4,
                }}
            >
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        pattern: {
                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Ingresa un email válido",
                        },
                        required: {
                            value: true,
                            message: "Debes ingresar tu email",
                        },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <TextField
                            autoFocus
                            label="Email"
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder="admin@prueba.com"
                        />
                    )}
                />
                {errors.email && (
                    <FormHelperText
                        sx={{
                            color: "error.main",
                        }}
                    >
                        {errors.email.message}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl fullWidth>
                <InputLabel htmlFor="auth-login-v2-password">
                    Contraseña
                </InputLabel>
                <Controller
                    name="password"
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Debes ingresar una contraseña",
                        },
                    }}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <OutlinedInput
                            value={value}
                            onBlur={onBlur}
                            label="Password"
                            onChange={onChange}
                            id="auth-login-v2-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {!showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )}
                />
                {errors.password && (
                    <FormHelperText
                        sx={{
                            color: "error.main",
                        }}
                    >
                        {errors.password.message}
                    </FormHelperText>
                )}
            </FormControl>
            <Box
                sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                <FormControlLabel
                    label="Recordarme"
                    control={
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    }
                />
                <Typography
                    variant="body2"
                    component={Link}
                    href="/forgot-password"
                    sx={{
                        color: "primary.main",
                        textDecoration: "none",
                    }}
                >
                    Olvidaste la contraseña?
                </Typography>
            </Box>
            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    mb: 7,
                }}
            >
                Iniciar sesión
            </Button>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{
                        mr: 2,
                        color: "text.secondary",
                    }}
                >
                    ¿No estás registrad(o/a)?
                </Typography>
                <Typography
                    href="/register"
                    component={Link}
                    sx={{
                        color: "primary.main",
                        textDecoration: "none",
                    }}
                >
                    Crea una cuenta
                </Typography>
            </Box>
        </form>
    );
}
export default LoginForm;
