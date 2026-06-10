# agente-correcciones — Ecommerce

## Purpose

Aplicar todas las correcciones del ADR-0001 al proyecto Ecommerce:
eliminar el contexto de auth duplicado, agregar `cargando` al store y al
`RutaProtegida`, mover el `QueryClient` fuera del componente, extraer la
lógica de negocio de `orden.store.ts` a `supabase/`, estandarizar todo
el código al español y eliminar los `console.log` de producción.

---

## Inputs requeridos

- Confirmación de que el repo está limpio (`git status` sin cambios pendientes).
- Confirmación de que las keys de Supabase ya fueron rotadas.

---

## Workflow requerido

### Paso 0 — Verificar repo limpio
```bash
git status
```
Si hay cambios no relacionados, reportarlos antes de continuar.

### Paso 1 — Crear branch de trabajo
```bash
git checkout -b vs/correcciones-adr-0001
```

### Paso 2 — Agregar `.env` al `.gitignore`
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
echo ".env.production" >> .gitignore
git rm --cached .env
```
Crear `.env.example`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Paso 3 — Eliminar `AuthContext.tsx`
```bash
rm src/context/AuthContent.tsx
```
Buscar y eliminar todas las importaciones de `AuthContextProvider` y `UserAuth` en el proyecto.

### Paso 4 — Reescribir `store/auth.store.ts`

Reemplazar el contenido completo con el nuevo store unificado en español:

```ts
import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";
import type { User } from "@supabase/supabase-js";
import type { IAuthLogin, IAuthRegister } from "../interfaces/auth.interface";

interface AuthStore {
  usuario: User | null;
  cargando: boolean;
  iniciarSesion: (p: IAuthLogin) => Promise<any>;
  registrarUsuario: (p: IAuthRegister) => Promise<any>;
  cerrarSesion: () => Promise<void>;
  inicializarAuth: () => () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  cargando: true,

  inicializarAuth: () => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_evento, sesion) => {
        set({ usuario: sesion?.user ?? null, cargando: false });
      }
    );
    return () => subscription.unsubscribe();
  },

  iniciarSesion: async (p: IAuthLogin) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.correo,
      password: p.contrasena,
    });
    if (error) throw new Error(error.message);
    return data.user;
  },

  registrarUsuario: async (p: IAuthRegister) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.contrasena,
      options: {
        data: {
          nombre_completo: p.nombreCompleto,
          telefono: p.telefono,
        },
      },
    });
    if (error) throw new Error(error.message);
    return data.user;
  },

  cerrarSesion: async () => {
    await supabase.auth.signOut();
    set({ usuario: null });
  },
}));
```

### Paso 5 — Reescribir `App.tsx`

```tsx
import { useEffect } from "react";
import { MisRutas } from "./router/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/auth.store";

// Fuera del componente — no se recrea en cada render
const clienteConsultas = new QueryClient();

