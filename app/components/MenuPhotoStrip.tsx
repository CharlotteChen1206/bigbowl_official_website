"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = [
  { id: "DSC01493", alt: "Overhead view of a MalaTang bowl in red broth" },
  { id: "DSC01496", alt: "Big Bowl spread with MalaTang, skewers and sides", wide: true },
  { id: "DSC01479", alt: "MalaTang in a creamy broth with assorted toppings" },
  { id: "DSC01482", alt: "MalaTang with noodles, shrimp and vegetables" },
  { id: "DSC01468", alt: "Grilled skewers on a golden tray" },
  { id: "DSC01458", alt: "Golden spring rolls" },
  { id: "DSC01463", alt: "Golden fried buns with dipping sauce" }
];

export function MenuPhotoStrip() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const gesture = useRef({ x: 0, y: 0, moved: false, active: false, resumeAt: 0, pointerType: "" });
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group || selected || focused || hovered || reducedMotion) return;

    let frame = 0;
    let previous = 0;
    let position = viewport.scrollLeft;
    const tick = (time: number) => {
      const elapsed = previous ? Math.min(time - previous, 50) : 0;
      previous = time;
      if (gesture.current.active || time < gesture.current.resumeAt) {
        position = viewport.scrollLeft;
        frame = requestAnimationFrame(tick);
        return;
      }
      position += elapsed * 0.025;
      const width = group.getBoundingClientRect().width;
      if (width > 0 && position >= width) position %= width;
      viewport.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [selected, focused, hovered, reducedMotion]);

  const finishGesture = () => {
    gesture.current.active = false;
    gesture.current.resumeAt = performance.now() + 800;
  };

  return (
    <section className="menu-photo-strip" aria-label="Big Bowl food gallery">
      <div
        className="menu-photo-viewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Food photos. Scroll horizontally to explore."
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") { setHovered(false); setSelected(null); finishGesture(); } }}
        onFocus={(event) => { if (event.target.matches(":focus-visible")) setFocused(true); }}
        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setSelected(null); } }}
        onKeyDown={(event) => { if (event.key === "Escape") { setSelected(null); event.currentTarget.blur(); } }}
        onPointerDown={(event) => {
          gesture.current = { x: event.clientX, y: event.clientY, moved: false, active: true, resumeAt: 0, pointerType: event.pointerType };
        }}
        onPointerMove={(event) => {
          if (gesture.current.active && Math.hypot(event.clientX - gesture.current.x, event.clientY - gesture.current.y) > 8) {
            gesture.current.moved = true;
            setSelected(null);
          }
        }}
        onPointerUp={finishGesture}
        onPointerCancel={() => { gesture.current.moved = true; setSelected(null); finishGesture(); }}
        onWheel={() => { gesture.current.resumeAt = performance.now() + 800; }}
        onScroll={() => { if (performance.now() < gesture.current.resumeAt) gesture.current.resumeAt = performance.now() + 800; }}
      >
        <div className="menu-photo-track">
          {[0, 1].map((copy) => (
            <div className="menu-photo-group" ref={copy === 0 ? groupRef : undefined} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {photos.map((photo) => (
                <button
                  type="button"
                  className={`menu-photo-frame${photo.wide ? " menu-photo-frame-wide" : ""}${selected === `${copy}-${photo.id}` ? " is-selected" : ""}`}
                  key={photo.id}
                  tabIndex={copy === 1 ? -1 : 0}
                  aria-label={photo.alt}
                  aria-pressed={selected === `${copy}-${photo.id}`}
                  onClick={(event) => {
                    if (event.detail !== 0 && (gesture.current.moved || gesture.current.pointerType === "mouse")) return;
                    setSelected((value) => value === `${copy}-${photo.id}` ? null : `${copy}-${photo.id}`);
                  }}
                >
                  <Image draggable={false} src={`/menu-photos/${photo.id}-updated.webp`} alt="" fill sizes={photo.wide ? "(max-width: 720px) 320px, 448px" : "(max-width: 720px) 180px, 252px"} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
