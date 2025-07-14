const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

module.exports = async (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'data', 'stock.XLS')
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'stock.xls no encontrado en /data' })
    }
    const workbook = XLSX.readFile(filePath)
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const range = XLSX.utils.decode_range(sheet['!ref'])
    const products = []

    for (let row = 9; row <= range.e.r; row++) {
      const codeCell = sheet[XLSX.utils.encode_cell({ c: 0, r: row })]
      const code = codeCell ? codeCell.v : null
      if (!code) break
      const description =
        sheet[XLSX.utils.encode_cell({ c: 2, r: row })]?.v || ''
      const rubro = sheet[XLSX.utils.encode_cell({ c: 5, r: row })]?.v || ''
      products.push({ code, description, rubro })
    }

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
