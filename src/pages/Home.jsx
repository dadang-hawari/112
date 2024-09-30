import React, { useState, useEffect } from 'react';
import ButtonPrimary from '../components/ButtonPrimary';
import { getData, getDataToday } from '../services/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { dateFormatter } from '../utils/dateFormatter';
import { Card, DonutChart } from '@tremor/react';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const getColor = (type) => {
    switch (type) {
      case 'information':
        return '#3B82F6';
      case 'normal':
        return '#22C55E';
      case 'ghost':
        return '#EAB308';
      case 'prank':
        return '#EF4444';
      default:
        return 'gray';
    }
  };
  const [callType, setCallType] = useState({
    normal: 0,
    information: 0,
    prank: 0,
    ghost: 0,
  });
  const dataReport = useSelector((state) => state?.data_report);
  const data = dataReport?.data_today;
  useEffect(() => {
    if (data) {
      // Reset count setiap kali data berubah
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

      setCallType(updatedCallType); // Update state sekali setelah perhitungan selesai
    }
  }, [data]); // Hanya jalankan efek ini jika `data` berubah

  useEffect(() => {
    getDataToday(dispatch).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="px-4 max-w-6xl w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-4 mt-4 mb-14">
        <Card className="w-full md:w-2/3 relative ">
          <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {'Distribusi Tipe Laporan'}
          </span>
          <div
            className={`flex flex-col items-center  transition-opacity justify-center absolute -translate-x-1/2 left-1/2 h-[321px] mt-5 ${
              isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex justify-center  items-center mb-4">
              <div className="animate-spin rounded-full w-28 h-28 border-t-4 border-blue-500 border-opacity-75"></div>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 animate-pulse">
              Sedang mengambil data...
            </h3>
          </div>
          <DonutChart
            className={`mt-2 h-80 transition-opacity font-bold text-3xl ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            data={[
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
            ]}
            index="type"
            category="count"
            colors={['green', 'blue', 'red', 'yellow']}
            valueFormatter={(value) => `${value} Laporan`}
          />
        </Card>
        <Card className="w-full md:w-1/3 text-tremor-content">
          <h3 className="font-bold">Keterangan</h3>
          <p>
            Berikut merupakan informasi dari distribusi laporan dari{' '}
            <i>ringchart</i>{' '}
          </p>
          <div>Jumlah Normal: {callType?.normal}</div>
          <div>Jumlah Informasi: {callType?.information}</div>
          <div>Jumlah Prank: {callType?.prank}</div>
          <div>Jumlah Ghost: {callType?.ghost}</div>
        </Card>
      </div>
    </div>
  );
}
