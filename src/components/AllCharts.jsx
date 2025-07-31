import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

const AllCharts = ({ metrics }) => {
  if (!metrics || !metrics.dimensoes) {
    return <div>Carregue uma planilha para visualizar as métricas</div>;
  }

  const dimensionNames = Object.keys(metrics.dimensoes);
  const dimensionScores = dimensionNames.map(name => 
    metrics.dimensoes[name].pontuacao_atingida
  );
  const dimensionMaxScores = dimensionNames.map(name => 
    metrics.dimensoes[name].pontuacao_max
  );
  const dimensionPercentages = dimensionNames.map(name => 
    (metrics.dimensoes[name].pontuacao_atingida / metrics.dimensoes[name].pontuacao_max) * 100
  );

  // Dimensões Chart (Slide 2)
  const dimensoesChartData = {
    labels: ['1. \nServiços Públicos', '2. \nGovernança', '3. \nInfraestrutura', '4. \nCapacitação'],
    datasets: [
      {
        label: 'Pontuação Atingida',
        data: dimensionScores,
        backgroundColor: '#1A73E8',
        borderColor: '#1A73E8',
        borderWidth: 1
      },
      {
        label: 'Pontuação Requerida',
        data: dimensionMaxScores,
        backgroundColor: '#FBBC04',
        borderColor: '#FBBC04',
        borderWidth: 1
      }
    ]
  };

  // Gauge Chart (Slide 3)
  const gaugeChartData = {
    labels: ['Atingido', 'Restante'],
    datasets: [{
      data: [metrics.indice_geral_maturidade, 100 - metrics.indice_geral_maturidade],
      backgroundColor: ['#34A853', '#F8F9FA'],
      borderWidth: 0,
      circumference: 180,
      rotation: 270
    }]
  };

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  // Horizontal Bar Chart (Slide 3)
  const horizontalBarData = {
    labels: dimensionNames,
    datasets: [{
      label: '% Atingida',
      data: dimensionPercentages,
      backgroundColor: dimensionPercentages.map(p => 
        p === 100 ? '#1A73E8' : p >= 90 ? '#438ae6b2' : '#5f94da94'
      ),
      borderColor: dimensionPercentages.map(p => 
        p === 100 ? '#1A73E8' : p >= 90 ? '#438ae6b2' : '#5f94da94'
      ),
      borderWidth: 1
    }]
  };

  const horizontalBarOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Porcentagem Atingida por Dimensão' }
    },
    scales: {
      x: { beginAtZero: true, max: 100, title: { display: true, text: 'Porcentagem (%)' } },
      y: { title: { display: true, text: 'Dimensões' } }
    }
  };

  // Radar Chart (Slide 4)
  const radarData = {
    labels: ['Serviços Públicos', 'Governança', 'Infraestrutura', 'Capacitação'],
    datasets: [
      {
        label: 'Performance Atual',
        data: dimensionPercentages,
        fill: true,
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        borderColor: '#1A73E8',
        pointBackgroundColor: '#1A73E8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1A73E8'
      },
      {
        label: 'Meta',
        data: [100, 100, 100, 100],
        fill: true,
        backgroundColor: 'rgba(52, 168, 83, 0.2)',
        borderColor: '#34A853',
        pointBackgroundColor: '#34A853',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#34A853'
      }
    ]
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { borderWidth: 3 } },
    scales: {
      r: {
        angleLines: { display: true },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  // Donut Chart (Slide 4)
  const donutData = {
    labels: ['Pontos Atingidos', 'Pontos Precários'],
    datasets: [{
      data: [metrics.total_pontuacao_atingida, metrics.total_pontuacao_max - metrics.total_pontuacao_atingida],
      backgroundColor: ['#34A853', '#FBBC04'],
      hoverOffset: 4
    }]
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: `Distribuição de Pontos (Total: ${metrics.total_pontuacao_max})` }
    }
  };

  // Waterfall Chart (Slide 5)
  const waterfallData = {
    labels: ['Total Possível', 'Dimensão 3 Gap', 'Dimensão 4 Gap', 'Total Atingido'],
    datasets: [
      {
        label: 'Pontuação Base',
        data: [metrics.total_pontuacao_max, 0, 0, metrics.total_pontuacao_atingida],
        backgroundColor: '#1A73E8',
        stack: 'Stack 0'
      },
      {
        label: 'Gap Dimensão 3',
        data: [0, metrics.dimensoes['Dimensão 3'].pontuacao_max - metrics.dimensoes['Dimensão 3'].pontuacao_atingida, 0, 0],
        backgroundColor: '#EA4335',
        stack: 'Stack 0'
      },
      {
        label: 'Gap Dimensão 4',
        data: [0, 0, metrics.dimensoes['Dimensão 4'].pontuacao_max - metrics.dimensoes['Dimensão 4'].pontuacao_atingida, 0],
        backgroundColor: '#FBBC04',
        stack: 'Stack 0'
      }
    ]
  };

  const waterfallOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Análise de Gaps por Dimensão' },
      legend: { position: 'top' }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Pontuação' } }
    }
  };

  // Heatmap Chart (Slide 5) - Simplified as stacked bar
  const heatmapData = {
    labels: dimensionNames,
    datasets: [
      {
        label: 'Implementados',
        data: dimensionScores.map(score => Math.round(score / 5)), // Estimate indicators
        backgroundColor: '#34A853',
        borderColor: '#34A853',
        borderWidth: 1
      },
      {
        label: 'Pendentes',
        data: dimensionMaxScores.map((max, i) => Math.round((max - dimensionScores[i]) / 5)),
        backgroundColor: '#EA4335',
        borderColor: '#EA4335',
        borderWidth: 1
      }
    ]
  };

  const heatmapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Matriz de Indicadores por Dimensão' },
      legend: { position: 'top' }
    },
    scales: {
      x: { stacked: true, title: { display: true, text: 'Dimensões' } },
      y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Número de Indicadores' } }
    }
  };

  // Line Chart (Slide 6)
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const lineData = {
    labels: meses,
    datasets: [
      {
        label: 'Índice Geral',
        data: [85, 87, 90, 92, 93, metrics.indice_geral_maturidade],
        borderColor: '#1A73E8',
        backgroundColor: 'rgba(26, 115, 232, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Meta',
        data: [85, 88, 91, 94, 97, 100],
        borderColor: '#34A853',
        borderDash: [5, 5],
        fill: false
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Evolução do Índice de Maturidade Digital' }
    },
    scales: {
      y: { beginAtZero: false, min: 80, max: 100, title: { display: true, text: 'Índice (%)' } },
      x: { title: { display: true, text: 'Meses' } }
    }
  };

  // Stacked Area Chart (Slide 6)
  const stackedAreaData = {
    labels: meses,
    datasets: [
      {
        label: 'Dimensão 1',
        data: [38, 39, 40, 40, 41, metrics.dimensoes['Dimensão 1'].pontuacao_atingida],
        backgroundColor: '#1A73E8',
        borderColor: '#1A73E8',
        fill: true
      },
      {
        label: 'Dimensão 2',
        data: [45, 46, 47, 48, 49, metrics.dimensoes['Dimensão 2'].pontuacao_atingida],
        backgroundColor: '#34A853',
        borderColor: '#34A853',
        fill: true
      },
      {
        label: 'Dimensão 3',
        data: [12, 13, 14, 15, 16, metrics.dimensoes['Dimensão 3'].pontuacao_atingida],
        backgroundColor: '#FBBC04',
        borderColor: '#FBBC04',
        fill: true
      },
      {
        label: 'Dimensão 4',
        data: [10, 11, 12, 13, 14, metrics.dimensoes['Dimensão 4'].pontuacao_atingida],
        backgroundColor: '#EA4335',
        borderColor: '#EA4335',
        fill: true
      }
    ]
  };

  const stackedAreaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: 'Contribuição de Cada Dimensão ao Longo do Tempo' }
    },
    scales: {
      y: { stacked: true, title: { display: true, text: 'Pontuação' } },
      x: { title: { display: true, text: 'Meses' } }
    }
  };

  // Decision Pyramid (Slide 7)
  const decisionPyramidData = {
    labels: ['Estratégico', 'Tático', 'Operacional'],
    datasets: [
      {
        label: 'Níveis de Decisão',
        data: [3, 2, 1],
        backgroundColor: [
          '#1A73E8',
          '#34A853',
          '#FBBC04'
        ],
        borderColor: [
          '#1A73E8',
          '#34A853',
          '#FBBC04'
        ],
        borderWidth: 1
      }
    ]
  };

  const decisionPyramidOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Pirâmide de Decisão' }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 3,
        ticks: {
          callback: function(value) {
            if (value === 1) return 'Curto Prazo';
            if (value === 2) return 'Médio Prazo';
            if (value === 3) return 'Longo Prazo';
            return '';
          }
        }
      },
      y: { title: { display: true, text: 'Níveis' } }
    }
  };

  return {
    dimensoesChart: { data: dimensoesChartData, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Pontuação por Dimensão' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Pontuação' } }, x: { title: { display: true, text: 'Dimensões' } } } } },
    gaugeChart: { data: gaugeChartData, options: gaugeOptions },
    horizontalBarChart: { data: horizontalBarData, options: horizontalBarOptions },
    radarChart: { data: radarData, options: radarOptions },
    donutChart: { data: donutData, options: donutOptions },
    waterfallChart: { data: waterfallData, options: waterfallOptions },
    heatmapChart: { data: heatmapData, options: heatmapOptions },
    lineChart: { data: lineData, options: lineOptions },
    stackedAreaChart: { data: stackedAreaData, options: stackedAreaOptions },
    decisionPyramid: { data: decisionPyramidData, options: decisionPyramidOptions }
  };
};

export default AllCharts;

