import { Card, Col, Row, Skeleton } from "antd";
import { useParams } from "react-router-dom";
import { Line } from "@ant-design/plots";

import FavouriteStar from "components/FavouriteStar";
import ErrorComponent from "components/ErrorComponent";
import useFetchCurrencyDetails from "hooks/useFetchCurrencyDetails";

import { formatPrice } from "utils/text";
import styles from "./index.module.scss";

const CurrencyDetails = () => {
  const params = useParams();
  const {
    currencyHistory,
    currencyDetails,
    toggleFavourite,
    loading,
    error,
    retry,
  } = useFetchCurrencyDetails(params.assetId || "");

  if (loading)
    return (
      <>
        <Skeleton active className={styles["skeleton"]} />
        <Skeleton active className={styles["skeleton"]} />
      </>
    );

  if (error)
    return (
      <ErrorComponent
        message={"Failed to load currency details"}
        retry={retry}
        homeButton
      />
    );

  return (
    <div className={styles["container"]}>
      {!!currencyDetails && (
        <>
          <div className={styles["header"]}>
            <p className={styles["title"]}>
              {currencyDetails?.name}{" "}
              {currencyDetails?.symbol ? `(${currencyDetails.symbol})` : ""}{" "}
              Details
            </p>
            <FavouriteStar
              isFavourite={!!currencyDetails?.isFavourite}
              currencyId={currencyDetails?.id}
              onClick={toggleFavourite}
            />
          </div>
          <div className={styles["details-container"]}>
            <Row gutter={[16, 16]}>
              <Col span={12} md={8}>
                <Card title={"Rank"}>
                  <span className={styles["imp-metric"]}>
                    #{currencyDetails.rank}
                  </span>
                </Card>
              </Col>
              <Col span={12} md={8}>
                <Card title={"Price (USD)"}>
                  <span className={styles["imp-metric"]}>
                    ${formatPrice(currencyDetails.priceUsd)}
                  </span>
                </Card>
              </Col>
              <Col span={12} md={8}>
                <Card title={"Market Cap (USD)"}>
                  <span className={styles["imp-metric"]}>
                    ${formatPrice(currencyDetails.marketCapUsd)}
                  </span>
                </Card>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12} md={6}>
                <Card title={"Change in 24 Hrs"} bordered={false}>
                  {formatPrice(currencyDetails.changePercent24Hr)}%
                </Card>
              </Col>
              <Col span={12} md={6}>
                <Card title={"Volume (24Hrs)"} bordered={false}>
                  ${formatPrice(currencyDetails.volumeUsd24Hr)}
                </Card>
              </Col>
              <Col span={12} md={6}>
                <Card title={"Total supply"} bordered={false}>
                  {formatPrice(currencyDetails.supply)} {currencyDetails.symbol}
                </Card>
              </Col>
              {!!currencyDetails.maxSupply && (
                <Col span={12} md={6}>
                  <Card title={"Max supply"} bordered={false}>
                    {formatPrice(currencyDetails.maxSupply)}{" "}
                    {currencyDetails.symbol}
                  </Card>
                </Col>
              )}
            </Row>
          </div>
        </>
      )}
      <Card title={"Last 30 days price trend"} bordered={false}>
        <Line
          data={currencyHistory}
          height={400}
          xField="date"
          yField="priceUsd"
          point={{
            shapeField: "circle",
            sizeField: 4,
          }}
          axis={{
            x: {
              title: "Date",
            },
            y: {
              title: "Price (USD)",
            },
          }}
          theme={"classicDark"}
        />
      </Card>
    </div>
  );
};

export default CurrencyDetails;
