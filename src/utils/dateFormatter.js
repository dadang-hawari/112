export const dateFormatter = (dateTime) => {
  const date = new Date(dateTime);

  const day = String(date.getDate()).padStart(2, '0'); // Mengambil tanggal, dan tambahkan '0' di depan jika perlu
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Mengambil bulan (perlu ditambah 1, karena dimulai dari 0)
  const year = date.getFullYear(); // Mengambil tahun

  const hours = String(date.getHours()).padStart(2, '0'); // Mengambil jam, dan tambahkan '0' jika perlu
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Mengambil menit
  const seconds = String(date.getSeconds()).padStart(2, '0'); // Mengambil detik
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
