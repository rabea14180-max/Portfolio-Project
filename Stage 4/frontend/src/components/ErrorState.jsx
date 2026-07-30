function ErrorState({ message = "Unable to connect to server" }) {
  return (
    <div className="state-container state-error">
      <div className="disconnected-icon" aria-hidden="true">
        🔌
      </div>
      <h3>Connection Lost</h3>
      <p className="state-text">{message}</p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;
