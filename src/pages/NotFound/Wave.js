import React from "react";

const WaveSvg = () => (
  <svg
    height='100%'
    preserveAspectRatio='none'
    viewBox='0 0 64 64'
    width='100%'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient id='grad1' y2='100%'>
        <stop
          offset='0%'
          style={{
            stopColor: "#00c3ef",
            stopOpacity: 1
          }}
        />
        <stop
          offset='100%'
          style={{
            stopColor: "#16ecd1",
            stopOpacity: 1
          }}
        />
      </linearGradient>
    </defs>
    <path
      d='M64 0 C32 0 32 0 0 0 C0 47.42857142857143 58.85714285714286 7.7142857142857135 64 49.857142857142854 L64 49.42857142857143'
      style={{
        stroke: "none",
        fill: "url(#grad1)"
      }}
    />
  </svg>
);

export default WaveSvg;
