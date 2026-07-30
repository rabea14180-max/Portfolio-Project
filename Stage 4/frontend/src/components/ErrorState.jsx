function ErrorState({ message = "Unable to connect to server", onRetry }) {
  const isOffline =
    typeof navigator !== "undefined" && navigator.onLine === false;

  const title = isOffline ? "No Internet Connection" : "Connection Lost";
  const description = isOffline
    ? "Check your internet connection, then try again."
    : message || "Unable to connect to the server. Please try again.";

  function handleRetry() {
    if (onRetry) {
      onRetry();
      return;
    }

    window.location.reload();
  }

  return (
    <div className="state-container connection-error" role="alert">
      <style>{`
        .connection-error {
          min-height: 320px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
        }

        .connection-error-card {
          width: min(100%, 460px);
          padding: 38px 34px 34px;
          text-align: center;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 93, 115, 0.12), transparent 42%),
            #0f1e31;
          border: 1px solid rgba(255, 105, 125, 0.25);
          border-radius: 20px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);
        }

        .connection-error-icon {
          width: 108px;
          height: 108px;
          margin: 0 auto 18px;
          display: grid;
          place-items: center;
          color: #ff667a;
          background: rgba(255, 102, 122, 0.08);
          border: 1px solid rgba(255, 102, 122, 0.2);
          border-radius: 50%;
        }

        .connection-error-icon svg {
          width: 66px;
          height: 66px;
          overflow: visible;
        }

        .connection-error-title {
          margin: 0 0 10px;
          color: #f5f8fc;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .connection-error-message {
          max-width: 350px;
          margin: 0 auto 24px;
          color: #9eacc0;
          font-size: 15px;
          line-height: 1.65;
        }

        .connection-error-retry {
          min-width: 132px;
          padding: 11px 22px;
          color: #07121f;
          font: inherit;
          font-weight: 700;
          background: #31c7df;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 160ms ease, background 160ms ease;
        }

        .connection-error-retry:hover {
          background: #59d5e8;
          transform: translateY(-1px);
        }

        .connection-error-retry:focus-visible {
          outline: 3px solid rgba(49, 199, 223, 0.35);
          outline-offset: 3px;
        }
      `}</style>

      <div className="connection-error-card">
        <div className="connection-error-icon" aria-hidden="true">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23 12V27M35 12V27"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M17 27H41V33C41 39.627 35.627 45 29 45C22.373 45 17 39.627 17 33V27Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path
              d="M29 45V53C29 58.523 33.477 63 39 63H43"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M53 50L66 63M66 50L53 63"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h2 className="connection-error-title">{title}</h2>
        <p className="connection-error-message">{description}</p>

        <button
          type="button"
          className="connection-error-retry"
          onClick={handleRetry}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
