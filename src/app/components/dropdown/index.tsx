import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useOnClickOutside } from "usehooks-ts";

const DropdownContainer = styled.div`
  position: relative;
  z-index: 10;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
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
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  color: black;
  padding: 12px 16px;
  text-align: left;
  text-decoration: none;
  display: block;
  background-color: white;
  border: none;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
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

  const handleItemSelect = (itemValue: string) => {
    setSelectedValue(itemValue);
    setIsOpen(false);
    onChange(itemValue);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedValue || "Select an item"}
      </DropdownButton>
      <AnimatePresence>
        {isOpen && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10, x: -10, scale: 0.9 }}
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
              y: -10,
              x: -10,
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
                onClick={() => handleItemSelect(item.value)}
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
