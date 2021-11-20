import React, { useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardHeader,
} from "reactstrap";
import { AccountContext } from "../contextProvider/AccountContext";

function convertDate(date_str) {
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let temp_date = date_str.split("-");
  return months[temp_date[0] - 1] + " " + temp_date[1] + ", " + temp_date[2];
}

function AccountPayment() {
  const [state, setState] = useContext(AccountContext);

  return (
    <div>
      {state.payments?.map((payments) => {
        return (
          <Card>
            <CardHeader>
              <div class="row">
                <div class="col">
                  <CardTitle tag="h5">{payments.description}</CardTitle>
                </div>
                <div class="col">
                  <CardSubtitle className="mb-2 text-muted float-end">
                    Payment# {payments._id}
                  </CardSubtitle>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <CardTitle tag="h7">Total: ${payments.amount}</CardTitle>
              </div>
              <CardText tag="h7">
                Payment placed on {convertDate(payments.date)}
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

export default AccountPayment;
