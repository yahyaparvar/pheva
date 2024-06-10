import { ChevronDownIcon } from "@heroicons/react/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ROW_ALIGN_CENTER__SPACE_B } from "styles/globalStyles";
import { useOnClickOutside } from "usehooks-ts";

const DropdownContainer = styled.div`
  position: relative;
  z-index: 10;
  display: inline-block;
`;

const DropdownButton = styled.button`
  color: var(--text);
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #4a5568;
  background-color: #1a202c;
  color: #e2e8f0;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  width: 1rem; // Equivalent to w-4 in Tailwind CSS
  height: 1rem; // Equivalent to h-4 in Tailwind CSS
  margin-left: 0.5rem; // Equivalent to ml-2 in Tailwind CSS
`;

const DropdownMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #2d3748;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  right: 0;
  overflow: hidden;
  border: 1px solid #4a5568;
`;

const DropdownItem = styled.button`
  ${ROW_ALIGN_CENTER__SPACE_B}
  color: #e2e8f0;
  padding: 12px 16px;
  text-align: left;
  text-decoration: none;
  background-color: #2d3748;
  border: none;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #4a5568;
  }
`;

interface DropdownItemType {
  value: string;
  label: string;
}

interface DropdownProps {
  items: DropdownItemType[];
  onChange: (selectedItem: string) => void;
}

const DropdownComponent: React.FC<DropdownProps> = ({ items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemSelect = (itemValue: DropdownItemType) => {
    if (itemValue.label === selectedValue) {
      setIsOpen(false);
      return;
    } else setIsOpen(false);
    setSelectedValue(itemValue.label);
    onChange(itemValue.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "m" || event.key === "M") {
        setSelectedValue("Month");
      }
      if (event.key === "w" || event.key === "W") {
        setSelectedValue("Week");
      }
      if (event.key === "d" || event.key === "D") {
        setSelectedValue("Day");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedValue || items[0].label}
        <IconWrapper>
          <ChevronDownIcon />
        </IconWrapper>
      </DropdownButton>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, x: 10, scale: 0.9 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: 0,
              transition: {
                duration: 0.16,
                ease: [0.41, 0.1, 0.25, 0.97],
              },
            }}
            exit={{
              opacity: 0,
              y: 10,
              x: 10,
              scale: 0.9,
              transition: {
                duration: 0.05,
                ease: [0.41, 0.1, 0.25, 0.97],
              },
            }}
          >
            {items.map((item) => (
              <DropdownItem
                key={item.value}
                onClick={() => handleItemSelect(item)}
              >
                <div>{item.label}</div>
                <div>{item.label.charAt(0).toUpperCase()}</div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
};

export const Dropdown = DropdownComponent;

export default Dropdown;
