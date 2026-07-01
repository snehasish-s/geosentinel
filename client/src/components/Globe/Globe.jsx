import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const EarthTexture = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg';
const NormalTexture = 'https://unpkg.com/three-globe@2.31.0/example/img/earth-normal.jpg';

const StarField = () => {
  const points = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const Earth = ({ alerts = [] }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  const earthTexture = useTexture(EarthTexture);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const alertPositions = useMemo(() => {
    return alerts.map(alert => {
      const lat = alert.coordinates?.lat || 20 + Math.random() * 10;
      const lng = alert.coordinates?.lng || 80 + Math.random() * 10;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const radius = 1.02;
      return {
        x: -radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
        alert
      };
    });
  }, [alerts]);

  return (
    <group ref={meshRef}>
      <Sphere args={[1, 64, 64]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.2}
          emissive={hovered ? '#00E5FF' : '#000000'}
          emissiveIntensity={0.05}
        />
      </Sphere>

      {alertPositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshBasicMaterial color={pos.alert.severity === 'Critical' ? '#FF4136' : '#FF6B6B'} />
          <Html distanceFactor={10}>
            <div className="bg-space-navy/90 px-2 py-1 rounded text-xs whitespace-nowrap border border-space-cyan/20">
              <div className="font-semibold text-space-cyan">{pos.alert.district}</div>
              <div className="text-space-alert">{pos.alert.alertType}</div>
            </div>
          </Html>
        </mesh>
      ))}

      {alertPositions.map((pos, i) => (
        <mesh key={`pulse-${i}`} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color={pos.alert.severity === 'Critical' ? '#FF4136' : '#FF6B6B'} transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const Globe = ({ alerts = [] }) => {
  return (
    <div className="w-full h-full relative">
      <div className="scanline" />
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00E5FF" />
        <StarField />
        <Earth alerts={alerts} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Globe;