import { Box, Container, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string
  password: string
}

export default function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
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
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2, py: 1.5 }}>
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/register" sx={{ cursor: "pointer", fontWeight: "bold" }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}