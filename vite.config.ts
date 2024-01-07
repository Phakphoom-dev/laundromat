import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/laundromat",
  plugins: [react(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
