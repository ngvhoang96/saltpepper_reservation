import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import React, { useState, useContext } from "react";
import { NotifyPanel } from "./NotifyPanel";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginContext = React.createContext({});

export const Login = ({ onLoggedIn }) => {
  const [state, setState] = useState({
    isLoggedIn: false,
    showModal: false,
    email: "",
    password: "",
    errorList: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/customer/login", {
        email: state.email,
        password: state.password,
      })
      .then(({ data }) => {
        setState({ ...state, errorList: [], isLoggedIn: true });
        localStorage.setItem("_token", data.token);
        onLoggedIn();
      })
      .catch(({ response }) => {
        setState({ ...state, errorList: [response.data.error] });
      });
  };

  if (state.isLoggedIn) {
    return null;
  } else {
    return (
      <LoginContext.Provider value={[state, setState]}>
        <Button onClick={() => setState({ ...state, showModal: true })}>
          Sign In
        </Button>
        <LoginForm onSubmit={handleSubmit} />
      </LoginContext.Provider>
    );
  }
};

const LoginForm = ({ onSubmit }) => {
  const [state, setState] = useContext(LoginContext);

  return (
    <Modal isOpen={state.showModal} centered={true} className="modal-lg">
      <ModalHeader className="justify-content-center">Sign in</ModalHeader>
      <Form onSubmit={(event) => onSubmit(event)}>
        <ModalBody>
          <div class="container d-flex p-2">
            <div class="row">
              <div class="col text-center">
                <img
                  className="rounded-circle mt-4"
                  src="https://www.nowplayingnashville.com/wp-content/uploads/sites/www.nowplayingnashville.com/images/2018/10/salt-pepper.png"
                  width="75%"
                />
              </div>

              <div class="col align-self-center">
                <NotifyPanel>{state.errorList}</NotifyPanel>
                <div class="text-center">
                  <img
                    class="mb-2"
                    src="https://screenshots.imgix.net/mui-org/material-ui-icons/lock-outlined/~v=3.9.2/f4cb3020-77a2-49c2-8d0b-d2fc53d3a3f0.png?ixlib=js-1.2.0&s=45047390e8a4936dd989837eadff3bb4"
                    width="10%"
                  />
                </div>
                <FormGroup>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={state.email}
                    onChange={(event) =>
                      setState({ ...state, email: event.target.value })
                    }
                    name="email"
                    className="mb-2"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={state.password}
                    onChange={(event) =>
                      setState({ ...state, password: event.target.value })
                    }
                    name="password"
                    className="mb-2"
                  />
                </FormGroup>
                <div>Dont Have an Account?</div>
                <Link to="/register">Click Here to Sign Up</Link>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setState({ ...state, showModal: false })}>
            Cancel
          </Button>
          <Button color="danger">Submit</Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
