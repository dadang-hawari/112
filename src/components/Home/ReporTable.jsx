import { useSelector } from 'react-redux';

export const ReportTable = () => {
  const dataInsiden = useSelector(
    (state) => state?.data_report?.data_insiden?.data,
  );
  return (
    <table className="border border-tremor-content mt-2 max-h-4 text-[10px] h-full w-full">
      <thead>
        <tr>
          <th className="border border-tremor-content px-2 text-center py-2">
            No.
          </th>
          <th className="border border-tremor-content px-4 py-2">Ticket</th>
          <th className="border border-tremor-content px-4 py-2">Category</th>
          <th className="border border-tremor-content px-4 py-2">
            Tipe Laporan
          </th>
          <th className="border border-tremor-content px-4 py-2">
            Description
          </th>
          <th className="border border-tremor-content px-4 py-2">Location</th>
          <th className="border border-tremor-content px-4 py-2">District</th>
          <th className="border border-tremor-content px-4 py-2">
            Subdistrict
          </th>
          <th className="border border-tremor-content px-4 py-2">Created At</th>
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
              <td className="text-center border border-tremor-content">
                {index + 1}
              </td>
              <td className="border border-tremor-content px-4">{ticket}</td>
              <td className="border border-tremor-content px-4">{category}</td>
              <td className="border border-tremor-content px-4">{call_type}</td>
              <td className="border border-tremor-content px-4">
                {description}
              </td>
              <td className="border border-tremor-content px-4">{location}</td>
              <td className="border border-tremor-content px-4">{district}</td>
              <td className="border border-tremor-content px-4">
                {subdistrict}
              </td>
              <td className="border border-tremor-content px-4">
                {created_at}
              </td>
              <td className="border border-tremor-content px-4">{status}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
};
