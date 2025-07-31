import { useEffect, useState } from 'react';
import SlideContainer from './components/SlideContainer';
import { readExcelFile, calculateMetrics } from './utils/excelReader';
import './App.css';

function App() {
  const [metrics, setMetrics] = useState(null);

  const handleFileUpload = async (file) => {    
    try {
      const excelData = await readExcelFile(file);
      const calculatedMetrics = calculateMetrics(excelData);
      setMetrics(calculatedMetrics);
    } catch (err) {
      console.error('Error processing Excel file:', err);
    } 
  };


  useEffect(() => {
    // Busca o arquivo sample.xlsx da pasta public
    fetch('/sample.xlsx')
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], 'sample.xlsx', { type: blob.type });
        handleFileUpload(file);
      });
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <img src="/ct-logo.png" alt="Logo" className="app-logo" />
        {/* <h1>Dashboard de Maturidade Digital</h1> */}
        <p>Análise das métricas do Prêmio de Maturidade Digital - 2025</p>
      </header>

      <main className="app-main">
        {metrics && (
          <div className="dashboard-content">
            <SlideContainer metrics={metrics} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p style={{ margin: 0, fontSize: '1rem'}}>
          Desenvolvido por: Secretaria Municipal de Ciência e Tecnologia &copy; 2025
        </p>
      </footer>

    </div>
  );
}

export default App;

