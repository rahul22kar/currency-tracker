import React from "react";

export interface CurrencyTableData {
  key: React.Key;
  name: string;
  id: string;
  symbol: string;
  priceUsd: string;
  marketCapUsd: string;
  favourite: boolean;
}

//API returns all data points as string
export interface CurrencyDetails {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  isFavourite: boolean;
}
