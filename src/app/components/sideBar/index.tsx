import { Resizable } from "re-resizable";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { globalSelectors } from "store/selector";
import { globalActions, useglobalSlice } from "store/slice";
import styled from "styled-components";
import {
  ROW_JUSTIFY_START__ALIGN_CENTER,
  UNSELECTABLE,
} from "styles/globalStyles";
import { items } from "./components/items";
import { SidebarItem } from "./components/sideBarItem";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  useglobalSlice();
  const dispatch = useDispatch();
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
        <LogoutButton
          onClick={() => {
            dispatch(globalActions.logOut());
          }}
        >
          <SidebarItem
            label={"Logout"}
            to={"/sex"}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            }
            active={false}
          />
        </LogoutButton>
      </StyledSidebar>
    </Resizable>
  );
};
const LogoutButton = styled.div`
  position: absolute;
  bottom: 24px;
  width: calc(100% - 16px);
`;
const StyledSidebar = styled.div<SidebarProps>`
  position: relative;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  padding: 8px;
  background-color: #34363a;
  ${UNSELECTABLE}
  svg {
    width: 20px;
    height: 20px;
  }
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
