import React from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { connect } from 'react-redux';
import type { BlocksData } from '@plone/types';
import ErrorBoundaryMessage from './ErrorBoundaryMessage';

type OwnProps = {
  name?: string;
  block?: string;
  type?: string;
  isEdit?: boolean;
  children?: ReactNode;
};

type StateProps = {
  blocks: BlocksData['blocks'];
  blocksLayout: BlocksData['blocks_layout'];
  title: string | null;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

type ErrorBoundaryProps = OwnProps & StateProps;

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
    const titleChanged = prevProps.title !== this.props.title;
    const blocksChanged = prevProps.blocks !== this.props.blocks;
    const blocksLayoutChanged =
      prevProps.blocksLayout !== this.props.blocksLayout;

    if (
      (blocksChanged || blocksLayoutChanged || titleChanged) &&
      this.state.hasError
    ) {
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

type ReduxState = {
  form?: {
    global?: {
      blocks?: BlocksData['blocks'];
      blocks_layout?: BlocksData['blocks_layout'];
      title: string | null;
    };
  };
};

const mapStateToProps = (state: ReduxState): StateProps => ({
  blocks: state.form?.global?.blocks ?? null,
  blocksLayout: state.form?.global?.blocks_layout ?? null,
  // Title is used for demonstration purposes
  // If we want to use it in metadata sources, we should connect it to the full state
  // which I am reluctant to do because nowadays the form state can be quite large
  title: state.form?.global?.title ?? null,
});

export default connect(mapStateToProps)(ErrorBoundary);
