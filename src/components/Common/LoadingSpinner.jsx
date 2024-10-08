export const LoadingSpinner = ({ isLoading }) => {
  return (
    <div
      className={`flex flex-col items-center  transition-opacity justify-center absolute -translate-x-1/2 left-1/2 h-[321px] mt-5 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex justify-center  items-center mb-4">
        <div className="animate-spin rounded-full w-28 h-28 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 animate-pulse">
        Sedang mengambil data...
      </h3>
    </div>
  );
};
