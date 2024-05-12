import { Themes } from "app/types";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalSelectors } from "store/selector";
import { globalActions } from "store/slice";
import styled from "styled-components";
import Dropdown from "./dropdown";

const ThemeToggler = () => {
  const theme = useSelector(globalSelectors.theme);
  const dispatch = useDispatch();
  const toggleTheme = (newTheme: string) => {
    dispatch(globalActions.changeTheme(newTheme));
  };
  const availableThemes = Object.values(Themes).map((themeValue) => ({
    value: themeValue,
    label: themeValue.toUpperCase(),
  }));

  return (
    <Wrapper>
      <Dropdown
        defaultValue={theme as string}
        options={availableThemes}
        onChange={(newTheme) => {
          toggleTheme(newTheme);
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  color: var(--disabled-text);
`;

export default memo(ThemeToggler);
