import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { a as aw, useSpring as useSpringWeb } from '@react-spring/web'
import { GroupomaniaTextSvg, StandartModal } from '../../components';
import { SignInForm, SignUpForm, ThreeCanvas, MagneticButton } from './components';
import { getUser } from "../../store/actions/user.actions";
import { useSelector } from "react-redux";




export default function Login() {

	// Hooks
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// State
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [color, setColor] = useState(0)
	// 0: neutre, 1:signIn, 2: signUp
	const [mouseOnButton, setMouseOnButton] = useState(0)
	// 0: neutre, 1:signIn, 2: signUp, 3: dialog SignUp
	const [modalState, setModalState] = useState(0)

	// Store
	const deviceSize = useSelector((state) => state.app.deviceSize)

	const colors = [
		[0, 0, 80],
		[0, 57, 57]
	]
	
	const { hsl } = useSpringWeb({
		hsl: colors[color],
		config: { tension: 50 },
	})

	const springyGradient = hsl.to((h, s, l) => `radial-gradient(hsl(${h}, ${s * 0.7}%, ${l}%), hsl(${h},${s * 0.4}%, ${l * 0.2}%))`)

	const handleMousePosition = e => {
		if (modalState === 0 && deviceSize === 2) {
			setMousePos({
				x: e.clientX,
				y: e.clientY,
			})
		}
	}

	const handleSignIn = async () => {
			dispatch(getUser())
	}

	return (
		<aw.div style={{ background: springyGradient }} >
			<div
				onMouseMove={e => { handleMousePosition(e) }}
				className='login'
			>
				<ThreeCanvas
					mousePos={mousePos}
					mouseOnButton={mouseOnButton}
					deviceSize={deviceSize}
				/>
				<div className='login-svg-container'>
					<GroupomaniaTextSvg modalState={mouseOnButton} />
				</div>
				<div className='login-button-container'>
					<MagneticButton
						texte={'Connexion'}
						mousePos={mousePos}
						deviceSize={deviceSize}
						handleModal={() => setModalState(1)}
						mouseOn={() => {
							setMouseOnButton(1)
							setColor(1)
						}}
						mouseOut={() => {
							setMouseOnButton(0)
							setColor(0)
						}}
					/>
					<MagneticButton
						texte={'Inscription'}
						mousePos={mousePos}
						deviceSize={deviceSize}
						handleModal={() => setModalState(2)}
						mouseOn={() => {
							setMouseOnButton(2)
							setColor(1)
						}}
						mouseOut={() => {
							setMouseOnButton(0)
							setColor(0)
						}}
					/>
				</div>

				{modalState === 1 && (
					<StandartModal
						closeModal={() => { setModalState(0) }}
						closeClickOut={true}
					>
						<SignInForm
							handleModal={() => { setModalState(2) }}
							handleLogin={handleSignIn}
						/>
					</StandartModal >
				)}

				{modalState === 2 && (
					<StandartModal
						closeModal={() => { setModalState(0) }}
						closeClickOut={true}
					>
						<SignUpForm
							handleModal={() => { setModalState(1) }}
							handleLogin={() => { setModalState(3) }}
						/>
					</StandartModal>
				)}

				{modalState === 3 && (
					<StandartModal
						closeModal={() => { setModalState(0) }}
						closeClickOut={true}
					>
						<div className='login-form-container'>
							<h2 className="login-form-container__title">Bienvenu!</h2>
							<p className="login-form-container__text">Pour accéder à votre compte merci de vous connecter.</p>
							<button className='login-form__button' onClick={() => { setModalState(1) }} >Connexion</button>
						</div>
					</StandartModal>
				)}
			</div>
		</aw.div>
	)
}
