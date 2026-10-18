import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { 
  RotateCw, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Layers, 
  ShieldCheck, 
  Eye, 
  ChevronRight,
  Maximize2,
  RefreshCw,
  Compass
} from 'lucide-react';
import { formatPrice } from '../data/storage';

// 4 Titanium Finishes (matching Apple Pro lineup)
const TITANIUM_FINISHES = [
  {
    id: 'natural',
    name: 'Tabiiy titan',
    colorHex: '#92989c',
    cameraHex: '#777d81',
    edgeHex: '#b8c0c5',
    colorInt: 0x92989c,
    cameraColorInt: 0x777d81,
    edgeColorInt: 0xb8c0c5,
    tagline: '5-darajali toza aerokosmik titan',
    accentGrad: 'linear-gradient(135deg, #b8c0c5, #777d81)'
  },
  {
    id: 'black',
    name: 'Qora titan',
    colorHex: '#2c2d30',
    cameraHex: '#1e1f21',
    edgeHex: '#525458',
    colorInt: 0x2c2d30,
    cameraColorInt: 0x1e1f21,
    edgeColorInt: 0x525458,
    tagline: 'Space Obsidian DLC ultra-qora sayqal',
    accentGrad: 'linear-gradient(135deg, #525458, #1c1d1f)'
  },
  {
    id: 'white',
    name: 'Oq titan',
    colorHex: '#e3e4e6',
    cameraHex: '#cacccd',
    edgeHex: '#f0f1f3',
    colorInt: 0xe3e4e6,
    cameraColorInt: 0xcacccd,
    edgeColorInt: 0xf0f1f3,
    tagline: 'Yaltiroq safir va platina oq keramika',
    accentGrad: 'linear-gradient(135deg, #ffffff, #cacccd)'
  },
  {
    id: 'desert',
    name: 'Cho‘l titani',
    colorHex: '#b9a992',
    cameraHex: '#93836f',
    edgeHex: '#d1c7b4',
    colorInt: 0xb9a992,
    cameraColorInt: 0x93836f,
    edgeColorInt: 0xd1c7b4,
    tagline: 'Issiq mineral zarralari bilan boyitilgan titan',
    accentGrad: 'linear-gradient(135deg, #d1c7b4, #93836f)'
  }
];

const STORAGE_OPTIONS = [
  { size: '256GB', priceUSD: 1450 },
  { size: '512GB', priceUSD: 1650, popular: true },
  { size: '1TB', priceUSD: 1850 }
];

