import { Component } from "react";
import { Form, FormGroup, Input, Label, Button, Col } from "reactstrap";

var inputStyles = {
    border: '1px solid #cbcbcb',
    color: '#525252',
};
var placeholderStyles = {
    ...inputStyles,
    color: '#999999',
};

class AccountView extends Component {
	constructor(props)
	{
		super(props);
		this.state = {EmailPlace:null};
		// const [userNameReg, setUsernameReg] = useState('');
		// const [passwordReg, setPasswordReg] = useState('');
	}



	render() {
		return (
			<div>
				<Form>
  <FormGroup row>
    <Label
      for="exampleEmail"
      size="lg"
      sm={2}
    >
      Email
    </Label>
    <Col sm={10}>
      <Input
        bsSize="lg"
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
		// onChange = {(e) => {setUsernameReg(e.target.value)}}
      />
    </Col>
  </FormGroup>
  <FormGroup row>
    <Label
      for="exampleEmail2"
	  size = 'lg'
      sm={2}
    >
      Password
    </Label>
    <Col sm={10}>
      <Input
	  bsSize="lg"
        id="exampleEmail2"
        name="password"
        placeholder="Password"
        type="password"
		// onChange = {(e) => {setPasswordReg(e.target.value)}}
      />
    </Col>
  </FormGroup>
     <Button color= "danger" outline>
       Login
     </Button>
</Form>
			</div>
		);
	}
}
export default AccountView;

//   <Form inline>
//     <FormGroup floating>
//       <Input
//         id="exampleEmail"
//         name="email"
//         placeholder="Email"
//         type="email"
// 		value = {this.state.EmailPlace}
//       />
//       <Label for="exampleEmail">
//         Email
//       </Label>
//     </FormGroup>
//     {' '}
//     <FormGroup floating>
//       <Input
//         id="examplePassword"
//         name="password"
//         placeholder="Password"
//         type="password"
//       />
//       <Label for="examplePassword">
//         Password
//       </Label>
//     </FormGroup>
//     {' '}
//     <Button>
//       Submit
//     </Button>
//   </Form>