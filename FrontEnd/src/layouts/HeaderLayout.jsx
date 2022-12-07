import React from "react";
import Header from "../components/Header";

const HeaderLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default HeaderLayout;
