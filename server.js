// index.js
const express = require('express')
const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.get('/api/products', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'stock.xls')
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'stock.xls no encontrado en /data' })
    }
    const workbook = XLSX.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const range = XLSX.utils.decode_range(sheet['!ref'])
    const products = []

    // Fila 10 es índice 9 (0-based), columnas A=0, C=2, F=5
    for (let row = 9; row <= range.e.r; row++) {
      const codeCell = sheet[XLSX.utils.encode_cell({ c: 0, r: row })]
      const code = codeCell ? codeCell.v : null
      if (!code) break // detener al primer código vacío
      const description =
        sheet[XLSX.utils.encode_cell({ c: 2, r: row })]?.v || ''
      const rubro = sheet[XLSX.utils.encode_cell({ c: 5, r: row })]?.v || ''
      products.push({ code, description, rubro })
    }

    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`)
})
