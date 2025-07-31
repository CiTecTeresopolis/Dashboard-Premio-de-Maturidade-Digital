import AllCharts from './AllCharts';
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2';

const SlideContainer = ({ metrics }) => {
  if (!metrics || !metrics.dimensoes) {
    return null;
  }

  const charts = AllCharts({ metrics });
  const dimensionNames = Object.keys(metrics.dimensoes);
  const dimensionsWithMaxPerformance = dimensionNames.filter(name => 
    metrics.dimensoes[name].pontuacao_atingida === metrics.dimensoes[name].pontuacao_max
  ).length;

  const minPerformance = Math.min(...dimensionNames.map(name => 
    (metrics.dimensoes[name].pontuacao_atingida / metrics.dimensoes[name].pontuacao_max) * 100
  ));
  const maxPerformance = Math.max(...dimensionNames.map(name => 
    (metrics.dimensoes[name].pontuacao_atingida / metrics.dimensoes[name].pontuacao_max) * 100
  ));

  return (
    <div className="slides-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Slide 1 - Métricas de Maturidade Digital */}
      <div className="slide-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="title">Maturidade Digital - 2025</div>
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

      {/* Slide 2 - Dimensões e Métricas Principais */}
      <div className="slide-container">
        <div className="title">Dimensões e Métricas Principais</div>
        <div className="content-row" style={{ display: 'flex', flex: 1 }}>
          <div className="w-1-2" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="subtitle">Dimensões Avaliadas</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Bar data={charts.dimensoesChart.data} options={charts.dimensoesChart.options} />
            </div>
          </div>
          <div className="w-1-2" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div className="subtitle">KPIs Principais</div>
            <ul className="kpi-list">
              <li className="kpi-item">
                <i className="fas fa-chart-pie kpi-icon blue"></i>
                <span><span className="highlight">Índice Geral de Maturidade Digital:</span> {metrics.indice_geral_maturidade.toFixed(2)}% ({metrics.total_pontuacao_atingida}/{metrics.total_pontuacao_max} pontos)</span>
              </li>
              <li className="kpi-item">
                <i className="fas fa-chart-bar kpi-icon green"></i>
                <span><span className="highlight">Taxa de Implementação por Dimensão:</span> Variação de {minPerformance.toFixed(2)}% a {maxPerformance.toFixed(2)}%</span>
              </li>
              <li className="kpi-item">
                <i className="fas fa-exclamation-triangle kpi-icon yellow"></i>
                <span><span className="highlight">Pontos de Identificados:</span> {metrics.total_pontuacao_max - metrics.total_pontuacao_atingida} pontos ({((metrics.total_pontuacao_max - metrics.total_pontuacao_atingida) / metrics.total_pontuacao_max * 100).toFixed(2)}% do total)</span>
              </li>
              <li className="kpi-item">
                <i className="fas fa-trophy kpi-icon red"></i>
                <span><span className="highlight">Dimensões com Performance Máxima:</span> {dimensionsWithMaxPerformance} de {dimensionNames.length} ({((dimensionsWithMaxPerformance / dimensionNames.length) * 100).toFixed(0)}%)</span>
              </li>
              <li className="kpi-item">
                {/* <i className="fas fa-tasks kpi-icon purple"></i> */}
                {/* <span><span className="highlight">Indicadores Implementados:</span> 21 de 23 (91,3%)</span> */}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Slide 3 - Dashboard Executivo */}
      <div className="slide-container">
        <div className="title">Dashboard Executivo</div>
        <div className="content-row">
          <div className="w-1-2">
            <div className="subtitle">Índice de Maturidade Digital</div>
            <div className="chart-container gauge-container" style={{ flex: 1, maxHeight: 500 }}>
              <Doughnut data={charts.gaugeChart.data} options={charts.gaugeChart.options} />
              <div className="gauge-text">
                <div className="gauge-percentage">{metrics.indice_geral_maturidade.toFixed(2)}%</div>
                <div className="gauge-label">Maturidade Digital</div>
              </div>
            </div>
            <div className="mt-4">
              <p><span className="highlight">Justificativa:</span> O gráfico de Gauge fornece uma visão imediata do status geral da maturidade digital do município.</p>
            </div>
          </div>
          <div className="w-1-2">
            <div className="subtitle">Porcentagem por Dimensão</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Bar data={charts.horizontalBarChart.data} options={charts.horizontalBarChart.options} />
            </div>
            <div className="mt-4">
              <p><span className="highlight">Uso para Decisões:</span> Gestores podem rapidamente avaliar se o município está no caminho certo e se precisa de ações urgentes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 4 - Dashboard Operacional */}
      <div className="slide-container">
        <div className="title">Dashboard Operacional</div>
        <div className="content-row">
          <div className="w-1-2">
            <div className="subtitle">Gráfico de Radar/Spider</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Radar data={charts.radarChart.data} options={charts.radarChart.options} />
            </div>
            <div className="mt-4">
              <p><span className="highlight">Justificativa:</span> Visualizar o perfil completo de maturidade, identificando pontos fortes e fracos simultaneamente.</p>
              <p className="mt-2"><span className="highlight">Uso para Decisões:</span> Permite definir estratégias de desenvolvimento equilibrado ou focar em áreas específicas.</p>
            </div>
          </div>
          <div className="w-1-2">
            <div className="subtitle">Gráfico de Rosca (Donut Chart)</div>
            <div className="chart-container donut-container" style={{ flex: 1, maxHeight: 500 }}>
              <Doughnut data={charts.donutChart.data} options={charts.donutChart.options} />
              <div className="donut-text">
                <div className="donut-percentage">{metrics.indice_geral_maturidade.toFixed(2)}%</div>
              </div>
            </div>
            <div className="mt-4">
              <p><span className="highlight">Justificativa:</span> Mostrar a proporção de forma intuitiva, destacando o percentual de oportunidades de melhoria.</p>
              <p className="mt-2"><span className="highlight">Uso para Decisões:</span> Comunicação clara do status atual para stakeholders e definição de metas.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 5 - Dashboard Estratégico */}
      <div className="slide-container">
        <div className="title">Dashboard Estratégico</div>
        <div className="content-row">
          <div className="w-1-2">
            <div className="subtitle">Gráfico de Waterfall</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Bar data={charts.waterfallChart.data} options={charts.waterfallChart.options} />
            </div>
            <div className="mt-4">
              <p><span className="highlight">Justificativa:</span> Mostrar a contribuição de cada dimensão para o gap total, visualizando o impacto de melhorias potenciais.</p>
              <p className="mt-2"><span className="highlight">Uso para Decisões:</span> Priorização de investimentos baseada em impacto potencial de cada área de melhoria.</p>
            </div>
          </div>
          <div className="w-1-2">
            <div className="subtitle">Heatmap de Indicadores</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Bar data={charts.heatmapChart.data} options={charts.heatmapChart.options} />
            </div>
            <div className="mt-4">
              <p><span className="highlight">Justificativa:</span> Visualização densa de informações que identifica padrões e clusters de performance.</p>
              <p className="mt-2"><span className="highlight">Uso para Decisões:</span> Identificação de dependências e sinergias entre indicadores para planejamento estratégico integrado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6 - Tomada de Decisão */}
      <div className="slide-container">
        <div className="title">Tomada de Decisão</div>
        <div className="content-row">
          <div className="w-1-2">
            <div className="subtitle">Níveis de Decisão</div>
            <div className="chart-container" style={{ flex: 1, maxHeight: 500 }}>
              <Bar data={charts.decisionPyramid.data} options={charts.decisionPyramid.options} />
            </div>
            <div className="mt-4">
              <p><span className="highlight">Benefícios:</span></p>
              <ul className="list-disc pl-6 mt-2">
                <li>Visibilidade em tempo real do status de maturidade</li>
                <li>Identificação proativa de áreas críticas</li>
                <li>Acompanhamento histórico da evolução</li>
                <li>Comunicação eficaz com gestores</li>
              </ul>
            </div>
          </div>
          <div className="w-1-2">
            <div className="subtitle">Aplicações Práticas</div>
            <div className="decision-item blue-bg">
              <div className="icon-container blue-icon">
                <i className="fas fa-chart-line text-white text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Decisões Estratégicas</p>
                <p>Dashboards executivos para definição de prioridades de investimento em transformação digital</p>
              </div>
            </div>
            <div className="decision-item green-bg">
              <div className="icon-container green-icon">
                <i className="fas fa-tasks text-white text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Decisões Táticas</p>
                <p>Dashboards operacionais para alocação de recursos e planejamento de implementações</p>
              </div>
            </div>
            <div className="decision-item yellow-bg">
              <div className="icon-container yellow-icon">
                <i className="fas fa-cogs text-white text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Decisões Operacionais</p>
                <p>Dashboards de monitoramento para acompanhamento diário e resolução de problemas</p>
              </div>
            </div>
            <div className="decision-item red-bg">
              <div className="icon-container red-icon">
                <i className="fas fa-users text-white text-xl"></i>
              </div>
              <div>
                <p className="font-bold">Comunicação com Cidadãos</p>
                <p>Dashboards públicos para transparência e engajamento da comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 7 - Conclusão e Próximos Passos */}
      <div className="slide-container">
        <div className="title">Conclusão e Próximos Passos</div>
        <div className="content-row">
          <div className="w-1-2">
            <div className="subtitle">Conclusões</div>
            <div className="card">
              <p className="mb-4">A análise da autoavaliação do Prêmio de Maturidade Digital demonstra:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Desempenho geral ({metrics.indice_geral_maturidade.toFixed(2)}%)</li>
                <li>{dimensionsWithMaxPerformance} dimensões com performance máxima</li>
                <li>Necessidade de monitoramento contínuo</li>
                {dimensionNames.filter(name => metrics.dimensoes[name].pontuacao_atingida < metrics.dimensoes[name].pontuacao_max).length > 0 && (
                  <>
                    <li>Oportunidades específicas de melhoria identificadas nas dimensões:</li>
                    <ul>
                      {dimensionNames.filter(name => metrics.dimensoes[name].pontuacao_atingida < metrics.dimensoes[name].pontuacao_max)
                        .map(name => (
                          <li style={{marginLeft: 20}} key={name}>{name}</li>
                        ))}
                    </ul>
                  </>
                )}
              </ul>
            </div>
            <div className="card">
              <p className="mb-4">As visualizações propostas permitem:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visão holística da maturidade digital</li>
                <li>Identificação de áreas prioritárias</li>
                <li>Acompanhamento da evolução temporal</li>
                <li>Comunicação eficaz com stakeholders</li>
              </ul>
            </div>
          </div>
          <div className="w-1-2">
            <div className="subtitle">Próximos Passos</div>
            <div className="step-item">
            </div>
            <div className="step-item">
              <div className="step-number">1</div>
              <div>
                <p className="font-bold">Integração de Dados</p>
                <p>Conectar fontes de dados em tempo real para atualização automática dos indicadores de maturidade digital.</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div>
                <p className="font-bold">Capacitação da Equipe</p>
                <p>Treinar gestores e equipes técnicas na interpretação e utilização dos dashboards para tomada de decisões.</p>
              </div>
            </div>
            {dimensionNames.filter(name => metrics.dimensoes[name].pontuacao_atingida < metrics.dimensoes[name].pontuacao_max).length > 0 && (
              <div className="step-item">
                <div className="step-number">3</div>
                <div>
                  <p className="font-bold">Plano de Ação para Gaps</p>
                  <p>
                    Desenvolver planos específicos para implementação dos indicadores pendentes nas dimensões:
                    {dimensionNames.filter(name => metrics.dimensoes[name].pontuacao_atingida < metrics.dimensoes[name].pontuacao_max)
                      .map((name, idx, arr) =>
                        ` ${name}${idx < arr.length - 1 ? ',' : ''}`
                      )}
                  </p>
                </div>
              </div>
            )}
            <div className="step-item">
              <div className="step-number">4</div>
              <div>
                <p className="font-bold">Revisão Periódica</p>
                <p>Estabelecer ciclos trimestrais de revisão e atualização dos dashboards e métricas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideContainer;

