import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  --text: #84868a;
  --white: #fff;
  --font: "Inter", "Rubik";
  --persian-font: "Rubik";
  --sidebar:#34363a;
  --background:#1a1919;
  --text:#FFFFFF;
  --dark-gray: #1E1E1E;
  --dark-gray-hover: #4A4A4A;
  --bright-blue:#4a90e2;
  --skeleton-base: #202020;
  --skeleton-highlight: #444;
  --error:#d32f2f;
  --success:#388e3c;
  --button:#139EBC;
  --main-color:#7CFDBF;
  --drop-bg-color:#4CD7F6;
  --drop-secondary:#E17CFD;
}
.DARK {
    --text: #e5e7eb;
    --border: #374151;
    --title: #ffffff;
    --background-secondary: #1f2937;
}
.DRACULA{
  --text: #f8f8f2;
  --border: #44475a;
  --title: #50fa7b;
  --background-secondary: #282a36;
  --button: #bd93f9;
  --button-text: #f8f8f2;
}
.SOLAR{
  --text: #657b83;
  --border: #93a1a1;
  --title: #268bd2;
  --background-secondary: #fdf6e3;
  --button: #cb4b16;
  --button-text: #fdf6e3;
}
.NORD{
  --text: #d8dee9;
  --border: #4c566a;
  --title: #81a1c1;
  --background-secondary: #2e3440;
  --button: #88c0d0;
  --button-text: #2e3440;
}
.DISCORD{
  --text: #b9bbbe;
  --border: #4f545c;
  --title: #7289da;
  --background-secondary: #36393f;
  --button: #7289da;
  --button-text: #ffffff;
}
.MIDNIGHT{
  --text: #c3c3c3;
  --border: #586069;
  --title: #99aab5;
  --background-secondary: #292b2f;
  --button: #00bcd4; /* Cyan accent color */
  --button-text: #ffffff;
}
.LOCA{
  --text: #d8dee9;
  --border: #a4acc4;
  --title: #ffcc00;
  --background-secondary: #3d4754;
  --button: #4caf50;
  --button-text: #ffffff;
}
.fa{
  --font:"Rubik" !important;
  direction:rtl ;
}
.ar{
  --font:"Rubik" !important;
  direction:rtl ;
}
.summary-info{
  div {
    color:black !important;
  }
}
.react-joyride__tooltip{
  div {
    color:black !important;
  }
}
body,
html {
  margin: 0;
  width: 100vw;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color:var(--background) ;
}
*{
&::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  color: var(--text);
 box-sizing:border-box;
 font-family : var(--font),sans-serif,system-ui, -apple-system,'Helvetica Neue',"Rubik";
}
input:-webkit-autofill,
input:-webkit-autofill:focus {
  transition:
    background-color 600000s 0s,
    color 600000s 0s;
}
`;
//COLUMN

export const ROW = css`
  display: flex;
  flex-direction: row;
`;
export const COLUMN = css`
  display: flex;
  flex-direction: column;
`;
const CENTER = css`
  align-items: center;
  justify-content: center;
`;
export const COLUMN_CENTER = css`
  ${CENTER}
  ${COLUMN}
`;
export const ROW_CENTER = css`
  ${CENTER}
  ${ROW}
`;
export const COLUMN_JUSTIFY_END__ALIGN_CENTER = css`
  ${COLUMN}
  justify-content: flex-end;
  align-items: center;
`;
export const COLUMN_JUSTIFY_START__ALIGN_CENTER = css`
  ${COLUMN}
  justify-content: flex-start;
  align-items: center;
`;
export const COLUMN_ALIGN_END__JUSTIFY_CENTER = css`
  ${COLUMN}
  justify-content: center;
  align-items: flex-end;
`;
export const COLUMN_ALIGN_START__JUSTIFY_CENTER = css`
  ${COLUMN}
  justify-content: center;
  align-items: flex-start;
`;
export const COLUMN_ALIGN_START__JUSTIFY_START = css`
  ${COLUMN}
  justify-content: flex-start;
  align-items: flex-start;
`;
export const COLUMN_ALIGN_END__JUSTIFY_END = css`
  ${COLUMN}
  justify-content: flex-end;
  align-items: flex-end;
`;
export const COLUMN_ALIGN_START__JUSTIFY_END = css`
  ${COLUMN}
  justify-content: flex-end;
  align-items: flex-start;
`;
export const COLUMN_ALIGN_END__JUSTIFY_START = css`
  ${COLUMN}
  justify-content: flex-start;
  align-items: flex-end;
`;
export const COLUMN_ALIGN_END__SPACE_B = css`
  ${COLUMN}
  justify-content:space-between;
  align-items: flex-end;
`;
export const COLUMN_ALIGN_START__SPACE_B = css`
  ${COLUMN}
  justify-content:space-between;
  align-items: flex-start;
`;
export const COLUMN_ALIGN_CENTER__SPACE_B = css`
  ${COLUMN}
  justify-content:space-between;
  align-items: center;
`;

// ROWS

export const ROW_JUSTIFY_END__ALIGN_CENTER = css`
  ${ROW}
  justify-content: flex-end;
  align-items: center;
`;
export const ROW_JUSTIFY_START__ALIGN_CENTER = css`
  ${ROW}
  justify-content: flex-start;
  align-items: center;
`;
export const ROW_ALIGN_END__JUSTIFY_CENTER = css`
  ${ROW}
  justify-content: center;
  align-items: flex-end;
`;
export const ROW_ALIGN_START__JUSTIFY_CENTER = css`
  ${ROW}
  justify-content: center;
  align-items: flex-start;
`;
export const ROW_ALIGN_START__JUSTIFY_START = css`
  ${ROW}
  justify-content: flex-start;
  align-items: flex-start;
`;
export const ROW_ALIGN_END__JUSTIFY_END = css`
  ${ROW}
  justify-content: flex-end;
  align-items: flex-end;
`;
export const ROW_ALIGN_START__JUSTIFY_END = css`
  ${ROW}
  justify-content: flex-end;
  align-items: flex-end;
`;
export const ROW_ALIGN_END__JUSTIFY_START = css`
  ${ROW}
  justify-content: flex-end;
  align-items: flex-end;
`;
export const ROW_ALIGN_END__SPACE_B = css`
  ${ROW}
  justify-content:space-between;
  align-items: flex-end;
`;
export const ROW_ALIGN_START__SPACE_B = css`
  ${ROW}
  justify-content:space-between;
  align-items: flex-start;
`;
export const ROW_ALIGN_CENTER__SPACE_AROUND = css`
  ${ROW}
  justify-content:space-around;
  align-items: center;
`;
export const ROW_ALIGN_CENTER__SPACE_B = css`
  ${ROW}
  justify-content:space-between;
  align-items: center;
`;
export const FULL_WIDTH = css`
  width: 100%;
`;
export const FULL_HEIGHT = css`
  height: 100%;
`;
export const UNSELECTABLE = css`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
export const BUTTON = css`
  ${UNSELECTABLE}
  border: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

export const MaxWidthContainer = css`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;
export default GlobalStyle;
