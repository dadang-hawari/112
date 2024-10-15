import { BarList, Card } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTopCategories } from '../../services/dataService';
import { LoadingSpinner } from '../Common/LoadingSpinner';

export const TopCategories = () => {
  const dataReport = useSelector((state) => state?.data_report?.top_categories);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    getTopCategories(dispatch).then(() => setIsLoading(false));
  }, []);

  return (
    <Card className="w-full py-10 h-full relative">
      {isLoading ? (
        <LoadingSpinner isLoading={isLoading} />
      ) : (
        <div className="w-full">
          <h2 className="text-tremor-content font-semibold">
            Top 5 Insiden Berdasarkan Kategori
          </h2>
          <BarList
            className="mt-5"
            data={dataReport?.map((dataCategories) => {
              return { name: dataCategories.name, value: dataCategories.total };
            })}
            color="green"
            valueFormatter={(value) => `${value} Kasus`}
          />
        </div>
      )}
    </Card>
  );
};
