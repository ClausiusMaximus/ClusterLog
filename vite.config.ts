import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/ClusterLog/",

  plugins: [
    react(),

    tsconfigPaths(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "ClusterLog",
        short_name: "ClusterLog",

        description:
          "Offline-Tagebuch für Clusterkopfschmerz",

        theme_color: "#d32f2f",
        background_color: "#121212",

        display: "standalone",
        orientation: "portrait",

        // WICHTIG für GitHub Pages
        start_url: "/ClusterLog/",
        scope: "/ClusterLog/",

        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: [
          "**/*.{js,css,html,ico,png,svg,webmanifest}",
        ],

        navigateFallback: "/ClusterLog/index.html",

        cleanupOutdatedCaches: true,

        clientsClaim: true,

        skipWaiting: true,
      },

      devOptions: {
        enabled: false,
      },
    }),
  ],
});