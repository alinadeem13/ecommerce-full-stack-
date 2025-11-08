"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { queryClient } from "@/app/lib/react-query";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </Provider>
    );
}
