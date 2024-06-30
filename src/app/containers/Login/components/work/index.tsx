import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { COLUMN_CENTER } from "styles/globalStyles";
import { LoginActions } from "../../slice";
import Content from "./content.svg";
import Developer from "./developer.svg";
import Hr from "./hr.svg";
import Other from "./other.svg";
const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #23bec0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
  }
`;
const CardContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`;
const Icon = styled.img`
  width: 70px;
  height: auto;
  margin-top: 50px;
  font-size: 3rem;
`;

const Text = styled(Typography)`
  font-size: 1.2rem;
  justify-self: flex-end;
  margin-bottom: 12px !important;
`;
const Container = styled(motion.div)`
  ${COLUMN_CENTER}
`;
const Title = styled.h1`
  margin: 0;
  font-weight: 400;
  margin-bottom: 120px;
  font-size: 42px;
`;
export const Work = () => {
  const dispatch = useDispatch();
  const handleOnclick = (job: string) => {
    dispatch(LoginActions.setWork(job));
    dispatch(LoginActions.nextStep());
  };
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Title>What do you do Yahya?</Title>
      <CardContainer>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => handleOnclick("Human Resourses")}
        >
          <CardContent>
            <Icon src={Hr}></Icon>
            <Text>Human Resourses</Text>
          </CardContent>
        </Card>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => handleOnclick("Developer")}
        >
          <CardContent>
            <Icon src={Developer}></Icon>
            <Text>Developer</Text>
          </CardContent>
        </Card>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => handleOnclick("Content Creator")}
        >
          <CardContent>
            <Icon src={Content}></Icon>
            <Text>Content Creator</Text>
          </CardContent>
        </Card>
        <Card
          whileHover={{ scale: 1.05 }}
          onClick={() => handleOnclick("Other")}
        >
          <CardContent>
            <Icon src={Other}></Icon>
            <Text>Other</Text>
          </CardContent>
        </Card>
      </CardContainer>
    </Container>
  );
};
