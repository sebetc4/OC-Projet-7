import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { a as aw, useSpring as useSpringWeb } from '@react-spring/web'
import { GroupomaniaTextSvg } from '../../components';
import { SignInForm, SignUpForm, ThreeCanvas, MagneticButton } from './components';
import { getUser } from "../../store/actions/user.actions";
import { Dialog, Slide, Button } from '@mui/material';

const options = [
	[0, 0, 80],
	[0, 57, 57]
]

const TransitionRight = React.forwardRef(function Transition(props, ref) {
	return <Slide
		direction="right"
		ref={ref}
		{...props}
	/>;
});

const TransitionLeft = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

export default function Login() {


	// Hooks
	const dispatch = useDispatch();

	// State
	const [indexColor, setIndexColor] = useState(0)

	const [showSignInForm, setShowSignInForm] = useState(false)
	const [showSignUpForm, setShowSignUpForm] = useState(false)
	const [showConfirmSignUpForm, setShowConfirmSignUpForm] = useState(false)
	const [allModalsAreClose, setAllModalsAreClose] = useState(false)

	const [mouseOnSignInButton, setMouseOnSignInButton] = useState(false)
	const [mouseOnSignUpButton, setMouseOnSignUpButton] = useState(false)
	const [mouseOnOneButton, setMouseOnOneButton] = useState(false)

	const [showTextSvg, setShowTextSvg] = useState(true)

	// Store
	const deviceSize = useSelector(state => state.app.deviceSize)

	// Color
	const { hsl } = useSpringWeb({
		hsl: options[indexColor],
		config: { tension: 50 },
	})

	const springyGradient = hsl.to((h, s, l) => `radial-gradient(hsl(${h}, ${s * 0.7}%, ${l}%), hsl(${h},${s * 0.4}%, ${l * 0.2}%))`)

	// Check if all modals are close
	useEffect(() => {
		if (showSignInForm || showSignUpForm || showConfirmSignUpForm) {
			setAllModalsAreClose(false)
			setShowTextSvg(false)
		} else {
			setAllModalsAreClose(true)
			setShowTextSvg(true)
		}
	}, [showSignInForm, showSignUpForm, showConfirmSignUpForm])

	// Check if the mouse is on a button
	useEffect(() => {
		if (mouseOnSignInButton || mouseOnSignUpButton) {
			setMouseOnOneButton(true)
			setIndexColor(1)
			setShowTextSvg(false)
		} else {
			setMouseOnOneButton(false)
			setIndexColor(0)
			setShowTextSvg(true)
		}
	}, [mouseOnSignInButton, mouseOnSignUpButton])

	const handleSignIn = () => dispatch(getUser())

	return (
		<aw.div style={{ background: springyGradient }} >
			<div
				className='login'
			>
				<ThreeCanvas
					mouseOnOneButton={mouseOnOneButton}
					deviceSize={deviceSize}
					allModalsAreClose={allModalsAreClose}
				/>
				<div className='login-svg-container'>
					<GroupomaniaTextSvg
						show={showTextSvg}
					/>
				</div>
				<div className='login-button-container'>
					<MagneticButton
						texte={'Connexion'}
						allModalsAreClose={allModalsAreClose}
						deviceSize={deviceSize}
						handleModal={() => setShowSignInForm(true)}
						mouseOn={() => setMouseOnSignInButton(true)}
						mouseOut={() => setMouseOnSignInButton(false)}
					/>
					<MagneticButton
						texte={'Inscription'}
						allModalsAreClose={allModalsAreClose}
						deviceSize={deviceSize}
						handleModal={() => setShowSignUpForm(true)}
						mouseOn={() => setMouseOnSignUpButton(true)}
						mouseOut={() => setMouseOnSignUpButton(false)}
					/>
				</div>

				<Dialog
					className='login-form-modal'
					open={showSignInForm}
					onClose={() => { setShowSignInForm(false) }}
					TransitionComponent={TransitionRight}
				>
					<SignInForm
						handleModal={() => {
							setShowSignInForm(false)
							setShowSignUpForm(true)
						}}
						handleLogin={handleSignIn}
					/>
				</Dialog >

				<Dialog
					className='login-form-modal'
					open={showSignUpForm}
					onClose={() => setShowSignUpForm(false)}
					TransitionComponent={TransitionLeft}
				>
					<SignUpForm
						handleModal={() => {
							setShowSignInForm(true)
							setShowSignUpForm(false)
						}}
						handleLogin={() => {
							setShowSignUpForm(false)
							setShowConfirmSignUpForm(true)
						}}
					/>
				</Dialog>
				<Dialog
					open={showConfirmSignUpForm}
					onClose={() => setShowConfirmSignUpForm(false)}
					closeModal={() => setShowConfirmSignUpForm(false)}
				>
					<div className='login-form-modal-content login-form-modal-content--confirm'>
						<h2 className="login-form-modal-content__title">Bienvenue parmi nous!</h2>
						<p className="login-form-modal-content__text">Pour accéder au contenu du site merci de vous connecter.</p>
						<div className='login-form__button-container login-form__button-container--confirm'>
							<Button
								variant='contained'
								onClick={() => {
									setShowSignInForm(true)
									setShowConfirmSignUpForm(false)
								}} >
								Connexion
							</Button>
						</div>
					</div>
				</Dialog>
			</div>
		</aw.div>
	)
}
