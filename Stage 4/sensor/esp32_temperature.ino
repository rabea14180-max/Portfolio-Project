#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>

#define DHTPIN 15
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "Hams";
const char* password = "12345678";

// Backend URL
const char* serverUrl = "https://flexsight.dev/api/readings";

void setup() { 
  Serial.begin(115200);
  Serial.println("FlexSight Temperature Monitoring Started");

  dht.begin();

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.println("WiFi connected!");
  Serial.print("ESP32 IP: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  float temperature = dht.readTemperature();

  if (isnan(temperature)) {
    Serial.println("Failed to read temperature!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    if (WiFi.status() == WL_CONNECTED) {

      WiFiClientSecure client;
      client.setInsecure();

      HTTPClient http;

      http.begin(client, serverUrl);
      http.addHeader("Content-Type", "application/json");

      String jsonData = "{\"device_id\":14,\"temperature\":";
      jsonData += String(temperature);
      jsonData += "}";

      int responseCode = http.POST(jsonData);

      Serial.print("Backend response code: ");
      Serial.println(responseCode);

      http.end();
    }

    if (temperature >= 20) {
      Serial.println("ALERT: Temperature reached 20C or higher!");
    }
  }

  delay(5000);
}
