import { useForm } from "react-hook-form";
import { useCreateTask, useDeleteTask, useTasks, useUpdateTask } from "../hooks/useTasks";
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
    IconButton,
    Checkbox,
    FormControlLabel,
    Backdrop,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { useState } from "react";

interface CreateTaskInputs {
    title: string;
    description: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateTaskInputs>();

    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const onSubmit = async (data: CreateTaskInputs) => {
        try {
            const { title, description } = data;
            await createTask.mutateAsync({ title, description })
            toast.success("Task created successfully!");
            reset(); // Clear the form after successful submission
        } catch (error) {
            toast.error("Failed to create task. Please try again.");
            console.error("Task creation failed:", error);
        }
    }

    const handleDeleteClick = (taskId: number) => {
        setTaskToDelete(taskId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (taskToDelete) {
            await deleteTask.mutateAsync({ id: taskToDelete });
            setDeleteDialogOpen(false);
            setTaskToDelete(null);
        }
    };

    const { data: tasks, isLoading, isError } = useTasks();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully!");
        navigate("/login");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
                open={deleteTask.isPending || updateTask.isPending}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
                                    disabled={createTask.isPending}
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    type="submit"
                                    sx={{ mt: 2, py: 1.5 }}
                                >
                                    {createTask.isPending ? (
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
                                                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                                                        <FormControlLabel
                                                            control={<Checkbox />}
                                                            onClick={async () => {
                                                                await updateTask.mutateAsync({
                                                                    id: task.id,
                                                                    isCompleted: true
                                                                });
                                                            }}
                                                            label=""
                                                            sx={{ mt: 0.5 }}
                                                        />
                                                        <Box sx={{ flex: 1 }}>
                                                            {editingTask === task.id ? (
                                                                <>
                                                                    <TextField
                                                                        value={editTitle}
                                                                        onChange={(e) => setEditTitle(e.target.value)}
                                                                        onKeyDown={async (e) => {
                                                                            if (e.key === 'Enter') {
                                                                                await updateTask.mutateAsync({
                                                                                    id: task.id,
                                                                                    title: editTitle,
                                                                                    description: editDescription
                                                                                });
                                                                                setEditingTask(null);
                                                                            }
                                                                        }}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        sx={{ mb: 1 }}
                                                                    />
                                                                    <TextField
                                                                        value={editDescription}
                                                                        onChange={(e) => setEditDescription(e.target.value)}
                                                                        onKeyDown={async (e) => {
                                                                            if (e.key === 'Enter') {
                                                                                await updateTask.mutateAsync({
                                                                                    id: task.id,
                                                                                    title: editTitle,
                                                                                    description: editDescription
                                                                                });
                                                                                setEditingTask(null);
                                                                            }
                                                                        }}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        fullWidth
                                                                        multiline
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
                                                                        {task.title}
                                                                    </Typography>
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {task.description}
                                                                    </Typography>
                                                                </>
                                                            )}
                                                        </Box>
                                                        <IconButton
                                                            color="primary"
                                                            onClick={() => {
                                                                console.log("Editing task:", task.id);
                                                                setEditingTask(task.id);
                                                                setEditTitle(task.title || "");
                                                                setEditDescription(task.description || "");
                                                            }}
                                                            sx={{ mt: 0.5 }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleDeleteClick(task.id)}
                                                            sx={{ mt: 0.5 }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
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

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this task?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
