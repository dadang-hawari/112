import { Card, ProgressBar, ProgressCircle } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryCall } from '../../services/dataService';
import { useEffect } from 'react';
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
import { DonutChart1 } from './Donut';

export const ChartProgressCircle = () => {
  const dispatch = useDispatch();
  const dataReport = useSelector(
    (state) => state?.data_report?.summary_call?.data,
  );

  useEffect(() => {
    getSummaryCall(dispatch);
  }, []);

  const sla = dataReport?.kpi_call;
  const answeredCall = dataReport?.answer;
  const abandondCall = dataReport?.abandon;
  const totalCall = dataReport?.total_call;
  const avgCallDuration = dataReport?.avg_call_duration;
  const totalCallDuration = dataReport?.total_call_duration;
  return (
    <Card className="mt-4 md:w-1/2">
      <div className="flex justify-between text-tremor-content">
        <div className="w-full">
          <h2 className="flex items-center gap-x-2 font-semibold">
            <FontAwesomeIcon icon={faPhone} />
            Total Panggilan Masuk
          </h2>
          <div className="w-full">
            <h2 className="text-right font-bold">SLA</h2>
            <div className="w-full flex justify-between gap-x-2 ">
              <h3 className="font-semibold text-7xl my-2">{totalCall}</h3>
              <DonutChart1 />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-5"></div>
      </div>
      <div className="text-tremor-content">
        <div className="flex mt-5 justify-between">
          <div className="flex gap-y-3 justify-between flex-col">
            <div>
              <div className="flex font-bold items-center gap-x-2">
                <p className="mb-1">Terjawab</p>
                <FontAwesomeIcon icon={faMessage} />
              </div>
              {answeredCall} Panggilan
            </div>
            <div>
              <div className="flex font-bold items-center gap-x-2">
                <p className="mb-1">Tak Terjawab</p>
                <FontAwesomeIcon icon={faX} />
              </div>
              {abandondCall} Panggilan
            </div>
          </div>
          <div className="flex gap-y-3 justify-between flex-col">
            <div>
              <div className="flex font-bold items-center gap-x-2">
                <p className="mb-1">Rata-Rata Durasi Berbicara </p>
                <FontAwesomeIcon icon={faChartArea} />
              </div>
              {avgCallDuration} Jam:Menit:Detik
            </div>
            <div>
              <div className="flex font-bold items-center gap-x-2">
                <p className="mb-1">Total Durasi panggilan </p>
                <FontAwesomeIcon icon={faStopwatch} />
              </div>
              <p></p>
              {totalCallDuration} Jam:Menit:Detik
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
