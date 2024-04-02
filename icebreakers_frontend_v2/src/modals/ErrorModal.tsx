type ErrorProps = {
  errorText: string;
};

const ErrorModal = ({ errorText }: ErrorProps) => {
  return <div>Here is the error message: {errorText}</div>;
};

export default ErrorModal;
