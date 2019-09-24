import * as React from "react";
import * as Sentry from "@sentry/browser";

interface Props {}

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
      <section>
        An error occurred.
        <button
          onClick={() =>
            Sentry.showReportDialog({ eventId: this.state.eventId })
          }
        >
          Report feedback {this.state.eventId}
        </button>
      </section>
    ) : (
      children
    );
  }
}
