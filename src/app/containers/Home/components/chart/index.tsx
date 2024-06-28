import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = () => {
  const data = {
    labels: [
      "Work Meetings",
      "Personal Appointments",
      "Reminders",
      "Focus Time",
    ],
    datasets: [
      {
        data: [50, 30, 10, 10], // Example data
        backgroundColor: ["#E17CFD", "#4CD7F6", "#FFABAB", "#9B59B6"],
        hoverBackgroundColor: ["#E17CFD", "#4CD7F6", "#FFABAB", "#9B59B6"],
        borderWidth: 0, // Remove the white border
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const dataIndex = tooltipItem.dataIndex;
            const label = data.labels[dataIndex];
            const value = data.datasets[0].data[dataIndex];
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <Wrapper>
      <Doughnut options={options} data={data} />
    </Wrapper>
  );
};

export default DoughnutChart;
const Wrapper = styled.div`
  width: 100px;
`;
