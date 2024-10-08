import React, { useState, useEffect } from 'react';
import ButtonPrimary from '../components/Common/ButtonPrimary';
import {
  getData,
  getDataMonth,
  getDataToday,
  getSummaryCall,
  getSummaryInsiden,
  getTopCategories,
} from '../services/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../utils/dateFormatter';
import { Card, DonutChart, BarList, AreaChart } from '@tremor/react';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';
import { ChartDonut } from '../components/Home/ChartDonut';
import { ChartBar } from '../components/Home/ChartBar';
import { TopCategories } from '../components/Home/TopCategories';
import Navbar from '../components/Common/Navbar';
import { TopArea } from '../components/Home/TopArea';
import { ChartArea } from '../components/Home/ChartArea';
import { TotalInsiden } from '../components/Home/TotalInsiden';
import { ChartProgressCircle } from '../components/Home/ChartProgressCircle';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [callType, setCallType] = useState({
    normal: 0,
    information: 0,
    prank: 0,
    ghost: 0,
  });
  const dataReport = useSelector((state) => state?.data_report);
  const data = dataReport?.data_today;
  const dataChartDonut = [
    {
      type: 'Normal',
      count: callType.normal,
    },
    {
      type: 'Information',
      count: callType.information,
    },
    {
      type: 'Prank',
      count: callType.prank,
    },
    {
      type: 'Ghost',
      count: callType.ghost,
    },
  ];
  const dataChartBar = [
    {
      name: 'Normal',
      value: callType.normal,
      color: 'green',
    },
    {
      name: 'Information',
      value: callType.information,
      color: 'blue',
    },
    {
      name: 'Prank',
      value: callType.prank,
      color: 'red',
    },
    {
      name: 'Ghost',
      value: callType.ghost,
      color: 'orange',
    },
  ];
  useEffect(() => {
    if (data) {
      const updatedCallType = {
        normal: 0,
        information: 0,
        prank: 0,
        ghost: 0,
      };

      data.forEach((value) => {
        if (value?.call_type === 'normal') {
          updatedCallType.normal++;
        } else if (value?.call_type === 'prank') {
          updatedCallType.prank++;
        } else if (value?.call_type === 'information') {
          updatedCallType.information++;
        } else {
          updatedCallType.ghost++;
        }
      });

      setCallType(updatedCallType);
    }
  }, [data]);
  useEffect(() => {
    getDataToday(dispatch).then(() => {
      setIsLoading(false);
    });
    getTopCategories(dispatch);
    getDataMonth(dispatch);
    getSummaryInsiden(dispatch);
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 pt-24 max-w-6xl h-screen w-full mx-auto">
        <ChartArea />
        <div className="flex flex-col md:flex-row gap-4">
          <ChartProgressCircle />
          <TotalInsiden />
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-4 mb-5">
          <Card className="w-full md:w-1/2 relative ">
            <h2 className="flex font-semibold w-full justify-between gap-x-5 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Distribusi Tipe Laporan Hari Ini
            </h2>
            <div className="text-right text-tremor-content text-sm">
              <p className="font-bold">Terakhir diupdate tanggal</p>
              <p>{dateFormatter(Date.now())}</p>
            </div>
            <LoadingSpinner isLoading={isLoading} />
            <ChartDonut isLoading={isLoading} dataChartDonut={dataChartDonut} />
          </Card>
          <ChartBar dataChartBar={dataChartBar} />
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <TopCategories />
          <TopArea />
        </div>
      </div>
    </>
  );
}
