import { useEffect, useState } from "react";
import axios from "axios";

import { CurrencyDetails, CurrencyTableData } from "utils/types";
import {
  getFavouriteCurrencies,
  toggleFavouriteCurrency,
} from "utils/localStorage";
import { formatPrice } from "utils/text";

const useFetchCurrency = () => {
  const [allCurrencyData, setAllCurrencyData] = useState<CurrencyTableData[]>(
    [],
  );
  const [currencyIds, setCurrencyIds] = useState<string>("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrency = () => {
    axios
      .get("https://api.coincap.io/v2/assets")
      .then((res) => {
        const favouriteCurrencies = getFavouriteCurrencies();
        const transformedData = res.data.data.map(
          (currency: CurrencyDetails) => {
            const isFavourite = favouriteCurrencies.indexOf(currency.id) > -1;
            return {
              symbol: currency.symbol,
              id: currency.id,
              key: currency.id,
              rank: currency.rank,
              name: currency.name,
              favourite: isFavourite,
              priceUsd: currency.priceUsd,
              marketCapUsd: formatPrice(currency.marketCapUsd),
            };
          },
        );
        const allCurrencyIds = transformedData
          .map((item: CurrencyTableData) => item.id)
          .join(",");
        setCurrencyIds(allCurrencyIds);
        setAllCurrencyData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!currencyIds) return;

    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${currencyIds}`,
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setAllCurrencyData((prevData) =>
        prevData.map((item) =>
          messageData[item.id]
            ? {
                ...item,
                priceUsd: messageData[item.id],
              }
            : item,
        ),
      );
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) ws.close();
    };
    //eslint-disable-next-line
  }, [currencyIds]);

  useEffect(() => {
    fetchCurrency();
  }, []);

  const retry = () => {
    setLoading(true);
    setError(null);
    fetchCurrency();
  };

  const toggleFavourite = (currencyId: string) => {
    const updatedFavouriteCurrencies = toggleFavouriteCurrency(currencyId);
    setAllCurrencyData((prevData) =>
      prevData.map((currency) => ({
        ...currency,
        favourite: updatedFavouriteCurrencies.indexOf(currency.id) > -1,
      })),
    );
  };

  return {
    allCurrencyData,
    error,
    loading,
    retry,
    toggleFavourite,
  };
};

export default useFetchCurrency;
