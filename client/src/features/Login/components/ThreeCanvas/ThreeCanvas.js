import { Suspense } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Logo from "./Logo/Logo";

export default function CanvasLogo({ mouseOnButton, mousePos, deviceSize }) {

    return (
        <Canvas className="login-canvas-logo" camera={{ position: [0, 0, 2] }}>
            <Suspense fallback={null}>
                <Logo
                    mousePos={mousePos}
                    mouseOnButton={mouseOnButton}
                    deviceSize={deviceSize}
                />
                <ContactShadows
                    position={[0, -0.8, 0]}
                    opacity={0.85}
                    width={10}
                    height={10}
                    blur={1.5}
                    far={2}
                />
                <Environment files="three/warehouse.hdr" />
            </Suspense>
        </Canvas>
    );
}
