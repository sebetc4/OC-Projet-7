import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { a as aw, useSpring as useSpringWeb } from '@react-spring/web'
import { SvgGroupomaniaText, StandartModal } from '../../components';
import { FormSignIn, FormSignUp, CanvasLogo, MagneticButton, ModalLogin } from './components';
import { getUser } from "../../store/actions/user.actions";

export default function Login() {

	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });	
	const [colorState, setColorState] = useState(0)
	// 0: neutre, 1:login, 2: signUp
	const [mouseOnButton, setMouseOnButton] = useState(0)
	// 0: neutre, 1:login, -1: signUp
	const [modalState, setModalState] = useState(0)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const options = [
		[0, 0, 80],
		[0, 57, 57]
	  ]
	const { hsl } = useSpringWeb({
		hsl: options[colorState],
		config: { tension: 50 },
	})

	const springyGradient = hsl.to((h, s, l) => `radial-gradient(hsl(${h}, ${s * 0.7}%, ${l}%), hsl(${h},${s * 0.4}%, ${l * 0.2}%))`)


	const handleMousePosition = e => {
		if (modalState === 0) {
			setMousePos({
				x: e.clientX,
				y: e.clientY,
			})
		}
	}

	const handleLogin = (userId) => {
		dispatch(getUser(userId))
		navigate('/home')	
	}

	return (
		<aw.div style={{ background: springyGradient}} >
		<div
			onMouseMove={e => { handleMousePosition(e) }}
			className='login'
		>
			<CanvasLogo mousePos={mousePos} mouseOnButton={mouseOnButton} />
			<div className='login-svg-container'>
				<SvgGroupomaniaText modalState={mouseOnButton} />
			</div>
			<div className='login-button-container'>
				<MagneticButton
					texte={'Connexion'}
					mousePos={mousePos}
					handleModal={() => setModalState(1)}
					mouseOn={() => {
						setMouseOnButton(1)
						setColorState(1)
						}}
					mouseOut={() => {
						setMouseOnButton(0)
						setColorState(0)
					}}
				/>
				<MagneticButton
					texte={'Inscription'}
					mousePos={mousePos}
					handleModal={() => setModalState(-1)}
					mouseOn={() => {
						setMouseOnButton(2)
						setColorState(1)
					}}
					mouseOut={() => {
						setMouseOnButton(0)
						setColorState(0)
					}}
				/>
			</div>

			{modalState === -1 && (
				<StandartModal 
				closeModal={() => { setModalState(0) }} 
				closeClickOut={true}
				>
					<FormSignUp 
						handleModal={() => { setModalState(1) }} 
						handleLogin={handleLogin}
					/>
				</StandartModal>
			)}

			{modalState === 1 && (
				<StandartModal 
				closeModal={() => { setModalState(0) }} 
				closeClickOut={true}	
				>
					<FormSignIn 
						handleModal={() => { setModalState(-1) }} 
						handleLogin={handleLogin}
					/>
				</StandartModal >
			)}
		</div>
		</aw.div>
	)
}
