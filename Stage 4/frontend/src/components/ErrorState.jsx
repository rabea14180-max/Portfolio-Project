function ErrorState() {
  return (
    <div className="state-container state-error">
      <svg
        width="110"
        height="70"
        viewBox="0 0 110 70"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 35H31"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M31 23H45V47H31C25 47 21 42 21 35C21 28 25 23 31 23Z"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M45 30H52M45 40H52"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M102 35H79"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M79 23H65V47H79C85 47 89 42 89 35C89 28 85 23 79 23Z"
          stroke="#94A3B8"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M55 15L51 22M59 55L63 48"
          stroke="#31C7DF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <h3>Connection Lost</h3>
      <p className="state-text">
        Check your internet connection and try again.
      </p>

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
