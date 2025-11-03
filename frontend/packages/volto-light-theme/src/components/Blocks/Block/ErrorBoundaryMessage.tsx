type ErrorBoundaryMessageProps = {
  name?: string;
  block?: string;
  type?: string;
};

const ErrorBoundaryMessage = (props: ErrorBoundaryMessageProps) => {
  return (
    <div className="block-error-boundary">
      <div className="title">Block error:</div>
      The block <code>{props.type}</code> with the id <code>{props.block}</code>{' '}
      has encountered an error. <br />
      You can try to undo your changes (via the undo toolbar or{' '}
      <code>ctrl/cmd + Z</code>) or try to remove it and add the block again.
    </div>
  );
};

export default ErrorBoundaryMessage;
