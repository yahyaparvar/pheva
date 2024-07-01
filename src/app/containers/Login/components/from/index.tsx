import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaFileAlt,
  FaGoogle,
  FaInstagram,
  FaQuestion,
  FaYoutube,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoginActions } from "../../slice";

// Styled components for the dropdown
const DropdownContainer = styled(motion.div)`
  position: relative;
  width: 250px;
  margin: 20px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #e73c56;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: #d32f6c;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  height: fit-content;
`;

// Dropdown component
export const From = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item.label);
    setIsOpen(false);
    dispatch(LoginActions.setFrom(item.label));
    dispatch(LoginActions.nextStep());
  };

  const items = [
    { label: "YouTube", icon: <FaYoutube /> },
    { label: "Instagram", icon: <FaInstagram /> },
    { label: "My Resume", icon: <FaFileAlt /> },
    { label: "Google Search", icon: <FaGoogle /> },
    { label: "Other", icon: <FaQuestion /> },
  ];

  return (
    <DropdownContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <DropdownButton onClick={toggleDropdown}>
        {selectedItem || "How did you hear about us?"}
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {items.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleItemClick(item)}>
              <IconWrapper>{item.icon}</IconWrapper>
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};
