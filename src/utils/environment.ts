const getStringEnv = (key: string, fallback: string): string => {
  const value = process.env[key];
  return value === undefined || value.trim() === "" ? fallback : value.trim();
};

const getBooleanEnv = (
  key: string,
  fallback: boolean,
  truthy: string[] = ["1", "true", "yes", "y", "on"],
  falsy: string[] = ["0", "false", "no", "n", "off"]
): boolean => {
  const value = process.env[key];

  if (value === undefined) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (truthy.includes(normalized)) {
    return true;
  }

  if (falsy.includes(normalized)) {
    return false;
  }

  return fallback;
};

const getIntegerEnv = (key: string, fallback: number): number => {
  const value = process.env[key];

  if (value === undefined || value.trim() === "") {
    return fallback;
  }

  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
};

export const NODE_ENV = getStringEnv("NODE_ENV", "development");
export const IS_PRODUCTION = NODE_ENV === "production";
export const PORT = getIntegerEnv("PORT", 5000);

export const CHILD_PROCESS = getStringEnv("CHILD_PROCESS", "").toLowerCase() === "no";
export const APP_SECRET = getStringEnv("APP_SECRET", "98uhu5rfs0cve");

export const MONGO_DB_URL = getStringEnv("MONGO_DB_URL", "");

export const APP_NAME = getStringEnv("APP_NAME", "");

export const ENABLE_REDIS = getBooleanEnv("ENABLE_REDIS", false);
export const REDIS_HOST = getStringEnv("REDIS_HOST", "localhost");
export const REDIS_PORT = String(getIntegerEnv("REDIS_PORT", 6379));
export const REDIS_PASSWORD = getStringEnv("REDIS_PASSWORD", "");
