import {   MyRoutes } from "./router/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContent";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <MyRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
