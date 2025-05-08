import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false // Not retrying state requests
    }
  }
});

export default queryClient;