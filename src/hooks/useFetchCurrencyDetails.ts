import { useEffect, useState } from "react";
import axios from "axios";

import { CurrencyDetails } from "utils/types";
import {
  getFavouriteCurrencies,
  toggleFavouriteCurrency,
} from "utils/localStorage";

const useFetchCurrencyDetails = (currencyId: string) => {
  const [currencyHistory, setCurrencyHistory] = useState([]);
  const [currencyDetails, setCurrencyDetails] =
    useState<CurrencyDetails | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrencyHistory = () => {
    if (!currencyId) {
      setError("No currency id found");
      setLoading(false);
      return;
    }

    const now = Date.now();
    //API does not provide data from past 2 days
    const aMonthAgo = now - 32 * 24 * 60 * 60 * 1000;

    axios
      .get(`https://api.coincap.io/v2/assets/${currencyId}`)
      .then((res) => {
        const favouriteCurrencies = getFavouriteCurrencies();
        setCurrencyDetails({
          ...res.data.data,
          isFavourite: favouriteCurrencies.indexOf(currencyId) > -1,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    axios
      .get(
        `https://api.coincap.io/v2/assets/${currencyId}/history?interval=d1&start=${aMonthAgo}&end=${now}`,
      )
      .then((res) => {
        const transformedData = res.data.data.map((item: any) => {
          const date = new Date(item.date);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
          }).format(date);
          return {
            ...item,
            priceUsd: parseFloat(item.priceUsd),
            date: formattedDate,
          };
        });
        setCurrencyHistory(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCurrencyHistory();
    //eslint-disable-next-line
  }, []);

  const retry = () => {
    setLoading(true);
    setError(null);
    fetchCurrencyHistory();
  };

  const toggleFavourite = (currencyId: string) => {
    const updatedFavouriteCurrencies = toggleFavouriteCurrency(currencyId);
    setCurrencyDetails((prevData) => {
      return {
        ...prevData,
        isFavourite: updatedFavouriteCurrencies.indexOf(currencyId) > -1,
      } as CurrencyDetails;
    });
  };

  return {
    currencyDetails,
    currencyHistory,
    toggleFavourite,
    error,
    loading,
    retry,
  };
};

export default useFetchCurrencyDetails;
