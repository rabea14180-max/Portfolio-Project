import urllib.request
import urllib.parse
import json

BASE_URL = "http://127.0.0.1:5000"

def make_request(path, method="GET", data=None, token=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    req_data = None
    if data:
        req_data = json.dumps(data).encode("utf-8")
        
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            res_data = res.read().decode("utf-8")
            return res.status, json.loads(res_data)
    except urllib.error.HTTPError as e:
        try:
            err_data = e.read().decode("utf-8")
            return e.code, json.loads(err_data)
        except Exception:
            return e.code, {"message": str(e)}
    except Exception as e:
        return 0, {"message": str(e)}

def run_tests():
    print("--- 1. Testing Owner Registration ---")
    signup_data = {
        "username": "api_test_user",
        "email": "api_test@flexsight.com",
        "password": "password123",
    }
    status, signup_res = make_request("/api/auth/register-owner", method="POST", data=signup_data)
    print(f"Register Owner Response (Status {status}):", signup_res)

    print("\n--- 2. Testing Login ---")
    login_data = {
        "username": "api_test_user",
        "password": "password123"
    }
    status, login_res = make_request("/api/auth/login", method="POST", data=login_data)
    print(f"Login Response (Status {status}):", login_res)

    if status != 200 or not login_res.get("success"):
        print("Login failed, aborting remaining tests.")
        return

    token = login_res.get("token")

    print("\n--- 3. Testing Get Devices (Dashboard component) ---")
    status, devices_res = make_request("/api/dashboard/devices", token=token)
    print(f"Get Devices Response (Status {status}):")
    print(json.dumps(devices_res, indent=2))

    print("\n--- 4. Testing Get Alerts (Dashboard component) ---")
    status, alerts_res = make_request("/api/dashboard/alerts", token=token)
    print(f"Get Alerts Response (Status {status}):")
    print(json.dumps(alerts_res, indent=2))

    print("\n--- 5. Testing Get Readings (Dashboard component) ---")
    status, readings_res = make_request("/api/dashboard/readings", token=token)
    print(f"Get Readings Response (Status {status}):")
    print(json.dumps(readings_res, indent=2))

if __name__ == "__main__":
    run_tests()
