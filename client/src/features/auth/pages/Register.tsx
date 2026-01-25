import { Box, Container, TextField, Button, Typography, Paper, Link, CircularProgress } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { type RegisterFormInputs, RegisterSchema } from "../../../../../shared/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(RegisterSchema)
    });

    const { mutateAsync, isPending } = useRegister();

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        const { fullName, email, password } = data;
        try {
            await mutateAsync({ fullName, email, password });
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error("Registration failed. Please try again.");
            console.error("Registration failed:", error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: "100%" }}>
                    <Typography variant="h4" component="h1" sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}>
                        Register
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                        <TextField
                            label="Full Name"
                            type="text"
                            variant="outlined"
                            fullWidth
                            {...register("fullName", { required: "Full Name is required" })}
                            error={!!errors.fullName}
                            helperText={errors.fullName ? errors.fullName.message : ""}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            {...register("email", { required: "Email is required" })}
                            error={!!errors.email}
                            helperText={errors.email ? errors.email.message : ""}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register("password", { required: "Password is required" })}
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ""}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                        />


                        <Button
                            disabled={isPending}
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                            sx={{ mt: 2, py: 1.5, position: "relative" }}
                        >
                            {isPending ? (
                                <CircularProgress size={24} sx={{ color: "white" }} />
                            ) : (
                                "Register"
                            )}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, textAlign: "center" }}>
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <Link href="/login" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                                Login here
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}