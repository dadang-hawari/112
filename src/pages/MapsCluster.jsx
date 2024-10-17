import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster'; // Pastikan ini benar
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Tambahkan CSS Leaflet
import Navbar from '../components/Common/Navbar';

// Data kecamatan beserta jumlah datanya
const kecamatanData = [
  {
    name: 'Kecamatan Balla Parang',
    dataCount: 50,
    coords: [119.4341, -5.1671], // Koordinat Balla Parang
  },
  {
    name: 'Kecamatan A',
    dataCount: 30,
    coords: [119.436, -5.17],
  },
  // Tambahkan kecamatan lain sesuai kebutuhan
];

// Fungsi untuk membuat custom icon berdasarkan jumlah data
const createClusterCustomIcon = (cluster) => {
  const count = cluster.getChildCount(); // Mendapatkan jumlah data dalam cluster
  return L.divIcon({
    html: `<div><span>${count}</span></div>`,
    className: 'marker-cluster-custom',
    iconSize: L.point(40, 40, true),
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
          <Marker key={index} position={kecamatan.coords}>
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
