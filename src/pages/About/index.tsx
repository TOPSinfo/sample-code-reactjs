import React from "react";

import { ErrorBoundary } from "components";
import { version } from "../../../package.json";
import { withProfiler } from "@sentry/react";
import { CardBox } from "../Dashboard/Dashboard.style";
import styled from "styled-components";

const About = () => {
  return (
    <ErrorBoundary>
      <CardBox withoutPadding>
        <Container className={"container"}>version: v{version}</Container>
      </CardBox>
    </ErrorBoundary>
  );
};
export default withProfiler(About);
const Container = styled.div`
  height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-family: "Roboto";
`;
