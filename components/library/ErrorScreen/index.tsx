import React from "react";

function index() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 absolute top-0 left-0 bg-primary w-screen h-screen z-[100] p-4">
      <div className="w-20 h-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100%"
          viewBox="0 -960 960 960"
          width="100%"
          fill="#fff"
        >
          <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
        </svg>
      </div>
      <h1 className="text-white text-2xl text-center">
        Vi kan inte nå servrarna just nu. <br />
        Vänligen återkom senare.
      </h1>
    </div>
  );
}

export default index;
