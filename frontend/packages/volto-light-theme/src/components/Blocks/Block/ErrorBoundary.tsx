import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import ErrorBoundaryMessage from './ErrorBoundaryMessage';

type ErrorBoundaryProps = {
  name?: string;
  block?: string;
  type?: string;
  isEdit?: boolean;
  properties?: Record<string, any>;
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const propertiesChanged = prevProps.properties !== this.props.properties;

    if (propertiesChanged && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // eslint-disable-next-line
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryMessage
          name={this.props.name}
          block={this.props.block}
          type={this.props.type}
          isEdit={this.props.isEdit}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
