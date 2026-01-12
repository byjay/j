import React, { useMemo } from 'react';
import { Text3D, Center, Float, QuadraticBezierLine } from '@react-three/drei';
import { Color } from 'three';
import { FontURL } from './AssetManager';

interface Balloon3DProps {
    text: string;
    position: [number, number, number];
    color: string;
}

export const Balloon3D: React.FC<Balloon3DProps> = ({ text, position, color }) => {
    const stringCurve = useMemo(() => {
        const endPoint = [
            (Math.random() - 0.5) * 0.5, 
            -2.5 - Math.random(), 
            (Math.random() - 0.5) * 0.5
        ] as [number, number, number];
        const midPoint = [
            (Math.random() - 0.5) * 0.2, 
            -1.2, 
            (Math.random() - 0.5) * 0.2
        ] as [number, number, number];
        return { start: [0, -1.05, 0] as [number, number, number], mid: midPoint, end: endPoint };
    }, []);

    const balloonColor = new Color(color);
    const knotColor = balloonColor.clone().multiplyScalar(0.8); 

    return (
        <Float 
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.8}
            floatingRange={[-0.2, 0.2]}
        >
            <group position={position}>
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshPhysicalMaterial 
                        color={color}
                        roughness={0.15}
                        metalness={0.1}
                        clearcoat={1.0}
                        clearcoatRoughness={0.1}
                        transparent
                        opacity={0.95}
                        side={2}
                    />
                </mesh>

                <mesh position={[0, -1.05, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.15, 0.15, 32]} />
                    <meshStandardMaterial color={knotColor} />
                </mesh>

                <QuadraticBezierLine
                    start={stringCurve.start}
                    mid={stringCurve.mid}
                    end={stringCurve.end}
                    color="white"
                    lineWidth={1.5}
                    transparent
                    opacity={0.6}
                />

                <group position={[0, 0.1, 0.85]} rotation={[-0.1, 0, 0]}>
                    <Center>
                        <Text3D
                            font={FontURL}
                            size={0.6}
                            height={0.1}
                            curveSegments={12}
                            bevelEnabled
                            bevelThickness={0.02}
                            bevelSize={0.01}
                            bevelOffset={0}
                            bevelSegments={5}
                        >
                            {text}
                            <meshStandardMaterial color="white" toneMapped={false} />
                        </Text3D>
                    </Center>
                </group>
            </group>
        </Float>
    );
};
