// Button.tsx
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { UNSELECTABLE } from "styles/globalStyles";

const buttonStyles = {
  primary: css`
    background-color: #fff;
    border: 2px solid #fff;
    color: #0d0d0d;
    &:hover {
      background-color: #cbcbcb;
    }
  `,
  secondary: css`
    background-color: rgba(20, 20, 20, 0.96);
    color: #fff;
    &:hover {
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
    border: 2px solid #d1d5db;
    color: #fff;
    &:hover {
      background-color: #6b6b6b;
    }
  `,
};

const sizeStyles = {
  large: css`
    padding: 0.9rem;
    font-size: 18px;
    border-radius: 0.9rem;
  `,
  medium: css`
    padding: 10px 1rem;
    font-size: 16px;
  `,
  small: css`
    padding: 8px 0.75rem;
    font-size: 14px;
  `,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "large" | "medium" | "small";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const ButtonBase = styled.button<ButtonProps>`
  border-radius: 0.375rem;
  min-width: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  transition: background-color 0.2s;
  cursor: pointer;
  ${UNSELECTABLE}
  ${({ variant }) => buttonStyles[variant || "primary"]}
  ${({ size }) => sizeStyles[size || "medium"]}
`;

const IconWrapper = styled.span<{ position: "left" | "right" }>`
  display: inline-flex;
  align-items: center;
  margin-right: ${({ position }) => (position === "left" ? "0.5rem" : "0")};
  margin-left: ${({ position }) => (position === "right" ? "0.5rem" : "0")};
  svg {
    width: 18px;
    height: 18px;
  }
`;

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spinnerAnimation} 0.7s linear infinite;
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  leftIcon,
  rightIcon,
  loading = false,
  children,
  ...props
}) => {
  return (
    <ButtonBase
      variant={variant}
      size={size}
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
      {!loading && rightIcon ? (
        <IconWrapper position="right">{rightIcon}</IconWrapper>
      ) : loading && !leftIcon ? (
        <IconWrapper position="right">{<Spinner />}</IconWrapper>
      ) : (
        ""
      )}
    </ButtonBase>
  );
};
