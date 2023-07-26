document.getElementById("findBtn").addEventListener("click", async () => {
  try {
    const ipResponse = await fetch("https://api.ipify.org/?format=json");
    const ipData = await ipResponse.json();

    console.log(ipData);

    const ipAddress = ipData.ip;

    console.log(ipAddress);

    // note here: https://ip-api.com/ is no longer free, so I used https://freeipapi.com/ instead. I think this still works for the assignment.
    const ipInfoResponse = await fetch(`https://freeipapi.com/api/json/${ipAddress}`);
    const ipInfoData = await ipInfoResponse.json();

    console.log(ipInfoData);

    displayIpInfo(ipInfoData);
  } catch (error) {
    displayError("Failed to retrieve IP information.");
  }
});

function displayIpInfo(ipInfoData) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
      <p><strong>IP Version:</strong> ${ipInfoData.ipVersion}</p>
        <p><strong>IP Address:</strong> ${ipInfoData.ipAddress}</p>
        <p><strong>Latitude:</strong> ${ipInfoData.latitude}</p>
        <p><strong>Longitude:</strong> ${ipInfoData.longitude}</p>
        <p><strong>Country Name:</strong> ${ipInfoData.countryName}</p>
        <p><strong>Country Code:</strong> ${ipInfoData.countryCode}</p>
        <p><strong>Time Zone:</strong> ${ipInfoData.timeZone}</p>
        <p><strong>Zip Code:</strong> ${ipInfoData.zipCode}</p>
        <p><strong>City Name:</strong> ${ipInfoData.cityName}</p>
        <p><strong>Region Name:</strong> ${ipInfoData.regionName}</p>
        <p><strong>Continent:</strong> ${ipInfoData.continent}</p>
        <p><strong>Continent Code:</strong> ${ipInfoData.continentCode}</p>
    `;
}

function displayError(message) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `<p class="error">${message}</p>`;
}


