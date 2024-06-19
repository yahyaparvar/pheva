// Button.tsx
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { UNSELECTABLE } from "styles/globalStyles";

const buttonStyles = {
  primary: css`
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  `,
  secondary: css`
    background-color: #f3f4f6;
    color: #1f2937;
    &:hover {
      background-color: #e5e7eb;
    }
  `,
  danger: css`
    background-color: #ef4444;
    color: white;
    &:hover {
      background-color: #dc2626;
    }
  `,
  outline: css`
    background-color: transparent;
    border: 1px solid #d1d5db;
    color: #1f2937;
    &:hover {
      background-color: #f3f4f6;
    }
  `,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean; // Add loading prop
}

const ButtonBase = styled.button<ButtonProps>`
  font-weight: 600;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  min-width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
  ${UNSELECTABLE}
  ${({ variant }) => buttonStyles[variant || "primary"]}
`;

const IconWrapper = styled.span<{ position: "left" | "right" }>`
  display: inline-flex;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-right: ${({ position }) => (position === "left" ? "0.5rem" : "0")};
  margin-left: ${({ position }) => (position === "right" ? "0.5rem" : "0")};
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: ${spinnerAnimation} 0.7s linear infinite;
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  leftIcon,
  rightIcon,
  loading = false,
  children,
  ...props
}) => {
  return (
    <ButtonBase
      variant={variant}
      disabled={loading}
      loading={loading}
      {...props}
    >
      {leftIcon && (
        <IconWrapper position="left">
          {loading ? <Spinner /> : leftIcon}
        </IconWrapper>
      )}
      {children}
      {rightIcon && (
        <IconWrapper position="right">
          {loading ? <Spinner /> : rightIcon}
        </IconWrapper>
      )}
    </ButtonBase>
  );
};
