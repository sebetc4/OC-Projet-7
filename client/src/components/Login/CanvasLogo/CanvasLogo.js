import { Suspense } from "react";
import { Environment, OrbitControls, ContactShadows, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Logo from "./Logo/Logo";

export default function CanvasLogo(props) {

    return (
        <Canvas className="login-canvas-logo" camera={{ position: [0, 0, 2] }}>
            <Suspense fallback={null}>
                <Stats />
                <Logo mousePos={props.mousePos} mouseOnButton={props.mouseOnButton} />
                <ContactShadows position={[0, -0.8, 0]} opacity={0.85} width={10} height={10} blur={1.5} far={2} />
                {/* <OrbitControls /> */}
                <Environment files="three/warehouse.hdr" />
            </Suspense>
        </Canvas>
    );
}
