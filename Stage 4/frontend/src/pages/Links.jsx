import { FlexSightLogo } from "./Landing";

function Links() {
  const links = [
    {
      title: "FlexSight Website",
      subtitle: "Visit our official website",
      url: "https://flexsight.dev/",
      type: "web",
    },
    {
      title: "Hamsa Alammar",
      subtitle: "LinkedIn",
      url: "https://www.linkedin.com/in/hamsa-al-amaar",
      type: "linkedin",
    },
    {
      title: "Munirah Alotaibi",
      subtitle: "LinkedIn",
      url: "https://www.linkedin.com/in/munirahalotaibi-",
      type: "linkedin",
    },
    {
      title: "Rabea Thabit",
      subtitle: "LinkedIn",
      url: "https://www.linkedin.com/in/rabea-thabit",
      type: "linkedin",
    },
  ];

  return (
    <main className="links-page">
      <section className="links-card">
        <div className="links-brand">
          <div className="links-logo">
            <FlexSightLogo />
          </div>

          <h1>FlexSight</h1>
          <p>Smart Temperature Monitoring</p>
        </div>

        <div className="links-list">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="links-button"
            >
              <div
                className={`links-button-icon ${
                  link.type === "linkedin" ? "linkedin-icon" : ""
                }`}
              >
                {link.type === "linkedin" ? "in" : "↗"}
              </div>

              <div className="links-button-text">
                <strong>{link.title}</strong>
                <span>{link.subtitle}</span>
              </div>

              <span className="links-arrow">›</span>
            </a>
          ))}
        </div>

        <p className="links-footer">
          Real-Time Monitoring · Instant Alerts
        </p>
      </section>
    </main>
  );
}

export default Links;