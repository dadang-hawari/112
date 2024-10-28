import { useSelector } from 'react-redux';

export const ReportTable = () => {
  const data = useSelector((state) => state?.data_report);
  const lastPage = data?.last_page;
  let startPage = data?.data_insiden?.from;
  const dataInsiden = data?.data_insiden?.data;

  return (
    <table className="border border-tremor-content mt-2 max-h-4 text-[10px] h-full w-full">
      <thead>
        <tr>
          <th className="border border-tremor-content px-2 text-center py-2">
            No.
          </th>
          <th className="border border-tremor-content px-4 py-2">Tiket</th>
          <th className="border border-tremor-content px-4 py-2">Kategori</th>
          <th className="border border-tremor-content px-4 py-2">
            Tipe Laporan
          </th>
          <th className="border border-tremor-content px-4 py-2">
            Description
          </th>
          <th className="border border-tremor-content px-4 py-2">Lokasi</th>
          <th className="border border-tremor-content px-4 py-2">Kecamatan</th>
          <th className="border border-tremor-content px-4 py-2">Kelurahan</th>
          <th className="border border-tremor-content px-4 py-2">Dibuat</th>
          <th className="border border-tremor-content px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody className="h-8">
        {dataInsiden?.map(
          (
            {
              ticket,
              category,
              call_type,
              description,
              location,
              district,
              subdistrict,
              created_at,
              status,
            },
            index,
          ) => (
            <tr key={index}>
              <td className="text-center border sm:py-2 border-tremor-content">
                {startPage + 1 && startPage++}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {ticket}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {category}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {call_type}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {description}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {location}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {district}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {subdistrict}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {created_at}
              </td>
              <td className="border sm:py-2 border-tremor-content px-2">
                {status}
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
