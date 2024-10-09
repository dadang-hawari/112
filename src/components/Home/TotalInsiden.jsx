import { Card, ProgressBar, ProgressCircle } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryInsiden } from '../../services/dataService';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartArea,
  faCircleInfo,
  faClock,
  faInfo,
  faInfoCircle,
  faMessage,
  faPhone,
  faStopwatch,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { DonutChartInsiden } from './DonutChartInsiden';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export const TotalInsiden = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector(
    (state) => state?.data_report?.summary_insiden,
  );
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getSummaryInsiden(dispatch).then(() => setIsLoading(false));
  }, []);

  const active = dataReport?.active;
  const process = dataReport?.handling;
  const closed = dataReport?.closed;
  const total = dataReport?.total;
  return (
    <Card className="mt-4 md:w-1/2 relative">
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <div className="w-full">
          <div className="flex justify-between text-tremor-content">
            <div className="w-full">
              <h2 className="flex items-center gap-x-2 font-semibold">
                <FontAwesomeIcon icon={faInfo} />
                Total Laporan Insiden
              </h2>
              <div className="w-full">
                <h2 className="text-right font-bold">SLA</h2>
                <div className="w-full flex justify-between gap-x-2 ">
                  <h3 className="font-semibold text-7xl my-2">{total}</h3>
                  <DonutChartInsiden />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-5"></div>
          </div>
          <div className="text-tremor-content">
            <h3 className="mt-5 font-bold">Keterangan Status Insiden</h3>
            <div className="flex justify-between">
              <div className="flex gap-y-3 justify-between flex-col">
                <div className="flex gap-x-5 mt-1">
                  <div className="w-fit">
                    <div className="flex gap-x-2 items-center">
                      <div className="h-4 w-4 rounded-full bg-cst-blue"></div>
                      <p>Selesai </p>
                    </div>
                    <p className="text-center font-bold">{closed}</p>
                  </div>
                  <div className="w-fit">
                    <div className="flex gap-x-2 items-center">
                      <div className="h-4 w-4 rounded-full bg-cst-green"></div>
                      <p>Baru </p>
                    </div>
                    <p className="text-center font-bold w-fit mx-auto">
                      {active}
                    </p>
                  </div>
                  <div className="w-fit">
                    <div className="flex gap-x-2 items-center">
                      <div className="h-4 w-4 rounded-full bg-cst-red"></div>
                      <p>Diproses </p>
                    </div>
                    <p className="text-center font-bold">{process}</p>
                  </div>
                </div>
                <p>
                  Saat ini terdapat <b>{process}</b> Laporan Insiden yang sedang
                  diproses
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
