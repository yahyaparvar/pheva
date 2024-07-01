import history from "app/router/history";
import { ReactNode, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ROW_JUSTIFY_START__ALIGN_CENTER } from "styles/globalStyles";

export interface SidebarItemProps {
  label: string;
  to?: string;
  icon?: ReactNode;
  onClick?: () => void;
  subItems?: SidebarSubItemProps[];
}

interface SidebarSubItemProps {
  icon?: ReactNode;
  label: string;
  to: string;
}

export const SidebarItem: React.FC<SidebarItemProps & { active: boolean }> = ({
  label,
  to,
  icon,
  subItems,
  active,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubItemClick = (to: string) => {
    history.push(to);
  };
  const handleItemClick = () => {
    if (to) {
      history.push(to);
    }
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };
  const location = useLocation();
  useLayoutEffect(() => {
    subItems?.forEach((element) => {
      if (element.to === location.pathname) {
        setIsOpen(true);
      }
    });
  }, []);
  return (
    <Wrapper>
      <StyledSidebarItem onClick={handleItemClick} active={active}>
        <SideBarItemIcon>{icon}</SideBarItemIcon>
        {label}
      </StyledSidebarItem>
      {isOpen &&
        subItems &&
        subItems.map((sub) => (
          <StyledSubItem
            key={sub.to}
            onClick={() => handleSubItemClick(sub.to)}
            active={location.pathname === sub.to}
          >
            <SideBarItemIcon>{sub.icon}</SideBarItemIcon>
            {sub.label}
          </StyledSubItem>
        ))}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
const StyledSidebarItem = styled.div<{ active: boolean }>`
  ${ROW_JUSTIFY_START__ALIGN_CENTER}
  padding: 4px 8px;
  height: 30px;
  border-radius: 6px;
  margin-bottom: 1px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
const StyledSubItem = styled(StyledSidebarItem)`
  padding-left: 30px;
`;
const SideBarItemIcon = styled.div`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;
