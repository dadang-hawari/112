import {
  faBook,
  faBookAtlas,
  faFlag,
  faFlagCheckered,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import { getInsidenCountDistrict } from '../../services/dataService';
import 'boxicons';
import { BoxIconElement } from 'boxicons';

export default function MapHighestReport() {
  const map = useMap();
  const coord = useSelector(
    (state) => state?.data_report?.highest_report_coordinates,
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getInsidenCountDistrict(dispatch).then(() => setIsLoading(false));
  }, []);

  console.log('coord', coord);

  const toHighestReport = () => {
    map.setView(coord?.coordinates, 13);
    L.divIcon({ popupAnchor: [6, 0] });
    const popup = L.popup().setLatLng(coord?.coordinates) // Set lokasi popup berdasarkan koordinat
      .setContent(`<div>
                <b>${coord?.name}</b>
                <p>Jumlah Laporan: ${coord?.dataCount}</p>
              </div>`);

    // Buka popup di peta
    popup.openOn(map);
  };
  return (
    <button
      onClick={toHighestReport}
      disabled={isLoading}
      className="fixed py-2 px-2 rounded-sm flex items-center gap-x-2 sans-jakarta text-white bottom-10 -translate-y-1/2 top-1/2 h-max right-3  z-[999]  bg-blue-500 "
    >
      {isLoading ? (
        'Mohon tunggu..'
      ) : (
        <>
          <span>Laporan Tertinggi</span>
          <FontAwesomeIcon icon={faFlag} />
        </>
      )}
    </button>
  );
}
