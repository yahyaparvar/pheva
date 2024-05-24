import { gsap } from "gsap";
import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const Ball = styled.div`
  background-color: #68645d;
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  padding: 20px;
  pointer-events: none;
  color: white !important ;
  border-radius: 12px;
  opacity: 0; /* Initially invisible */
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  /* Ensure it is above other elements */
`;

const RowMouseHover: React.FC<{ className: string; children?: ReactNode }> = (
  props
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    const container = containerRef.current;

    if (ball && container) {
      const onMouseEnter = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.set(ball, {
          x: x - ball.offsetWidth - 34, // Offset x to place cursor at top left
          y: y - ball.offsetHeight / 2, // Offset y to place cursor at top left
          opacity: 1, // Make ball visible on mouse enter
          zIndex: 100,
        });
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = Math.max(rect.left, Math.min(e.clientX, rect.right));
        const y = Math.max(rect.top, Math.min(e.clientY, rect.bottom));
        gsap.to(ball, {
          duration: 0.2,
          x: x - rect.left - ball.offsetWidth - 34, // Offset x to place cursor at top left
          y: y - rect.top - ball.offsetHeight / 2, // Offset y to place cursor at top left
          ease: "power1.out",
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(ball, {
          duration: 0.2,
          opacity: 0, // Make ball invisible on mouse leave
        });
      };

      container.addEventListener("mouseenter", onMouseEnter);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", onMouseEnter);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <Ball className={props.className} ref={ballRef}>
        {props.children}
      </Ball>
    </Container>
  );
};

export default RowMouseHover;
