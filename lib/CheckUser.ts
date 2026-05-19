export const currentUser = () => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("data");
  if (!raw) return null;

  const parts = raw.split(".");
  if (parts.length === 3) {
    try {
      const decoded = JSON.parse(atob(parts[1]));
      console.log("Decoded JWT payload:", decoded);
      return {
        id: decoded?.id || decoded?.userId || decoded?.sub,
      };
    } catch (e) {
      console.error("JWT decode failed:", e);
      return null;
    }
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed?.id) return parsed;
    return null;
  } catch (e) {
    console.error("JSON parse failed:", e);
    return null;
  }
};
