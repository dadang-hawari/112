import { DonutChart } from '@tremor/react';
import { useSelector } from 'react-redux';

export const DonutChart1 = () => {
  const dataReport = useSelector(
    (state) => state?.data_report?.summary_call?.data,
  );
  const sla = dataReport?.kpi_call;
  const slaMinus = 100 - sla;
  const chartdata = [
    {
      name: 'Abandon',
      amount: slaMinus,
    },
    {
      name: 'SLA',
      amount: sla,
    },
  ];

  return (
    <>
      <DonutChart
        className={`h-[100px] max-w-28 mr-4 sm:mr-20 transition-opacity font-bold `}
        data={chartdata}
        index="name"
        category="amount"
        colors={['red', 'blue']}
        label={`${sla}%`}
        valueFormatter={(value) => `${value.toFixed(2)}%`}
      />
    </>
  );
};
