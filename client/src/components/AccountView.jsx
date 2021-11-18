import React, { useEffect, useState } from "react";
import { Login } from "./Utility/Login";
import { AccountInfo } from "./AccountInfo";
import { AccountContext } from "../contextProvider/AccountContext";
import { NotifyPanel } from "./Utility/NotifyPanel";
import { useDispatch, useSelector } from "react-redux";

export const AccountView = () => {
  //redux
  const dispatch = useDispatch();
  const customerReducer = useSelector((state) => state.customerReducer);
  //
  const [state, setState] = useState({ errorList: [] });

  useEffect(() => {
    if (customerReducer) {
      setState((s) => customerReducer);
    }
  }, [customerReducer]);

  const handleLoggedout = (event) => {
    event.preventDefault();
    localStorage.removeItem("_token");
    //redux
    dispatch({ type: "action.logout" });
  };

  if (customerReducer?.isLoggedIn) {
    return (
      <AccountContext.Provider value={[state, setState]}>
        <NotifyPanel type={state.notify?.type}>{state.notify?.msg}</NotifyPanel>
        <AccountInfo onLoggedOut={handleLoggedout} />
      </AccountContext.Provider>
    );
  } else {
    return <Login />;
  }
};
