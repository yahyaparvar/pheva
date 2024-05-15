import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

// Interface definitions
interface SidebarProps {}

interface SidebarItemProps {
  label: string;
  to: string;
  onClick?: () => void;
  subItems?: SidebarSubItemProps[];
}

interface SidebarSubItemProps {
  label: string;
  to: string;
}

// Styled components
const StyledSidebar = styled.div<SidebarProps>`
  width: 250px;
  background-color: #f4f4f4;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const StyledSidebarItem = styled.div<{ active: boolean }>`
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#e9e9e9" : "transparent")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const StyledSubItem = styled(StyledSidebarItem)`
  padding-left: 30px;
`;

// Sidebar component
const Sidebar: React.FC<SidebarProps> = () => {
  const location = useLocation();

  const items: SidebarItemProps[] = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    {
      label: "Services",
      to: "/services",
      subItems: [
        { label: "Web Design", to: "/services/web-design" },
        { label: "SEO", to: "/services/seo" },
      ],
    },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <StyledSidebar>
      {items.map((item) => (
        <SidebarItem
          key={item.to}
          label={item.label}
          to={item.to}
          active={
            location.pathname === item.to ||
            (item.subItems?.some(
              (sub) => location.pathname === sub.to
            ) as boolean)
          }
          subItems={item.subItems}
        />
      ))}
    </StyledSidebar>
  );
};

// SidebarItem component
const SidebarItem: React.FC<SidebarItemProps & { active: boolean }> = ({
  label,
  to,
  subItems,
  active,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    if (subItems) {
      setIsOpen(!isOpen);
    }
  };
  const location = useLocation();
  return (
    <>
      <StyledSidebarItem onClick={handleItemClick} active={active}>
        {label}
      </StyledSidebarItem>
      {isOpen &&
        subItems &&
        subItems.map((sub) => (
          <StyledSubItem key={sub.to} active={location.pathname === sub.to}>
            {sub.label}
          </StyledSubItem>
        ))}
    </>
  );
};

export { Sidebar };
