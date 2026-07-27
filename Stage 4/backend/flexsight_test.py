import sys
import unittest
import warnings
from getpass import getpass

warnings.filterwarnings(
    "ignore",
    message="urllib3 v2 only supports OpenSSL.*",
)

import requests


BASE_URL = "http://64.227.153.34"
DEVICE_ID = 4
WARNING_TEMP = 20
CRITICAL_TEMP = 21


def temperature_status(temperature, warning, critical):
    if temperature >= critical:
        return "CRITICAL"
    if temperature >= warning:
        return "WARNING"
    return "NORMAL"


class TemperatureUnitTests(unittest.TestCase):
    def test_18_is_normal(self):
        result = temperature_status(
            18,
            WARNING_TEMP,
            CRITICAL_TEMP,
        )
        self.assertEqual(result, "NORMAL")

    def test_20_is_warning(self):
        result = temperature_status(
            20,
            WARNING_TEMP,
            CRITICAL_TEMP,
        )
        self.assertEqual(result, "WARNING")

    def test_21_is_critical(self):
        result = temperature_status(
            21,
            WARNING_TEMP,
            CRITICAL_TEMP,
        )
        self.assertEqual(result, "CRITICAL")

    def test_22_6_is_critical(self):
        result = temperature_status(
            22.6,
            WARNING_TEMP,
            CRITICAL_TEMP,
        )
        self.assertEqual(result, "CRITICAL")

    def test_23_5_is_critical(self):
        result = temperature_status(
            23.5,
            WARNING_TEMP,
            CRITICAL_TEMP,
        )
        self.assertEqual(result, "CRITICAL")


class ProductionIntegrationTests(unittest.TestCase):
    session = None
    username = None

    def get_data(self, path):
        response = self.session.get(
            BASE_URL + path,
            timeout=15,
        )
        self.assertEqual(response.status_code, 200)
        return response.json()

    def test_api_health(self):
        data = self.get_data("/api/health")
        self.assertTrue(data["success"])

    def test_owner_dashboard(self):
        data = self.get_data("/api/dashboard")
        self.assertEqual(
            data["owner_username"],
            self.username,
        )

    def test_device_data(self):
        devices = self.get_data(
            "/api/dashboard/devices"
        )
        device = next(
            (
                item
                for item in devices
                if item["device_id"] == DEVICE_ID
            ),
            None,
        )

        self.assertIsNotNone(device)
        self.assertEqual(
            device["warning_threshold"],
            WARNING_TEMP,
        )
        self.assertEqual(
            device["critical_threshold"],
            CRITICAL_TEMP,
        )
        self.assertEqual(
            device["firmware_version"],
            "v1.0.0",
        )

    def test_temperature_readings(self):
        readings = self.get_data(
            "/api/dashboard/readings?device_id="
            + str(DEVICE_ID)
        )

        normal_reading = any(
            row["temperature"] == 18
            and row["status"] == "NORMAL"
            for row in readings
        )
        critical_reading = any(
            row["temperature"] == 22.6
            and row["status"] == "CRITICAL"
            for row in readings
        )

        self.assertTrue(normal_reading)
        self.assertTrue(critical_reading)

    def test_alerts(self):
        alerts = self.get_data(
            "/api/dashboard/alerts"
        )
        saved_alert = any(
            alert["device_id"] == DEVICE_ID
            and alert["temperature"] == 19.4
            and alert["severity"] == "WARNING"
            and alert["status"] == "RESOLVED"
            for alert in alerts
        )
        self.assertTrue(saved_alert)

    def test_users(self):
        users = self.get_data("/api/users")
        owner_exists = any(
            user["username"] == self.username
            for user in users
        )
        roles = {
            user["role"]
            for user in users
        }

        self.assertTrue(owner_exists)
        self.assertTrue(
            roles.issubset(
                {"OWNER", "ADMIN", "INSPECTOR"}
            )
        )

    def test_data_connection(self):
        devices = self.get_data(
            "/api/dashboard/devices"
        )
        readings = self.get_data(
            "/api/dashboard/readings"
        )
        alerts = self.get_data(
            "/api/dashboard/alerts"
        )

        device_exists = any(
            device["device_id"] == DEVICE_ID
            for device in devices
        )
        reading_exists = any(
            reading["device_id"] == DEVICE_ID
            for reading in readings
        )
        alert_exists = any(
            alert["device_id"] == DEVICE_ID
            for alert in alerts
        )

        self.assertTrue(device_exists)
        self.assertTrue(reading_exists)
        self.assertTrue(alert_exists)


def main():
    print("FlexSight tests")
    username = (
        input("Username [owner_user]: ").strip()
        or "owner_user"
    )
    password = getpass("Password: ")

    if not password:
        print("Password is required")
        return 1

    session = requests.Session()

    try:
        response = session.post(
            BASE_URL + "/api/auth/login",
            json={
                "username": username,
                "password": password,
            },
            timeout=15,
        )
    except requests.RequestException as error:
        print("Connection failed:", error)
        return 1

    if response.status_code != 200:
        print(
            "Login failed:",
            response.status_code,
        )
        return 1

    token = response.json()["token"]
    session.headers.update(
        {"Authorization": "Bearer " + token}
    )

    ProductionIntegrationTests.session = session
    ProductionIntegrationTests.username = username

    loader = unittest.TestLoader()
    tests = unittest.TestSuite()
    tests.addTests(
        loader.loadTestsFromTestCase(
            TemperatureUnitTests
        )
    )
    tests.addTests(
        loader.loadTestsFromTestCase(
            ProductionIntegrationTests
        )
    )

    result = unittest.TextTestRunner(
        verbosity=2
    ).run(tests)
    session.close()

    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(main())
