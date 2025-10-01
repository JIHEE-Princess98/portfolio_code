import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpaceBackground({
                                          starCount = 1500,
                                          starRadius = 1000,
                                          className = "",
                                        }) {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    // 씬/카메라/렌더러
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03040a, 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.2, 1000);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    renderer.setClearColor(0x11121a, 1);

    // 별 텍스처(동그란 점) 생성
    const starTexture = (() => {
      const size = 54;
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const grd = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      grd.addColorStop(0.0, "rgba(255,255,255,1)");
      grd.addColorStop(0.18, "rgba(255,255,255,0.9)");
      grd.addColorStop(0.32, "rgba(255,255,255,0.25)");
      grd.addColorStop(0.32, "rgba(255,255,255,0.0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    })();

    // 별들 생성
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i++) {
      // 구(반경 starRadius) 안에 무작위 배치
      const r = starRadius * Math.cbrt(Math.random()); // 균등 분포
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // 흰색 ~ 연한 파랑/연한 노랑 랜덤 톤
      const hue = 0.9 + Math.random() * 0.1;  // 0.9 ~ 1.0
      const sat = 0.4 + Math.random() * 0.3;
      const val = 0.85 + Math.random() * 0.15;
      color.setHSL(hue, sat, val);
      colors[i*3] = color.r; colors[i*3+1] = color.g; colors[i*3+2] = color.b;

      // 화면에서의 점 크기 (원근감 적용)
      sizes[i] = 6 + Math.random() * 10;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 8,
      sizeAttenuation: true,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 천천히 회전하도록 그룹 래핑
    const skyGroup = new THREE.Group();
    skyGroup.add(stars);
    scene.add(skyGroup);

    // 은은한 네뷸라 스프라이트 2개
    const makeNebula = (hex, scale = 40, opacity = 0.5) => {
      const nebTex = (() => {
        const size = 256;
        const c = document.createElement("canvas");
        c.width = c.height = size;
        const cx = c.getContext("2d");
        const grd = cx.createRadialGradient(
          size/2, size/2, size*0.15,
          size/2, size/2, size*0.5
        );
        const col = new THREE.Color(hex);
        const rgb = (v)=>Math.round(v*255);
        grd.addColorStop(0, `rgba(${rgb(col.r)},${rgb(col.g)},${rgb(col.b)},0.8)`);
        grd.addColorStop(1, `rgba(${rgb(col.r)},${rgb(col.g)},${rgb(col.b)},0)`);
        cx.fillStyle = grd;
        cx.fillRect(0,0,size,size);
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
      })();

      const mat = new THREE.SpriteMaterial({
        map: nebTex,
        depthWrite: false,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity,
      });
      const spr = new THREE.Sprite(mat);
      spr.scale.setScalar(scale);
      spr.position.set(
        (Math.random()*2-1)*40,
        (Math.random()*2-1)*25,
        -20 - Math.random()*40
      );
      return spr;
    };

    const nebula1 = makeNebula(0x4f7ee7, 110, 0.28);
    const nebula2 = makeNebula(0x9b4fe7, 90, 0.22);
    skyGroup.add(nebula1, nebula2);

    // 라이트(별빛 더 강조되도록 아주 약하게)
    const hemi = new THREE.HemisphereLight(0x3355ff, 0x000000, 1);
    scene.add(hemi);

    // 마우스 패럴랙스
    const mouse = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove);

    // 유성(가끔 나타났다 사라짐)
    const shootGroup = new THREE.Group();
    scene.add(shootGroup);
    const spawnShootingStar = () => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const geo = new THREE.ConeGeometry(0.05, 0.9, 8);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(-15 + Math.random()*10, 6 + Math.random()*4, -10 - Math.random()*10);
      mesh.rotation.z = -Math.PI * (0.15 + Math.random()*0.15);
      shootGroup.add(mesh);

      const vel = new THREE.Vector3(10 + Math.random()*8, -8 - Math.random()*6, 0);
      const life = 1.1 + Math.random()*0.6;
      return { mesh, vel, t: 0, life };
    };
    let shooters = [];
    let shootTimer = 0;

    // 애니메이션
    let t = 0;
    const animate = (now) => {
      const dt = 0.016; // 고정 스텝(안정적)
      t += dt;

      // 그룹 천천히 회전 + 패럴랙스
      skyGroup.rotation.y += 0.002 * dt * 60;
      skyGroup.rotation.x = THREE.MathUtils.lerp(skyGroup.rotation.x, mouse.y * 0.07, 0.05);
      skyGroup.rotation.y = THREE.MathUtils.lerp(skyGroup.rotation.y, mouse.x * 0.07 + skyGroup.rotation.y, 0.05);

      // 별 반짝임(머티리얼 전체 opacity를 미세 변조)
      starMat.opacity = 0.75 + Math.sin(t * 0.6) * 0.08;

      // 가끔 유성 생성
      shootTimer -= dt;
      if (shootTimer <= 0) {
        if (Math.random() < 0.3) { // 확률
          shooters.push(spawnShootingStar());
        }
        shootTimer = 3 + Math.random() * 4;
      }
      // 유성 업데이트
      shooters = shooters.filter((s) => {
        s.t += dt;
        s.mesh.position.addScaledVector(s.vel, dt);
        s.mesh.material.opacity = Math.max(0, 1 - s.t / s.life);
        if (s.t >= s.life) {
          shootGroup.remove(s.mesh);
          s.mesh.geometry.dispose();
          s.mesh.material.dispose();
          return false;
        }
        return true;
      });

      // 렌더
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);

    // 리사이즈
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // 정리
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      mount.removeChild(renderer.domElement);
      // 메모리 클린업
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      [nebula1, nebula2].forEach((n) => {
        n.material.map.dispose();
        n.material.dispose();
      });
      renderer.dispose();
    };
  }, [starCount, starRadius]);

  // 부모를 꽉 채우도록
  return  <div ref={mountRef} className={`h-full w-full bg-black ${className}`}/>;
}