// utils/cache.ts
export function setCache(key: string, value: any, limit = 20) {
  try {
    // Lấy danh sách cache hiện tại
    const keys = JSON.parse(localStorage.getItem("post-keys") || "[]");

    // Nếu key chưa có thì thêm
    if (!keys.includes(key)) {
      keys.push(key);
      // Nếu quá 20 thì xóa bài cũ nhất
      if (keys.length > limit) {
        const oldestKey = keys.shift();
        if (oldestKey) localStorage.removeItem(oldestKey);
      }
      localStorage.setItem("post-keys", JSON.stringify(keys));
    }

    // Lưu dữ liệu bài viết
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Cache error:", err);
  }
}

export function getCache(key: string) {
  try {
    const cached = localStorage.getItem(key);
    return cached ? JSON.parse(cached) : null;
  } catch (err) {
    return null;
  }
}
