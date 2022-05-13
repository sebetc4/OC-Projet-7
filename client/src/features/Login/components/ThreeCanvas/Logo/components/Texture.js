import * as THREE from "three";
import { useState, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring as useSpringThree } from '@react-spring/three'


export default function Texture({mouseOnOneButton}) {

    const [indexColor, setIndexColor] = useState(0)

    // Load the noise textures
    const heightMap = useTexture("./three/noise.jpg");
    const displacementMap = useTexture("./three/noise3D.jpg");
    heightMap.minFilter = displacementMap.minFilter = THREE.NearestFilter;
    displacementMap.wrapS = displacementMap.wrapT = THREE.RepeatWrapping;

    const options = [
      [356, 75, 57],
      [240, 70, 60],
    ]

    useEffect(() => {
      if (mouseOnOneButton)
        setIndexColor(1)
      else
        setIndexColor(0)
    }, [mouseOnOneButton])

    const { timeOffset } = useSpringThree({
      hsl: options[indexColor],
      timeOffset: indexColor * 0.2,
      config: { tension: 50 },
      onChange: ({ value: { hsl } }) => {
        const [h, s, l] = hsl
        uniforms.colorB.value.setHSL(h / 360, s / 100, l / 100)
      },
    })

    // Create persistent local uniforms object
    const [uniforms] = useState(() => ({
        time: { value: 0 },
        colorA: { value: new THREE.Color(0, 0, 0) },
        colorB: { value: new THREE.Color('hsl(356, 75%, 57%)') },
        heightMap: { value: heightMap },
        displacementMap: { value: displacementMap },
        iterations: { value: 48 },
        depth: { value: 0.6 },
        smoothing: { value: 0.2 },
        displacement: { value: 0.1 },
    }));

    // Update time uniform on each frame
    useFrame(({ clock }) => {
      uniforms.time.value = timeOffset.get() + clock.elapsedTime * 0.05
    });

    // Add our custom bits to the MeshStandardMaterial
    const onBeforeCompile = (shader) => {
        // Wire up local uniform references
        shader.uniforms = { ...shader.uniforms, ...uniforms };

        // Add to top of vertex shader
        shader.vertexShader =
            /* glsl */ `
      varying vec3 v_pos;
      varying vec3 v_dir;
    ` + shader.vertexShader;

        // Assign values to varyings inside of main()
        shader.vertexShader = shader.vertexShader.replace(
            /void main\(\) {/,
            (match) =>
                match +
                /* glsl */ `
        v_dir = position - cameraPosition; // Points from camera to vertex
        v_pos = position;
        `
        );

        // Add to top of fragment shader
        shader.fragmentShader =
            /* glsl */ `
      #define FLIP vec2(1., -1.)
      
      uniform vec3 colorA;
      uniform vec3 colorB;
      uniform sampler2D heightMap;
      uniform sampler2D displacementMap;
      uniform int iterations;
      uniform float depth;
      uniform float smoothing;
      uniform float displacement;
      uniform float time;
      
      varying vec3 v_pos;
      varying vec3 v_dir;
    ` + shader.fragmentShader;

        // Add above fragment shader main() so we can access common.glsl.js
        shader.fragmentShader = shader.fragmentShader.replace(
            /void main\(\) {/,
            (match) =>
                /* glsl */ `
       	/**
         * @param p - Point to displace
         * @param strength - How much the map can displace the point
         * @returns Point with scrolling displacement applied
         */
        vec3 displacePoint(vec3 p, float strength) {
        	vec2 uv = equirectUv(normalize(p));
          vec2 scroll = vec2(time, 0.);
          vec3 displacementA = texture(displacementMap, uv + scroll).rgb; // Upright
					vec3 displacementB = texture(displacementMap, uv * FLIP - scroll).rgb; // Upside down
          
          // Center the range to [-0.5, 0.5], note the range of their sum is [-1, 1]
          displacementA -= 0.5;
          displacementB -= 0.5;
          
          return p + strength * (displacementA + displacementB);
        }
        
				/**
          * @param rayOrigin - Point on sphere
          * @param rayDir - Normalized ray direction
          * @returns Diffuse RGB color
          */
        vec3 marchMarble(vec3 rayOrigin, vec3 rayDir) {
          float perIteration = 1. / float(iterations);
          vec3 deltaRay = rayDir * perIteration * depth;

          // Start at point of intersection and accumulate volume
          vec3 p = rayOrigin;
          float totalVolume = 0.;

          for (int i=0; i<iterations; ++i) {
            // Read heightmap from spherical direction of displaced ray position
            vec3 displaced = displacePoint(p, displacement);
            vec2 uv = equirectUv(normalize(displaced));
            float heightMapVal = texture(heightMap, uv).r;

            // Take a slice of the heightmap
            float height = length(p); // 1 at surface, 0 at core, assuming radius = 1
            float cutoff = 1. - float(i) * perIteration;
            float slice = smoothstep(cutoff, cutoff + smoothing, heightMapVal);

            // Accumulate the volume and advance the ray forward one step
            totalVolume += slice * perIteration;
            p += deltaRay;
          }
          return mix(colorA, colorB, totalVolume);
        }
      ` + match
        );

        shader.fragmentShader = shader.fragmentShader.replace(
            /vec4 diffuseColor.*;/,
            /* glsl */ `
      vec3 rayDir = normalize(v_dir);
      vec3 rayOrigin = v_pos;
      
      vec3 rgb = marchMarble(rayOrigin, rayDir);
      vec4 diffuseColor = vec4(rgb, 1.);      
      `
        );
    };

    return (
        <meshStandardMaterial
            roughness={0.1}
            onBeforeCompile={onBeforeCompile}
            onUpdate={(m) => (m.needsUpdate = true)}
            customProgramCacheKey={() => onBeforeCompile.toString()}
        />
    );
}
