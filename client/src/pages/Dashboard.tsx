import { useForm } from "react-hook-form";
import { useCreateTask, useTasks } from "../hooks/tasks.hook";
import toast from "react-hot-toast";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    Paper,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    AppBar,
    Toolbar,
    IconButton
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router";

interface CreateTaskInputs {
    title: string;
    description: string;
}

export default function Dashboard() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateTaskInputs>();

    const { mutateAsync, isPending } = useCreateTask();

    const onSubmit = async (data: CreateTaskInputs) => {
        try {
            const { title, description } = data;
            await mutateAsync({ title, description })
            toast.success("Task created successfully!");
            reset(); // Clear the form after successful submission
        } catch (error) {
            toast.error("Failed to create task. Please try again.");
            console.error("Task creation failed:", error);
        }
    }

    const { data: tasks, isLoading, isError } = useTasks();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/login");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* AppBar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Task Manager
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={handleLogout}
                        sx={{ ml: 2 }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Create Task Section */}
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
                                Create New Task
                            </Typography>

                            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    fullWidth
                                    {...register("title", { required: "Title is required" })}
                                    error={!!errors.title}
                                    helperText={errors.title ? errors.title.message : ""}
                                />

                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    {...register("description", { required: "Description is required" })}
                                    error={!!errors.description}
                                    helperText={errors.description ? errors.description.message : ""}
                                />

                                <Button
                                    disabled={isPending}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    sx={{ mt: 2, py: 1.5 }}
                                >
                                    {isPending ? (
                                        <CircularProgress size={24} sx={{ color: "white" }} />
                                    ) : (
                                        "Create Task"
                                    )}
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Tasks List Section */}
                    <Grid item xs={12} md={8}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
                                Your Tasks
                            </Typography>

                            {isLoading && (
                                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                                    <CircularProgress />
                                </Box>
                            )}

                            {isError && (
                                <Typography color="error" sx={{ textAlign: "center", py: 4 }}>
                                    Error loading tasks.
                                </Typography>
                            )}

                            {tasks && tasks.length === 0 && (
                                <Typography sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                                    No tasks yet. Create your first task!
                                </Typography>
                            )}

                            {tasks && tasks.length > 0 && (
                                <Grid container spacing={2}>
                                    {tasks.map((task) => (
                                        <Grid item xs={12} key={task.id}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                                                        {task.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {task.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
