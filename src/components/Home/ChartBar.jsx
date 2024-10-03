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
      {/* <div className="flex mt-3 gap-1">
      <div className="h-6 w-6 mr-1 rounded-full bg-cst-green"></div>
      <span className="font-semibold">Normal: </span> {callType?.normal}
    </div>
    <div className="flex mt-3 gap-1">
      <div className="h-6 w-6 mr-1 rounded-full bg-cst-blue"></div>
      <span className="font-semibold">Informasi: </span>{' '}
      {callType?.information}
    </div>
    <div className="flex mt-3 gap-1">
      <div className="h-6 w-6 mr-1 rounded-full bg-cst-red"></div>
      <span className="font-semibold">Prank: </span> {callType?.prank}
    </div>
    <div className="flex mt-3 gap-1">
      <div className="h-6 w-6 mr-1 rounded-full bg-cst-yellow"></div>
      <span className="font-medium">Ghost: </span> {callType?.ghost}
    </div> */}
    </Card>
  );
};
