import React, { useEffect, useState } from "react";
import { Login } from "./Utility/Login";
import { AccountInfo } from "./AccountInfo";
import { AccountContext } from "../contextProvider/AccountContext";
import { NotifyPanel } from "./Utility/NotifyPanel";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.png";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  Container,
} from "reactstrap";

export const AccountView = () => {
  //redux
  const dispatch = useDispatch();
  const customerReducer = useSelector((state) => state.customerReducer);
  //
  const [state, setState] = useState({});

  useEffect(() => {
    if (customerReducer) {
      setState((s) => ({ ...s, ...customerReducer }));
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
    return (
      <div class="row justify-content-md-center">
        <div class="col col-6 ">
          <div className="text-center my-auto d-none d-sm-block">
            <img
              alt="salt-pepper"
              className="rounded-circle"
              src={avatar}
              width="15%"
            />
          </div>
          <h2 class="display-6 text-center">
            It looks like you're not logged in.
          </h2>
          <p className="lead text-center">Please click below to sign in</p>
          <div class="row justify-content-md-center">
            <div class="col col-lg-auto">
              <Login />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
