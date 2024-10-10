import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Report() {
  const data = useSelector((state) => state?.data_report);
  const [callType, setCallType] = useState('');

  const handleCallType = (value) => {
    value === '0'
      ? setCallType('All')
      : value === '1'
      ? setCallType('Normal')
      : value === '2'
      ? setCallType('Prank')
      : value === '3'
      ? setCallType('Ghost')
      : setCallType('Informasi');
  };

  return (
    <>
      <h2>Laporan Insiden</h2>
      <input type="text" onChange={(e) => handleCallType(e.target.value)} />
      <button
        onClick={() => alert(callType)}
        className="bg-red-500 w-full h-20"
      >
        Get Call Type
      </button>
    </>
  );
}
