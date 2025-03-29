import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    // Otras configuraciones para el proceso principal (si es necesario)
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    // Configuración adicional para el proceso de pre-carga (si es necesario)
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [react()],
    css: {
      postcss: resolve(__dirname, 'postcss.config.js')
    }
  },
  build: {
    // Configuración de la construcción y empaquetado de la app
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main/index.js'),
        preload: resolve(__dirname, 'src/preload/index.js'),
        renderer: resolve(__dirname, 'src/renderer/index.html')
      }
    },
    // Aquí puedes asegurarte de que los archivos de Python se incluyan
    extraResources: [
      {
        from: resolve(__dirname, 'src/renderer/src/backend/sensor'), // Carpeta de scripts de Python
        to: 'backend/sensor' // Donde serán copiados en la carpeta de la app empaquetada
      }
    ]
  }
})
