import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Tambahkan CSS Leaflet
import Navbar from '../components/Common/Navbar';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import MapCenterButton from '../components/Maps/MapCenterButton';
import { useDispatch, useSelector } from 'react-redux';
import { getInsidenCountDistrict } from '../services/dataService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { MapsInfo } from '../components/Maps/MapsInfo';
import MapHighestReport from '../components/Maps/MapHighestReport';
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const getDataColor = (count) =>
  count < 200
    ? 'bg-cst-green'
    : count < 500
    ? 'bg-cst-blue'
    : count < 800
    ? 'bg-cst-yellow'
    : count > 800 && 'bg-cst-red';

const createCustomIcon = (dataCount) => {
  return L.divIcon({
    html: `<div class="custom-marker ${getDataColor(dataCount)}" >
             <span>${dataCount}</span>
           </div>`,
    className: 'custom-marker-icon',
    iconSize: [50, 50], // Ukuran ikon
    iconAnchor: [50, 40],
    popupAnchor: [6, -30],
  });
};

const kecamatanList = [
  'Bontoala',
  'Tallo',
  'Kepulauan Sangkarrang',
  'Biring Kanaya',
  'Makassar',
  'Mamajang',
  'Manggala',
  'Mariso',
  'Panakkukang',
  'Rappocini',
  'Ujung Pandang',
  'Tamalanrea',
  'Tamalate',
  'Ujung Tanah',
  'Wajo',
];

function MapsCluster() {
  const [latLong, setLatLong] = useState('');
  const dispatch = useDispatch();
  const kecamatanData = useSelector(
    (state) => state?.data_report?.data_count_insiden,
  );
  // const kecamatanData = [
  //   { name: 'Bontoala', coords: [-5.12969, 119.4213792], dataCount: 203 },
  //   {
  //     name: 'Tallo',
  //     coords: [-5.11193355, 119.43691840397577],
  //     dataCount: 898,
  //   },
  //   {
  //     name: 'Kepulauan Sangkarrang',
  //     coords: [-5.031909150000001, 119.09434434951314],
  //     dataCount: 258,
  //   },
  //   {
  //     name: 'Biring Kanaya',
  //     coords: [-5.10542405, 119.51658041726706],
  //     dataCount: 421,
  //   },
  //   { name: 'Makassar', coords: [-5.141541, 119.42779], dataCount: 388 },
  //   {
  //     name: 'Mamajang',
  //     coords: [-5.16600795, 119.41973577869675],
  //     dataCount: 334,
  //   },
  //   { name: 'Manggala', coords: [-5.1677242, 119.5046852], dataCount: 1018 },
  //   { name: 'Mariso', coords: [-5.1599312, 119.4104892], dataCount: 246 },
  //   {
  //     name: 'Panakkukang',
  //     coords: [-5.1436530000000005, 119.45361726889358],
  //     dataCount: 893,
  //   },
  //   { name: 'Rappocini', coords: [-5.1533148, 119.4281247], dataCount: 797 },
  //   { name: 'Tamalanrea', coords: [-5.1316881, 119.5008491], dataCount: 299 },
  //   {
  //     name: 'Tamalate',
  //     coords: [-5.1930118499999995, 119.38624549799492],
  //     dataCount: 794,
  //   },
  //   {
  //     name: 'Ujung Pandang',
  //     coords: [-5.141435550000001, 119.4136705800444],
  //     dataCount: 150,
  //   },
  //   { name: 'Ujung Tanah', coords: [-5.1162181, 119.4104524], dataCount: 339 },
  //   { name: 'Wajo', coords: [-5.12469395, 119.4125749639195], dataCount: 96 },
  // ];

  return (
    <>
      <Navbar />
      <MapContainer
        center={[-5.1162181, 119.4104524]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {kecamatanData?.map((kecamatan, index) => (
          <Marker
            key={index}
            position={kecamatan.coords}
            icon={createCustomIcon(kecamatan.dataCount)} // Gunakan custom icon
          >
            {console.log('kecamatanDatfda', kecamatanData)}
            <Popup>
              <div>
                <h4 className="font-bold">{kecamatan.name}</h4>
                <p>Jumlah Laporan: {kecamatan.dataCount}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapCenterButton />
        <MapHighestReport />
      </MapContainer>
      <MapsInfo />
    </>
  );
}

export default MapsCluster;
