import { BarList, Card } from '@tremor/react';

export const ChartBar = ({ dataChartBar }) => {
  return (
    <div className="w-full text-tremor-content">
      <h3 className="font-bold">Keterangan</h3>
      <p>
        Berikut merupakan informasi distribusi laporan dari <i>ringchart</i> :
      </p>
      <BarList
        className="mt-5"
        data={dataChartBar}
        valueFormatter={(value) => `${value} Laporan`}
      />
    </div>
  );
};
