import React from 'react';

const ButtonBack = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
      className="bg-white text-center w-16 lg:w-16 xl:w-20 rounded-2xl h-8 sm:h-6 md:h-8 lg:h-10 relative text-black text-xs sm:text-sm md:text-base font-semibold group focus:outline-none"
      type="button" 
      onClick={onClick}
    >
      <div className="bg-red-400 rounded-xl h-6 sm:h-[16px] md:h-[24px] lg:h-[32px] w-2/5 flex items-center justify-center absolute left-1 top-[4px]  group-hover:w-[55px] group-hover:lg:w-[72px] z-10 duration-500">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="20px" width="20px" className="group-hover:scale-110 transition-all">
          <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#000000" />
          <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#000000" />
        </svg>
      </div>
      <p className="translate-x-4 group-hover:opacity-0 transition-all duration-300 md:text-[13px]">Atrás</p>
    </button>
  );
}

export default ButtonBack;
