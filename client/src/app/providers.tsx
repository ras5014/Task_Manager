import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { createTRPCClient, trpc } from "../shared/utils/trpc";

const queryClient = new QueryClient();
const trpcClient = createTRPCClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    {children}
                </BrowserRouter>
            </QueryClientProvider>
        </trpc.Provider>
    );
}