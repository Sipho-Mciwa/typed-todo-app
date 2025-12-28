import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // test: {
  //   globals: true, // Allows using test functions (describe, it, expect) globally
  //   environment: "jsdom", // Use 'jsdom' for browser-like testing
  //   // ... other options like setupFiles, coverage
  // },
})
