import { BarList, Card } from '@tremor/react';
import { useSelector } from 'react-redux';

export const TopCategories = () => {
  const dataReport = useSelector((state) => state?.data_report?.top_categories);

  return (
    <Card>
      <h2 className="text-tremor-content font-semibold">
        Top 5 Insiden Berdasarkan Kategori
      </h2>
      <BarList
        className="mt-5"
        data={dataReport.map((dataCategories) => {
          return { name: dataCategories.name, value: dataCategories.total };
        })}
        color="green"
        valueFormatter={(value) => `${value} Kasus`}
      />
    </Card>
  );
};
