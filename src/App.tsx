import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskSection from "./components/TaskSection";
import DesktopPet from "./components/DesktopPet";
import Pagination from "./components/Pagination";
import ScrollToTop from "./components/ScrollToTop";
import { tasksPage1, tasksPage2, tasksPage3 } from "./data/tasks";

function App() {
  // Restore current page from localStorage on initial load
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  // Prefetch videos for ALL pages once to make navigation smoother
  useEffect(() => {
    const prefetchVideos = async (tasks: typeof tasksPage1) => {
      const baseUrl = import.meta.env.BASE_URL || "/";
      const prefetchPromises = tasks.map(async (task) => {
        const videos = [task.videoSrc, task.videoSrc2].filter(
          Boolean
        ) as string[];
        return videos.map(async (videoSrc) => {
          try {
            const link = document.createElement("link");
            link.rel = "prefetch";
            link.href = `${baseUrl}${videoSrc.replace(/^\//, "")}`;
            link.as = "video";
            document.head.appendChild(link);
          } catch {
            // Ignore prefetch errors
          }
        });
      });
      await Promise.all(prefetchPromises.flat());
    };

    prefetchVideos(tasksPage1);
    prefetchVideos(tasksPage2);
    prefetchVideos(tasksPage3);
  }, []);

  useEffect(() => {
    // Restore scroll position on page load/refresh
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    if (savedScrollPosition) {
      const scrollPosition = parseInt(savedScrollPosition, 10);
      // Small delay to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: "auto",
        });
      }, 100);
    }

    // Save scroll position before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };

    // Optimized scroll position saving with throttling and debouncing
    let scrollTimeout: number | null = null;
    let lastSaveTime = 0;
    const throttleDelay = 200; // Save at most every 200ms
    const debounceDelay = 500; // Final save 500ms after scrolling stops

    const handleScroll = () => {
      const now = Date.now();

      // Throttle: only save if enough time has passed
      if (now - lastSaveTime < throttleDelay) {
        return;
      }
      lastSaveTime = now;

      // Clear previous debounce timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Debounce: save immediately for throttled updates, then save again after scroll stops
      const savePosition = () => {
        const scrollY = window.scrollY;
        // Use requestIdleCallback if available for non-blocking I/O
        if ("requestIdleCallback" in window) {
          requestIdleCallback(
            () => {
              sessionStorage.setItem("scrollPosition", scrollY.toString());
            },
            { timeout: 1000 }
          );
        } else {
          sessionStorage.setItem("scrollPosition", scrollY.toString());
        }
      };

      savePosition();

      // Final save after scroll stops
      scrollTimeout = window.setTimeout(() => {
        savePosition();
        scrollTimeout = null;
      }, debounceDelay);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return (
    <>
      <div className="avatar-container-mobile fixed top-6 right-6 z-[10000] md:hidden">
        <div className="avatar-frame relative w-[150px] h-[150px] cursor-pointer group">
          <img
            src={`${import.meta.env.BASE_URL}avatar/frame.png`}
            alt="Frame"
            className="frame-img absolute top-0 left-0 w-full h-full z-[2]"
            draggable={false}
            loading="lazy"
          />
          <img
            src={`${import.meta.env.BASE_URL}avatar/profilepic.png`}
            alt="Profile Picture"
            className="profile-img absolute top-[-40px] left-[0px] w-[calc(100%+80px)] h-[calc(100%+80px)] z-[1] rounded-full object-cover scale-[0.85]"
            draggable={false}
            loading="lazy"
          />
          <div
            className="hover-info absolute bg-gradient-to-b from-[#3c96d6] to-[#1c5a8b] text-white py-2 px-3 rounded whitespace-nowrap top-full left-1/2 -translate-x-1/2 translate-y-2.5 opacity-0 invisible transition-all duration-300 z-[3] border border-[#1c5a8b] text-[0.9rem] pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:translate-y-1 group-active:opacity-100 group-active:visible group-active:translate-y-1"
            style={{
              boxShadow:
                "0 0 10px rgba(0,0,0,0.3), inset 0 1px rgba(255,255,255,0.3)",
            }}
          >
            25B1NUM1853 Battsengel. B
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[#3c96d6]"></div>
          </div>
        </div>
      </div>
      <div
        className={`content-container ${
          currentPage === 2 || currentPage === 3 ? "hidden" : "flex"
        }`}
      >
        <Header />

        {tasksPage1.map((task, index) => (
          <TaskSection key={index} task={task} />
        ))}

        <div className="task-description mt-6 text-gray-800 text-left mb-6 w-full max-w-[95%] px-4 text-sm md:text-base lg:text-lg leading-relaxed">
          Таны зохиосон програм хэр „тогтвортой" талаар бодож үзнэ үү. Жишээлбэл
          хананд нэг „онгорхой" (нэг мод дутуу) байвал яах вэ? Гэсэн ч ажиллах
          уу? Ямар нөхцөлүүдэд?
        </div>

        <div className="flex-row-container flex justify-center items-start gap-4 md:gap-8 lg:gap-12 w-[95%] mb-8 relative">
          <div className="case-container flex-1 flex flex-col items-center gap-4 min-w-[200px]">
            <div className="case-description bg-bg-darker text-white p-4 rounded-lg text-sm leading-relaxed text-center w-full min-h-[80px] flex items-center justify-center">
              Алдаатай: Урд болон баруун талд модтой үед л зүүн эргэдэг
              болохоор, хана баруун талдаа хоосон үед Кара буруу замаар яваад
              loop үүсч байсан.
            </div>
            <div className="kara-container flex-1 min-w-[min(100%,300px)] text-center">
              <video
                src={`${import.meta.env.BASE_URL}gifs/karap1/task4sub1.webm`}
                className="kara-gif max-w-full h-auto rounded-lg"
                style={{
                  filter: "hue-rotate(8deg) saturate(1.3)",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
            </div>
          </div>

          <div className="case-container flex-1 flex flex-col items-center gap-4 min-w-[200px]">
            <div className="case-description bg-bg-darker text-white p-4 rounded-lg text-sm leading-relaxed text-center w-full min-h-[80px] flex items-center justify-center">
              Тогтвортой: Баруун тал хоосон бол зүүн тал хоосон байх нь
              хамаагүй. Шууд л баруун явна, хэвийн ажиллана. Учир нь баруун
              гарын дүрмийг ашигласан. Right&gt;Left.
            </div>
            <div className="kara-container flex-1 min-w-[min(100%,300px)] text-center">
              <video
                src={`${import.meta.env.BASE_URL}gifs/karap1/task4sub2.webm`}
                className="kara-gif max-w-full h-auto rounded-lg"
                style={{
                  filter: "hue-rotate(8deg) saturate(1.3)",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
            </div>
          </div>

          <div className="case-container flex-1 flex flex-col items-center gap-4 min-w-[200px]">
            <div className="case-description bg-bg-darker text-white p-4 rounded-lg text-sm leading-relaxed text-center w-full min-h-[80px] flex items-center justify-center">
              Сайжруулсан: Кара урд модгүй байвал урагшаа шууд явдаг, Баруун тал
              хоосон байх нь хамаагүй гэсэн үг. Front&gt;Right&gt;Left.
            </div>
            <div className="kara-container flex-1 min-w-[min(100%,300px)] text-center">
              <video
                src={`${import.meta.env.BASE_URL}gifs/karap1/task4sub3.webm`}
                className="kara-gif max-w-full h-auto rounded-lg"
                style={{
                  filter: "hue-rotate(8deg) saturate(1.3)",
                }}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
              />
            </div>
          </div>
        </div>

        {currentPage === 1 && <DesktopPet />}
      </div>
      <Pagination
        type="next"
        onNavigate={() => setCurrentPage(2)}
        currentPage={currentPage}
      />

      <div
        className={`content-container page-2 ${
          currentPage === 1 || currentPage === 3 ? "hidden" : "flex"
        } mt-0`}
      >
        <Header />

        {tasksPage2.map((task, index) => (
          <TaskSection key={index} task={task} />
        ))}
        {currentPage === 2 && <DesktopPet />}
      </div>
      <Pagination
        type="prev"
        onNavigate={() => setCurrentPage(1)}
        currentPage={currentPage}
      />
      {currentPage === 2 && (
        <Pagination
          type="next"
          onNavigate={() => setCurrentPage(3)}
          currentPage={currentPage}
        />
      )}

      <div
        className={`content-container page-3 ${
          currentPage === 1 || currentPage === 2 ? "hidden" : "flex"
        } mt-0`}
      >
        <Header />

        {tasksPage3.map((task, index) => (
          <TaskSection key={index} task={task} />
        ))}
        {currentPage === 3 && <DesktopPet />}
      </div>
      {currentPage === 3 && (
        <Pagination
          type="prev"
          onNavigate={() => setCurrentPage(2)}
          currentPage={currentPage}
        />
      )}

      <ScrollToTop />
    </>
  );
}

export default App;
