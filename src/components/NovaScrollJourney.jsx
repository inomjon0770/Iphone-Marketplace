import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { 
  ArrowDownRight, 
  ArrowRight, 
  ShieldCheck, 
  Headphones, 
  MapPin, 
  Sparkles,
  ShoppingBag,
  Camera,
  Eye
} from 'lucide-react';
import { formatPrice } from '../data/storage';

const FINISHES = [
  { 
    name: 'Tabiiy titan', 
    color: '#92989c', 
    cameraColor: '#777d81', 
    edge: '#b8c0c5', 
    surface: 'linear-gradient(120deg,#92989c,#181d22 30%,#090b0d 72%,#b8c0c5)' 
  },
  { 
    name: 'Qora titan', 
    color: '#34363a', 
    cameraColor: '#25272a', 
    edge: '#666a70', 
    surface: 'linear-gradient(120deg,#55595d,#17191c 30%,#08090b 72%,#777c82)' 
  },
  { 
    name: 'Cho‘l titani', 
    color: '#b9a992', 
    cameraColor: '#93836f', 
    edge: '#d1c7b4', 
    surface: 'linear-gradient(120deg,#b9a992,#211e1b 30%,#0b0908 72%,#d1c7b4)' 
  }
];

function makeScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Texture();

  const gradient = ctx.createLinearGradient(50, 70, 460, 950);
  gradient.addColorStop(0, '#0a0d14');
  gradient.addColorStop(0.38, '#1e2836');
  gradient.addColorStop(0.67, '#101722');
  gradient.addColorStop(1, '#05070a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 1024);

  ctx.save();
  ctx.translate(255, 490);
  ctx.rotate(-0.55);
  const orb = ctx.createRadialGradient(10, -40, 10, 0, 0, 315);
  orb.addColorStop(0, 'rgba(185, 219, 239, 0.88)');
  orb.addColorStop(0.24, 'rgba(92, 130, 160, 0.7)');
  orb.addColorStop(0.58, 'rgba(25, 41, 58, 0.34)');
  orb.addColorStop(1, 'rgba(9, 14, 22, 0)');
  ctx.fillStyle = orb;
  ctx.beginPath();
  ctx.ellipse(0, 0, 180, 380, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // iOS Lockscreen Clock
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  ctx.fillText('Shanba, 10-Oktyabr', 256, 175);

  ctx.font = '700 96px -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
  ctx.fillText('09:41', 256, 270);

  // Home bar
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(176, 995, 160, 5, 3);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function KineticIPhoneScene({ finish, onSelectFinish }) {
  const hostRef = useRef(null);
  const bodyMaterialRef = useRef(null);
  const cameraMaterialRef = useRef(null);
  const sideMaterialRef = useRef(null);
  const realModelRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.domElement.setAttribute('aria-label', 'Uch o‘lchamli iPhone modeli. Sichqoncha yoki barmoq bilan aylantiring.');
    renderer.domElement.setAttribute('role', 'img');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const group = new THREE.Group();
    scene.add(group);

    const proceduralGroup = new THREE.Group();
    group.add(proceduralGroup);

    // Studio Lighting
    scene.add(new THREE.HemisphereLight(0xdde9ff, 0x12161d, 2.1));
    const keyLight = new THREE.DirectionalLight(0xe5f2ff, 4.2);
    keyLight.position.set(-4, 5, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x73bfff, 3.1);
    rimLight.position.set(4, 1, -5);
    scene.add(rimLight);

    const stripLight = new THREE.DirectionalLight(0xffe8cd, 1.6);
    stripLight.position.set(4, -3, 4);
    scene.add(stripLight);

    // --- REAL 3D IPHONE MODEL LOADER (GLTF/GLB with DRACO) ---
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
          const targetHeight = 3.9;
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
            'ttmRoLdJipiIOmf', // outer titanium frame band
            'DjsDkGiopeiEJZK', // frame bezel
            'buRWvyqhBBgcJFo', // back matte glass
            'MrMmlCAsAxJpYqQ_0', // camera plateau island
            'TakBsdEjEytCAMK', // titanium frame accent
            'IykfmVvLplTsTEW', // titanium frame accent
            'CdalkzDVnwgdEhS'  // side buttons
          ]);

          const isNatural = finish.name === 'Tabiiy titan';
          const col = isNatural ? new THREE.Color(0xffffff) : new THREE.Color(finish.color);
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

          proceduralGroup.visible = false;
          group.add(model);
          setReady(true);
        },
        undefined,
        (err) => {
          console.warn('Real 3D model loading fallback:', err);
        }
      );
    } catch (e) {
      console.warn('Draco/GLTF error:', e);
    }

    // --- PROCEDURAL FALLBACK MESH (until GLB finishes loading) ---
    const titanium = new THREE.MeshPhysicalMaterial({
      color: finish.color,
      metalness: 0.91,
      roughness: 0.24,
      clearcoat: 0.8,
      clearcoatRoughness: 0.16
    });
    bodyMaterialRef.current = titanium;

    const bodyShape = new THREE.Shape();
    const w = 1.78, h = 3.65, r = 0.27;
    bodyShape.moveTo(-w / 2 + r, -h / 2);
    bodyShape.lineTo(w / 2 - r, -h / 2);
    bodyShape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
    bodyShape.lineTo(w / 2, h / 2 - r);
    bodyShape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
    bodyShape.lineTo(-w / 2 + r, h / 2);
    bodyShape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
    bodyShape.lineTo(-w / 2, -h / 2 + r);
    bodyShape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(bodyShape, {
        depth: 0.17,
        bevelEnabled: true,
        bevelSegments: 4,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.045,
        curveSegments: 12
      }),
      titanium
    );
    body.position.z = -0.085;
    proceduralGroup.add(body);

    // Front Screen & Dynamic Island
    const screenMat = new THREE.MeshPhysicalMaterial({
      color: 0x06090d,
      metalness: 0.08,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.03
    });
    const screen = new THREE.Mesh(new THREE.BoxGeometry(1.67, 3.53, 0.025), screenMat);
    screen.position.set(0, 0, 0.105);
    proceduralGroup.add(screen);

    const island = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.095, 0.28, 5, 14),
      new THREE.MeshBasicMaterial({ color: 0x010203 })
    );
    island.rotation.z = Math.PI / 2;
    island.position.set(0, 1.59, 0.126);
    proceduralGroup.add(island);

    const screenTexture = makeScreenTexture();
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.58, 3.34),
      new THREE.MeshBasicMaterial({ map: screenTexture, transparent: true, opacity: 0.95 })
    );
    glow.position.set(0, -0.03, 0.121);
    proceduralGroup.add(glow);

    // Camera Plateau Bump
    const cameraPlateMat = new THREE.MeshPhysicalMaterial({
      color: finish.cameraColor,
      metalness: 0.8,
      roughness: 0.3,
      clearcoat: 0.6
    });
    cameraMaterialRef.current = cameraPlateMat;

    const cameraPlate = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.91, 0.075), cameraPlateMat);
    cameraPlate.position.set(-0.39, 1.28, -0.145);
    proceduralGroup.add(cameraPlate);

    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x121b27,
      metalness: 0.38,
      roughness: 0.09,
      clearcoat: 1,
      clearcoatRoughness: 0.03
    });
    const lensRim = new THREE.MeshStandardMaterial({
      color: 0xb8c0c5,
      metalness: 0.9,
      roughness: 0.24
    });

    const lensPoints = [[-0.59, 1.51], [-0.19, 1.51], [-0.59, 1.08]];
    lensPoints.forEach(([x, y]) => {
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.158, 0.158, 0.055, 40), lensRim);
      rim.rotation.x = Math.PI / 2;
      rim.position.set(x, y, -0.2);
      proceduralGroup.add(rim);

      const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.123, 0.123, 0.06, 40), lensMat);
      lens.rotation.x = Math.PI / 2;
      lens.position.set(x, y, -0.24);
      proceduralGroup.add(lens);

      const lensGlint = new THREE.Mesh(
        new THREE.CircleGeometry(0.035, 20),
        new THREE.MeshBasicMaterial({ color: 0x9ad8ff })
      );
      lensGlint.position.set(x - 0.038, y + 0.04, -0.274);
      proceduralGroup.add(lensGlint);
    });

    const flash = new THREE.Mesh(
      new THREE.CircleGeometry(0.055, 24),
      new THREE.MeshBasicMaterial({ color: 0xe9e6ce })
    );
    flash.position.set(-0.19, 1.1, -0.19);
    proceduralGroup.add(flash);

    const lidar = new THREE.Mesh(
      new THREE.CircleGeometry(0.045, 24),
      new THREE.MeshBasicMaterial({ color: 0x30363a })
    );
    lidar.position.set(-0.19, 1.32, -0.19);
    proceduralGroup.add(lidar);

    // Buttons
    const sideButtonMat = new THREE.MeshStandardMaterial({
      color: 0x999fa4,
      metalness: 0.9,
      roughness: 0.26
    });
    sideMaterialRef.current = sideButtonMat;

    const sideButton = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.53, 0.105), sideButtonMat);
    sideButton.position.set(0.91, 0.67, 0);
    proceduralGroup.add(sideButton);

    const vol = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.32, 0.105), sideButtonMat);
    vol.position.set(-0.91, 0.79, 0);
    proceduralGroup.add(vol);

    // Soft Shadow Disc
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 64),
      new THREE.MeshBasicMaterial({ color: 0x82c7ff, transparent: true, opacity: 0.055 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -2.28, 0);
    scene.add(floor);

    // Scroll & Pointer Physics
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let scrollProgress = 0;
    let pointerDown = false;
    let previousX = 0;
    let previousY = 0;
    let dragRotation = 0;
    let tilt = 0;
    let targetX = 0;
    let targetY = 0;
    let didSetReady = false;

    const journey = host.closest('.scroll-journey');
    const heroCopy = journey?.querySelector('.hero-copy');

    const onPointerDown = (event) => {
      pointerDown = true;
      previousX = event.clientX;
      previousY = event.clientY;
      if (renderer.domElement.setPointerCapture) {
        renderer.domElement.setPointerCapture(event.pointerId);
      }
    };

    const onPointerMove = (event) => {
      if (!pointerDown) return;
      dragRotation += (event.clientX - previousX) * 0.009;
      tilt += (event.clientY - previousY) * 0.005;
      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onPointerUp = () => {
      pointerDown = false;
    };

    const onScroll = () => {
      if (!journey) return;
      const distance = Math.max(1, journey.offsetHeight - window.innerHeight);
      scrollProgress = Math.min(1, Math.max(0, -journey.getBoundingClientRect().top / distance));
      if (heroCopy) {
        heroCopy.style.opacity = reducedMotion ? (scrollProgress > 0.08 ? '0' : '1') : String(Math.max(0, 1 - scrollProgress * 3.5));
        heroCopy.style.transform = reducedMotion ? '' : `translate3d(0,${-32 * scrollProgress}px,0)`;
      }
    };

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
      onScroll();
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);
    onScroll();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const time = performance.now() * 0.0005;
      const targetRotY = reducedMotion ? dragRotation : Math.sin(time) * 0.14 + dragRotation + scrollProgress * Math.PI * 2;
      targetY = reducedMotion ? 0 : Math.sin(time * 0.8) * 0.075;
      targetX = tilt;
      camera.position.z = 8.4 - (reducedMotion ? 0 : Math.sin(scrollProgress * Math.PI) * 1.4);
      group.rotation.y += (targetRotY - group.rotation.y) * 0.045;
      group.rotation.x += (targetX - group.rotation.x) * 0.045;
      group.position.y += (targetY - group.position.y) * 0.045;
      group.rotation.z = Math.sin(time * 0.6) * (reducedMotion ? 0 : 0.018);
      renderer.render(scene, camera);

      if (!didSetReady) {
        didSetReady = true;
        setReady(true);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((m) => m.dispose());
        }
      });
      screenTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      bodyMaterialRef.current = null;
      cameraMaterialRef.current = null;
      sideMaterialRef.current = null;
    };
  }, []);

  useEffect(() => {
    bodyMaterialRef.current?.color.set(finish.color);
    cameraMaterialRef.current?.color.set(finish.cameraColor);
    sideMaterialRef.current?.color.set(finish.color);

    if (realModelRef.current) {
      const tintNodes = new Set([
        'ttmRoLdJipiIOmf',
        'DjsDkGiopeiEJZK',
        'buRWvyqhBBgcJFo',
        'MrMmlCAsAxJpYqQ_0',
        'TakBsdEjEytCAMK',
        'IykfmVvLplTsTEW',
        'CdalkzDVnwgdEhS'
      ]);

      const isNatural = finish.name === 'Tabiiy titan';
      const col = isNatural ? new THREE.Color(0xffffff) : new THREE.Color(finish.color);

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
  }, [finish]);

  return (
    <div className="scene-wrap" ref={hostRef} aria-label="Interaktiv uch o‘lchamli iPhone ko‘rinishi">
      {failed && (
        <div 
          className="scene-fallback" 
          style={{ borderColor: finish.edge, background: finish.surface }}
          role="img" 
          aria-label={`iPhone ${finish.name} rangidagi zaxira ko‘rinishi`}
        >
          <span className="fallback-lenses" />
          <span className="eyebrow" style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
            Statik ko‘rinish · qurilmangizda 3D mavjud emas
          </span>
        </div>
      )}
      <div className="finish-picker" role="group" aria-label="Titan rangini tanlang">
        {FINISHES.map((option) => (
          <button 
            key={option.name} 
            type="button" 
            className="finish-choice" 
            aria-label={option.name} 
            aria-pressed={finish.name === option.name} 
            title={option.name} 
            onClick={() => onSelectFinish(option)}
          >
            <span className="finish-swatch" style={{ background: option.color }} />
          </button>
        ))}
        <span className="finish-name">{finish.name}</span>
      </div>
    </div>
  );
}

