type BurstPattern = 'peony' | 'chrysanthemum' | 'double-ring' | 'willow';
type ParticleShape = 'streak' | 'star' | 'spark';

interface Rocket {
  active: boolean;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  paletteIndex: number;
  pattern: BurstPattern;
}

interface Particle {
  active: boolean;
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  prev2X: number;
  prev2Y: number;
  vx: number;
  vy: number;
  drag: number;
  gravity: number;
  alpha: number;
  decay: number;
  size: number;
  color: string;
  shape: ParticleShape;
  twinkle: boolean;
}

const PALETTES: readonly (readonly string[])[] = [
  ['#39D9FF', '#087CFF', '#F5FAFF', '#6BE4FF'],
  ['#39D9FF', '#EC42D7', '#F5FAFF', '#B85CFF'],
  ['#F5FAFF', '#39D9FF', '#087CFF', '#FF405B'],
  ['#087CFF', '#39D9FF', '#B85CFF', '#F5FAFF'],
];

const PATTERNS: readonly BurstPattern[] = [
  'chrysanthemum',
  'peony',
  'double-ring',
  'willow',
];

const MAX_ROCKETS = 8;
const MAX_PARTICLES_DESKTOP = 520;
const MAX_PARTICLES_MOBILE = 210;

export function initHeroFireworks(
  canvas: HTMLCanvasElement,
  heroSection: HTMLElement,
  launchButton: HTMLButtonElement | null
): () => void {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) {
    return () => {};
  }

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReducedMotion = reducedMotionQuery.matches;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let isMobile = false;
  let heroRectTop = 0;
  let heroRectLeft = 0;

  let isVisibleInViewport = true;
  let isPageVisible = !document.hidden;
  let rafId: number | null = null;
  let lastFrameTime = 0;
  let nextAmbientLaunchTime = 0;

  // Pre-allocated pools to prevent garbage collection inside requestAnimationFrame
  const rockets: Rocket[] = Array.from({ length: MAX_ROCKETS }, () => ({
    active: false,
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vx: 0,
    vy: 0,
    targetY: 0,
    color: '#39D9FF',
    paletteIndex: 0,
    pattern: 'chrysanthemum',
  }));

  const particles: Particle[] = Array.from({ length: MAX_PARTICLES_DESKTOP }, () => ({
    active: false,
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    prev2X: 0,
    prev2Y: 0,
    vx: 0,
    vy: 0,
    drag: 0.96,
    gravity: 0.04,
    alpha: 1,
    decay: 0.015,
    size: 2,
    color: '#39D9FF',
    shape: 'streak',
    twinkle: false,
  }));

  function updateDimensions() {
    const rect = heroSection.getBoundingClientRect();
    heroRectTop = rect.top + window.scrollY;
    heroRectLeft = rect.left + window.scrollX;
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    isMobile = width < 768;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function getActiveParticleCap(): number {
    return isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;
  }

  function countActiveParticles(): number {
    let count = 0;
    for (let i = 0; i < MAX_PARTICLES_DESKTOP; i++) {
      if (particles[i].active) count++;
    }
    return count;
  }

  function acquireParticle(): Particle | null {
    if (countActiveParticles() >= getActiveParticleCap()) {
      return null;
    }
    for (let i = 0; i < MAX_PARTICLES_DESKTOP; i++) {
      if (!particles[i].active) {
        return particles[i];
      }
    }
    return null;
  }

  function spawnBurst(x: number, y: number, paletteIndex: number, pattern: BurstPattern) {
    const palette = PALETTES[paletteIndex % PALETTES.length];
    const baseCount = isMobile ? 42 : pattern === 'willow' ? 68 : 78;

    for (let i = 0; i < baseCount; i++) {
      const p = acquireParticle();
      if (!p) break;

      const angle = (Math.PI * 2 * i) / baseCount + (Math.random() - 0.5) * 0.14;
      // 3D spherical projection factor so bursts have volumetric depth
      const depthProjection = Math.cos((Math.random() - 0.5) * Math.PI * 0.88);

      let speed = 2.2 + Math.random() * 3.8;
      let drag = 0.962;
      let gravity = 0.044;
      let decay = 0.012 + Math.random() * 0.01;
      let size = 1.6 + Math.random() * 1.4;
      let color = palette[i % palette.length];
      let shape: ParticleShape = 'streak';

      if (pattern === 'double-ring') {
        const isOuter = i % 2 === 0;
        speed = isOuter ? 4.4 + Math.random() * 0.9 : 2.1 + Math.random() * 0.7;
        color = isOuter ? palette[0] : palette[1];
        shape = isOuter ? 'streak' : 'star';
      } else if (pattern === 'willow') {
        speed = (1.8 + Math.random() * 3.2) * depthProjection;
        drag = 0.952;
        gravity = 0.062;
        decay = 0.0085 + Math.random() * 0.006;
        color = i % 5 === 0 ? '#F5FAFF' : palette[i % 2];
        shape = 'streak';
      } else if (pattern === 'chrysanthemum') {
        speed = (2.6 + Math.random() * 3.6) * depthProjection;
        drag = 0.968;
        shape = i % 6 === 0 ? 'star' : 'streak';
      } else {
        speed = (2.0 + Math.random() * 3.4) * depthProjection;
        shape = i % 4 === 0 ? 'spark' : 'streak';
      }

      p.active = true;
      p.x = x;
      p.y = y;
      p.prevX = x;
      p.prevY = y;
      p.prev2X = x;
      p.prev2Y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.drag = drag;
      p.gravity = gravity;
      p.alpha = 1;
      p.decay = decay;
      p.size = size;
      p.color = color;
      p.shape = shape;
      p.twinkle = i % 5 === 0;
    }
  }

  function launchRocket(targetX?: number, targetY?: number) {
    if (isReducedMotion) return;

    let slot: Rocket | null = null;
    for (let i = 0; i < MAX_ROCKETS; i++) {
      if (!rockets[i].active) {
        slot = rockets[i];
        break;
      }
    }
    if (!slot) return;

    // Prefer launching in the upper/right sky on ambient bursts so headline copy on the left stays crystal clear
    const destX =
      targetX !== undefined
        ? Math.max(40, Math.min(width - 40, targetX))
        : isMobile
          ? width * (0.25 + Math.random() * 0.55)
          : width * (0.42 + Math.random() * 0.48);

    const destY =
      targetY !== undefined
        ? Math.max(60, Math.min(height * 0.72, targetY))
        : height * (0.14 + Math.random() * 0.34);

    const startX = destX + (Math.random() - 0.5) * 70;
    const startY = height - 10;
    const distanceY = Math.max(120, startY - destY);
    const flightFrames = 24 + Math.sqrt(distanceY) * 0.65;

    const paletteIndex = Math.floor(Math.random() * PALETTES.length);
    const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];

    slot.active = true;
    slot.x = startX;
    slot.y = startY;
    slot.prevX = startX;
    slot.prevY = startY;
    slot.vx = (destX - startX) / flightFrames;
    slot.vy = -(distanceY / flightFrames) * 1.42;
    slot.targetY = destY;
    slot.paletteIndex = paletteIndex;
    slot.color = PALETTES[paletteIndex][0];
    slot.pattern = pattern;
  }

  function stepFrame(timestamp: number) {
    if (!isVisibleInViewport || !isPageVisible || isReducedMotion) {
      rafId = null;
      return;
    }

    const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.667, 2.2) : 1;
    lastFrameTime = timestamp;

    // Ambient launch cadence: restrained and atmospheric
    if (timestamp >= nextAmbientLaunchTime) {
      launchRocket();
      const baseInterval = isMobile ? 3600 : 2400;
      nextAmbientLaunchTime = timestamp + baseInterval + Math.random() * 1800;
    }

    // Fade existing trails cleanly without leaving permanent gray smudges on transparent canvas
    ctx!.globalCompositeOperation = 'destination-out';
    ctx!.fillStyle = 'rgba(7, 20, 38, 0.24)';
    ctx!.fillRect(0, 0, width, height);
    ctx!.globalCompositeOperation = 'lighter';

    // Update & draw rockets
    for (let i = 0; i < MAX_ROCKETS; i++) {
      const r = rockets[i];
      if (!r.active) continue;

      r.prevX = r.x;
      r.prevY = r.y;
      r.x += r.vx * dt;
      r.y += r.vy * dt;
      r.vy *= Math.pow(0.986, dt);

      ctx!.beginPath();
      ctx!.strokeStyle = r.color;
      ctx!.lineWidth = 2;
      ctx!.moveTo(r.prevX, r.prevY);
      ctx!.lineTo(r.x, r.y);
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.fillStyle = '#F5FAFF';
      ctx!.arc(r.x, r.y, 2.1, 0, Math.PI * 2);
      ctx!.fill();

      if (r.y <= r.targetY || r.vy >= -1.1) {
        r.active = false;
        spawnBurst(r.x, r.y, r.paletteIndex, r.pattern);
      }
    }

    // Update & draw burst particles
    for (let i = 0; i < MAX_PARTICLES_DESKTOP; i++) {
      const p = particles[i];
      if (!p.active) continue;

      p.prev2X = p.prevX;
      p.prev2Y = p.prevY;
      p.prevX = p.x;
      p.prevY = p.y;

      const dragFactor = Math.pow(p.drag, dt);
      p.vx *= dragFactor;
      p.vy = p.vy * dragFactor + p.gravity * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.alpha -= p.decay * dt;

      if (p.alpha <= 0.02 || p.y > height + 20) {
        p.active = false;
        continue;
      }

      const flicker =
        p.twinkle && p.alpha < 0.38 ? (Math.sin(timestamp * 0.04 + i) > 0 ? 1 : 0.25) : 1;
      ctx!.globalAlpha = Math.max(0, p.alpha * flicker);

      if (p.shape === 'streak') {
        ctx!.beginPath();
        ctx!.strokeStyle = p.color;
        ctx!.lineWidth = p.size;
        ctx!.lineCap = 'round';
        ctx!.moveTo(p.prev2X, p.prev2Y);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();
      } else if (p.shape === 'star') {
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 0.95, 0, Math.PI * 2);
        ctx!.fill();

        if (p.alpha > 0.45) {
          ctx!.strokeStyle = '#F5FAFF';
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(p.x - p.size * 2.2, p.y);
          ctx!.lineTo(p.x + p.size * 2.2, p.y);
          ctx!.moveTo(p.x, p.y - p.size * 2.2);
          ctx!.lineTo(p.x, p.y + p.size * 2.2);
          ctx!.stroke();
        }
      } else {
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = 'source-over';
    rafId = window.requestAnimationFrame(stepFrame);
  }

  function startLoop() {
    if (rafId !== null || isReducedMotion || !isVisibleInViewport || !isPageVisible) {
      return;
    }
    lastFrameTime = 0;
    nextAmbientLaunchTime = performance.now() + 350;
    rafId = window.requestAnimationFrame(stepFrame);
  }

  function stopLoop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function triggerSalvo() {
    if (isReducedMotion) return;
    startLoop();
    const firstX = width * (isMobile ? 0.35 : 0.56);
    const secondX = width * (isMobile ? 0.68 : 0.78);
    launchRocket(firstX, height * 0.24);
    window.setTimeout(() => {
      if (!isReducedMotion && isPageVisible) {
        launchRocket(secondX, height * 0.32);
      }
    }, 220);
  }

  // Click/tap interaction on empty areas of the Hero section
  const handleHeroPointerDown = (event: PointerEvent) => {
    if (isReducedMotion) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('a, button, input, select, textarea, figure')) {
      return;
    }
    const localX = event.pageX - heroRectLeft;
    const localY = event.pageY - heroRectTop;
    startLoop();
    launchRocket(localX, Math.min(localY, height * 0.65));
  };

  const handleLaunchBtnClick = () => {
    triggerSalvo();
  };

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden;
    if (isPageVisible) {
      startLoop();
    } else {
      stopLoop();
    }
  };

  const handleReducedMotionChange = (event: MediaQueryListEvent) => {
    isReducedMotion = event.matches;
    if (isReducedMotion) {
      stopLoop();
      ctx.clearRect(0, 0, width, height);
      if (launchButton) {
        launchButton.setAttribute('aria-disabled', 'true');
        launchButton.title = 'Animațiile sunt oprite conform setării prefers-reduced-motion';
      }
    } else {
      if (launchButton) {
        launchButton.removeAttribute('aria-disabled');
        launchButton.title = '';
      }
      startLoop();
    }
  };

  let resizeTimer: number | null = null;
  const handleResize = () => {
    if (resizeTimer !== null) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      updateDimensions();
    }, 120);
  };

  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isVisibleInViewport = entry.isIntersecting;
        if (isVisibleInViewport) {
          startLoop();
        } else {
          stopLoop();
        }
      }
    },
    { threshold: 0.05 }
  );

  updateDimensions();
  intersectionObserver.observe(heroSection);
  heroSection.addEventListener('pointerdown', handleHeroPointerDown);
  window.addEventListener('resize', handleResize, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
  reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

  if (launchButton) {
    launchButton.addEventListener('click', handleLaunchBtnClick);
    if (isReducedMotion) {
      launchButton.setAttribute('aria-disabled', 'true');
    }
  }

  if (!isReducedMotion) {
    startLoop();
  }

  return () => {
    stopLoop();
    intersectionObserver.disconnect();
    heroSection.removeEventListener('pointerdown', handleHeroPointerDown);
    window.removeEventListener('resize', handleResize);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    if (launchButton) {
      launchButton.removeEventListener('click', handleLaunchBtnClick);
    }
  };
}
