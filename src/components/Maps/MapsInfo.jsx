import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MapsInfo = () => {
  return (
    <div className="fixed z-[999] px-4 text-white bg-black bg-opacity-55 w-max rounded-sm -translate-y-1/2 top-1/2 h-[200px] left-4  ">
      <div className="items-center gap-x-4">
        <h2 className="font-semibold cursor-pointer">Keterangan</h2>
        <section className="mt-2">
          <div className="text-xs flex items-center mb-1 gap-x-2">
            <FontAwesomeIcon className="h-3" icon={faChevronLeft} />
            <p>Lebih kecil</p>
          </div>
          <div className="text-xs flex items-center gap-x-2">
            <FontAwesomeIcon className="h-3" icon={faChevronRight} />
            <p>Lebih besar</p>
          </div>
          <div></div>
        </section>
        <section className="mt-3">
          <div className="flex flex-col gap-y-2">
            <div className="flex gap-2 items-center text-xs">
              <div className="w-6 h-5 rounded-sm bg-opacity-60 bg-cst-red"></div>
              <FontAwesomeIcon icon={faChevronRight} className="h-3" />
              800
            </div>
            <div className="flex gap-2 items-center text-xs">
              <div className="w-6 h-5 rounded-sm bg-opacity-60 bg-cst-yellow"></div>
              <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
              800
            </div>
            <div className="flex gap-2 items-center text-xs">
              <div className="w-6 h-5 rounded-sm bg-opacity-60 bg-cst-blue"></div>
              <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
              500
            </div>
            <div className="flex gap-2 items-center text-xs">
              <div className="w-6 h-5 rounded-sm bg-opacity-60 bg-cst-green"></div>
              <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
              200
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
