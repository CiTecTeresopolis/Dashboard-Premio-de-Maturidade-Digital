import * as XLSX from 'xlsx';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Read only the first 4 sheets
        const sheetNames = workbook.SheetNames.slice(0, 4);
        const result = {};
        
        sheetNames.forEach(sheetName => {
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          result[sheetName] = jsonData;
        });
        
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const calculateMetrics = (data) => {
  const metrics = {
    total_pontuacao_max: 0,
    total_pontuacao_atingida: 0,
    dimensoes: {}
  };

  Object.entries(data).forEach(([dimensionName, dimensionData]) => {
    if (!dimensionData || dimensionData.length === 0) return;
    
    let currentDimMax = 0.0;
    let currentDimAtingida = 0.0;

    // Iterate through rows to calculate sum for current dimension
    // Skip header and total rows
    dimensionData.forEach((row, i) => {
      if (i === 0 || (row && row[0] === 'Total')) return;
      
      // Assuming 'Pontuação Máx.' is at index 3 and 'Pontuação Atingida' is at index 4
      let pontuacaoMaxVal = 0.0;
      let pontuacaoAtingidaVal = 0.0;

      try {
        if (row[3] !== null && row[3] !== undefined) {
          pontuacaoMaxVal = parseFloat(row[3]);
        }
      } catch (error) {
        // Ignore non-numeric values
      }

      // Handle IF formula for 'Pontuação Atingida'
      // =IF(B2="sim", D2, 0)
      if (row[4] && typeof row[4] === 'string' && row[4].startsWith('=')) {
        const parts = row[4].split(',');
        if (parts.length === 3) {
          // Check if 'sim' is in the 'Resposta' column (index 1) for the current row
          if (row[1] && row[1].toString().toLowerCase().includes('sim')) {
            // Use the value from 'Pontuação Máx.' column (index 3) for the current row
            try {
              pontuacaoAtingidaVal = parseFloat(row[3]);
            } catch (error) {
              // Ignore non-numeric values
            }
          }
        }
      } else {
        try {
          if (row[4] !== null && row[4] !== undefined) {
            pontuacaoAtingidaVal = parseFloat(row[4]);
          }
        } catch (error) {
          // Ignore non-numeric values
        }
      }
      
      currentDimMax += pontuacaoMaxVal;
      currentDimAtingida += pontuacaoAtingidaVal;
    });

    metrics.dimensoes[dimensionName] = {
      pontuacao_max: currentDimMax,
      pontuacao_atingida: currentDimAtingida
    };
    metrics.total_pontuacao_max += currentDimMax;
    metrics.total_pontuacao_atingida += currentDimAtingida;
  });

  if (metrics.total_pontuacao_max > 0) {
    metrics.indice_geral_maturidade = (metrics.total_pontuacao_atingida / metrics.total_pontuacao_max) * 100;
  } else {
    metrics.indice_geral_maturidade = 0;
  }

  return metrics;
};

