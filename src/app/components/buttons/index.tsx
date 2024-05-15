// Button.tsx
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
`;

const PrimaryButton = styled(Button)`
  @apply bg-blue-500 hover:bg-blue-700;
`;

const SecondaryButton = styled(Button)`
  @apply bg-gray-500 hover:bg-gray-700;
`;

const SuccessButton = styled(Button)`
  @apply bg-green-500 hover:bg-green-700;
`;

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const CustomButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <Button onClick={onClick}>{label}</Button>;
};

export const Primary: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <PrimaryButton onClick={onClick}>{label}</PrimaryButton>;
};

export const Secondary: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <SecondaryButton onClick={onClick}>{label}</SecondaryButton>;
};

export const Success: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <SuccessButton onClick={onClick}>{label}</SuccessButton>;
};
