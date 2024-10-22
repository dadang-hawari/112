import { useMap } from 'react-leaflet';

export default function MapCenterButton({ lat, lang }) {
  const map = useMap();

  const goToCenter = () => {
    map.setView([-5.1436530000000005, 119.45361726889358], 13);
  };

  return (
    <div
      className="fixed z-[99999] sans-jakarta bg-blue-500 text-white font-inherit w-fit px-5 py-2 bottom-2 left-10 cursor-pointer"
      onClick={goToCenter}
    >
      <h2 className="text-sm">Kembali ke Center</h2>
    </div>
  );
}
