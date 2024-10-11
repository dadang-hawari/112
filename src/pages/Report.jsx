import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Common/Navbar';
import DatePicker from 'react-multi-date-picker';

export default function Report() {
  const data = useSelector((state) => state?.data_report);
  const [callType, setCallType] = useState('');
  const today = new Date();
  today.setHours(0, 0, 0); // Atur jam ke 00:00 untuk tanggal awal

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(23, 59, 59); // Atur jam ke 23:59 untuk tanggal akhir

  const [values, setValues] = useState([today, tomorrow]);

  // State untuk theme
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  // Fungsi untuk toggle tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Mengubah class pada elemen root berdasarkan state theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const ReportTable = () => {
    return (
      <table className="border mt-10">
        <thead>
          <tr>
            <th className="border">Isi Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Datanya</td>
          </tr>
        </tbody>
      </table>
    );
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 text-tremor-content px-5 max-w-5xl w-full mx-auto">
        <h2 className="text-4xl font-semibold mb-5">Laporan Insiden</h2>
        {/* Tombol Toggle Theme */}
        <button
          className="py-2 px-4 mb-5 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
        <form className="flex flex-col sm:flex-row justify-between gap-5">
          <div className="report w-full">
            <label htmlFor="status">Status</label>
            <select
              className="cursor-pointer w-full dark:bg-tremor-content-strong"
              id="status"
            >
              <option className="bg-transparent" value="0">
                All
              </option>
              <option className="bg-transparent" value="1">
                Baru
              </option>
              <option className="bg-transparent" value="2">
                Proses
              </option>
              <option className="bg-transparent" value="3">
                Selesai
              </option>
            </select>
          </div>
          <div className="report w-full">
            <label htmlFor="Tipe Laporan">Tipe Laporan</label>
            <select
              className="cursor-pointer w-full
              dark:bg-tremor-content-strong
              "
              name="callType"
              id="callType"
              onChange={(e) => setCallType(e.target.value)}
            >
              <option value="0">All</option>
              <option value="1">Normal</option>
              <option value="2">Prank</option>
              <option value="3">Ghost</option>
              <option value="4">Informasi</option>
            </select>
          </div>
          <div className="report w-full">
            <label htmlFor="tanggal">Tanggal</label>
            <DatePicker
              range
              className="bg-inherit"
              value={values}
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
              format="DD/MM/YYYY HH:mm" // Format dengan jam
              showTimePicker={false} // Tidak perlu time picker, karena waktu diatur otomatis
            />
          </div>
        </form>
        <ReportTable />
      </div>
    </>
  );
}
