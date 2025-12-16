import { AuroraBackground } from "./ui/aurora-background";

const Header = () => {
  return (
    <AuroraBackground className="header-container w-full p-6 md:p-8 lg:p-12 mb-8 md:mb-12 lg:mb-16 rounded-lg shadow-md bg-gradient-to-b from-gray-600 to-gray-800 border border-blue-300/50 relative overflow-hidden">
      {/* University logo overlay */}
      <div className="header-logo-overlay pointer-events-none">
        <img src={`${import.meta.env.BASE_URL}badge/logo-eng.png`} alt="" />
      </div>
      <div className="header-content flex justify-between items-center gap-8 relative z-10">
        <h1
          className="page-title text-xl md:text-2xl lg:text-3xl leading-snug px-4 relative m-0 flex-1 font-extrabold"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
          }}
        >
          <span className="text-white">ITCS102 </span>
          <span className="text-white">Программчлалын арга зүй </span>
          <span className="text-white">(пайтон)</span>
          <br />
          <span className="text-white ml-4">(Ерөнхий суурь)</span>
        </h1>
        <div className="avatar-container-desktop flex-shrink-0 relative hidden md:block">
          <div className="avatar-frame relative w-[150px] h-[150px] cursor-pointer group">
            <img
              src={`${import.meta.env.BASE_URL}avatar/frame.png`}
              alt="Frame"
              className="frame-img absolute top-0 left-0 w-full h-full z-[2]"
              draggable={false}
            />
            <img
              src={`${import.meta.env.BASE_URL}avatar/profilepic.png`}
              alt="Profile Picture"
              className="profile-img absolute top-[-40px] left-[0px] w-[calc(100%+80px)] h-[calc(100%+80px)] z-[1] rounded-full object-cover scale-[0.85]"
              draggable={false}
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
      </div>
    </AuroraBackground>
  );
};

export default Header;
