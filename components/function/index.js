window.onload = () => {
  const firstName = localStorage.getItem("firstname");
  const idNumber = localStorage.getItem("idno");

  if (firstName && idNumber) {
    window.location.href = "src/page2.html";
  }
};
document.getElementById("generateBtn").addEventListener("click", () => {
  const firstName = document.getElementById("firstname").value.trim();
  const middleInitial = document.getElementById("mi").value.trim();
  const lastName = document.getElementById("lastname").value.trim();
  const idNumber = document.getElementById("idno").value.trim();
  const termsAccepted = document.getElementById("termsCheck").checked;

  if (!firstName || !lastName || !idNumber) {
    alert("Please fill in all required fields");
    return;
  }
  if (!termsAccepted) {
    alert("You must accept the terms");
    return;
  }

  // Save to localStorage
  localStorage.setItem("firstname", firstName);
  localStorage.setItem("mi", middleInitial);
  localStorage.setItem("lastname", lastName);
  localStorage.setItem("idno", idNumber);

  // Redirect to QR code page
  window.location.href = "src/page2.html";
});
