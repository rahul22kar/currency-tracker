import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Link } from "react-router-dom";

import FavouriteStar from "components/FavouriteStar";
import useFetchCurrency from "hooks/useFetchCurrency";
import { CurrencyTableData } from "utils/types";
import { formatPrice } from "utils/text";

import styles from "./index.module.scss";
import ErrorComponent from "components/ErrorComponent";

const CurrencyListing = () => {
  const { allCurrencyData, loading, error, retry, toggleFavourite } =
    useFetchCurrency();

  const tableColumns: TableColumnsType<CurrencyTableData> = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      width: "20%",
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: null,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: null,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (name, currency) => (
        <Link to={`/details/${currency.id}`}>{name}</Link>
      ),
    },
    {
      title: "Price (USD)",
      dataIndex: "priceUsd",
      width: "20%",
      render: (text) => <span>${formatPrice(text)}</span>,
    },
    {
      title: "Market Cap (USD)",
      dataIndex: "marketCapUsd",
      width: "25%",
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Favourite",
      dataIndex: "favourite",
      width: "10%",
      align: "center",
      render: (isFavourite, currency) => (
        <FavouriteStar
          isFavourite={isFavourite}
          currencyId={currency.id}
          onClick={toggleFavourite}
        />
      ),
    },
  ];

  if (error) {
    return <ErrorComponent message={"Failed to load data!"} retry={retry} />;
  }

  return (
    <div className={styles["container"]}>
      <p className={styles["title"]}>Top 100 Crypto Currencies</p>
      <Table
        columns={tableColumns}
        dataSource={allCurrencyData}
        loading={loading}
        bordered
        scroll={{ x: "576px" }}
      />
    </div>
  );
};

export default CurrencyListing;
