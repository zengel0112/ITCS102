import { useEffect, useRef, useState, useMemo, memo } from "react";
import { Task } from "../types/task";

interface TaskSectionProps {
  task: Task;
}

const TaskSection = memo(({ task }: TaskSectionProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isVideo2Visible, setIsVideo2Visible] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [video2Error, setVideo2Error] = useState(false);
  const highlightCacheRef = useRef<Map<number, HTMLElement>>(new Map());
  const currentHighlightsRef = useRef<Set<number>>(new Set());

  // Memoize code lines processing
  const codeLines = useMemo(() => {
    if (!task.code) return [];
    return task.code.split("\n").filter((line) => line.trim());
  }, [task.code]);

  // Memoize mapping as Map for faster lookup
  const mappingMap = useMemo(() => {
    if (!task.mapping) return null;
    const map = new Map<number, [number, number, number]>();
    task.mapping.forEach(([start, end, idx]) => {
      map.set(idx, [start, end, idx]);
    });
    return map;
  }, [task.mapping]);

  // Intersection Observer for video lazy loading with prefetch
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !task.videoSrc) return;

    // Prefetch video immediately in the background
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = task.videoSrc;
    link.as = "video";
    document.head.appendChild(link);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true);
            // Load video when it becomes visible
            if (!video.src || video.src === window.location.href) {
              video.src = task.videoSrc;
              video.load();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "500px", // Start loading 500px before entering viewport for faster loading
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [task.videoSrc]);

  // Intersection Observer for second video lazy loading with prefetch
  useEffect(() => {
    const video2 = video2Ref.current;
    if (!video2 || !task.videoSrc2) return;

    // Prefetch video immediately in the background
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = task.videoSrc2;
    link.as = "video";
    document.head.appendChild(link);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideo2Visible(true);
            // Load video when it becomes visible
            if (!video2.src || video2.src === window.location.href) {
              if (task.videoSrc2) {
                video2.src = task.videoSrc2;
                video2.load();
              }
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "500px", // Start loading 500px before entering viewport for faster loading
      }
    );

    observer.observe(video2);

    return () => {
      observer.disconnect();
    };
  }, [task.videoSrc2]);

  // Initialize code block HTML first
  useEffect(() => {
    const codeBlock = codeBlockRef.current;
    if (!codeBlock || !task.code) return;

    codeBlock.innerHTML = codeLines
      .map((line, index) => `<span data-line="${index}">${line}</span>`)
      .join("\n");
  }, [task.code, codeLines]);

  // Code highlighting with optimized DOM queries (runs after HTML is set)
  useEffect(() => {
    const video = videoRef.current;
    const codeBlock = codeBlockRef.current;
    if (!video || !codeBlock || !task.mapping || !task.code) return;

    // Small delay to ensure HTML is set
    const timeoutId = setTimeout(() => {
      // Build cache of line elements
      const lineElements = codeBlock.querySelectorAll("[data-line]");
      highlightCacheRef.current.clear();
      lineElements.forEach((el) => {
        const lineNum = parseInt(el.getAttribute("data-line") || "-1", 10);
        if (lineNum >= 0) {
          highlightCacheRef.current.set(lineNum, el as HTMLElement);
        }
      });
    }, 0);

    let lastUpdateTime = 0;
    const throttleDelay = 50;

    const handleTimeUpdate = () => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      lastUpdateTime = now;

      const t = video.currentTime;
      const newHighlights = new Set<number>();

      // Remove old highlights
      currentHighlightsRef.current.forEach((idx) => {
        const el = highlightCacheRef.current.get(idx);
        if (el && el.classList.contains("code-highlight")) {
          el.classList.remove("code-highlight");
        }
      });

      // Find and highlight current lines
      for (const [start, end, idx] of task.mapping!) {
        if (t >= start && t < end) {
          newHighlights.add(idx);
          const lineElement = highlightCacheRef.current.get(idx);
          if (
            lineElement &&
            !lineElement.classList.contains("code-highlight")
          ) {
            lineElement.classList.add("code-highlight");
          }
        }
      }

      currentHighlightsRef.current = newHighlights;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      clearTimeout(timeoutId);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      highlightCacheRef.current.clear();
      currentHighlightsRef.current.clear();
    };
  }, [task, mappingMap, codeLines]);

  return (
    <>
      <div className="task-description text-gray-800 text-left mb-6 md:mb-8 lg:mb-10 w-full max-w-[95%] px-4 text-sm md:text-base lg:text-lg leading-relaxed">
        <strong>{task.title}</strong> {task.description}
      </div>
      <div
        className={`flex-row-container flex justify-center items-start gap-4 md:gap-8 lg:gap-12 w-[95%] ${
          task.imageSrc ? "mb-0 md:mb-8" : "mb-8"
        } relative flex-col md:flex-row`}
      >
        {task.code && <div ref={codeBlockRef} className="code-block" />}
        <div
          className={`kara-container flex-1 min-w-[min(100%,300px)] text-center flex ${
            task.videoSrc2 && !task.code
              ? "flex-col md:flex-row md:justify-between"
              : "flex-col"
          }`}
        >
          {!videoError && task.videoSrc && (
            <video
              ref={videoRef}
              src={isVideoVisible ? task.videoSrc : undefined}
              className={`kara-gif h-auto rounded-lg ${
                task.videoSrc2 && !task.code
                  ? "max-w-full md:max-w-[50%]"
                  : "max-w-full"
              }`}
              style={{
                clipPath: "inset(1.5px 1.5px 1.5px 1.5px)",
                ...(task.videoSrc &&
                  task.videoSrc.includes("/karap1/") && {
                    filter: "hue-rotate(8deg) saturate(1.3)",
                  }),
              }}
              autoPlay
              loop
              muted
              playsInline
              preload={isVideoVisible ? "auto" : "none"}
              onError={() => setVideoError(true)}
            />
          )}
          {task.videoSrc2 && !video2Error && (
            <video
              ref={video2Ref}
              src={isVideo2Visible ? task.videoSrc2 : undefined}
              className={`kara-gif h-auto rounded-lg ${
                !task.code ? "max-w-full md:max-w-[50%]" : "max-w-[50%] mx-auto"
              }`}
              style={{
                clipPath: "inset(1.5px 1.5px 1.5px 1.5px)",
              }}
              autoPlay
              loop
              muted
              playsInline
              preload={isVideo2Visible ? "auto" : "none"}
              onError={() => setVideo2Error(true)}
            />
          )}
          {task.imageSrc && (
            <img
              src={task.imageSrc}
              alt="Kara hacker"
              className="h-auto rounded-lg max-w-full mx-auto mb-0"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </>
  );
});

TaskSection.displayName = "TaskSection";

export default TaskSection;
