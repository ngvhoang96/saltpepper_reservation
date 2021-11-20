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
                    Reservation# {payments._id}
                  </CardSubtitle>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <div>
                <CardTitle tag="h7">Total: ${payments.amount}</CardTitle>
              </div>
              <CardText tag="h7">
                Reservervation placed on {payments.date}
              </CardText>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}

export default AccountPayment;
