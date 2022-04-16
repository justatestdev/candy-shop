import styled from '@emotion/styled';
import IconChevronDown from 'assets/IconChevronDown';
import IconChevronUp from 'assets/IconChevronUp';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { useRef, useState } from 'react';

type DropdownItem = {
  value: any;
  label: string;
};

interface DropdownProps {
  selectedItem?: DropdownItem;
  items: DropdownItem[];
  onSelectItem?: (item: DropdownItem) => void;
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({
  selectedItem,
  items,
  onSelectItem,
}) => {
  const dropdownRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState(
    selectedItem || (items.length > 0 ? items[0] : null)
  );

  useClickOutside(dropdownRef, () => {
    setIsMenuOpen(false);
  });

  return (
    <DropdownWrap
      ref={dropdownRef}
      onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
    >
      <Flex>
        <Label isMenuOpen={isMenuOpen}>{currentlySelectedItem?.label}</Label>
        {isMenuOpen ? (
          <IconWrapper>
            <IconChevronUp />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <IconChevronDown />
          </IconWrapper>
        )}
      </Flex>
      {isMenuOpen ? (
        <DropdownMenu>
          {items.map((item, index) => (
            <div
              className={
                index < items.length - 1 ? 'menu-middle-item' : 'menu-last-item'
              }
              key={index}
              onClick={() => {
                setCurrentlySelectedItem(item);
                onSelectItem && onSelectItem(item);
              }}
            >
              <Label>{item.label}</Label>
            </div>
          ))}
        </DropdownMenu>
      ) : (
        <></>
      )}
    </DropdownWrap>
  );
};

const DropdownWrap = styled.div`
  padding: 12px;
  border: 1px solid #14535e;
  width: 184px;
  &:hover {
    cursor: pointer;
  }
  border-radius: 4px;
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.p<{ isMenuOpen?: boolean }>`
  margin: 0;
  color: white;
`;

const IconWrapper = styled.div`
  pointer-events: none;
  svg path {
    fill: currentColor;
  }
`;

const DropdownMenu = styled.div`
  width: 184px;
  background-color: #05424d;
  margin-top: 4px;
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 99;
  border: 1px solid #031f25;
  border-radius: 4px;
  .menu-middle-item {
    padding: 12px;
    border-bottom: 1px solid #03272e;
    text-align: left;
  }
  .menu-middle-item:hover, .menu-last-item:hover {
    background-color: #1b7988;
  }
  .menu-last-item {
    padding: 12px;
    text-align: left;
  }
`;
