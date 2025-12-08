const firstName = localStorage.getItem("firstname") || "";
const middleInitial = localStorage.getItem("mi") || "";
const lastName = localStorage.getItem("lastname") || "";
const idNumber = localStorage.getItem("idno") || "";

const userNameEl = document.getElementById("userName");
if (firstName) userNameEl.textContent = firstName;

// Shared secret key for QR validation (same for all students)
const SECRET_KEY = "8f4b1c53-2c7e-4f8a-9d92-6fbd3e7c4e87";

function generateQRWithLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported in this browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude.toFixed(6);
      const longitude = position.coords.longitude.toFixed(6);

      // ✅ Get current date and time
      const now = new Date();

      // Date for display and QR code: "September 3 2025"
      const optionsDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const dateStr = now.toLocaleDateString(undefined, optionsDate);

      // Time for display and QR code: "8:56 PM"
      const optionsTime = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      const timeStr = now.toLocaleTimeString(undefined, optionsTime);

      // Display on page
      document.getElementById("dateDisplay").textContent = dateStr;
      document.getElementById("timeDisplay").textContent = timeStr;

      // ✅ Embed all info in QR code
      const qrData = `
Name: ${firstName} ${middleInitial} ${lastName}
ID: ${idNumber}
Key: ${SECRET_KEY}
Latitude: ${latitude}
Longitude: ${longitude}
Date: ${dateStr}
Time: ${timeStr}
      `;

      const qrCanvas = document.getElementById("qrCanvas");
      QRCode.toCanvas(qrCanvas, qrData, { width: 200 }, (error) => {
        if (error) console.error(error);
      });

      // ✅ Google Maps button
      const mapBtn = document.getElementById("button");
      mapBtn.onclick = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        window.open(url, "_blank");
      };
    },
    (error) => {
      console.error("Error getting location:", error);
      alert("Could not get location. Please allow location access.");
    }
  );
}

function startCountdown(durationInSeconds, elementId) {
  let timeLeft = durationInSeconds;
  const timerElement = document.getElementById(elementId);

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;

    if (timeLeft < 60 && timeLeft > 0) {
      timerElement.style.color = "red";
    }

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(countdown);
      window.load();
    }
  }

  updateTimer();
  const countdown = setInterval(updateTimer, 1000);
}

// Run on page load
generateQRWithLocation();
startCountdown(5 * 60, "timer");
