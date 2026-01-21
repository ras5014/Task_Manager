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
