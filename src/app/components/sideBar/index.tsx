import { Resizable } from "re-resizable";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { globalSelectors } from "store/selector";
import styled from "styled-components";
import {
  ROW_JUSTIFY_START__ALIGN_CENTER,
  UNSELECTABLE,
} from "styles/globalStyles";
import { items } from "./components/items";
import { SidebarItem } from "./components/sideBarItem";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();
  const userInfo = useSelector(globalSelectors.userInfo);

  return (
    <Resizable
      defaultSize={{ width: 250, height: "100%" }}
      minWidth={150}
      maxWidth={400}
      enable={{ right: true }}
      style={{ boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)" }}
    >
      <StyledSidebar>
        <ProfileButton active={false}>
          <ProfileImage src={userInfo?.picture}></ProfileImage>
          <ProfileName>{userInfo?.name}</ProfileName>
          <ChevronBottom viewBox="0 0 24 24" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clipRule="evenodd"
            />
          </ChevronBottom>
        </ProfileButton>
        {items.map((item) => (
          <SidebarItem
            key={item.to}
            label={item.label}
            to={item.to}
            icon={item.icon}
            active={location.pathname === item.to}
            subItems={item.subItems}
          />
        ))}
      </StyledSidebar>
    </Resizable>
  );
};

const StyledSidebar = styled.div<SidebarProps>`
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  padding: 8px;
  background-color: #1f1f1f;
  ${UNSELECTABLE}
`;

const ChevronBottom = styled.svg`
  width: 14px;
  height: 14px;
`;

const ProfileButton = styled.div<{ active: boolean }>`
  ${ROW_JUSTIFY_START__ALIGN_CENTER}
  padding: 4px 8px;
  margin-bottom: 8px;
  height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? "var(--dark-gray)" : "transparent"};
  transition: background-color 0.3s;
  color: ${(props) => (props.active ? "var(--white)" : "var(--text)")};
  &:hover {
    background-color: var(--dark-gray);
  }
`;
const ProfileName = styled.div`
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 8px;
  line-height: 20px;
`;
const ProfileImage = styled.img`
  height: 22px;
  width: 22px;
  border-radius: 4px;
  margin-right: 8px;
  object-fit: cover;
`;

export { Sidebar };
