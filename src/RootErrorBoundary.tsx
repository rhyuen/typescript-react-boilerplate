import * as React from "react";

interface Props {}

interface State {
  isError: boolean;
}
export default class RootErrorBoundary extends React.Component<Props, State> {
  state = {
    isError: false
  };

  static getDerivedStateFromError() {
    return { isError: true };
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;
    return isError ? <section>An error occurred.</section> : children;
  }
}
