import React from "react";

const BackDrop: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="242"
    height="191"
    viewBox="0 0 242 191"
    fill="none"
  >
    <mask
      id="mask0_1_153"
      style={{ maskType: "alpha" }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="242"
      height="191"
    >
      <rect width="241.171" height="190.519" rx="32" fill="#4CD7F6" />
    </mask>
    <g mask="url(#mask0_1_153)">
      <g opacity="0.9" filter="url(#filter0_f_1_153)">
        <ellipse
          cx="181.005"
          cy="149.756"
          rx="104.005"
          ry="95.7555"
          fill="var(--main-color)"
        />
      </g>
      <g opacity="0.9" filter="url(#filter1_f_1_153)">
        <ellipse
          cx="27.1317"
          cy="30.7608"
          rx="60.2927"
          ry="59.5371"
          fill="var(--drop-secondary)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_1_153"
        x="-22"
        y="-45"
        width="406.01"
        height="389.511"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="49.5"
          result="effect1_foregroundBlur_1_153"
        />
      </filter>
      <filter
        id="filter1_f_1_153"
        x="-105.161"
        y="-100.776"
        width="264.585"
        height="263.074"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="36"
          result="effect1_foregroundBlur_1_153"
        />
      </filter>
    </defs>
  </svg>
);

export default BackDrop;
