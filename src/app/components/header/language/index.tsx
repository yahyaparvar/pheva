/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ROW_ALIGN_CENTER__SPACE_B } from "styles/globalStyles";
import { useOnClickOutside } from "usehooks-ts";
import GlobeIcon from "./globeIcon";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  useLayoutEffect(() => {
    const app = document.querySelector("body");
    if (app) {
      app.classList.add(i18n.language);
    }
  }, []);
  const changeLanguage = (lng: string) => {
    const app = document.querySelector("body");
    if (app) {
      app.classList.remove(i18n.language);
      app.classList.add(lng);
    }
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
  };
  useOnClickOutside(containerRef, () => {
    setDropdownOpen(false);
  });

  return (
    <LanguageSwitcherContainer ref={containerRef}>
      <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div>{i18n.language}</div>
        <GlobeIcon />
      </DropdownButton>
      <DropdownContent open={dropdownOpen}>
        <LanguageOption onClick={() => changeLanguage("en")}>
          English
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("de")}>
          German
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("fr")}>
          French
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("ru")}>
          русский
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("ja")}>
          日本語
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("fa")}>
          فارسی
        </LanguageOption>
        <LanguageOption onClick={() => changeLanguage("ar")}>
          العربی
        </LanguageOption>
      </DropdownContent>
    </LanguageSwitcherContainer>
  );
};
const LanguageSwitcherContainer = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: var(--background-secondary);
  height: 100%;
  border-radius: 8px;
  border: 1px solid var(--text);
  cursor: pointer;
  font-size: 16px;
  width: 100px;
  padding: 10px;
  ${ROW_ALIGN_CENTER__SPACE_B}
  svg {
    width: 16px;
    height: 16px;
  }
  @media screen and (max-width: 478px) {
    width: 60px;
  }
  @media screen and (max-width: 500px) {
    width: fit-content;
    div {
      display: none;
    }
  }
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${(props: { open: boolean }) => (props.open ? "block" : "none")};
  position: absolute;
  top: 46px;
  border-radius: 6px;
  background-color: var(--background-secondary);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const LanguageOption = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  &:hover {
    filter: brightness(1.3);
  }
  @media screen and (max-width: 478px) {
    font-size: 14px;
    padding: 8px 0px;
  }
`;
