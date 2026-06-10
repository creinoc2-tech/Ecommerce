# ADR-0001 — Correcciones de arquitectura y estandarización al español

## Status
Accepted

## Date
2026-05-29

## Context

Tras el análisis del proyecto Ecommerce se identificaron los siguientes problemas:

1. **Dos sistemas de auth duplicados** — `AuthContext.tsx` y `useSubcription` en `auth.store.ts` hacen lo mismo.
2. **Falta estado `loading` en auth** — `ProtectedRoute` redirige prematuramente mientras Supabase inicializa.
3. **`QueryClient` se crea dentro del componente** — se recrea en cada render de `App`.
4. **`order.store.ts` con demasiada responsabilidad** — lógica de negocio compleja definida dentro del store.
5. **Nomenclatura inconsistente** — mezcla de español e inglés en nombres de funciones, variables y carpetas.
6. **`console.log` en producción** — logs de debug en stores y stacks.
7. **`.env` commiteado** — keys de Supabase expuestas públicamente en el repo.

---

## Decision

### 1. Eliminar `AuthContext.tsx` — usar solo `useAuthStore`

**Antes:**
```ts
// context/AuthContent.tsx — ELIMINAR
const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContextProvider = ({ children }) => { ... }
export const UserAuth = () => useContext(AuthContext);
```

**Después — `store/auth.store.ts` centraliza todo:**
```ts
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
    return data.usuario;
  },

  registrarUsuario: async (p: IAuthRegister) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.contrasena,
      options: { data: { nombre_completo: p.nombreCompleto, telefono: p.telefono } },
    });
    if (error) throw new Error(error.message);
    return data.usuario;
  },

  cerrarSesion: async () => {
    await supabase.auth.signOut();
    set({ usuario: null });
  },
}));
```

**En `App.tsx`:**
```tsx
const { inicializarAuth } = useAuthStore();

useEffect(() => {
  const desuscribir = inicializarAuth();
  return desuscribir;
}, []);
```

**Eliminar de `App.tsx`:**
```tsx
// ELIMINAR — ya no se necesita
import { AuthContextProvider } from "./context/AuthContent";
<AuthContextProvider>...</AuthContextProvider>
```

---

### 2. Agregar `cargando` al `ProtectedRoute`

**Antes:**
```tsx
export const RutaProtegida: FC<RutaProtegidaProps> = ({ children, autenticado = true }) => {
  const { usuario } = useAuthStore();
  // sin loading — flash de contenido
```

**Después:**
```tsx
interface RutaProtegidaProps {
  children: React.ReactNode;
  autenticado?: boolean;
}

export const RutaProtegida: FC<RutaProtegidaProps> = ({
  children,
  autenticado = true,
}) => {
  const { usuario, cargando } = useAuthStore();

  if (cargando) return <SpinnerPagina />;

  if (autenticado === false) {
    return !usuario ? (children ? children : <Outlet />) : <Navigate to="/" replace />;
  }

  if (autenticado) {
    return usuario ? (children ? children : <Outlet />) : <Navigate to="/auth/iniciar-sesion" replace />;
  }

  return <Navigate to="/" replace />;
};
```

---

### 3. Mover `QueryClient` fuera del componente `App`

**Antes:**
```tsx
// App.tsx — MAL
function App() {
  const queryClient = new QueryClient(); // se recrea en cada render
```

**Después:**
```tsx
// App.tsx — CORRECTO
const clienteConsultas = new QueryClient();

function App() {
  const { inicializarAuth } = useAuthStore();

  useEffect(() => {
    const desuscribir = inicializarAuth();
    return desuscribir;
  }, []);

  return (
    <QueryClientProvider client={clienteConsultas}>
      <MyRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

### 4. Extraer lógica de negocio de `order.store.ts` a `supabase/`

**Estructura nueva:**
```
src/
  supabase/
    ordenes.supabase.ts       → verificarStock, guardarDireccion, guardarItemsOrden, actualizarStock
  store/
    orden.store.ts            → solo llama a supabase/, sin lógica interna
```

**`supabase/ordenes.supabase.ts`:**
```ts
export const verificarStock = async (orden: EntradaOrden) => {
  for (const item of orden.itemsCarrito) {
    const { data, error } = await supabase
      .from("variantes")
      .select("stock")
      .eq("id", item.varianteId)
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("La variante no existe");
    if (data.stock < item.cantidad)
      throw new Error("No hay stock suficiente para los artículos seleccionados");
  }
};

