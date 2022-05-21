import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { Signup } from "src/assets/holders/holders";
import { Toast } from "src/components/common/Toast/Toast";
import { FullPageModal } from "src/components/UI/Modal/FullPageModal/FullPageModal";
import { useAuth } from "src/context/AuthContext";
import { useModal } from "src/context/ModalProvider";
import useAxios from "src/customhook/useAxios";
import { VAR_ENCODE_TOKEN, VAR_USER_ID } from "src/utils/Route";
import StopPropogation from "src/utils/StopPropogation";
import "./SignUpPage.css";

interface Location {
	pathname: string;
	search: string;
	hash: string;
	state: unknown;
	key: string;
}
let location: Location;
let from: any;
type Props = { props: any };

const SignUpDetails = (state, action) => {
	console.log(state, action);
	console.log(action.email, action.firstName, action.lastName);
	if (action.email) {
		return { ...state, email: action.email };
	}
	if (action.firstName) {
		return { ...state, firstName: action.firstName };
	}
	if (action.lastName) {
		return { ...state, lastName: action.lastName };
	}
	return { ...state };
};

function SignUpPage({ props: setlogin }: Props) {
	const [passwordCheckError, setPasswordCheckError] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [comparePassword, setComparePassword] = useState(false);
	const [state, dispatch] = useReducer(SignUpDetails, {
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const [passwordType, setPasswordType] = useState("password");
	const { modalToggle, setmodalToggle } = useModal();
	const [response, error, loading, fetch] = useAxios();
	const navigate = useNavigate();
	let auth = useAuth();

	function HasAlphabets(letter) {
		for (let i = 0; i < letter.length; i++) {
			let char = letter[i];
			if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
				return true;
			}
		}
	}
	function HasNumber(letter) {
		for (let i = 0; i < letter.length; i++) {
			let char = letter[i];
			if (!isNaN(char)) {
				return true;
			}
		}
	}
	function HasSpecialCharacter(letter) {
		var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

		if (letter.match(format)) {
			console.log("spe");
			return true;
		} else {
			console.log("sd");
			return false;
		}
	}
	function PasswordCheck(value) {
		console.log(value);
		setConfirmPassword(value);

		setPasswordCheckError(
			!!HasAlphabets(value) &&
			!!HasNumber(value) &&
			!!HasSpecialCharacter(value)
		);
	}

	const PasswordVisibilityHandler = () => {
		console.log(passwordType);
		setPasswordType((prev) => (prev === "password" ? "text" : "password"));
	};

	const onSubmittFunc = async (e) => {
		e.preventDefault();
		try {
			if (state.email.trim() === "" || confirmPassword.trim() === "" || state.firstName.trim() === "" || state.lastName.trim()=== "") {
				// Alert("error", "Input cannot be blank");
				Toast("Input cannot be blank")
			} else {
				var object = {
					email: state.email,
					password: confirmPassword,
					firstName: state.firstName,
					lastName: state.lastName,
				};
				var res = await fetch({
					method: "post",
					url: "/api/auth/signup",
					data: object,
				});
				console.log(res);
				var token = res?.encodedToken;
				localStorage.setItem(VAR_ENCODE_TOKEN, token);
				var user = res?.createdUser;
				var userId = res.createdUser._id;
				localStorage.setItem(VAR_USER_ID, userId);
				auth.loginUser(
					{
						email: res.createdUser.email,
						firstName: res.createdUser.firstName,
						lastName: res.createdUser.lastName,
					},
					() => {
						navigate(from?.pathname || "/home", { replace: true });
					}
				);
				setlogin(true);
				setmodalToggle(false);
				Toast("Signed In!")
			}
		} catch (error: any) {
			console.log(error.message);
			Toast(error.message)
			if (
				error.message.slice(error.message.length - 3, error.message.length) ===
				"422"
			) {
				console.log("The User Already Exist, try logging in");
				// Alert("error", "Something suspicious!! The User Already Exist, try logging in");
			}
		}
	};

	return (
		<FullPageModal>
			<div className="signup-body-container"
				onClick={(event: React.MouseEvent<HTMLElement>) => StopPropogation(event)} >

					<form onSubmit={(e) => onSubmittFunc(e)} className="signup-container">
						<div className="title-header">
							<p className="lg-txt" >
								Create your profile and get access
								to create notes and maintain them
							</p>
						</div>
						<div className="signup-credential-container">
							<input
								type="email"
								placeholder="Email Address - xyz@gmail.com"
								onChange={(e) => dispatch({ email: e.target.value })}
							/>
						</div>
						<div className="signup-credential-container">
							<div className="password-holder">
								<input
									type={passwordType}
									placeholder="Password"
									name=""
									id=""
									style={{
										borderColor: passwordCheckError ? "red" : "black",
										outlineColor: passwordCheckError ? "red" : "black",
									}}
									onChange={(e) => {
										PasswordCheck(e.target.value);
									}}
								/>
								{passwordType === "password" ? (
									<span
										className="material-icons-round"
										onClick={() => PasswordVisibilityHandler()}
									>
										visibility
									</span>
								) : (
									<span
										className="material-icons-round"
										onClick={() => PasswordVisibilityHandler()}
									>
										visibility_off
									</span>
								)}
							</div>
							<p className="error">
								{confirmPassword.length > 0 && confirmPassword.length < 7
									? "password should be minimum 7 letter"
									: ""}
							</p>
							<p className="error">
								{(confirmPassword.length > 0 &&
									passwordCheckError ) ||
									"Password should contain a number, alphabet & special character"}
							</p>
						</div>
						<div className="signup-credential-container">
							<input
								type="password"
								placeholder="Confirm Password"
								name=""
								id=""
								style={{
									borderColor: passwordCheckError ? "red" : "black",
									outlineColor: passwordCheckError ? "red" : "black",
								}}
								onChange={(e) => {
									setComparePassword(e.target.value !== confirmPassword);
								}}
								disabled={
									passwordCheckError && confirmPassword.length >= 7 ? false : true
								}
							/>
							<p className="error">
								{comparePassword && "Confirm Password Should match Password"}
							</p>
						</div>
						<div className="signup-credential-container">
							<input
								type="email"
								placeholder="First Name"
								onChange={(e) => dispatch({ firstName: e.target.value })}
							/>
							{/* </div>
			<div className="signup-credential-container"> */}
							<input
								type="email"
								placeholder="Last Name"
								onChange={(e) => dispatch({ lastName: e.target.value })}
							/>
						</div>
						<div className="signup-remember-container">
							
								<input type="checkbox" name="" id="" />I accept all Terms &
								Conditions
							
						</div>
						<div className="signup-btn-container">
							<button className="btn signup-action-btn" type="submit" >
								Signup
							</button>
						</div>
						<span className="signup-footer cursive" onClick={() => setlogin(true)}>
						Already have an Account{" "}
						<span className="material-icons-round">navigate_next</span>
						</span>
					</form>
			</div>
		</FullPageModal>
	);
}

export default SignUpPage;
