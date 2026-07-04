function ErrorState({ message = "Unable to connect to server" }) {
  return (
    <div className="state-container state-error">
      <p className="state-text">{message}</p>
    </div>
  );
}

export default ErrorState;
