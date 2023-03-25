import React from "react";
import Image from "next/image";

type Props = {};

const icon = {
  motorcycle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
      <path
        fill="#FFF"
        d="M157 856q-65 0-111-45.5T0 699q0-66 45.5-111.5T156 542l-47-36H0v-50h181l99 60 159-60h140l-78-100h-89v-60h119l86 111 129-64v104h-98l85 110q17-7 34-10.5t35-3.5q66 0 112 45.5T960 700q0 66-46 111t-112 45q-65 0-110.5-45.5T646 700q0-30 10-57t30-49l-35-45-146 223H395l-81-73q0 66-45.5 111.5T157 856Zm0-60q41 0 69-28.5t28-68.5q0-40-28-68.5T157 602q-40 0-68.5 28T60 699q0 41 28.5 69t68.5 28Zm645 0q41 0 69.5-28t28.5-68q0-41-28.5-69.5T802 602q-40 0-68 28.5T706 700q0 40 28 68t68 28Z"
      />
    </svg>
  ),
  road: () => (
    <svg viewBox="0 0 48 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1H3V4H0V1Z" fill="#FFF" />
      <path d="M42.5 4.5H45.5V7.5H42.5V4.5Z" fill="#FFF" />
      <path d="M6 3H9V6H6V3Z" fill="#FFF" />
      <path d="M14 0H17V3H14V0Z" fill="#FFF" />
      <path d="M2 7H5V10H2V7Z" fill="#FFF" />
      <path d="M35.5 7H38.5V10H35.5V7Z" fill="#FFF" />
      <path d="M37 0H40V3H37V0Z" fill="#FFF" />
      <path d="M30 2H33V5H30V2Z" fill="#FFF" />
      <path d="M16 6H19V9H16V6Z" fill="#FFF" />
      <path d="M24 5H27V8H24V5Z" fill="#FFF" />
    </svg>
  ),
};

const LoadingScreen = (props: Props) => {
  return (
    <div className="absolute flex gap-10 flex-col justify-center items-center w-full h-full bg-primary z-50">
      <div className="relative w-32 h-36 overflow-hidden">
        <div className="animate-shake">{icon.motorcycle()}</div>
        <div className="animate-marquee relative -top-4 w-[200%]">
          <span className="float-left w-1/2">{icon.road()}</span>
          <span className="float-left w-1/2">{icon.road()}</span>
        </div>
      </div>
      <p className="text-xl text-white">Loading parkingspots</p>
    </div>
  );
};

export default LoadingScreen;