export const NovaScrollJourney = ({
  onExploreCollection,
  onShopNow,
  t
}) => {
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const heroT = t?.hero || {};

  return (
    <div className="nova-experience-wrapper">
      {/* Scroll Journey with 3D Sticky Hero & Beats */}
      <div className="scroll-journey" aria-label="Scroll orqali 3D iPhone taqdimoti">
        
        {/* Sticky Hero */}
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker eyebrow">{heroT.kicker || 'AEROKOSMIK TITAN SANOATI'}</div>
            <h1 id="hero-title">
              {heroT.titleLine1 || 'Titan. Safir.'}<br />
              <span>{heroT.titleLine2 || 'Mukammallik.'}</span>
            </h1>
            <p className="hero-subtitle">{heroT.subtitle || 'Apple A18 Pro 3nm arxitekturasi va 5-darajali toza titan korpus.'}</p>
            <div className="hero-actions">
              <button 
                className="button-primary" 
                onClick={onExploreCollection}
              >
                <span>{heroT.exploreBtn || 'Kolleksiyani Ko‘rish'}</span>
                <ArrowDownRight size={15} />
              </button>
              <button 
                className="button-text" 
                onClick={onShopNow}
              >
                <span>{heroT.shopBtn || 'Hoziroq Xarid Qilish'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Interactive 3D Phone Scene */}
          <KineticIPhoneScene 
            finish={selectedFinish} 
            onSelectFinish={setSelectedFinish} 
          />

          <div className="scene-label">
            <strong>iPhone 16 Pro</strong> TITANIUM · 3D INTERACTIVE<br />
            {heroT.scrollHint || 'DRAG TO EXPLORE'}
          </div>
          <div className="hero-index">01 — 04 / PRECISION, REIMAGINED</div>
          <div className="scroll-cue">
            <span className="scroll-line" /> {heroT.scrollHint || 'SCROLL TO EXPLORE'}
          </div>
        </section>

        {/* Scroll Beat 01 */}
        <section className="scroll-beat" aria-labelledby="beat-frame-title">
          <span className="beat-number" aria-hidden="true">{heroT.beat1Num || '01'}</span>
          <div className="beat-copy shell">
            <div className="eyebrow">{heroT.beat1Title || '01 — TITAN QIRRALARI'}</div>
            <h2 id="beat-frame-title">Chegarani<br /><em>his qiling.</em></h2>
            <p>{heroT.beat1Caption || 'Aerokosmik 5-darajali titan. Sayqallangan pishiq qirralar va ultra-yengil vazn.'}</p>
            <div className="beat-feature-tags">
              <span className="beat-tag"><ShieldCheck size={13} color="var(--accent-cyan, #73c4ff)" /> 5-darajali Titan</span>
              <span className="beat-tag"><Sparkles size={13} color="var(--accent-cyan, #73c4ff)" /> Sayqallangan qirralar</span>
              <span className="beat-tag">Ultra-yengil vazn</span>
            </div>
          </div>
          <div className="beat-caption">MATERIAL STUDY · TITANIUM</div>
        </section>

        {/* Scroll Beat 02 */}
        <section className="scroll-beat" aria-labelledby="beat-camera-title">
          <span className="beat-number" aria-hidden="true">{heroT.beat2Num || '02'}</span>
          <div className="beat-copy shell">
            <div className="eyebrow">{heroT.beat2Title || '02 — KAMERA TIZIMI'}</div>
            <h2 id="beat-camera-title">Kadr ortidagi<br /><em>aniqlik.</em></h2>
            <p>{heroT.beat2Caption || '48MP Fusion kamera, safir linzalar va 5 karra optik teleobyektiv.'}</p>
            <div className="beat-feature-tags">
              <span className="beat-tag"><Camera size={13} color="var(--accent-cyan, #73c4ff)" /> 48MP Fusion</span>
              <span className="beat-tag">5x Optik Teleobyektiv</span>
              <span className="beat-tag">Safir linzalar</span>
            </div>
          </div>
          <div className="beat-caption">DETAIL STUDY · OPTICS</div>
        </section>

        {/* Scroll Beat 03 */}
        <section className="scroll-beat" aria-labelledby="beat-display-title">
          <span className="beat-number" aria-hidden="true">{heroT.beat3Num || '03'}</span>
          <div className="beat-copy shell">
            <div className="eyebrow">{heroT.beat3Title || '03 — OLED DISPLEY'}</div>
            <h2 id="beat-display-title">Old tomonga<br /><em>qayta nigoh.</em></h2>
            <p>{heroT.beat3Caption || 'Super Retina XDR 120Hz ProMotion va eng yupqa hoshiyalar.'}</p>
            <div className="beat-feature-tags">
              <span className="beat-tag"><Eye size={13} color="var(--accent-cyan, #73c4ff)" /> Super Retina XDR</span>
              <span className="beat-tag">120Hz ProMotion</span>
              <span className="beat-tag">Yupqa hoshiyalar</span>
            </div>
          </div>
          <div className="beat-caption">A FULL TURN · ONE PERSPECTIVE</div>
        </section>

      </div>

      {/* Manifesto Section */}
      <section className="manifesto" id="experience">
        <div className="shell manifesto-grid">
          <div>
            <div className="eyebrow">iLux × NOVA nigohida</div>
            <h2>Texnologiya.<br /><em>His qilinadigan</em> aniqlik.</h2>
          </div>
          <div className="manifesto-note">
            Har bir chiziqda puxta o‘ylangan muvozanat. Har bir tafsilotda o‘ziga xos xarakter. Apple olamiga sokin, diqqat bilan tanlangan kirish nuqtasi.
          </div>
        </div>
      </section>

      {/* Feature Band (Specs Bar) */}
      <section className="feature-band">
        <div className="shell feature-inner">
          <div>
            <div className="eyebrow" style={{ color: '#4c7da0' }}>Pro darajasidagi mahorat</div>
            <h2 className="feature-title">Titanning o‘ziga xos<br />xarakteri bor.</h2>
          </div>
          <div>
            <p className="feature-copy">
              iPhone Pro — kuch va nafislik orasidagi nozik chiziq. Mustahkam, yengil titan korpus; har bir kadrda ko‘proq erkinlik beradigan kamera tizimi; tafsilotlarga boy, yorqin displey.
            </p>
            <div className="feature-specs">
              <span><strong>A18 Pro</strong>YANGI AVLOD CHIP</span>
              <span><strong>48 MP</strong>FUSION KAMERA</span>
              <span><strong>120 Hz</strong>PRO MOTION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Strip */}
      <section className="service-strip" aria-label="Xizmatlar kafolati">
        <div className="shell service-inner">
          <div className="service-item">
            <ShieldCheck size={19} color="#73c4ff" />
            <div>
              <strong>12 oylik rasmiy kafolat</strong>
              <span>Apple standartidagi to'liq xizmat</span>
            </div>
          </div>
          <div className="service-item">
            <Headphones size={19} color="#73c4ff" />
            <div>
              <strong>Shaxsiy konsyerj</strong>
              <span>Qurilma tanlashda 24/7 VIP yordam</span>
            </div>
          </div>
          <div className="service-item">
            <MapPin size={19} color="#73c4ff" />
            <div>
              <strong>Toshkent, O‘zbekiston</strong>
              <span>2 soat ichida eshikkacha yetkazish</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
