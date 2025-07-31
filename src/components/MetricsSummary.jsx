import React from 'react';

const MetricsSummary = ({ metrics }) => {
  if (!metrics || !metrics.dimensoes) {
    return null;
  }

  const dimensionNames = Object.keys(metrics.dimensoes);
  const dimensionsWithMaxPerformance = dimensionNames.filter(name => 
    metrics.dimensoes[name].pontuacao_atingida === metrics.dimensoes[name].pontuacao_max
  ).length;

  const totalIndicators = dimensionNames.reduce((total, name) => {
    // Count non-header, non-total rows for each dimension
    return total + Math.max(0, Object.keys(metrics.dimensoes[name]).length - 2); // Rough estimate
  }, 0);

  const implementedIndicators = Math.round((metrics.total_pontuacao_atingida / metrics.total_pontuacao_max) * totalIndicators);

  return (
    <div className="metrics-summary">
      <div className="title">Métricas de Maturidade Digital - 2025</div>
      
      <div className="content">
        <div className="card">
          <p className="mb-4">O <span className="highlight">Prêmio de Maturidade Digital 2025</span> avalia municípios em quatro dimensões fundamentais para transformação digital:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Serviços Públicos Digitais</li>
            <li>Governança e Gestão Digital</li>
            <li>Infraestrutura e Segurança</li>
            <li>Capacitação e Inclusão Digital</li>
          </ul>
        </div>
        
        <div className="card">
          <p className="mb-4">A <span className="highlight">autoavaliação</span> realizada pelo município demonstra:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Pontuação total de <span className="highlight">{metrics.total_pontuacao_atingida} de {metrics.total_pontuacao_max} pontos</span> ({metrics.indice_geral_maturidade.toFixed(2)}%)</li>
            <li>Excelência em {dimensionsWithMaxPerformance} dimensões (100%)</li>
            <li>Oportunidades de melhoria identificadas ({metrics.total_pontuacao_max - metrics.total_pontuacao_atingida} pontos)</li>
          </ul>
        </div>
        
        <div className="card">
          <p className="mb-4">Os principais objetivos desta proposta são:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Monitorar o desempenho em tempo real</li>
            <li>Identificar áreas prioritárias para investimento</li>
            <li>Acompanhar a evolução da maturidade digital</li>
            <li>Auxiliar na tomada de decisões baseadas em dados</li>
          </ul>
        </div>
      </div>
      
      <div className="footer">
        <p>Baseado na Autoavaliação do Prêmio de Maturidade Digital 2025</p>
      </div>
    </div>
  );
};

export default MetricsSummary;

