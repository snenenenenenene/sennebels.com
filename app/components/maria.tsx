"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Maria, in three dimensions, standing over the plants.
 *
 * three is only pulled in when this mounts, so the rest of the site never pays
 * for it. The model is Draco-compressed and the decoder is served from
 * /public rather than a CDN, because nothing else here loads from one either.
 */
export function Maria() {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let stop = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
      const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (stop) return;

      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(el.clientWidth, el.clientHeight);
      // Filmic response with the exposure pulled down, so her white fur rolls
      // off instead of clipping to a flat sheet.
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.82;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, el.clientWidth / el.clientHeight, 0.1, 100);

      // Light her from a whole room rather than one lamp. A single directional
      // light is what made the first pass look hard: it carves a bright side
      // and a black side with nothing in between.
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      // The room is a bright neutral box. At full strength it washes a mostly
      // white cat out against a cream page, so it only sets the shaping and
      // her own colour does the rest.
      scene.environmentIntensity = 0.78;

      const fill = new THREE.HemisphereLight(0xfff6ec, 0x8d8878, 0.45);
      scene.add(fill);
      const key = new THREE.DirectionalLight(0xfff4e8, 0.45);
      key.position.set(2.5, 4, 3.5);
      scene.add(key);

      const draco = new DRACOLoader().setDecoderPath("/draco/");
      const loader = new GLTFLoader().setDRACOLoader(draco);

      const pivot = new THREE.Group();
      scene.add(pivot);

      loader.load("/models/maria.glb", (gltf) => {
        if (stop) return;
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const span = box.getSize(new THREE.Vector3()).length();
        gltf.scene.position.sub(box.getCenter(new THREE.Vector3()));
        pivot.add(gltf.scene);
        // Framed on the widest side, since it turns: too tight and the
        // plants clip out of frame as it comes round.
        camera.position.set(0, span * 0.05, span * 0.98);
        camera.lookAt(0, 0, 0);
        setReady(true);
      });

      // Drag to turn her. Just the one axis: there is no reason to let someone
      // tip a cat upside down, and it saves pulling in OrbitControls.
      let spin = 0.35;
      let dragging = false;
      let last = 0;
      let velocity = 0;

      const down = (e: PointerEvent) => {
        dragging = true;
        last = e.clientX;
        el.setPointerCapture(e.pointerId);
      };
      const move = (e: PointerEvent) => {
        if (!dragging) return;
        velocity = (e.clientX - last) * 0.006;
        spin += velocity;
        last = e.clientX;
      };
      const up = () => {
        dragging = false;
      };
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);

      const resize = () => {
        renderer.setSize(el.clientWidth, el.clientHeight);
        camera.aspect = el.clientWidth / el.clientHeight;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let frame = 0;
      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (!dragging) {
          // Carry the throw, then settle back to the idle turn.
          velocity *= 0.94;
          spin += velocity + (still ? 0 : 0.0025);
        }
        pivot.rotation.y = spin;
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        ro.disconnect();
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        renderer.dispose();
        draco.dispose();
        pmrem.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      stop = true;
      cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={host}
        className="h-[340px] w-full cursor-grab touch-pan-y active:cursor-grabbing sm:h-[440px]"
        aria-label="Maria, in 3D, standing over a row of houseplants"
        role="img"
      />
      <p className="text-caption text-ink-3">
        {ready ? "Drag to turn her." : "Fetching Maria."}
      </p>
    </div>
  );
}
