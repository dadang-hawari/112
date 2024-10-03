import { BarList, Card } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopArea } from '../../services/dataService';
import { useEffect } from 'react';

export const TopArea = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getTopArea(dispatch);
  }, []);

  const dataReportTopArea = useSelector(
    (state) => state?.data_report?.top_area,
  );

  return (
    <Card>
      <h2 className="text-tremor-content font-semibold">
        Top 5 Insiden Berdasarkan Wiilayah
      </h2>
      <BarList
        className="mt-5"
        data={dataReportTopArea?.map((dataCategories) => {
          return { name: dataCategories.name, value: dataCategories.total };
        })}
        color="blue"
        valueFormatter={(value) => `${value} Kasus`}
      />
    </Card>
  );
};