export const guardarDireccion = async (orden: EntradaOrden, clienteId: string) => {
  const { data, error } = await supabase
    .from("direcciones")
    .insert({
      linea_direccion1: orden.direccion?.lineaDireccion1,
      linea_direccion2: orden.direccion?.lineaDireccion2,
      ciudad: orden.direccion?.ciudad,
      estado: orden.direccion?.estado,
      codigo_postal: orden.direccion?.codigoPostal,
      pais: orden.direccion?.pais,
      usuario_id: clienteId,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("No se pudo guardar la dirección");
  return data;
};

export const guardarItemsOrden = async (items: ItemOrdenInsertar[]) => {
  const { error } = await supabase.from("items_orden").insert(items);
  if (error) throw new Error(error.message);
};

export const actualizarStock = async (orden: EntradaOrden) => {
  for (const item of orden.itemsCarrito) {
    const { data, error } = await supabase
      .from("variantes")
      .select("stock")
      .eq("id", item.varianteId)
      .single();
    if (error) throw new Error(error.message);
    if (!data) throw new Error("No se encontró la variante");
    await supabase
      .from("variantes")
      .update({ stock: data.stock - item.cantidad })
      .eq("id", item.varianteId);
  }
};
```

**`store/orden.store.ts` limpio:**
```ts
export const useOrdenStore = create<OrdenStore>((set) => ({
  contador: 0,
  ordenes: [],
  crearOrden: async (orden: EntradaOrden, clienteId: string) => {
    await verificarStock(orden);
    const direccion = await guardarDireccion(orden, clienteId);
    const { data, error } = await supabase
      .from("ordenes")
      .insert({ usuario_id: clienteId, direcciones_id: direccion.id, monto_total: orden.montoTotal, estado: "Pendiente" })
      .select().single();
    if (error) throw new Error(error.message);
    const items = orden.itemsCarrito.map((item) => ({
      ordenes_id: data.id,
      variante_id: item.varianteId,
      cantidad: item.cantidad,
      precio: item.precio,
    }));
    await guardarItemsOrden(items);
    await actualizarStock(orden);
    set((estado) => ({ ordenes: [...estado.ordenes, orden] }));
    return data;
  },
}));
```

---

### 5. Estandarización completa al español

#### Renombrado de archivos

| Archivo actual | Archivo nuevo |
|---|---|
| `hooks/Protected.route.tsx` | `hooks/ruta-protegida.tsx` |
| `context/AuthContent.tsx` | ELIMINAR |
| `store/auth.store.ts` | `store/auth.store.ts` (mismo, contenido en español) |
| `store/cart-store.ts` | `store/carrito.store.ts` |
| `store/order.store.ts` | `store/orden.store.ts` |
| `store/producto-store.ts` | `store/producto.store.ts` |
| `store/user.store.ts` | `store/usuario.store.ts` |
| `store/global.store.ts` | `store/global.store.ts` |
| `stack/auth/login-Stack.ts` | `stack/auth/iniciar-sesion.stack.ts` |
| `stack/auth/register-Stack.ts` | `stack/auth/registrar.stack.ts` |
| `stack/orders/orders-create-Stack.ts` | `stack/ordenes/crear-orden.stack.ts` |
| `stack/orders/orders-getAll-Stack.ts` | `stack/ordenes/obtener-ordenes.stack.ts` |
| `stack/orders/orders-getOrder-Stack.ts` | `stack/ordenes/obtener-orden.stack.ts` |
| `stack/orders/orders-usuarioId-Stack.ts` | `stack/ordenes/ordenes-usuario.stack.ts` |
| `stack/producto/productos-Stack.ts` | `stack/producto/mostrar-productos.stack.ts` |
| `stack/producto/producto-search-Stack.ts` | `stack/producto/buscar-producto.stack.ts` |
| `stack/producto/productos-filter-Stack.ts` | `stack/producto/filtrar-productos.stack.ts` |
| `stack/producto/productos-seleccionado-Stack.ts` | `stack/producto/producto-seleccionado.stack.ts` |
| `stack/user/user-get-Stack.ts` | `stack/usuario/obtener-usuario.stack.ts` |
| `schema/auth.schema.ts` | `schema/auth.schema.ts` (contenido en español) |
| `schema/address.schema.ts` | `schema/direccion.schema.ts` |
| `interfaces/auth.interface.ts` | `interfaces/auth.interface.ts` (contenido en español) |
| `interfaces/cart.interface.ts` | `interfaces/carrito.interface.ts` |
| `interfaces/order.interface.ts` | `interfaces/orden.interface.ts` |
| `interfaces/product.interface.ts` | `interfaces/producto.interface.ts` |
| `pages/Checkou/` | `pages/Pago/` |
| `pages/ThankYou/` | `pages/Gracias/` |

#### Renombrado de funciones y variables

| Nombre actual | Nombre nuevo |
|---|---|
| `useSubcription` | eliminado — usar `useAuthStore` |
| `user` | `usuario` |
| `loading` | `cargando` |
| `queryClient` | `clienteConsultas` |
| `crearUserYLogin` | `iniciarSesion` |
| `crearUserRegister` | `registrarUsuario` |
| `cerrarSesion` | `cerrarSesion` (igual) |
| `mostrarproductosRandoms` | `mostrarProductosAleatorios` |
| `mostrarproductosRecientes` | `mostrarProductosRecientes` |
| `mostrarproductoFiltrado` | `filtrarProductos` |
| `mostrarproductoSeleccionado` | `obtenerProductoPorSlug` |
| `buscarProducto` | `buscarProducto` (igual) |
| `createOrder` | `crearOrden` |
| `getOrderById` | `obtenerOrdenPorId` |
| `getOrderUsuarioId` | `obtenerOrdenesDeUsuario` |
| `getAllOrders` | `obtenerTodasLasOrdenes` |
| `clearCart` | `limpiarCarrito` |
| `addItem` | `agregarItem` |
| `removeItem` | `eliminarItem` |
| `updateItemQuantity` | `actualizarCantidad` |
| `totalItemsInCart` | `totalItemsEnCarrito` |
| `totalAmount` | `montoTotal` |
| `ProtectedRoute` | `RutaProtegida` |
| `authenticated` | `autenticado` |
| `MyRoutes` | `MisRutas` |

#### Rutas URL (mantener en español)

| Ruta actual | Ruta nueva |
|---|---|
| `/auth/sign-in` | `/auth/iniciar-sesion` |
| `/auth/sign-up` | `/auth/registrarse` |
| `/product` | `/productos` |
| `/product/:slug` | `/productos/:slug` |
| `/account/profile` | `/cuenta/perfil` |
| `/account/orders` | `/cuenta/ordenes` |
| `/account/orders/pedido/:id` | `/cuenta/ordenes/pedido/:id` |
| `/cart` | `/carrito` |
| `/checkout` | `/pago` |
| `/checkout/:id/thank-you` | `/pago/:id/gracias` |

---

### 6. Eliminar `console.log` de producción

Reemplazar todos los `console.log` y `console.error` por manejo silencioso o por un sistema de errores centralizado. En desarrollo se puede usar `import.meta.env.DEV`:

```ts
// Antes
console.log(orderError);
console.log("Inicio de sesión exitoso");

// Después
if (import.meta.env.DEV) console.error("Error al crear la orden:", error);
```

---

### 7. Agregar `.env` al `.gitignore`

```bash
# Agregar al .gitignore
.env
.env.local
.env.production

# Crear .env.example con las claves sin valores
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Rotar inmediatamente las keys de Supabase expuestas:
> Supabase Dashboard → Settings → API → Regenerate anon key

---

## Consequences

### Positivas
- Un solo sistema de auth — sin duplicación entre contexto y store.
- `ProtectedRoute` sin flash de contenido gracias a `cargando`.
- `QueryClient` estable — no se recrea en cada render.
- Código 100% en español — consistente y legible para el equipo.
- Lógica de negocio de órdenes separada del store — más testeable.
- Keys de Supabase seguras.

### Negativas / riesgos
- Renombrar archivos y funciones requiere actualizar todas las importaciones. Usar búsqueda global en el editor (Ctrl+Shift+H en VS Code).
- Las rutas URL cambian — si hay links externos o bookmarks apuntando a `/auth/sign-in` se rompen. Agregar redirects si es necesario.

---

## Related decisions
- ADR-0002 (pendiente): estrategia de manejo de errores centralizado.
- ADR-0003 (pendiente): implementación de tests unitarios.
