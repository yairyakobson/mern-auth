import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import App from "./App.tsx";
import queryClient from "./react-query/features/queryClient.ts";

import "./globals.css";

const root = createRoot(document.getElementById('root')!);

root.render(
  <QueryClientProvider client={queryClient}>
    <App/>
    <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false}/>
  </QueryClientProvider>
)