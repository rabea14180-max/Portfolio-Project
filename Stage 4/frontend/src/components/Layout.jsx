import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import OfflineGuard from "./OfflineGuard";
import { apiRequest } from "../api";

function playAlertSound() {
  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const gainNode = audioContext.createGain();

  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(
    0.0001,
    audioContext.currentTime
  );

  gainNode.gain.exponentialRampToValueAtTime(
    0.18,
    audioContext.currentTime + 0.02
  );

  gainNode.gain.exponentialRampToValueAtTime(
    0.0001,
    audioContext.currentTime + 0.8
  );

  const firstTone = audioContext.createOscillator();

  firstTone.type = "sine";
  firstTone.frequency.setValueAtTime(
    880,
    audioContext.currentTime
  );

  firstTone.connect(gainNode);
  firstTone.start(audioContext.currentTime);
  firstTone.stop(audioContext.currentTime + 0.28);

  const secondTone = audioContext.createOscillator();

  secondTone.type = "sine";
  secondTone.frequency.setValueAtTime(
    1050,
    audioContext.currentTime + 0.35
  );

  secondTone.connect(gainNode);
  secondTone.start(audioContext.currentTime + 0.35);
  secondTone.stop(audioContext.currentTime + 0.72);

  window.setTimeout(() => {
    audioContext.close().catch(() => {});
  }, 1000);
}

function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const soundIntervalRef = useRef(null);
  const hasOpenAlertRef = useRef(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    async function checkOpenAlerts() {
      const result = await apiRequest(
        "/dashboard/alerts"
      );

      if (!result.ok) {
        return;
      }

      const alerts = Array.isArray(result.data)
        ? result.data
        : [];

      const hasOpenAlert = alerts.some(
        (alert) =>
          String(alert.status).toUpperCase() ===
          "OPEN"
      );

      hasOpenAlertRef.current = hasOpenAlert;

      if (
        hasOpenAlert &&
        !soundIntervalRef.current
      ) {
        playAlertSound();

        soundIntervalRef.current =
          window.setInterval(() => {
            if (hasOpenAlertRef.current) {
              playAlertSound();
            }
          }, 5000);
      }

      if (
        !hasOpenAlert &&
        soundIntervalRef.current
      ) {
        window.clearInterval(
          soundIntervalRef.current
        );

        soundIntervalRef.current = null;
      }
    }

    checkOpenAlerts();

    const alertsCheckInterval =
      window.setInterval(() => {
        checkOpenAlerts();
      }, 5000);

    return () => {
      window.clearInterval(alertsCheckInterval);

      if (soundIntervalRef.current) {
        window.clearInterval(
          soundIntervalRef.current
        );
      }
    };
  }, []);

  return (
    <div className="layout">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="layout-main">
        <Topbar
          title={title}
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        <main className="layout-content">
          <OfflineGuard>
            {children}
          </OfflineGuard>
        </main>
      </div>
    </div>
  );
}

export default Layout;