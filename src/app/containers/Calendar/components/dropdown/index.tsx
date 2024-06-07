import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const DropdownMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: var(--white);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  right: 0;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  color: var(--black);
  padding: 12px 16px;
  text-align: left;
  text-decoration: none;
  display: block;
  background-color: var(--white);
  border: none;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: var(--light-gray);
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
      if (event.key === "s" || event.key === "S") {
        setSelectedValue("Schedule");
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
                {item.label}
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
