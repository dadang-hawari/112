export const getHighestData = (kecamatanData) => {
  let dataCount = 0;
  let coordinates = [];
  let name = '';
  kecamatanData?.forEach((value) => {
    if (dataCount < value?.dataCount) {
      dataCount = value?.dataCount;
      coordinates = value?.coords;
      name = value?.name;
    }
  });
  return {
    dataCount,
    coordinates,
    name,
  };
};
