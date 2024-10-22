import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Tambahkan CSS Leaflet
import Navbar from '../components/Common/Navbar';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import MapCenterButton from '../components/Maps/MapCenterButton';
import { useDispatch, useSelector } from 'react-redux';
import { getInsidenCountDistrict } from '../services/dataService';
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
  const randomColor = getRandomColor(); // Dapatkan warna acak

  return L.divIcon({
    html: `<div class="custom-marker ${getDataColor(dataCount)}" >
             <span>${dataCount}</span>
           </div>`,
    className: 'custom-marker-icon',
    iconSize: [50, 50], // Ukuran ikon
    iconAnchor: [50, 40],
    popupAnchor: [0, -30],
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

const goToCenter = (lat, lng) => {
  map.setView([lat, lng]); // Mengatur zoom level sesuai kebutuhan
};

function MapsCluster() {
  const [latLong, setLatLong] = useState('');
  const kecamatanData = useSelector(
    (state) => state?.data_report?.data_count_insiden,
  );
  const dispatch = useDispatch();
  const provider = new OpenStreetMapProvider();

  useEffect(() => {
    getInsidenCountDistrict(dispatch);
    console.log('kecamatanData', kecamatanData);
  }, []);

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
            <Popup>
              <div>
                <h4 className="font-bold">{kecamatan.name}</h4>
                <p>Jumlah Data: {kecamatan.dataCount}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapCenterButton lat={-5.149753} lang={119.4330675} />
      </MapContainer>
      <div className="fixed z-[9999] bg-white w-11/12 bottom-5 h-16 -translate-x-1/2 left-1/2 ">
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => goToCenter(-5.1138984, 119.4121011)}
        >
          Keterangan
        </h2>
      </div>
    </>
  );
}

export default MapsCluster;
