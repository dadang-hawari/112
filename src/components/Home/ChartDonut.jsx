import { DonutChart } from '@tremor/react';

export const ChartDonut = ({ isLoading, dataChartDonut }) => {
  return (
    <DonutChart
      className={`my-7 h-[260px] transition-opacity font-bold text-2xl ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}
      data={dataChartDonut}
      index="type"
      category="count"
      colors={['green', 'blue', 'red', 'orange']}
      valueFormatter={(value) => `${value} Laporan`}
    />
  );
};