// Helper to generate dynamic iOS screen wallpaper texture
function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  // Deep dark titanium wallpaper background
  const bgGrad = ctx.createLinearGradient(0, 0, 512, 1024);
  bgGrad.addColorStop(0, '#0a0d14');
  bgGrad.addColorStop(0.35, '#1e2836');
  bgGrad.addColorStop(0.7, '#101722');
  bgGrad.addColorStop(1, '#05070a');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 512, 1024);

  // Dynamic light bloom ellipse
  ctx.save();
  ctx.translate(256, 480);
  ctx.rotate(-0.45);
  const bloomGrad = ctx.createRadialGradient(0, -30, 20, 0, 0, 320);
  bloomGrad.addColorStop(0, 'rgba(180, 215, 240, 0.85)');
  bloomGrad.addColorStop(0.25, 'rgba(100, 145, 180, 0.55)');
  bloomGrad.addColorStop(0.6, 'rgba(30, 50, 70, 0.25)');
  bloomGrad.addColorStop(1, 'rgba(10, 15, 25, 0)');
  ctx.fillStyle = bloomGrad;
  ctx.beginPath();
  ctx.ellipse(0, 0, 175, 360, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // iOS Lockscreen Clock: 09:41
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  ctx.fillText('Shanba, 10-Oktyabr', 256, 170);

  ctx.font = '700 96px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  ctx.fillText('09:41', 256, 265);

  // Bottom flash & camera icons hint
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.arc(90, 930, 26, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(422, 930, 26, 0, Math.PI * 2);
  ctx.fill();

  // Home bar pill
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(176, 995, 160, 5, 3);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ThreeDPhoneStudio = ({
  currency,
  onAddToCart,
  onFastBuy,
  t
}) => {
  const mountRef = useRef(null);
  const studioT = t?.studio || {};
  const [selectedFinish, setSelectedFinish] = useState(TITANIUM_FINISHES[0]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[1]);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [webglError, setWebglError] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  // Refs for 3D state
  const sceneRef = useRef(null);
  const phoneGroupRef = useRef(null);
  const realModelRef = useRef(null);
  const bodyMaterialRef = useRef(null);
  const cameraBumpMatRef = useRef(null);
  const edgeMaterialRef = useRef(null);
  const rotationStateRef = useRef({ rotY: 0, rotX: 0, targetY: 0, targetX: 0, isAuto: true });

  // Update auto rotate ref
  useEffect(() => {
    rotationStateRef.current.isAuto = isAutoRotate;
  }, [isAutoRotate]);

  // Update Three.js materials when color changes
  useEffect(() => {
    if (bodyMaterialRef.current && cameraBumpMatRef.current && edgeMaterialRef.current) {
      bodyMaterialRef.current.color.setHex(selectedFinish.colorInt);
      cameraBumpMatRef.current.color.setHex(selectedFinish.cameraColorInt);
      edgeMaterialRef.current.color.setHex(selectedFinish.edgeColorInt);
    }

    if (realModelRef.current) {
      const tintNodes = new Set([
        'ttmRoLdJipiIOmf',   // outer titanium frame band
        'DjsDkGiopeiEJZK',   // frame bezel
        'buRWvyqhBBgcJFo',   // back matte glass
        'MrMmlCAsAxJpYqQ_0', // camera plateau island
        'TakBsdEjEytCAMK',   // titanium frame accent
        'IykfmVvLplTsTEW',   // titanium frame accent
        'CdalkzDVnwgdEhS'    // side buttons
      ]);

      const isNatural = selectedFinish.id === 'natural';
      const col = isNatural ? new THREE.Color(0xffffff) : new THREE.Color(selectedFinish.colorHex);

      realModelRef.current.traverse((child) => {
        if (child.isMesh && child.material && tintNodes.has(child.name)) {
          if (!child.userData.originalMat) {
            child.userData.originalMat = child.material;
            child.material = child.material.clone();
          }
          child.material.color = col;
          child.material.needsUpdate = true;
        }
      });
    }
  }, [selectedFinish]);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn("WebGL not supported:", e);
      setWebglError(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.cursor = 'grab';
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      32,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.4);

    const phoneGroup = new THREE.Group();
    phoneGroupRef.current = phoneGroup;
    scene.add(phoneGroup);

    // Studio Lighting setup
    const hemiLight = new THREE.HemisphereLight(0xdde9ff, 0x12161d, 2.3);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xe5f2ff, 4.2);
    keyLight.position.set(-4, 5, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x73beff, 3.2);
    rimLight.position.set(4, 1, -5);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0xffe8cd, 1.8);
    bottomFill.position.set(4, -3, 4);
    scene.add(bottomFill);

    // Procedural Fallback Mesh Group
    const proceduralGroup = new THREE.Group();
    phoneGroup.add(proceduralGroup);

    // Titanium Chassis Materials
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: selectedFinish.colorInt,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15
    });
    bodyMaterialRef.current = bodyMaterial;

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: selectedFinish.edgeColorInt,
      metalness: 0.9,
      roughness: 0.25
    });
    edgeMaterialRef.current = edgeMaterial;

    const cameraBumpMat = new THREE.MeshPhysicalMaterial({
      color: selectedFinish.cameraColorInt,
      metalness: 0.82,
      roughness: 0.28,
      clearcoat: 0.6
    });
    cameraBumpMatRef.current = cameraBumpMat;

    // Build Rounded Extruded Chassis Geometry for procedural fallback
    const shape = new THREE.Shape();
    const W = 1.78;
    const H = 3.65;
    const radius = 0.27;

    shape.moveTo(-W / 2 + radius, -H / 2);
    shape.lineTo(W / 2 - radius, -H / 2);
    shape.quadraticCurveTo(W / 2, -H / 2, W / 2, -H / 2 + radius);
    shape.lineTo(W / 2, H / 2 - radius);
    shape.quadraticCurveTo(W / 2, H / 2, W / 2 - radius, H / 2);
    shape.lineTo(-W / 2 + radius, H / 2);
    shape.quadraticCurveTo(-W / 2, H / 2, -W / 2, H / 2 - radius);
    shape.lineTo(-W / 2, -H / 2 + radius);
    shape.quadraticCurveTo(-W / 2, -H / 2, -W / 2 + radius, -H / 2);

    const extrudeSettings = {
      depth: 0.17,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
      curveSegments: 12
    };

    const chassisGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const chassisMesh = new THREE.Mesh(chassisGeo, bodyMaterial);
    chassisMesh.position.z = -0.085;
    proceduralGroup.add(chassisMesh);

    // Front Ceramic Shield Black Bezel
    const frontBezelGeo = new THREE.BoxGeometry(1.67, 3.53, 0.025);
    const frontBezelMat = new THREE.MeshPhysicalMaterial({
      color: 0x060608,
      metalness: 0.1,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03
    });
    const frontBezel = new THREE.Mesh(frontBezelGeo, frontBezelMat);
    frontBezel.position.set(0, 0, 0.105);
    proceduralGroup.add(frontBezel);

    // Dynamic Island Pill
    const islandGeo = new THREE.CapsuleGeometry(0.095, 0.28, 6, 16);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x010102 });
    const dynamicIsland = new THREE.Mesh(islandGeo, islandMat);
    dynamicIsland.rotation.z = Math.PI / 2;
    dynamicIsland.position.set(0, 1.59, 0.126);
    proceduralGroup.add(dynamicIsland);

    // Screen Wallpaper Display Plane
    const screenGeo = new THREE.PlaneGeometry(1.58, 3.34);
    const screenTexture = createScreenTexture();
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: 0.98
    });
    const screenPlane = new THREE.Mesh(screenGeo, screenMat);
    screenPlane.position.set(0, -0.03, 0.121);
    proceduralGroup.add(screenPlane);

    // Back Camera Plateau Bump
    const cameraBumpGeo = new THREE.BoxGeometry(0.82, 0.91, 0.075);
    const cameraBump = new THREE.Mesh(cameraBumpGeo, cameraBumpMat);
    cameraBump.position.set(-0.39, 1.28, -0.145);
    proceduralGroup.add(cameraBump);

    // 3 Camera Lenses with Metallic Bezel Rings & Sapphire Glass
    const lensRingMat = new THREE.MeshStandardMaterial({
      color: 0xb8b8be,
      metalness: 0.92,
      roughness: 0.2
    });
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      metalness: 0.45,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02
    });

    const lensPositions = [
      [-0.59, 1.51],
      [-0.19, 1.51],
      [-0.59, 1.08]
    ];

    lensPositions.forEach(([lx, ly]) => {
      const ringGeo = new THREE.CylinderGeometry(0.158, 0.158, 0.055, 32);
      const ringMesh = new THREE.Mesh(ringGeo, lensRingMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(lx, ly, -0.2);
      proceduralGroup.add(ringMesh);

      const innerLensGeo = new THREE.CylinderGeometry(0.123, 0.123, 0.06, 32);
      const innerLensMesh = new THREE.Mesh(innerLensGeo, lensGlassMat);
      innerLensMesh.rotation.x = Math.PI / 2;
      innerLensMesh.position.set(lx, ly, -0.24);
      proceduralGroup.add(innerLensMesh);

      const reflexGeo = new THREE.CircleGeometry(0.035, 16);
      const reflexMat = new THREE.MeshBasicMaterial({ color: 0x9be8ff });
      const reflexMesh = new THREE.Mesh(reflexGeo, reflexMat);
      reflexMesh.position.set(lx - 0.038, ly + 0.04, -0.274);
      proceduralGroup.add(reflexMesh);
    });

    // Flash & LiDAR Sensor
    const flashGeo = new THREE.CircleGeometry(0.055, 20);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xe9ecef });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(-0.19, 1.1, -0.19);
    proceduralGroup.add(flashMesh);

    const lidarGeo = new THREE.CircleGeometry(0.045, 20);
    const lidarMat = new THREE.MeshBasicMaterial({ color: 0x303035 });
    const lidarMesh = new THREE.Mesh(lidarGeo, lidarMat);
    lidarMesh.position.set(-0.19, 1.32, -0.19);
    proceduralGroup.add(lidarMesh);

    // Power and Volume Action Buttons
    const powerButtonGeo = new THREE.BoxGeometry(0.055, 0.53, 0.105);
    const powerButton = new THREE.Mesh(powerButtonGeo, edgeMaterial);
    powerButton.position.set(0.91, 0.67, 0);
    proceduralGroup.add(powerButton);

    const volButtonGeo = new THREE.BoxGeometry(0.055, 0.32, 0.105);
    const volButton = new THREE.Mesh(volButtonGeo, edgeMaterial);
    volButton.position.set(-0.91, 0.79, 0);
    proceduralGroup.add(volButton);

    // --- AUTHENTIC 3D IPHONE MODEL (GLTF/GLB with DRACO) ---
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/gltf/');
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        '/models/scene.glb',
        (gltf) => {
          const model = gltf.scene;
          realModelRef.current = model;

          // Scale and center bounding box with mathematical precision
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const targetHeight = 3.8;
          const scale = targetHeight / (size.y || 1);
          model.scale.setScalar(scale);

          const scaledBox = new THREE.Box3().setFromObject(model);
          const center = scaledBox.getCenter(new THREE.Vector3());
          model.position.sub(center);

          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              if (child.material) {
                child.material.metalness = Math.max(child.material.metalness || 0, 0.88);
                child.material.roughness = 0.22;
                child.material.envMapIntensity = 2.0;
              }
            }
          });

          // Titanium chassis & back glass node whitelist for finish tinting
          const tintNodes = new Set([
            'ttmRoLdJipiIOmf',   // outer titanium frame band
            'DjsDkGiopeiEJZK',   // frame bezel
            'buRWvyqhBBgcJFo',   // back matte glass
            'MrMmlCAsAxJpYqQ_0', // camera plateau island
            'TakBsdEjEytCAMK',   // titanium frame accent
            'IykfmVvLplTsTEW',   // titanium frame accent
            'CdalkzDVnwgdEhS'    // side buttons
          ]);

          const isNatural = selectedFinish.id === 'natural';
          const col = isNatural ? new THREE.Color(0xffffff) : new THREE.Color(selectedFinish.colorHex);
          model.traverse((child) => {
            if (child.isMesh && child.material && tintNodes.has(child.name)) {
              if (!child.userData.originalMat) {
                child.userData.originalMat = child.material;
                child.material = child.material.clone();
              }
              child.material.color = col;
              child.material.needsUpdate = true;
            }
          });

          // Swap from procedural fallback to authentic 3D model
          proceduralGroup.visible = false;
          phoneGroup.add(model);
          setIsModelLoaded(true);
        },
        undefined,
        (err) => {
          console.warn('Real 3D model loading fallback:', err);
        }
      );
    } catch (e) {
      console.warn('Draco/GLTF error in studio:', e);
    }

    // Soft Ground Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(2.3, 64);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x73c4ff,
      transparent: true,
      opacity: 0.05
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.set(0, -2.25, 0);
    scene.add(shadowDisc);

    // Pointer Interaction Handling (360° Drag & Tilt)
    let pointerDown = false;
    let prevX = 0;
    let prevY = 0;

    const handlePointerDown = (e) => {
      pointerDown = true;
      setIsDragging(true);
      prevX = e.clientX;
      prevY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
      if (renderer.domElement.setPointerCapture) {
        renderer.domElement.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerMove = (e) => {
      if (!pointerDown) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      rotationStateRef.current.rotY += deltaX * 0.01;
      rotationStateRef.current.rotX += deltaY * 0.007;

      // Clamp X tilt to prevent flipping upside down
      rotationStateRef.current.rotX = Math.max(-1.1, Math.min(1.1, rotationStateRef.current.rotX));
    };

    const handlePointerUp = () => {
      pointerDown = false;
      setIsDragging(false);
      renderer.domElement.style.cursor = 'grab';
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('pointercancel', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop (60fps Render & Levitation Physics)
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      // Smooth auto rotation when idle
      if (rotationStateRef.current.isAuto && !pointerDown) {
        rotationStateRef.current.rotY += 0.006;
      }

      // Gentle floating levitation sine wave
      const floatY = Math.sin(time * 1.5) * 0.08;
      phoneGroup.position.y = floatY;

      // Smooth inertia interpolation
      phoneGroup.rotation.y = rotationStateRef.current.rotY;
      phoneGroup.rotation.x = rotationStateRef.current.rotX + Math.sin(time * 1.2) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('pointercancel', handlePointerUp);
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
      renderer.dispose();
    };
  }, []);

  const handleResetAngle = () => {
    rotationStateRef.current.rotX = 0;
    rotationStateRef.current.rotY = 0;
  };

  const currentPriceUSD = selectedStorage.priceUSD;

  const handleCreateOrder = () => {
    const prod = {
      id: `iphone-16-pro-max-${selectedFinish.id}-${selectedStorage.size}`,
      name: `iPhone 16 Pro Max (${selectedFinish.name}, ${selectedStorage.size})`,
      category: 'iphone',
      priceUSD: currentPriceUSD,
      price: currentPriceUSD,
      image: '/products/iphone_16_pro_black.png',
      selectedStorage: selectedStorage.size,
      color: selectedFinish.name
    };
    onAddToCart(prod);
  };

  const handleInstantBuy = () => {
    const prod = {
      id: `iphone-16-pro-max-${selectedFinish.id}-${selectedStorage.size}`,
      name: `iPhone 16 Pro Max (${selectedFinish.name}, ${selectedStorage.size})`,
      category: 'iphone',
      priceUSD: currentPriceUSD,
      price: currentPriceUSD,
      image: '/products/iphone_16_pro_black.png',
      selectedStorage: selectedStorage.size,
      color: selectedFinish.name
    };
    onFastBuy(prod);
  };

  return (
    <section 
      id="3d-studio-experience"
      style={{
        padding: '80px 0 90px 0',
        background: 'var(--studio-bg, #090a0d)',
        borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className="app-container">

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 18px',
            borderRadius: 'var(--radius-full, 999px)',
            background: 'var(--badge-bg, rgba(255, 255, 255, 0.05))',
            border: '1px solid var(--badge-border, rgba(255, 255, 255, 0.12))',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: 'var(--accent-cyan, #73c4ff)',
            marginBottom: '14px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} color="var(--accent-cyan, #73c4ff)" />
            <span>{studioT.badge || 'HAQIQIY 3D GLTF WEBGL VITRINASI'}</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--text-primary, #edf0f3)',
            fontFamily: "'Space Grotesk', -apple-system, sans-serif",
            marginBottom: '10px'
          }}>
            {studioT.title || 'iPhone 16 Pro Max. 3D Interaktiv Studio.'}
          </h2>
          <p style={{
            fontSize: '0.96rem',
            color: 'var(--text-secondary, #8e949b)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            {studioT.subtitle || 'Haqiqiy 3D model: PBR titan korpus, 3 ta safir kamera linzalari va Dynamic Island. Sichqoncha yoki barmoq bilan 360° erkin aylantiring.'}
          </p>
        </div>

        {/* Main 3D Studio Split Grid */}
        <div 
          className="studio-split-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '32px',
            alignItems: 'center',
            background: 'var(--studio-card-bg, radial-gradient(ellipse at 50% 25%, #181d24 0%, #0d0f14 65%, #08090c 100%))',
            borderRadius: '32px',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
            padding: '36px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
            position: 'relative'
          }}
        >

          {/* Left: Interactive 3D WebGL Canvas Stage */}
          <div 
            className="studio-canvas-stage"
            style={{
              position: 'relative',
              width: '100%',
              height: '520px',
              borderRadius: '26px',
              background: 'var(--studio-stage-bg, radial-gradient(circle at 50% 45%, #242b35 0%, #111419 55%, #08090c 100%))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.6)'
            }}
          >

            {/* Three.js Canvas Container */}
            <div 
              ref={mountRef} 
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            />

            {/* Top Interactive Hints & Mode Pills */}
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              right: '18px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              <div style={{
                background: 'rgba(11, 14, 18, 0.85)',
                backdropFilter: 'blur(16px)',
                padding: '7px 16px',
                borderRadius: 'var(--radius-full, 999px)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#edf0f3',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                pointerEvents: 'auto',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
              }}>
                <Compass size={14} color="var(--accent-cyan, #73c4ff)" />
                <span>{studioT.dragHint || '360° Aylantirish uchun ushlang'}</span>
              </div>

              {/* Action Buttons: Auto Rotate & Reset */}
              <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  title={isAutoRotate ? "Avtomatik aylanishni to'xtatish" : "Avtomatik aylantirish"}
                  style={{
                    background: isAutoRotate ? 'var(--accent-cyan, #73c4ff)' : 'rgba(255, 255, 255, 0.08)',
                    color: isAutoRotate ? '#0b0c0e' : '#edf0f3',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-full, 999px)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                  }}
                >
                  <RotateCw size={12} className={isAutoRotate ? 'animate-spin' : ''} />
                  <span>{isAutoRotate ? (studioT.autoRotateActive || 'Faol') : (studioT.autoRotateStatic || 'Statik')}</span>
                </button>

                <button
                  onClick={handleResetAngle}
                  title="Ko'rinish burchagini tiklash"
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#edf0f3',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    padding: '7px 12px',
                    borderRadius: 'var(--radius-full, 999px)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
                  }}
                >
                  <RefreshCw size={12} />
                  <span>{studioT.resetAngle || 'Tiklash'}</span>
                </button>
              </div>
            </div>

            {/* Bottom Current Color Pill */}
            <div style={{
              position: 'absolute',
              bottom: '18px',
              background: 'rgba(11, 14, 18, 0.88)',
              backdropFilter: 'blur(16px)',
              padding: '8px 18px',
              maxWidth: 'calc(100% - 28px)',
              borderRadius: 'var(--radius-full, 999px)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
              zIndex: 10
            }}>
              <span 
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: selectedFinish.colorHex,
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 0 10px rgba(255,255,255,0.2)',
                  display: 'inline-block',
                  flexShrink: 0
                }}
              />
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#edf0f3', whiteSpace: 'nowrap' }}>
                {selectedFinish.id === 'natural' ? (studioT.naturalTitanium || selectedFinish.name) :
                 selectedFinish.id === 'black' ? (studioT.blackTitanium || selectedFinish.name) :
                 selectedFinish.id === 'white' ? (studioT.whiteTitanium || selectedFinish.name) :
                 (studioT.desertTitanium || selectedFinish.name)}
              </span>
              <span className="studio-desc-pill" style={{ fontSize: '0.74rem', color: '#8e949b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                • {selectedFinish.id === 'natural' ? (studioT.naturalDesc || selectedFinish.tagline) :
                   selectedFinish.id === 'black' ? (studioT.blackDesc || selectedFinish.tagline) :
                   selectedFinish.id === 'white' ? (studioT.whiteDesc || selectedFinish.tagline) :
                   (studioT.desertDesc || selectedFinish.tagline)}
              </span>
            </div>

          </div>

          {/* Right: Customization Controls & Instant Buy */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>

            {/* Model Title & Specs */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: 'var(--accent-cyan, #73c4ff)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Apple Flagship Pro Max
                </span>
                <span style={{ color: 'var(--text-tertiary, rgba(255, 255, 255, 0.2))' }}>•</span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #8e949b)', fontWeight: 600 }}>
                  A18 Pro (3nm) • 6.9" ProMotion
                </span>
              </div>

              <h3 style={{
                fontSize: '2.1rem',
                fontWeight: 800,
                color: 'var(--text-primary, #edf0f3)',
                letterSpacing: '-0.03em',
                fontFamily: "'Space Grotesk', -apple-system, sans-serif",
                marginBottom: '10px'
              }}>
                iPhone 16 Pro Max
              </h3>

              <div style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: 'var(--text-primary, #edf0f3)',
                letterSpacing: '-0.02em',
                fontFamily: "'DM Mono', monospace",
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px'
              }}>
                <span>{formatPrice(currentPriceUSD, currency)}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-secondary, #8e949b)', fontFamily: 'inherit' }}>
                  ({studioT.allTaxesIncluded || 'Barcha soliqlar va 1 yil rasmiy kafolat bilan'})
                </span>
              </div>
            </div>

            {/* Step 1: Titan Rangini Tanlang (Titanium Color Selector) */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary, #edf0f3)',
                marginBottom: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                {studioT.step1 || '1. Titan Rangini Tanlang:'}{' '}
                <span style={{ color: 'var(--accent-cyan, #73c4ff)' }}>
                  {selectedFinish.id === 'natural' ? (studioT.naturalTitanium || selectedFinish.name) :
                   selectedFinish.id === 'black' ? (studioT.blackTitanium || selectedFinish.name) :
                   selectedFinish.id === 'white' ? (studioT.whiteTitanium || selectedFinish.name) :
                   (studioT.desertTitanium || selectedFinish.name)}
                </span>
              </label>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                {TITANIUM_FINISHES.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  const localizedFinishName = finish.id === 'natural' ? (studioT.naturalTitanium || finish.name) :
                    finish.id === 'black' ? (studioT.blackTitanium || finish.name) :
                    finish.id === 'white' ? (studioT.whiteTitanium || finish.name) :
                    (studioT.desertTitanium || finish.name);

                  return (
                    <button
                      key={finish.id}
                      onClick={() => setSelectedFinish(finish)}
                      style={{
                        padding: '14px 16px',
                        borderRadius: '18px',
                        border: isSelected 
                          ? '2px solid var(--accent-cyan, #73c4ff)' 
                          : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                        background: isSelected ? 'rgba(115, 196, 255, 0.12)' : 'var(--badge-bg, rgba(255, 255, 255, 0.04))',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 20px rgba(115, 196, 255, 0.18)' : 'none'
                      }}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: finish.colorHex,
                          border: '1px solid rgba(255,255,255,0.3)',
                          flexShrink: 0,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                        }}
                      />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          color: 'var(--text-primary, #edf0f3)',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}>
                          {localizedFinishName}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary, #8e949b)' }}>
                          Titanium
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Xotira Sig'imini Tanlang (Storage Tier) */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--text-primary, #edf0f3)',
                marginBottom: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                {studioT.step2 || '2. Xotira Sig‘imini Tanlang:'}
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {STORAGE_OPTIONS.map((st) => {
                  const isSelected = selectedStorage.size === st.size;
                  return (
                    <button
                      key={st.size}
                      onClick={() => setSelectedStorage(st)}
                      style={{
                        padding: '14px 10px',
                        borderRadius: '18px',
                        border: isSelected ? '2px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                        background: isSelected ? 'rgba(115, 196, 255, 0.12)' : 'var(--badge-bg, rgba(255, 255, 255, 0.04))',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s ease',
                        boxShadow: isSelected ? '0 0 16px rgba(115, 196, 255, 0.18)' : 'none'
                      }}
                    >
                      <div style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary, #edf0f3)', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {st.size}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #8e949b)', marginTop: '3px', fontFamily: "'DM Mono', monospace" }}>
                        {formatPrice(st.priceUSD, currency)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Add to Cart & Instant Buy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
              <div style={{ display: 'flex', gap: '14px' }}>
                <button
                  onClick={handleCreateOrder}
                  style={{
                    flex: 1,
                    background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
                    color: 'var(--text-primary, #edf0f3)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.18))',
                    padding: '15px 22px',
                    borderRadius: 'var(--radius-full, 999px)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '9px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  <ShoppingBag size={17} />
                  <span>{studioT.addToCart || 'Savatga Qo‘shish'}</span>
                </button>

                <button
                  onClick={handleInstantBuy}
                  style={{
                    flex: 1,
                    background: 'var(--accent-btn-bg, #73c4ff)',
                    color: 'var(--accent-btn-text, #0b0c0e)',
                    border: 'none',
                    padding: '15px 22px',
                    borderRadius: 'var(--radius-full, 999px)',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 20px rgba(115, 196, 255, 0.35)'
                  }}
                >
                  <span>{studioT.buyNow || 'Hoziroq Xarid Qilish'}</span>
                  <ChevronRight size={17} />
                </button>
              </div>

              {/* Guarantees row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 14px',
                fontSize: '0.74rem',
                color: 'var(--text-secondary, #8e949b)',
                background: 'var(--badge-bg, rgba(255, 255, 255, 0.02))',
                borderRadius: '12px',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.05))'
              }}>
                <span>{studioT.warranty || '✓ 100% Rasmiy Apple & IMEI ro‘yxatdan o‘tgan'}</span>
                <span>{studioT.delivery || '✓ Toshkent bo‘ylab 2 soatda yetkazish'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