function App() {
  const { inicializarAuth } = useAuthStore();

  useEffect(() => {
    const desuscribir = inicializarAuth();
    return desuscribir;
  }, []);

  return (
    <QueryClientProvider client={clienteConsultas}>
      <MisRutas />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
```

### Paso 6 — Reescribir `hooks/ruta-protegida.tsx`

Renombrar el archivo de `Protected.route.tsx` a `ruta-protegida.tsx`:
```bash
mv src/hooks/Protected.route.tsx src/hooks/ruta-protegida.tsx
```

Contenido nuevo:
```tsx
import { Navigate, Outlet } from "react-router-dom";
import type { FC } from "react";
import { useAuthStore } from "../store/auth.store";

interface RutaProtegidaProps {
  children: React.ReactNode;
  autenticado?: boolean;
}

export const RutaProtegida: FC<RutaProtegidaProps> = ({
  children,
  autenticado = true,
}) => {
  const { usuario, cargando } = useAuthStore();

  if (cargando) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  );

  if (autenticado === false) {
    return !usuario
      ? (children ? children : <Outlet />)
      : <Navigate to="/" replace />;
  }

  if (autenticado) {
    return usuario
      ? (children ? children : <Outlet />)
      : <Navigate to="/auth/iniciar-sesion" replace />;
  }

  return <Navigate to="/" replace />;
};
```

### Paso 7 — Crear `supabase/ordenes.supabase.ts`

Extraer `verificarStock`, `guardarDireccion`, `guardarItemsOrden` y
`actualizarStock` del store a este archivo. El contenido exacto está en
el ADR-0001 sección 4.

### Paso 8 — Limpiar `store/orden.store.ts`

Eliminar las funciones privadas del archivo y reemplazarlas por imports
de `supabase/ordenes.supabase.ts`. El store solo debe llamar funciones,
no definir lógica de negocio.

### Paso 9 — Renombrar stores y carpetas

Ejecutar en orden:
```bash
# Stores
mv src/store/cart-store.ts      src/store/carrito.store.ts
mv src/store/order.store.ts     src/store/orden.store.ts
mv src/store/producto-store.ts  src/store/producto.store.ts
mv src/store/user.store.ts      src/store/usuario.store.ts

# Stack carpetas
mv src/stack/orders   src/stack/ordenes
mv src/stack/user     src/stack/usuario

# Stack archivos — auth
mv src/stack/auth/login-Stack.ts       src/stack/auth/iniciar-sesion.stack.ts
mv src/stack/auth/register-Stack.ts    src/stack/auth/registrar.stack.ts

# Stack archivos — ordenes
mv src/stack/ordenes/orders-create-Stack.ts      src/stack/ordenes/crear-orden.stack.ts
mv src/stack/ordenes/orders-getAll-Stack.ts      src/stack/ordenes/obtener-ordenes.stack.ts
mv src/stack/ordenes/orders-getOrder-Stack.ts    src/stack/ordenes/obtener-orden.stack.ts
mv src/stack/ordenes/orders-usuarioId-Stack.ts   src/stack/ordenes/ordenes-usuario.stack.ts
mv src/stack/ordenes/orders.filter-Stack.ts      src/stack/ordenes/filtrar-ordenes.stack.ts

# Stack archivos — producto
mv src/stack/producto/productos-Stack.ts              src/stack/producto/mostrar-productos.stack.ts
mv src/stack/producto/producto-search-Stack.ts        src/stack/producto/buscar-producto.stack.ts
mv src/stack/producto/productos-filter-Stack.ts       src/stack/producto/filtrar-productos.stack.ts
mv src/stack/producto/productos-seleccionado-Stack.ts src/stack/producto/producto-seleccionado.stack.ts

# Stack archivos — usuario
mv src/stack/usuario/user-get-Stack.ts src/stack/usuario/obtener-usuario.stack.ts

# Interfaces
mv src/interfaces/cart.interface.ts   src/interfaces/carrito.interface.ts
mv src/interfaces/order.interface.ts  src/interfaces/orden.interface.ts
mv src/interfaces/product.interface.ts src/interfaces/producto.interface.ts

# Schemas
mv src/schema/address.schema.ts src/schema/direccion.schema.ts

# Pages
mv src/pages/Checkou src/pages/Pago
mv src/pages/ThankYou src/pages/Gracias
```

### Paso 10 — Actualizar rutas en `router/router.tsx`

```tsx
// Rutas actualizadas al español
<Route path="/productos"        element={<PaginaProductos />} />
<Route path="/productos/:slug"  element={<PaginaVistaProducto />} />
<Route path="/carrito"          element={<PaginaCarrito />} />
<Route path="/pago"             element={<PaginaPago />} />
<Route path="/pago/:id/gracias" element={<PaginaGracias />} />
<Route path="/cuenta/perfil"    element={<PaginaPerfil />} />
<Route path="/cuenta/ordenes"                 element={<PaginaOrdenes />} />
<Route path="/cuenta/ordenes/pedido/:id"      element={<PaginaOrden />} />
<Route path="/auth/iniciar-sesion" element={<PaginaIniciarSesion />} />
<Route path="/auth/registrarse"    element={<PaginaRegistrarse />} />
```

### Paso 11 — Eliminar `console.log` de producción

Buscar en todo el proyecto:
```bash
grep -rn "console.log\|console.error" src/
```

Reemplazar cada uno por:
```ts
if (import.meta.env.DEV) console.error("[debug]", error);
```

O simplemente eliminarlo si no aporta valor.

### Paso 12 — Actualizar todas las importaciones

Después de renombrar archivos, buscar importaciones rotas:
```bash
npm run build
```

Corregir cada error de importación que aparezca.

### Paso 13 — Verificación final
```bash
npm run build   # sin errores TypeScript
npm run lint    # sin warnings críticos
```

### Paso 14 — Commit
```bash
git add .
git commit -m "feat(vs): correcciones-adr-0001 — auth unificado, loading, QueryClient, español"
git push origin vs/correcciones-adr-0001
```

---

## Checklist de revisión

- [ ] `AuthContext.tsx` eliminado y sin importaciones huérfanas.
- [ ] `useAuthStore` tiene `usuario`, `cargando` e `inicializarAuth`.
- [ ] `App.tsx` llama `inicializarAuth` en `useEffect` y `QueryClient` está fuera del componente.
- [ ] `RutaProtegida` usa `cargando` y muestra spinner mientras espera.
- [ ] `supabase/ordenes.supabase.ts` creado con las 4 funciones extraídas.
- [ ] `orden.store.ts` limpio — sin funciones privadas de lógica de negocio.
- [ ] Todos los archivos renombrados al español.
- [ ] Todas las rutas URL actualizadas al español.
- [ ] Sin `console.log` ni `console.error` en producción.
- [ ] `.env` en `.gitignore` y `.env.example` creado.
- [ ] Keys de Supabase rotadas en el dashboard.
- [ ] `npm run build` pasa sin errores.
- [ ] `npm run lint` pasa sin warnings críticos.

---

## Regla de commit

No hacer commit hasta que el checklist esté completo y `npm run build` pase.
