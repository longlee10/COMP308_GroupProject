// shell-app/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";
//
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "shellApp",
      remotes: {
        userApp: "http://localhost:3001/assets/remoteEntry.js",
        vitalSignApp: "http://localhost:3002/assets/remoteEntry.js",
        alertApp: "http://localhost:3003/assets/remoteEntry.js",
        symptomApp: "http://localhost:3004/assets/remoteEntry.js",
        motivationApp: "http://localhost:3005/assets/remoteEntry.js",
        gameApp: "http://localhost:3006/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "@apollo/client", "graphql"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
