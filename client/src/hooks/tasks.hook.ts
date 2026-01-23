import { trpc } from "../utils/trpc";

export const useTasks = () => {
  return trpc.tasks.getTasks.useQuery();
};

export const useCreateTask = () => {
  const utils = trpc.useUtils();
  return trpc.tasks.createTask.useMutation({
    onSuccess: () => {
      // Refetch tasks to update the list
      utils.tasks.getTasks.invalidate();
    },
  });
};

export const useUpdateTask = () => {
  const utils = trpc.useUtils();
  return trpc.tasks.updateTask.useMutation({
    onSuccess: () => {
      // Refetch tasks to update the list
      utils.tasks.getTasks.invalidate();
    },
  });
};

export const useDeleteTask = () => {
  const utils = trpc.useUtils();
  return trpc.tasks.deleteTask.useMutation({
    onSuccess: () => {
      // Refetch tasks to update the list
      utils.tasks.getTasks.invalidate();
    },
  });
};
