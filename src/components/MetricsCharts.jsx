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
import { Bar, Doughnut, Radar, Pie } from 'react-chartjs-2';

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

const MetricsCharts = ({ metrics }) => {
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

  // Bar Chart Data
  const barChartData = {
    labels: dimensionNames,
    datasets: [
      {
        label: 'Pontuação Atingida',
        data: dimensionScores,
        backgroundColor: '#1A73E8',
        borderColor: '#1A73E8',
        borderWidth: 1,
      },
      {
        label: 'Pontuação Requerida',
        data: dimensionMaxScores,
        backgroundColor: '#E8F0FE',
        borderColor: '#1A73E8',
        borderWidth: 1,
      }
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pontuação por Dimensão',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ['Pontuação Atingida', 'Pontos de Melhoria'],
    datasets: [
      {
        data: [
          metrics.total_pontuacao_atingida,
          metrics.total_pontuacao_max - metrics.total_pontuacao_atingida
        ],
        backgroundColor: ['#34A853', '#FBBC04'],
        borderColor: ['#34A853', '#FBBC04'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: `Índice Geral de Maturidade Digital: ${metrics.indice_geral_maturidade.toFixed(2)}%`,
      },
    },
  };

  // Radar Chart Data
  const radarChartData = {
    labels: dimensionNames,
    datasets: [
      {
        label: 'Performance (%)',
        data: dimensionPercentages,
        backgroundColor: 'rgba(26, 115, 232, 0.2)',
        borderColor: '#1A73E8',
        borderWidth: 2,
        pointBackgroundColor: '#1A73E8',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1A73E8',
      },
    ],
  };

  const radarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Perfil de Maturidade por Dimensão',
      },
    },
    scales: {
      r: {
        angleLines: {
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    }
  };

  // Pie Chart Data for Dimensions
  const pieChartData = {
    labels: dimensionNames,
    datasets: [
      {
        data: dimensionScores,
        backgroundColor: ['#1A73E8', '#34A853', '#FBBC04', '#EA4335'],
        borderColor: ['#1A73E8', '#34A853', '#FBBC04', '#EA4335'],
        borderWidth: 2,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribuição de Pontuação por Dimensão',
      },
    },
  };

  return (
    <div className="metrics-charts">
      <div className="charts-grid">
        <div className="chart-container">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        
        <div className="chart-container">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
        
        <div className="chart-container">
          <Radar data={radarChartData} options={radarChartOptions} />
        </div>
        
        <div className="chart-container">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCharts;

