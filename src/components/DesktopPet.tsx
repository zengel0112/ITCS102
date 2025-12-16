import { useEffect, useRef, useState } from "react";

const PET_VARIANTS = [
  "desktop_pet/kara.png",
  "desktop_pet/kara_blue.png",
  "desktop_pet/kara_gray.png",
  "desktop_pet/kara_purple.png",
  "desktop_pet/kara_yellow.png",
] as const;

// Keep the same variant while the SPA is alive,
// but pick a new one on full page reload.
let currentPetVariant: (typeof PET_VARIANTS)[number] | null = null;

const DesktopPet = () => {
  const petRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const movingRef = useRef(true);
  const containerRef = useRef<HTMLElement | null>(null);

  const [petSrc] = useState(() => {
    if (!currentPetVariant) {
      currentPetVariant =
        PET_VARIANTS[Math.floor(Math.random() * PET_VARIANTS.length)];
    }
    return `${import.meta.env.BASE_URL}${currentPetVariant}`;
  });

  const PET_SIZE = 30;
  const STEP = 20;
  const TICK_MS = 500;
  const MOUSE_THROTTLE_MS = 50; // Throttle mouse/touch events
  const RESIZE_DEBOUNCE_MS = 150; // Debounce resize events

  useEffect(() => {
    const pet = petRef.current;
    if (!pet) return;

    // Find the content-container
    const findContainer = (): HTMLElement => {
      const container = document.querySelector(
        ".content-container:not(.hidden)"
      ) as HTMLElement;
      if (container) {
        containerRef.current = container;
        return container;
      }
      return document.body;
    };

    let container = findContainer();

    // Wait a bit if container not found
    if (!container || container === document.body) {
      const timeoutId = setTimeout(() => {
        container = findContainer();
        if (container && pet) {
          setupPet(container, pet);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }

    const cleanup = setupPet(container, pet);
    return cleanup;
  }, []);

  const setupPet = (container: HTMLElement, pet: HTMLImageElement) => {
    const updateRect = () => container.getBoundingClientRect();
    let rect = updateRect();

    const clampToContainer = (px: number, py: number) => {
      const minX = 0;
      const maxX = rect.width - PET_SIZE;
      const minY = 0;
      const maxY = rect.height - PET_SIZE;
      return [
        Math.max(minX, Math.min(maxX, px)),
        Math.max(minY, Math.min(maxY, py)),
      ];
    };

    const savedPos = localStorage.getItem("karaPetPosition");
    let initialX = 0;
    let initialY = 0;

    if (savedPos) {
      try {
        const pos = JSON.parse(savedPos);
        const [x, y] = clampToContainer(pos.x, pos.y);
        initialX = x;
        initialY = y;
      } catch {
        const initialLeft = Math.floor(
          Math.random() * Math.max(1, rect.width - PET_SIZE)
        );
        const initialTop = rect.height - PET_SIZE - 8;
        const [x, y] = clampToContainer(initialLeft, initialTop);
        initialX = x;
        initialY = y;
      }
    } else {
      const initialLeft = Math.floor(
        Math.random() * Math.max(1, rect.width - PET_SIZE)
      );
      const initialTop = rect.height - PET_SIZE - 8;
      const [x, y] = clampToContainer(initialLeft, initialTop);
      initialX = x;
      initialY = y;
    }

    positionRef.current = { x: initialX, y: initialY };
    targetRef.current = { x: initialX, y: initialY };
    setPosition({ x: initialX, y: initialY });
    pet.style.left = `${initialX}px`;
    pet.style.top = `${initialY}px`;
    pet.style.position = "absolute";

    let lastMoveTime = 0;
    let animationFrameId: number | null = null;

    const moveStep = () => {
      if (!movingRef.current || !pet) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        return;
      }

      const now = performance.now();
      if (now - lastMoveTime < TICK_MS) {
        animationFrameId = requestAnimationFrame(moveStep);
        return;
      }
      lastMoveTime = now;

      rect = updateRect();

      const currentPos = positionRef.current;
      const currentTarget = targetRef.current;
      const dx = currentTarget.x - currentPos.x;
      const dy = currentTarget.y - currentPos.y;

      if (Math.abs(dx) <= STEP && Math.abs(dy) <= STEP) {
        positionRef.current = { x: currentTarget.x, y: currentTarget.y };
        setPosition({ x: currentTarget.x, y: currentTarget.y });
        pet.style.left = `${currentTarget.x}px`;
        pet.style.top = `${currentTarget.y}px`;
      } else {
        const ang = Math.atan2(dy, dx);
        const newX = currentPos.x + Math.round(Math.cos(ang) * STEP);
        const newY = currentPos.y + Math.round(Math.sin(ang) * STEP);
        const [clampedX, clampedY] = clampToContainer(newX, newY);

        positionRef.current = { x: clampedX, y: clampedY };
        setPosition({ x: clampedX, y: clampedY });
        pet.style.left = `${clampedX}px`;
        pet.style.top = `${clampedY}px`;

        // Rotate pet to face cursor - improved sensitivity (rotates when moving 8+ pixels)
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 8) {
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          // Add 90 degrees because the image faces up by default
          const rotation = angle + 90;
          pet.style.transform = `rotate(${rotation}deg)`;
        } else if (distance > 0.5) {
          // Smooth rotation for smaller movements
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          const rotation = angle + 90;
          const currentRotation = pet.style.transform.match(
            /rotate\(([-\d.]+)deg\)/
          );
          const currentRot = currentRotation
            ? parseFloat(currentRotation[1])
            : rotation;
          // Smooth interpolation for small movements
          const smoothRot = currentRot + (rotation - currentRot) * 0.3;
          pet.style.transform = `rotate(${smoothRot}deg)`;
        }
      }

      animationFrameId = requestAnimationFrame(moveStep);
    };

    animationFrameId = requestAnimationFrame(moveStep);

    const setTargetFromClient = (clientX: number, clientY: number) => {
      rect = updateRect();
      const containerX = clientX - rect.left;
      const containerY = clientY - rect.top;
      const desiredX = containerX - PET_SIZE / 2;
      const desiredY = containerY - PET_SIZE / 2;
      const [clampedX, clampedY] = clampToContainer(desiredX, desiredY);
      targetRef.current = { x: clampedX, y: clampedY };
    };

    let lastMouseUpdate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < MOUSE_THROTTLE_MS) return;
      lastMouseUpdate = now;
      // Store last mouse event for resuming after fall
      (window as any).lastMouseEvent = e;
      setTargetFromClient(e.clientX, e.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      setTargetFromClient(t.clientX, t.clientY);
    };

    let lastTouchUpdate = 0;
    const handleTouchMove = (e: TouchEvent) => {
      const now = performance.now();
      if (now - lastTouchUpdate < MOUSE_THROTTLE_MS) return;
      lastTouchUpdate = now;
      const t = e.touches[0];
      setTargetFromClient(t.clientX, t.clientY);
    };

    const playRotateAndFall = () => {
      if (!movingRef.current || !pet) return;
      movingRef.current = false;
      rect = updateRect();

      const currentRotation = pet.style.transform.match(
        /rotate\(([-\d.]+)deg\)/
      );
      const startDeg = currentRotation ? parseFloat(currentRotation[1]) : 0;
      const startY = positionRef.current.y;
      const bottomY = rect.height - PET_SIZE - 4;

      pet.style.transition = "none";

      const FALL_SPEED = 600;
      const ROTATION_SPEED = 720;
      let startTime: number | null = null;
      let currentY = startY;
      let currentDeg = startDeg;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 1000;

        currentY = startY + FALL_SPEED * elapsed;
        currentDeg = startDeg + ROTATION_SPEED * elapsed;

        if (currentY >= bottomY) {
          pet.style.top = `${bottomY}px`;
          pet.style.transform = `rotate(${(startDeg + 360) % 360}deg)`;
          positionRef.current = { ...positionRef.current, y: bottomY };
          targetRef.current = { ...targetRef.current, y: bottomY };
          setPosition({ ...positionRef.current });
          pet.style.transition = "";
          // Resume following cursor after 2 seconds
          setTimeout(() => {
            movingRef.current = true;
            // Update target to current cursor position if available
            const lastMouseEvent = (window as any).lastMouseEvent;
            if (lastMouseEvent) {
              setTargetFromClient(
                lastMouseEvent.clientX,
                lastMouseEvent.clientY
              );
            }
            // Restart the movement animation loop
            if (!animationFrameId && pet) {
              animationFrameId = requestAnimationFrame(moveStep);
            }
          }, 2000);
        } else {
          pet.style.top = `${currentY}px`;
          pet.style.transform = `rotate(${currentDeg}deg)`;
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    pet.addEventListener("click", playRotateAndFall);
    pet.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        playRotateAndFall();
      },
      { passive: false }
    );

    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = window.setTimeout(() => {
        rect = updateRect();
        resizeTimeout = null;
      }, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleResize, {
      passive: true,
      capture: true,
    });

    const handleBeforeUnload = () => {
      const currentPos = positionRef.current;
      localStorage.setItem(
        "karaPetPosition",
        JSON.stringify({ x: currentPos.x, y: currentPos.y })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Update container when page changes - optimized to watch only content containers
    const observer = new MutationObserver((mutations) => {
      // Only check if class attributes changed
      const shouldCheck = mutations.some(
        (mutation) =>
          mutation.type === "attributes" && mutation.attributeName === "class"
      );
      if (!shouldCheck && mutations.every((m) => m.type !== "childList")) {
        return;
      }

      const newContainer = document.querySelector(
        ".content-container:not(.hidden)"
      ) as HTMLElement;
      if (newContainer && newContainer !== container) {
        container = newContainer;
        containerRef.current = newContainer;
        rect = newContainer.getBoundingClientRect();
      }
    });
    // Watch only body for class changes on content-container elements
    observer.observe(document.body, {
      childList: true,
      subtree: false, // Only direct children
      attributes: true,
      attributeFilter: ["class"],
    });

    // Return cleanup function
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
        resizeTimeout = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      pet.removeEventListener("click", playRotateAndFall);
      observer.disconnect();
    };
  };

  return (
    <img
      ref={petRef}
      id="kara-pet"
      src={petSrc}
      alt="kara pet"
      aria-hidden="true"
      className="absolute z-[9999] block w-9 h-9 touch-none pointer-events-auto"
      style={{
        transition: "transform 0.0s linear",
        left: `${position.x}px`,
        top: `${position.y}px`,
        willChange: "transform, left, top",
      }}
      draggable={false}
    />
  );
};

export default DesktopPet;
