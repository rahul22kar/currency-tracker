import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

import CurrencyDetails from "pages/CurrencyDetails";
import CurrencyListing from "pages/CurrencyListing";

import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <div className={styles["container"]}>
          <div className={styles["header"]}>
            <Link to={"/"} className={styles["title"]}>
              Currency Tracker
            </Link>
          </div>
          <div className={styles["page"]}>
            <Routes>
              <Route path="/" element={<CurrencyListing />} />
              <Route path="/details/:assetId" element={<CurrencyDetails />} />
            </Routes>
          </div>
        </div>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
