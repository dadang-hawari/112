import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Tambahkan CSS Leaflet
import Navbar from '../components/Common/Navbar';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const kecamatanData = [
  {
    name: 'Bontoala',
    dataCount: 50,
    coords: [-5.1262185, 119.423829], // Koordinat Balla Parang
  },
  {
    name: 'Tallo',
    dataCount: 500,
    coords: [-5.1153305, 119.450407], // Koordinat Balla Parang
  },
  {
    name: 'Kepulauan Sangkarrang',
    dataCount: 20,
    coords: [-5.0478329, 119.3280641], // Koordinat Balla Parang
  },
  {
    name: 'Balla Parang',
    dataCount: 30,
    coords: [-5.149753, 119.4330675],
  },
  {
    name: 'Makassar',
    dataCount: 390,
    coords: [-5.1436275, 119.4263765],
  },
  {
    name: 'Mamajang',
    dataCount: 390,
    coords: [-5.1689536, 119.4089434],
  },
  {
    name: 'Manggala',
    dataCount: 390,
    coords: [-5.1660066, 119.4630844],
  },
  {
    name: 'Mariso',
    dataCount: 390,
    coords: [-5.1621544, 119.3880967],
  },
  {
    name: 'Panakkukang',
    dataCount: 390,
    coords: [-5.1442474, 119.4502041],
  },
  {
    name: 'Rappoccini',
    dataCount: 390,
    coords: [-5.1698505, 119.4429925],
  },
  {
    name: 'Tamalanrea',
    dataCount: 390,
    coords: [-5.1116335, 119.480652],
  },
  {
    name: 'Tamalate',
    dataCount: 390,
    coords: [-5.193684, 119.410486],
  },
  {
    name: 'Ujung Pandang',
    dataCount: 390,
    coords: [-5.1356407, 119.414141],
  },
  {
    name: 'Ujung Tanah',
    dataCount: 390,
    coords: [-5.1138984, 119.4121011],
  },
  {
    name: 'Wajo',
    dataCount: 390,
    coords: [-5.1239494, 119.3966953],
  },
];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createCustomIcon = (dataCount) => {
  const randomColor = getRandomColor(); // Dapatkan warna acak
  console.log('randomColor', randomColor);
  return L.divIcon({
    html: `<div class="custom-marker bg-${dataCount < 50 ? 'blue' : 'red'}" >
             <span>${dataCount}</span>
           </div>`,
    className: 'custom-marker-icon',
    iconSize: [50, 50], // Ukuran ikon
    iconAnchor: [-40, 40], // Titik anchor ikon
  });
};

const kecamatanList = ['Balla Parang', 'Bara-Baraya', 'South Sulawesi'];

const searchKecamatan = async (kecamatanList) => {
  const provider = new OpenStreetMapProvider();

  for (const kecamatan of kecamatanList) {
    try {
      const result = await provider.search({ query: kecamatan });
      if (result.length > 0) {
        console.log(`Results for ${kecamatan}:`, result[0].raw);
      } else {
        console.log(`No results for ${kecamatan}`);
      }
      // Add a delay to respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
    } catch (error) {
      console.error(`Error fetching data for ${kecamatan}:`, error);
    }
  }
};

function MapsCluster() {
  const [latLong, setLatLong] = useState('');
  const provider = new OpenStreetMapProvider();
  const dataProvide = async () => {
    const result = await provider.search({ query: 'Bara-Baraya' });
    setLatLong(result[0].raw);
    console.log('result result[0].raw', result[0].raw);
  };

  useEffect(() => {
    dataProvide();
    // searchKecamatan(kecamatanBList);
  }, []);

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
