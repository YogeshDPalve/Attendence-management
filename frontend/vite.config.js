import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import scrollbar from "tailwind-scrollbar";

export default defineConfig({
  plugins: [react(), tailwindcss(), scrollbar],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
