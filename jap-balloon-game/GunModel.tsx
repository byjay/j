import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';

export const GunModel = ({ isShooting }: { isShooting: boolean }) => {
    const gunRef = useRef<any>();

    useFrame((state) => {
        if (!gunRef.current) return;

        // Recoil Animation
        if (isShooting) {
            gunRef.current.position.z = 0.5; // Kick back
            gunRef.current.rotation.x = 0.1; // Muzzle climb
        } else {
            // Return to rest (Interpolation)
            gunRef.current.position.z = Math.max(gunRef.current.position.z - 0.1, 0);
            gunRef.current.rotation.x = Math.max(gunRef.current.rotation.x - 0.02, 0);

            // Idle sway breathing effect
            gunRef.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
            gunRef.current.position.x = 2 + Math.cos(state.clock.elapsedTime) * 0.05;
        }
    });

    return (
        <group ref={gunRef} position={[2, -2, 0]}> {/* Bottom Right */}
            {/* Gun Body */}
            <Box args={[0.5, 0.8, 3]} position={[0, 0, 1]}>
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.8} />
            </Box>
            {/* Handle */}
            <Box args={[0.4, 1.5, 0.5]} position={[0, -0.8, 2]} rotation={[0.2, 0, 0]}>
                <meshStandardMaterial color="#222" />
            </Box>
            {/* Barrel */}
            <Cylinder args={[0.1, 0.1, 3]} position={[0, 0.3, -1]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#111" />
            </Cylinder>
            {/* Scope */}
            <Cylinder args={[0.15, 0.15, 1]} position={[0, 0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial color="#555" />
            </Cylinder>

            {/* Muzzle Flash (Visible only when shooting) */}
            {isShooting && (
                <pointLight position={[0, 0.3, -3]} intensity={10} color="#ffaa00" distance={5} />
            )}
        </group>
    );
};
