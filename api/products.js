// api/api.js
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    // Ahora stock.xls está junto a este archivo
    const filePath = path.join(__dirname, 'stock.xls');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'stock.xls no encontrado en api/' });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet     = workbook.Sheets[sheetName];
    const range     = XLSX.utils.decode_range(sheet['!ref']);
    const products  = [];

    // Empezar en fila 10 -> índice r = 9; columnas A=0, C=2, F=5
    for (let r = 9; r <= range.e.r; r++) {
      const codeCell = sheet[XLSX.utils.encode_cell({ c: 0, r })];
      if (!codeCell || !codeCell.v) break;  // parar al primer vacío
      const code        = codeCell.v;
      const description = sheet[XLSX.utils.encode_cell({ c: 2, r })]?.v || '';
      const rubro       = sheet[XLSX.utils.encode_cell({ c: 5, r })]?.v || '';
      products.push({ code, description, rubro });
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};