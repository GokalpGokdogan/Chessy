import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {config} from 'dotenv'

config({path: __dirname + '/backend/.env'})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 4000,
    proxy: {
      '/api': 'http://localhost:' + process.env.PORT || 'http://localhost:4000',
    },
  },
})