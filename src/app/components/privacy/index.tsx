import { AppPages } from "app/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
`;

const BottomSheetContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background-color: var(--dark-gray);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PrivacyPolicyBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isPolicyAccepted = localStorage.getItem("policyAccepted");
    if (!isPolicyAccepted) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("policyAccepted", "true");
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 2 } }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <BottomSheetContainer
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsOpen(false)}>
                &times;
              </CloseButton>
              <h2>Privacy Policy</h2>
              <p>
                Please read our{" "}
                <a
                  href={AppPages.PrivacyPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                for more details.
              </p>
              <Button onClick={handleAccept}>Okay</Button>
            </BottomSheetContainer>
          </Overlay>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default PrivacyPolicyBottomSheet;
const Wrapper = styled.div`
  background-color: var(--dark-gray);
`;
