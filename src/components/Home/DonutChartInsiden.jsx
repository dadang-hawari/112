import { DonutChart } from '@tremor/react';
import { useSelector } from 'react-redux';

export const DonutChartInsiden = () => {
  const dataReport = useSelector(
    (state) => state?.data_report?.summary_insiden,
  );

  const serviceLevel = dataReport?.service_level;

  const slaMinus = 100 - serviceLevel;
  const chartdata = [
    {
      name: 'Diproses',
      amount: slaMinus,
    },
    {
      name: 'Selesai',
      amount: serviceLevel,
    },
  ];

  return (
    <>
      <DonutChart
        className={`h-[100px] max-w-28 mr-4 sm:mr-20 transition-opacity text-tremor-content font-bold `}
        data={chartdata}
        index="name"
        category="amount"
        colors={['red', 'blue']}
        label={`${serviceLevel}%`}
        valueFormatter={(value) => `${value.toFixed(2)}%`}
      />
    </>
  );
};
