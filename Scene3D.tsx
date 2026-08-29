import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SectionId, PerformanceMode } from '../../types';
import { cameraWaypoints } from '../../data/portfolioData';
import { getParticleCountForMode } from '../../utils/performance';

interface Scene3DProps {
  activeSection: SectionId;
  scrollProgress: number; // 0 to 1 across the whole document
  mousePos: { x: number; y: number }; // normalized -1 to 1
  performanceMode: PerformanceMode;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  activeSection,
  scrollProgress,
  mousePos,
  performanceMode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const holoMeshGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);

  // Particle positions & targets buffers
  const particleCount = getParticleCountForMode(performanceMode);
  const currentPositionsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const targetPositionsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));
  const colorsRef = useRef<Float32Array>(new Float32Array(particleCount * 3));

  // Current camera interpolated values
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const currentTargetPos = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Precompute morphing shapes
  const generateShapePositions = (shape: string, count: number): Float32Array => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);

      if (shape === 'constellation') {
        // Broad neural cloud
        const r = 3.5 + Math.random() * 3.0;
        positions[idx] = r * Math.sin(phi) * Math.cos(theta);
        positions[idx + 1] = (r * Math.sin(phi) * Math.sin(theta)) * 0.7;
        positions[idx + 2] = r * Math.cos(phi);
      } else if (shape === 'prism') {
        // Octahedron data crystal & rings
        if (i < count * 0.6) {
          const t = Math.random() * Math.PI * 2;
          const h = (Math.random() - 0.5) * 4;
          const rad = (2.2 - Math.abs(h) * 0.9) * (0.8 + Math.random() * 0.4);
          positions[idx] = Math.cos(t) * rad;
          positions[idx + 1] = h;
          positions[idx + 2] = Math.sin(t) * rad;
        } else {
          // Orbit ring
          const t = Math.random() * Math.PI * 2;
          const rad = 3.8 + Math.random() * 0.8;
          positions[idx] = Math.cos(t) * rad;
          positions[idx + 1] = Math.sin(t * 2) * 0.4;
          positions[idx + 2] = Math.sin(t) * rad;
        }
      } else if (shape === 'barchart') {
        // 3D Bar chart matrix (Power BI theme)
        const barIndex = i % 12; // 12 columns
        const row = Math.floor(barIndex / 4);
        const col = barIndex % 4;
        const barHeight = 1.2 + ((row * 4 + col) % 5) * 0.7;
        
        const px = (col - 1.5) * 1.4 + (Math.random() - 0.5) * 0.6;
        const py = -1.8 + Math.random() * barHeight;
        const pz = (row - 1) * 1.4 + (Math.random() - 0.5) * 0.6;
        positions[idx] = px;
        positions[idx + 1] = py;
        positions[idx + 2] = pz;
      } else if (shape === 'timeline') {
        // Double helix / temporal timeline flow
        const t = (i / count) * Math.PI * 8;
        const strand = i % 2 === 0 ? 1 : -1;
        const r = 2.2 + Math.sin(t * 0.5) * 0.6;
        positions[idx] = Math.cos(t) * r * strand;
        positions[idx + 1] = ((i / count) - 0.5) * 6.5;
        positions[idx + 2] = Math.sin(t) * r;
      } else if (shape === 'grid') {
        // 3D Bounding grid / hypercube
        const side = Math.cbrt(count);
        const ix = (i % side) / side;
        const iy = (Math.floor(i / side) % side) / side;
        const iz = Math.floor(i / (side * side)) / side;
        positions[idx] = (ix - 0.5) * 5.5;
        positions[idx + 1] = (iy - 0.5) * 4.5;
        positions[idx + 2] = (iz - 0.5) * 4.5;
      } else if (shape === 'orbit') {
        // Concentric gyroscope rings
        const ring = i % 3;
        const t = Math.random() * Math.PI * 2;
        const rad = 2.0 + ring * 1.1;
        if (ring === 0) {
          positions[idx] = Math.cos(t) * rad;
          positions[idx + 1] = Math.sin(t) * rad;
          positions[idx + 2] = (Math.random() - 0.5) * 0.4;
        } else if (ring === 1) {
          positions[idx] = Math.cos(t) * rad;
          positions[idx + 1] = (Math.random() - 0.5) * 0.4;
          positions[idx + 2] = Math.sin(t) * rad;
        } else {
          positions[idx] = (Math.random() - 0.5) * 0.4;
          positions[idx + 1] = Math.cos(t) * rad;
          positions[idx + 2] = Math.sin(t) * rad;
        }
      } else if (shape === 'vortex') {
        // Coalescing vortex / attractor sphere
        const t = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.5) * 3.8;
        const spiral = r * 1.5;
        positions[idx] = Math.cos(t + spiral) * r;
        positions[idx + 1] = (Math.random() - 0.5) * 2.5 * (1 - r / 4);
        positions[idx + 2] = Math.sin(t + spiral) * r;
      }
    }
    return positions;
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050711, 0.045);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: performanceMode !== 'lite',
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, performanceMode === 'ultra' ? 2 : 1.5));
    renderer.setClearColor(0x05060a, 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 25);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 25);
    pointLight2.position.set(-5, -5, 2);
    scene.add(pointLight2);

    // Initial Particle Buffers
    const initialPos = generateShapePositions('constellation', particleCount);
    currentPositionsRef.current = new Float32Array(initialPos);
    targetPositionsRef.current = new Float32Array(initialPos);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositionsRef.current, 3));

    // Dynamic Colors (Electric Blue, Cyan, Indigo, Violet)
    const colorArray = new Float32Array(particleCount * 3);
    const colorChoices = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#818cf8'), // Indigo
      new THREE.Color('#06b6d4'), // Light Teal
      new THREE.Color('#a855f7'), // Purple
      new THREE.Color('#34d399')  // Emerald
    ];

    for (let i = 0; i < particleCount; i++) {
      const col = colorChoices[i % colorChoices.length];
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }
    colorsRef.current = colorArray;
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Custom circular glowing particle texture via Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.85)');
      grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: performanceMode === 'ultra' ? 0.12 : 0.14,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Optional Holographic Wireframe Core Group
    const holoGroup = new THREE.Group();
    
    // Core Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.18
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    holoGroup.add(icoMesh);

    // Glowing Torus Ring
    const torusGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.rotation.x = Math.PI / 3;
    holoGroup.add(torusMesh);

    scene.add(holoGroup);
    holoMeshGroupRef.current = holoGroup;

    // Dynamic Connecting Lines for Constellation mode
    if (performanceMode === 'ultra') {
      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array(300 * 2 * 3); // 300 lines max
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
      });
      const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSegments);
      linesRef.current = lineSegments;
    }

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth || window.innerWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
      }
    };
  }, [performanceMode, particleCount]);

  // Update target particle positions whenever activeSection changes
  useEffect(() => {
    const waypoint = cameraWaypoints.find((w) => w.id === activeSection) || cameraWaypoints[0];
    const newTarget = generateShapePositions(waypoint.particleForm, particleCount);
    targetPositionsRef.current = newTarget;
  }, [activeSection, particleCount]);

  // Animation & Camera Choreography Render Loop
  useEffect(() => {
    let clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // 1. Waypoint interpolation for camera
      const currentWp = cameraWaypoints.find((w) => w.id === activeSection) || cameraWaypoints[0];
      
      // Calculate target camera position with mouse parallax
      const parallaxFactor = activeSection === 'hero' || activeSection === 'contact' ? 0.8 : 0.35;
      const targetX = currentWp.position[0] + mousePos.x * parallaxFactor;
      const targetY = currentWp.position[1] + mousePos.y * parallaxFactor;
      const targetZ = currentWp.position[2];

      currentCamPos.current.x += (targetX - currentCamPos.current.x) * 0.05;
      currentCamPos.current.y += (targetY - currentCamPos.current.y) * 0.05;
      currentCamPos.current.z += (targetZ - currentCamPos.current.z) * 0.05;

      const lookTargetX = currentWp.target[0] + mousePos.x * 0.2;
      const lookTargetY = currentWp.target[1] + mousePos.y * 0.2;
      const lookTargetZ = currentWp.target[2];

      currentTargetPos.current.x += (lookTargetX - currentTargetPos.current.x) * 0.05;
      currentTargetPos.current.y += (lookTargetY - currentTargetPos.current.y) * 0.05;
      currentTargetPos.current.z += (lookTargetZ - currentTargetPos.current.z) * 0.05;

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
        cameraRef.current.lookAt(currentTargetPos.current);
        // Subtle dynamic FOV adjustment based on scroll speed
        cameraRef.current.fov = currentWp.fov;
        cameraRef.current.updateProjectionMatrix();
      }

      // 2. Morph particle coordinates smoothly towards targetPositions
      const currentPos = currentPositionsRef.current;
      const targetPos = targetPositionsRef.current;
      const morphSpeed = 0.06;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Float drift
        const noise = Math.sin(elapsed * 1.5 + i * 0.1) * 0.008;

        currentPos[idx] += (targetPos[idx] - currentPos[idx]) * morphSpeed + noise;
        currentPos[idx + 1] += (targetPos[idx + 1] - currentPos[idx + 1]) * morphSpeed + noise;
        currentPos[idx + 2] += (targetPos[idx + 2] - currentPos[idx + 2]) * morphSpeed;
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
        // Subtle global rotation
        particlesRef.current.rotation.y = elapsed * 0.08 + scrollProgress * Math.PI;
        particlesRef.current.rotation.x = Math.sin(elapsed * 0.05) * 0.1;
      }

      // 3. Animate Holographic Group
      if (holoMeshGroupRef.current) {
        holoMeshGroupRef.current.rotation.x = elapsed * 0.15;
        holoMeshGroupRef.current.rotation.y = elapsed * 0.25;
        holoMeshGroupRef.current.position.y = Math.sin(elapsed * 0.8) * 0.2;
        
        // Scale holographic mesh based on section
        const targetScale = activeSection === 'skills' || activeSection === 'about' ? 1.2 : 0.85;
        holoMeshGroupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
      }

      // 4. Update Connecting Lines in Ultra Mode for constellation/network feel
      if (linesRef.current && performanceMode === 'ultra') {
        const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
        const lineArray = linePosAttr.array as Float32Array;
        let lineIdx = 0;
        const maxDistSq = 1.6 * 1.6;
        const maxLines = 150;
        let count = 0;

        // Sample every few particles to keep 60fps
        const step = Math.max(1, Math.floor(particleCount / 80));
        for (let i = 0; i < particleCount && count < maxLines; i += step) {
          const i3 = i * 3;
          for (let j = i + step; j < particleCount && count < maxLines; j += step) {
            const j3 = j * 3;
            const dx = currentPos[i3] - currentPos[j3];
            const dy = currentPos[i3 + 1] - currentPos[j3 + 1];
            const dz = currentPos[i3 + 2] - currentPos[j3 + 2];
            const distSq = dx * dx + dy * dy + dz * dz;

            if (distSq < maxDistSq) {
              lineArray[lineIdx++] = currentPos[i3];
              lineArray[lineIdx++] = currentPos[i3 + 1];
              lineArray[lineIdx++] = currentPos[i3 + 2];
              lineArray[lineIdx++] = currentPos[j3];
              lineArray[lineIdx++] = currentPos[j3 + 1];
              lineArray[lineIdx++] = currentPos[j3 + 2];
              count++;
            }
          }
        }
        // Fill remaining with 0
        while (lineIdx < lineArray.length) {
          lineArray[lineIdx++] = 0;
        }
        linePosAttr.needsUpdate = true;
      }

      // 5. Render Scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    frameIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
    };
  }, [activeSection, mousePos, performanceMode, particleCount, scrollProgress]);

  return (
    <div 
      ref={containerRef}
      id="canvas-3d-container"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full overflow-hidden"
      aria-hidden="true"
    />
  );
};
