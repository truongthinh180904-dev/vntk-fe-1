// cacheHelper.ts
export function setCache(key: string, data: any, ttlMinutes = 10) {
  const now = new Date().getTime();
  const item = {
    value: data,
    expiry: now + ttlMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getCache(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch {
    return null;
  }
}
