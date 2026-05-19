export const currentUser = () => {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem("data");
  if (!raw) return null;

  // Case 1: JSON object
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.id) return parsed;
  } catch (e) {
    // ignore JSON error
  }

  // Case 2: raw JWT token fallback
  try {
    const base64 = raw.split(".")[1];
    if (!base64) return null;

    const decoded = JSON.parse(atob(base64));

    return {
      id: decoded?.id || decoded?.userId,
    };
  } catch (e) {
    return null;
  }
};
