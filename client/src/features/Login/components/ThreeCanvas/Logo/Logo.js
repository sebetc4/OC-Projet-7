import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import Model from "./components/Model";
import Texture from "./components/Texture";


export default function Logo({ mouseOnOneButton, deviceSize, allModalsAreClose }) {

    // Hooks
    const myMesh = useRef();

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    let cursorPos = {
        axeX: 0,
        axeY: 0,
    };

    useEffect(() => {
        const handleMousePosition = (e) => {
            setMousePos({
                x: e.clientX,
                y: e.clientY
            })
        }
        if (allModalsAreClose && deviceSize === 2)
            window.addEventListener('mousemove', handleMousePosition)
        else
            window.removeEventListener('mousemove', handleMousePosition)
        return () => window.removeEventListener('mousemove', handleMousePosition)
    }, [allModalsAreClose, deviceSize])

    useFrame((state) => {
        cursorPos.axeX = deviceSize === 2 ? (mousePos.x - window.innerWidth / 2) / (window.innerWidth / 2) : 0;
        cursorPos.axeY = deviceSize === 2 ? (mousePos.y - window.innerHeight / 2) / (window.innerHeight / 2) : 0;
        const t = state.clock.getElapsedTime();
        myMesh.current.rotation.y = cursorPos.axeX / 1.5 + Math.sin(t / 4) / 8;
        myMesh.current.rotation.x = 90 + cursorPos.axeY / 1.5 - Math.PI / 1.75 + Math.cos(t / 4) / 8;
        myMesh.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
        myMesh.current.position.y = 0.5 + (1 + Math.sin(t / 1.5)) / 10;
    });

    return (
        <group>
            <mesh ref={myMesh}>
                {deviceSize === 2 ?
                    <Texture
                        attach="material"
                        mouseOnOneButton={mouseOnOneButton}
                    /> :
                    <meshStandardMaterial
                        attach="material"
                        color={new THREE.Color(new THREE.Color('hsl(356, 75%, 30%)'))}
                        metalness={0.5}
                        roughness={0}
                    />
                }
                <Model />
            </mesh>
        </group>
    );
}
