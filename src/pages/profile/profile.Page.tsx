import { useAuthStore } from "../../store/auth.store";

export const ProfilePage = () => {
  const { usuario } = useAuthStore();

  return (
    <div className="rounded-lg border border-[#303030] bg-input/10 text-card-foreground shadow-sm">
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <div
            className="h-20 w-20 text-white bg-amber-600 
          rounded-full flex items-center justify-center font-medium
           p-2 text-[35px]"
          >
            {usuario?.user_metadata.full_name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-white">
              {usuario?.user_metadata.full_name?.toUpperCase()}
            </h3>
            <p className="text-muted-foreground text-sm text-[#616161]">
              {"Member since "}
              {usuario?.created_at
                ? new Date(usuario.created_at).toISOString().slice(0, 10)
                : "-"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-[#1a1a1a] bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={usuario?.user_metadata.full_name || ""}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-[#1a1a1a] bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={usuario?.email || ""}
              readOnly
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-white">
              Phone
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-[#1a1a1a] bg-transparent px-3 py-2
                                             text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
              value={usuario?.user_metadata.phone || ""}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};
