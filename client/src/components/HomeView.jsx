import { Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "reactstrap";
import saltPepperLogo from "../assets/saltpepper.jpg";

export const HomeView = () => {
  return (
    <Container className="themed-container">
      <Jumbotron>
        <div className="row align-items-center">
          <div className="col my-auto d-none d-sm-block">
            <img
              alt="salt-pepper"
              className="rounded-circle"
              src={saltPepperLogo}
              width="75%"
            />
          </div>
          <div className="col my-auto">
            <h1 className="display-3">Hello Customers!</h1>
            <p className="lead">
              Welcome to Salt Pepper reservation, we would like to introduce to
              you the new look of the website.
            </p>
            <hr className="my-2" />
            <p>Click now to make a reservation!</p>
            <p className="lead">
              <Link to={"/reservation"}>
                <Button color="danger">Reserve Now</Button>
              </Link>
            </p>
          </div>
        </div>
      </Jumbotron>
    </Container>
  );
};
