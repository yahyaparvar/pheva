/**
 *
 * Home
 *
 */

import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";

import MotionBox from "app/components/animated";
import { useTranslation } from "react-i18next";
import { useInjectReducer, useInjectSaga } from "store/redux-injectors";
import { homeSaga } from "./saga";
import { selectHome } from "./selectors";
import { homeReducer, sliceKey } from "./slice";
import { Wrapper } from "./styles";

interface Props {}

export function Home(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: homeReducer });
  useInjectSaga({ key: sliceKey, saga: homeSaga });
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const home = useSelector(selectHome);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <MotionBox>
      <Wrapper>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Description of Home" />
        </Helmet>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
        <div>Home Sweet home</div>
      </Wrapper>
    </MotionBox>
  );
}
