import { useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MisRutas } from "./router/router";

import { useAuthStore } from "./store/auth.store";

const clienteConsultas = new QueryClient();

function App() {
  const { inicializarAuth } = useAuthStore();

  useEffect(() => {
    const desuscribir = inicializarAuth();
    return desuscribir;
  }, [inicializarAuth]);

  return (
    <QueryClientProvider client={clienteConsultas}>
      <MisRutas />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
