# API para leer stock desde un archivo XLS

Este proyecto está preparado para desplegar en Vercel. La función serverless en `/api/products.js` lee el archivo `data/stock.xls` y expone el endpoint `/api/products` que devuelve un JSON con los productos.

## Estructura del proyecto

- `/api/products.js`: función serverless que lee el XLS y devuelve JSON.
- `/data/stock.xls`: archivo Excel con los datos de productos.

## Pasos para ejecutar

1. Descomprime el proyecto.
2. Instala las dependencias:
   ```bash
   npm install
   npm install -g vercel
   ```
3. Ejecuta localmente:
   ```bash
   vercel dev
   ```
   El endpoint estará en `http://localhost:3000/api/products`.

4. Para desplegar en producción:
   ```bash
   vercel
   ```
