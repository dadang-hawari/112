import { BarList, Card } from '@tremor/react';

export const ChartBar = ({ dataChartBar }) => {
  return (
    <Card className="w-full md:w-1/2 text-tremor-content">
      <h3 className="font-bold">Keterangan</h3>
      <p>
        Berikut merupakan informasi distribusi laporan dari <i>ringchart</i> :
      </p>
      <BarList
        className="mt-5"
        data={dataChartBar}
        valueFormatter={(value) => `${value} Laporan`}
      />
    </Card>
  );
};
