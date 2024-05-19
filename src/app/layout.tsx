import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Sidebar } from "./components/sideBar";

const LayoutContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  overflow: scroll;
`;

const MainLayout = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <ContentContainer>
        <Outlet /> {/* This will render the matched route component */}
      </ContentContainer>
    </LayoutContainer>
  );
};

export default MainLayout;
