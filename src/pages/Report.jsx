import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Common/Navbar';
import DatePicker from 'react-multi-date-picker';
import { getData, getDataInsiden } from '../services/dataService';
import { ReportTable } from '../components/Home/ReporTable';
const isiData = [{ data_1: 'ok' }];
export default function Report() {
  const [callType, setCallType] = useState(1);
  const [status, setStatus] = useState(0);
  const [showRow, setShowRow] = useState(10);
  const [urutkan, setUrutkan] = useState('desc');

  const dispatch = useDispatch();
  const today = new Date();
  today.setHours(0, 0, 0); // Atur jam ke 00:00 untuk tanggal awal
  const tomorrow = new Date();
  const [values, setValues] = useState([today, tomorrow]);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59); // Atur jam ke 23:59 untuk tanggal akhir

  useEffect(() => {
    getDataInsiden(
      dispatch,
      showRow,
      callType,
      status,
      values[0],
      values[1],
      urutkan,
    );
  }, [showRow, callType, status, values[1], urutkan]);

  const setValueShow = (e) => {
    setShowRow(e.target.value);
  };
  const setStatusInsiden = (e) => {
    setStatus(e.target.value);
  };

  const setUrutkanInsiden = (e) => {
    setUrutkan(e.target.value);
  };

  useEffect(() => {
    document
      ?.getElementById('input-disabled')
      ?.setAttribute('onkeydown', 'return false;');
  }, []);

  return (
    <>
      <Navbar />
      <div className="pt-24  text-tremor-content px-5 max-w-5xl w-full mx-auto">
        <h2 className="text-4xl font-semibold mb-5">Laporan Insiden</h2>

        <form className="flex flex-col sm:flex-row text-base justify-between gap-5">
          <div className="report w-full">
            <label htmlFor="status">Status</label>
            <select
              className="cursor-pointer text-sm w-full dark:bg-tremor-content-strong"
              id="status"
              onChange={setStatusInsiden}
            >
              <option className="bg-transparent cursor-pointer" value="0">
                All
              </option>
              <option className="bg-transparent cursor-pointer" value="1">
                Baru
              </option>
              <option className="bg-transparent cursor-pointer" value="2">
                Proses
              </option>
              <option className="bg-transparent cursor-pointer" value="3">
                Selesai
              </option>
            </select>
          </div>
          <div className="report w-full">
            <label htmlFor="Tipe Laporan">Tipe Laporan</label>
            <select
              className="cursor-pointer text-sm w-full
              dark:bg-tremor-content-strong
              "
              name="callType"
              id="callType"
              onChange={(e) => setCallType(e.target.value)}
            >
              <option value="0">All</option>
              <option value="1" selected>
                Normal
              </option>
              <option value="2">Prank</option>
              <option value="3">Ghost</option>
              <option value="4">Informasi</option>
            </select>
          </div>
          <div className="report w-full">
            <label htmlFor="tanggal">Tanggal</label>
            <DatePicker
              range
              value={values}
              id={`input-disabled`}
              highlightToday={false}
              onChange={(dates) => {
                if (dates.length === 2) {
                  // Set jam 00:00 untuk tanggal pertama
                  const start = new Date(dates[0]);
                  start.setHours(0, 0, 0);

                  // Set jam 23:59 untuk tanggal terakhir
                  const end = new Date(dates[1]);
                  end.setHours(23, 59, 59);

                  // Set kembali dengan waktu yang sudah diubah
                  setValues([start, end]);
                } else {
                  setValues(dates);
                }
              }}
              placeholder="DD/MM/YYYY"
              calendarPosition="bottom"
              fixMainPosition="true"
              numberOfMonths={2}
              maxDate={today}
              format="DD/MM/YYYY HH:mm" // Format dengan jam
              showTimePicker={false} // Tidak perlu time picker, karena waktu diatur otomatis
            />
          </div>
        </form>
        <div className="flex gap-x-5 items-center">
          <div className="flex flex-col gap-2 mt-5 w-fit">
            <label htmlFor="show">Tampilkan</label>
            <select
              className="dark:bg-tremor-content-strong w-24 text-sm cursor-pointer"
              onChange={setValueShow}
              id="show"
            >
              <option
                className="bg-transparent cursor-pointer "
                value="10"
                selected
              >
                10
              </option>
              <option className="bg-transparent cursor-pointer " value="25">
                25
              </option>
              <option className="bg-transparent cursor-pointer " value="50">
                50
              </option>
              <option className="bg-transparent cursor-pointer " value="100">
                100
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-5 w-fit">
            <label htmlFor="show">Urutkan</label>
            <select
              className="dark:bg-tremor-content-strong w-max text-sm cursor-pointer"
              onChange={setUrutkanInsiden}
              id="urutkan"
            >
              <option
                className="bg-transparent cursor-pointer "
                value="desc"
                selected
              >
                Terbaru
              </option>
              <option
                className="bg-transparent cursor-pointer "
                value="asc"
                selected
              >
                Terlama
              </option>
            </select>
          </div>
        </div>
        <div className="bg-gray-50 border-tremor-content border px-4 pb-10 mb-10 dark:bg-dark-tremor-content-inverted dark:bg-opacity-35 max-h-screen mt-5 pt-4  h-full overflow-scroll">
          <ReportTable />
        </div>
      </div>
    </>
  );
}
