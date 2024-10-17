import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Tambahkan CSS Leaflet
import Navbar from '../components/Common/Navbar';

// Data kecamatan beserta jumlah datanya
const kecamatanData = [
  {
    name: 'Kecamatan Balla Parang',
    dataCount: 50,
    coords: [-5.136581415858494, 119.40799190279614], // Koordinat Balla Parang
  },
  {
    name: 'Kecamatan Tes',
    dataCount: 20,
    coords: [-5.13710780930529, 119.40854173003456], // Koordinat Balla Parang
  },

  // Tambahkan kecamatan lain sesuai kebutuhan
];

// Fungsi untuk menghasilkan warna acak (random)
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Fungsi untuk membuat custom icon berdasarkan jumlah data
const createCustomIcon = (dataCount) => {
  const randomColor = getRandomColor(); // Dapatkan warna acak
  return L.divIcon({
    html: `<div class="custom-marker" style="background: ${randomColor}">
             <span>${dataCount}</span>
           </div>`,
    className: 'custom-marker-icon',
    iconSize: [100, 100], // Ukuran ikon
    iconAnchor: [50, 100], // Titik anchor ikon
  });
};
function MapsCluster() {
  return (
    <>
      <Navbar />
      <MapContainer
        center={[-5.1671, 119.4341]}
        zoom={13}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {kecamatanData.map((kecamatan, index) => (
          <Marker
            key={index}
            position={kecamatan.coords}
            icon={createCustomIcon(kecamatan.dataCount)} // Gunakan custom icon
          >
            <Popup>
              <div>
                <h4>{kecamatan.name}</h4>
                <p>Jumlah Data: {kecamatan.dataCount}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default MapsCluster;
