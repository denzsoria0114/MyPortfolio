import { useEffect, useRef, useState } from "react";

// Two tilted orbits around the illustrated developer.
const ORBITS = [
  { rx: 96, ry: 30, rot: -16 },
  { rx: 74, ry: 40, rot: 24 },
];
const CX = 120;
const CY = 84;

function pointOnOrbit(orbit, angle) {
  const r = (orbit.rot * Math.PI) / 180;
  const x = orbit.rx * Math.cos(angle);
  const y = orbit.ry * Math.sin(angle);
  return [CX + x * Math.cos(r) - y * Math.sin(r), CY + x * Math.sin(r) + y * Math.cos(r)];
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const filled = { fill: "var(--paper)", stroke: "currentColor", strokeWidth: 1.6, strokeLinejoin: "round" };

/** A floating item that bobs and drifts with the pointer (depth = how far it drifts). */
function Floater({ x, y, depth, delay, children }) {
  return (
    <g
      style={{
        transform: `translate(calc(var(--px) * ${depth}px), calc(var(--py) * ${depth}px))`,
        transition: "transform .5s cubic-bezier(.2,.8,.2,1)",
      }}
    >
      <g className="motion-safe:animate-bob" style={{ animationDelay: `${delay}s` }}>
        <g transform={`translate(${x} ${y})`}>{children}</g>
      </g>
    </g>
  );
}

/** Interactive hero illustration. Click (or press Enter) for a quip; the orbits speed up. */
export default function HeroArt({ quips, reducedMotion }) {
  const wrapRef = useRef(null);
  const dotRefs = useRef([]);
  const energy = useRef(0);
  const counter = useRef(0);
  const anglesRef = useRef(ORBITS.map((_, i) => i * 2.4 + 0.6));
  const [bubbles, setBubbles] = useState([]);
  const [onScreen, setOnScreen] = useState(true);

  // Pause the orbit animation while the illustration is scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Orbit the two dots; hide them while they pass behind the figure.
  useEffect(() => {
    if (reducedMotion || !onScreen) return;
    let frame = 0;
    let last = performance.now();
    const angles = anglesRef.current;
    const tick = (t) => {
      const dt = Math.min(64, t - last) / 1000;
      last = t;
      energy.current *= 0.96;
      ORBITS.forEach((orbit, i) => {
        angles[i] += dt * (i ? -0.5 : 0.36) * (1 + energy.current);
        const [x, y] = pointOnOrbit(orbit, angles[i]);
        const dot = dotRefs.current[i];
        if (!dot) return;
        dot.setAttribute("cx", x.toFixed(2));
        dot.setAttribute("cy", y.toFixed(2));
        dot.style.opacity = Math.sin(angles[i]) < -0.2 && Math.abs(x - CX) < 30 ? "0" : "1";
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, onScreen]);

  const sayHi = () => {
    energy.current = 5;
    if (!quips.length) return;
    const id = ++counter.current;
    setBubbles((b) => [...b.slice(-2), { id, text: quips[id % quips.length] }]);
    setTimeout(() => setBubbles((b) => b.filter((q) => q.id !== id)), 1800);
  };

  const onPointerMove = (e) => {
    const el = wrapRef.current;
    if (!el || reducedMotion) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const onPointerLeave = () => {
    wrapRef.current?.style.setProperty("--px", "0");
    wrapRef.current?.style.setProperty("--py", "0");
  };

  const startDots = ORBITS.map((o, i) => pointOnOrbit(o, i * 2.4 + 0.6));

  return (
    <div
      ref={wrapRef}
      className="group relative h-[138px] w-[207px] cursor-pointer rounded-xl text-accent [--px:0] [--py:0] wide:h-[184px] wide:w-[276px]"
      role="button"
      tabIndex={0}
      aria-label="Say hi to the illustration"
      onClick={sayHi}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          sayHi();
        }
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <svg className="block size-full" viewBox="0 0 240 160" width="240" height="160" aria-hidden="true">
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={CX}
            cy={CY}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.rot} ${CX} ${CY})`}
            {...stroke}
            strokeWidth={1.1}
            opacity={0.75}
          />
        ))}

        {/* the developer at a laptop */}
        <g className="transition-transform duration-500 motion-safe:group-active:translate-y-px">
          <path d="M86 118c2-11 21-14 34-9 13-5 32-2 34 9-3 9-22 10-34 3-12 7-31 6-34-3Z" {...filled} />
          <path d="M101 88c0-14 7-20 19-20s19 6 19 20v16h-38Z" {...filled} />
          <path d="M117 60v8h6v-8" {...stroke} />
          <g>
            <circle cx="120" cy="48" r="13" {...filled} />
            <path
              d="M107.4 46c-1.4-11 6-16 12.6-16 8 0 14 5.6 12.4 16-2-5-5.6-7.6-12.2-7.6-6 0-10.6 2.4-12.8 7.6Z"
              fill="currentColor"
            />
            <path d="M115 52.2h.01M125 52.2h.01" {...stroke} strokeWidth={2.4} />
            <path d="M116.6 56.4c2 1.4 4.8 1.4 6.8 0" {...stroke} strokeWidth={1.3} />
          </g>
          <path d="M103 76c-7 7-7 17 0 26M137 76c7 7 7 17 0 26" {...stroke} />
          <rect x="99" y="82" width="42" height="26" rx="2.5" fill="currentColor" />
          <circle cx="120" cy="95" r="3" style={{ fill: "var(--paper)" }} className="motion-safe:animate-led" />
          <path d="M92 108h56l4 4H88Z" fill="currentColor" />
        </g>

        {/* envelope */}
        <Floater x={44} y={34} depth={6} delay={0}>
          <rect x="0" y="0" width="20" height="14" rx="2.4" {...filled} />
          <path d="m1.2 1.8 8.8 6.4 8.8-6.4" {...stroke} strokeWidth={1.3} />
        </Floater>
        {/* chat bubble */}
        <Floater x={176} y={26} depth={9} delay={0.8}>
          <path d="M3 0h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H9l-5 4v-4H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3Z" {...filled} />
          <path d="M6.6 7h.01M11 7h.01M15.4 7h.01" {...stroke} strokeWidth={2.2} />
        </Floater>
        {/* code window */}
        <Floater x={186} y={104} depth={5} delay={1.6}>
          <rect x="0" y="0" width="24" height="17" rx="3" {...filled} />
          <path d="m9 5.4-3.2 3.1L9 11.6M15 5.4l3.2 3.1-3.2 3.1M13 4.6l-2 7.8" {...stroke} strokeWidth={1.3} />
        </Floater>
        {/* heart */}
        <Floater x={30} y={98} depth={8} delay={2.3}>
          <path
            d="M9 15.4C3.4 11.6 0 8.6 0 5a4.6 4.6 0 0 1 9-1.4A4.6 4.6 0 0 1 18 5c0 3.6-3.4 6.6-9 10.4Z"
            fill="currentColor"
          />
        </Floater>
        {/* sparkles */}
        <Floater x={150} y={8} depth={4} delay={1.2}>
          <path d="M6 0c.5 3.2 2.2 5 6 6-3.8 1-5.5 2.8-6 6-.5-3.2-2.2-5-6-6 3.8-1 5.5-2.8 6-6Z" fill="currentColor" />
        </Floater>
        <Floater x={70} y={132} depth={7} delay={3}>
          <path
            d="M5 0c.4 2.6 1.8 4 5 5-3.2 1-4.6 2.4-5 5-.4-2.6-1.8-4-5-5 3.2-1 4.6-2.4 5-5Z"
            fill="currentColor"
            opacity={0.7}
          />
        </Floater>

        {startDots.map(([x, y], i) => (
          <circle
            key={i}
            ref={(el) => (dotRefs.current[i] = el)}
            cx={x}
            cy={y}
            r={i ? 2.6 : 3.4}
            fill="currentColor"
          />
        ))}
      </svg>

      {bubbles.map((b) => (
        <span
          key={b.id}
          aria-hidden="true"
          className="pointer-events-none absolute top-[44%] left-1/2 -translate-x-1/2 rounded-full bg-ink px-[9px] py-[3px] text-[11px] font-medium whitespace-nowrap text-paper opacity-0 motion-safe:animate-quip motion-reduce:-translate-y-[70px] motion-reduce:opacity-100"
        >
          {b.text}
        </span>
      ))}
    </div>
  );
}
