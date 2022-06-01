import React from "react";

import { ErrorBoundary } from "components";
import { withProfiler } from "@sentry/react";
import { CardBox } from "../Dashboard/Dashboard.style";
import styled from "styled-components";
import { useSelector } from "react-redux";
import * as selectors from "../../modules/selectors";
import { toast } from "react-toastify";

const Account = () => {
  const organizationId = useSelector(selectors.getOrganizationId);
  return (
    <ErrorBoundary>
      <CardBox withoutPadding>
        <Container className={"container"}>
          Organization Id :
          <span
            className={"ml-2"}
            onClick={() => {
              if (organizationId) {
                navigator.clipboard.writeText(organizationId);
                toast.success("Copied successfully.");
              }
            }}
          >
            {organizationId}
          </span>
        </Container>
      </CardBox>
    </ErrorBoundary>
  );
};
export default withProfiler(Account);
const Container = styled.div`
  height: calc(100vh - 155px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: "Roboto";
`;
