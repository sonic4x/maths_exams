import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// npm install dotenv --save
require('dotenv').config() // now we can use process.env.xxx in this file

console.log(process.env)
// https://vitejs.dev/config/

export default ( () => {
   const VITE_API_SERVER = process.env.VITE_API_SERVER;
   return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true
    },
    define: {
      __API_SERVER__: JSON.stringify(VITE_API_SERVER)
    },
  })
})
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     host: true
//   },
  
// })
// VITE_API_SERVER = process.env.VITE_API_SERVER;

console.log(import.meta.server)
console.log(process.env.VITE_API_SERVER)
// console.log(import.meta.env.VITE_API_SERVER)