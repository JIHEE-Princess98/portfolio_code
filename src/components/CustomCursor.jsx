import { useEffect, useRef } from "react";

export default function CustomCursor() {

    const canvasRef = useRef(null);
    const rafRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { alpha: true });
      const dpr = window.devicePixelRatio || 1;

      // 리사이즈 핸들러
      const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      resize();
      window.addEventListener("resize", resize);

      // 파티클 생성 함수
      const addParticles = (count, x, y, burst = false) => {
        for (let i = 0; i < count; i++) {
          const angle = burst ? Math.random() * Math.PI * 2 : (Math.random() * 0.8 - 0.4);
          const speed = burst ? 2 + Math.random() * 5 : 0.5 + Math.random() * 1.5;
          const hue = (Date.now() / 20 + Math.random() * 60) % 360;

          particlesRef.current.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 0,
            maxLife: 30 + Math.random() * 30,
            size: burst ? 2 + Math.random() * 2 : 1 + Math.random() * 1.5,
            hue,
          });
        }
      };

      // 이벤트 핸들러
      const onMove = e => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        addParticles(5, e.clientX, e.clientY);
      };
      const onClick = () => {
        addParticles(100, mouseRef.current.x, mouseRef.current.y, true);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("click", onClick);

      // 애니메이션 루프
      const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "lighter";

        const arr = particlesRef.current;
        for (let i = arr.length - 1; i >= 0; i--) {
          const p = arr[i];
          p.life++;
          p.vy += 0.05; // 중력
          p.x += p.vx;
          p.y += p.vy;

          if (p.life >= p.maxLife) {
            arr.splice(i, 1);
            continue;
          }

          const t = p.life / p.maxLife;
          const alpha = 1 - t;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * (1 + t * 2));
          gradient.addColorStop(0, `hsla(${p.hue},100%,70%,${alpha})`);
          gradient.addColorStop(1, `hsla(${p.hue},100%,50%,0)`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // 마우스 위치에 작은 발광 효과
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
        ctx.fill();

        rafRef.current = requestAnimationFrame(tick);
      };
      tick();

      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("click", onClick);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
      />
    );
  }