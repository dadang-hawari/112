import {
  faAlignCenter,
  faLocationArrow,
  faLocationCrosshairs,
  faLocationPinLock,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMap } from 'react-leaflet';

export default function MapCenterButton() {
  const map = useMap();

  const goToCenter = () => {
    map.setView([-5.141541, 119.42779], 13);
  };

  return (
    <div
      className="fixed z-[99999] sans-jakarta bg-blue-500 text-white font-inherit w-fit px-[10px] rounded-sm py-2 right-5 bottom-28 cursor-pointer"
      onClick={goToCenter}
      title="Atur"
    >
      <h2 className="text-sm">
        <FontAwesomeIcon icon={faLocationArrow} />{' '}
      </h2>
    </div>
  );
}
