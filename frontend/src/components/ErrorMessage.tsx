type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div style={{ color: "red", marginTop: "20px" }}>{message}</div>
);

export default ErrorMessage;
