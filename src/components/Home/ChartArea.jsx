import { AreaChart, Card } from '@tremor/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataMonth } from '../../services/dataService';
import { dateFormatter } from '../../utils/dateFormatter';

export const ChartArea = () => {
  const dataReport = useSelector((state) => state?.data_report?.data_month);
  const dispatch = useDispatch();

  useEffect(() => {
    getDataMonth(dispatch);
  }, []);
  return (
    <Card className="w-full max-w-7xl mx-auto">
      <div className="w-full flex justify-between">
        <h2 className="flex font-semibold w-full justify-between gap-x-5 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          {`Distribusi Laporan Perbulan ${dateFormatter(Date.now())}`}
        </h2>
        <div className="text-right w-full text-tremor-content text-sm">
          <p className="font-bold">Data terakhir diupdate tanggal</p>
          <p>{dateFormatter(Date.now())}</p>
        </div>
      </div>
      <AreaChart
        className="mt-2 h-80"
        data={dataReport}
        index="date"
        categories={['information', 'normal', 'ghost', 'prank']}
        colors={['blue', 'green', 'yellow', 'red']}
        yAxisWidth={30}
      />
    </Card>
  );
};
