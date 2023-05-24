// Fetch job ads data from the API
fetch("https://us-central1-combis-jobs-etl.cloudfunctions.net/getEntries")
  .then((response) => response.json())
  .then((data) => {
    // Extract unique occupation_label and workplace_region values
    const uniqueOccupations = [
      ...new Set(data.map((entry) => entry.occupation_label)),
    ];
    const uniqueRegions = [
      ...new Set(data.map((entry) => entry.workplace_region)),
    ];

    // Populate occupation filter dropdown
    const occupationSelect = document.getElementById("occupation-select");
    uniqueOccupations.forEach((occupation) => {
      const option = document.createElement("option");
      option.value = occupation;
      option.textContent = occupation;
      occupationSelect.appendChild(option);
    });

    // Populate region filter dropdown
    const regionSelect = document.getElementById("region-select");
    uniqueRegions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      regionSelect.appendChild(option);
    });

    // Render initial job ads
    renderJobAds(data);
  })
  .catch((error) => console.error("Error fetching job ads:", error));

// Function to render job ads based on selected filters
function renderJobAds(jobAds) {
  const occupationFilter = document.getElementById("occupation-select").value;
  const regionFilter = document.getElementById("region-select").value;

  const filteredJobAds = jobAds
    .filter((entry) => {
      return (
        (occupationFilter === "" ||
          entry.occupation_label === occupationFilter) &&
        (regionFilter === "" || entry.workplace_region === regionFilter)
      );
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  const jobAdsContainer = document.getElementById("job-ads");
  jobAdsContainer.innerHTML = "";

  if (filteredJobAds.length > 0) {
    filteredJobAds.forEach((entry) => {
      const jobAdDiv = document.createElement("div");
      const applyHTML = entry.application_url
        ? `<p><strong>Apply here: </strong><a href="${entry.application_url}">${entry.application_url}</a></p>`
        : "";
      const timestamp = parseInt(entry.timestamp); // Convert the timestamp to an integer value
      const date = new Date(timestamp); // Create a Date object using the timestamp value
      const formattedDate = date.toLocaleString(); // Format the date in a user-friendly way

      const html = `
          <h3>${entry.title}</h3>
          <p><strong>Occupation:</strong> ${entry.occupation_label}</p>
          <p><strong>Region:</strong> ${entry.workplace_region}</p>
          <p class="summary">${entry.summary_en}</p>
          <p><strong>Last Posted:</strong> ${formattedDate}</p>
          ${applyHTML}
          <hr>
        `;
      jobAdDiv.innerHTML = html;
      jobAdsContainer.appendChild(jobAdDiv);
    });
  } else {
    const noResultsDiv = document.createElement("div");
    noResultsDiv.textContent = "No job ads found.";
    jobAdsContainer.appendChild(noResultsDiv);
  }
}

// Event listeners for filter changes
document.getElementById("occupation-select").addEventListener("change", () => {
  fetch("https://us-central1-combis-jobs-etl.cloudfunctions.net/getEntries")
    .then((response) => response.json())
    .then((data) => {
      renderJobAds(data);
    });
});

document.getElementById("region-select").addEventListener("change", () => {
  fetch("https://us-central1-combis-jobs-etl.cloudfunctions.net/getEntries")
    .then((response) => response.json())
    .then((data) => {
      renderJobAds(data);
    });
});
