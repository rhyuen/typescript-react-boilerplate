import * as React from "react";
import * as Sentry from "@sentry/browser";
import Grid from "./Grid";
import OneCol from "./shared/OneCol";
import Header from "./shared/Header";
import ClickButton from "./shared/ClickButton";

interface Props { }

interface State {
  isError: boolean;
  eventId: string;
}
export default class RootErrorBoundary extends React.Component<Props, State> {
  state = {
    isError: false,
    eventId: ""
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  componentDidCatch(error: Object, errorInfo: Object) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({
        eventId
      });
    });
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? (
      <Grid>
        <OneCol>
          <Header>An error has occurred.</Header>
          <ClickButton
            onClick={() =>
              Sentry.showReportDialog({ eventId: this.state.eventId })
            }
          >
            Report feedback
          </ClickButton>
        </OneCol>
      </Grid>
    ) : (
        children
      );
  }
}
