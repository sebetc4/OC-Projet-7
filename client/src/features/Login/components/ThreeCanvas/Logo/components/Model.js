import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

export default function Model() {
    const obj = useLoader(OBJLoader, "./three/logo.obj");
    const geometry = obj.children[0].geometry;
    return <bufferGeometry attach="geometry" {...geometry} />;
}
