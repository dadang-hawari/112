import { BarList, Card } from '@tremor/react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopArea } from '../../services/dataService';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export const TopArea = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTopArea(dispatch).then(() => setIsLoading(false));
  }, []);

  const dataReportTopArea = useSelector(
    (state) => state?.data_report?.top_area,
  );

  return (
    <Card className="relative">
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <div className="w-full">
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
        </div>
      )}
    </Card>
  );
};
