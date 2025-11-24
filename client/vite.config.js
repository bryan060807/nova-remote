import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // Load env variables based on mode (development / production)
  const env = loadEnv(mode, process.cwd(), "VITE_");

  // Ensure required variables exist
  if (!env.VITE_API_URL) {
    throw new Error("❌ Missing required environment variable: VITE_API_URL");
  }

  return {
    base: "/",
    plugins: [react()],
    define: {
      __APP_ENV__: env.VITE_API_URL, // optional global usage
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    server: {
      port: 5173,
      open: true,
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    preview: {
      port: 4173,
      open: true,
    },
  };
});
