import { useAuthStore } from "@/stores/authStore";

const DebugPanel = () => {
  const { user, session, profile, loading, profileLoading, initialized } =
    useAuthStore();

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-md text-xs font-mono z-50">
      <h3 className="font-bold text-sm mb-2 text-orange-400">🐛 Debug Panel</h3>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>Initialized:</span>
          <span className={initialized ? "text-green-400" : "text-red-400"}>
            {initialized ? "✅" : "❌"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Auth Loading:</span>
          <span className={loading ? "text-yellow-400" : "text-green-400"}>
            {loading ? "⏳" : "✅"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Profile Loading:</span>
          <span
            className={profileLoading ? "text-yellow-400" : "text-green-400"}
          >
            {profileLoading ? "⏳" : "✅"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>User:</span>
          <span className={user ? "text-green-400" : "text-red-400"}>
            {user ? "✅" : "❌"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Session:</span>
          <span className={session ? "text-green-400" : "text-red-400"}>
            {session ? "✅" : "❌"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Profile:</span>
          <span className={profile ? "text-green-400" : "text-red-400"}>
            {profile ? "✅" : "❌"}
          </span>
        </div>
      </div>

      {user && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-gray-400">User ID:</div>
          <div className="truncate">{user.id}</div>
          <div className="text-gray-400 mt-1">Email:</div>
          <div className="truncate">{user.email}</div>
        </div>
      )}

      {profile && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="text-gray-400">Profile Email:</div>
          <div className="truncate">{profile.email || "null"}</div>
          <div className="text-gray-400 mt-1">Full Name:</div>
          <div className="truncate">{profile.full_name || "null"}</div>
          <div className="text-gray-400 mt-1">Avatar:</div>
          <div className="truncate">{profile.avatar_url ? "✅" : "❌"}</div>
          <div className="text-gray-400 mt-1">Country:</div>
          <div className="truncate">{profile.country_name || "null"}</div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
