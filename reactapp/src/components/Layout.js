import React from "react";
import UserAppBar from "./UserAppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <UserAppBar id={1} />
      </header>

      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
