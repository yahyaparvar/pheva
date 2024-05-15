import { History } from "history";
import { FC, ReactElement, useLayoutEffect, useState } from "react";
import { Router } from "react-router-dom";

interface CustomRouterProps {
  history: History;
  children?: ReactElement;
}

export const CustomRouter: FC<CustomRouterProps> = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};
