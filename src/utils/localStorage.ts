const localStorageKeys = {
  FAVOURITE_CURRENCIES: "FAVOURITE_CURRENCIES",
};

export const toggleFavouriteCurrency = (currencyId: string) => {
  let favouriteCurrencies = getFavouriteCurrencies();

  const currencyIndex = favouriteCurrencies.indexOf(currencyId);

  if (currencyIndex === -1) {
    favouriteCurrencies.push(currencyId);
  } else {
    favouriteCurrencies.splice(currencyIndex, 1);
  }

  setLocalstorage(
    localStorageKeys.FAVOURITE_CURRENCIES,
    favouriteCurrencies.join(","),
  );

  return favouriteCurrencies;
};

export const getFavouriteCurrencies = () => {
  const currentFavouriteCurrencies = getLocalstorage(
    localStorageKeys.FAVOURITE_CURRENCIES,
  );
  if (!currentFavouriteCurrencies) return [];

  return currentFavouriteCurrencies.split(",");
};

const setLocalstorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

const getLocalstorage = (key: string): string | null => {
  return window.localStorage.getItem(key);
};
