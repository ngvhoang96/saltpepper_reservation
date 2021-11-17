import { useContext } from "react";
import {
	Input,
	InputGroup,
	InputGroupAddon,
	Progress,
	Button,
} from "reactstrap";
import { ReservationContext } from "../contextProvider/ReservationContext";

export default function ChooseGuestSize() {
	const [state, setState] = useContext(ReservationContext);
	return (
		<div className=" py-4 px-2">
			<InputGroup>
				<InputGroupAddon addonType="prepend">How many guest?</InputGroupAddon>
				<Input
					placeholder="number"
					value={state.numberOfGuest || ""}
					onChange={(e) => {
						setState({ ...state, numberOfGuest: e.target.value });
					}}
				/>
			</InputGroup>
			<div className="py-3">
				<Progress
					color="success"
					value={state.chosenGuestSize || 0}
					max={state.numberOfGuest || 4}
				>
					{state.chosenGuestSize && state.numberOfGuest
						? state.chosenGuestSize + "/" + state.numberOfGuest
						: 0}
				</Progress>
			</div>
			<div className="text-center">
				<Button
					onClick={() =>
						setState({
							...state,
							selectedDate: undefined,
							selectedTable: undefined,
							selectedHour: undefined,
							chosenGuestSize: undefined,
						})
					}
				>
					Reset
				</Button>{" "}
				<Button
					color="success"
					disabled={
						state.chosenGuestSize === undefined ||
						state.numberOfGuest === undefined ||
						state.chosenGuestSize < state.numberOfGuest
					}
					onClick={() => setState({ ...state, showModal: true })}
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}
