console.log("Script loaded");
var app = $.spapp({
  defaultView: "#home",
  templateDir: "./views/",
  pageNotFound: "error_404",
  reloadView: true,
});

app.route({
  view: "home",
  load: "home.html",
  onCreate: function () {},
  onReady: function () {
    feedback();
  },
});

app.route({
  view: "services",
  load: "services.html",
  onCreate: function () {},
  onReady: function () {
    services();
  },
});

app.route({
  view: "about",
  load: "about.html",
  onCreate: function () {},
  onReady: function () {
    consultations();
  },
});

app.route({
  view: "pets",
  load: "pets.html",
  onCreate: function () {},
  onReady: function () {
    pets();
  },
});

//pets
function pets() {
  // Fetching the JSON data for pets
  // Assuming RestClient is imported and available
  RestClient.get("pets", function (data) {
    let petContainer = document.querySelector("#pets1");
    petContainer.innerHTML = "";
    data
      .forEach((pets) => {
        let petItem = document.createElement("div");
        petItem.className = "col-12 col-md-6 col-lg-4 mb-5 mb-md-0";
        petItem.innerHTML = `
      <img src="${pets.photo}" class="img-fluid mb-5" />
      <h3><a href="#"><span class="">${pets.name}</span></a></h3>
      <span class="d-block position mb-4">${pets.breed}</span>
    `;
        petContainer.appendChild(petItem);
      })
      .catch((error) => console.error("Error fetching pets:", error));
  });
}

function consultations() {
  document.addEventListener("DOMContentLoaded", function () {
    // Target the form by its ID
    const form = document.getElementById("consultations");

    // Listen for form submission
    form.addEventListener("submit", function (event) {
      // Prevent the form from submitting the traditional way
      event.preventDefault();

      // Initialize an object to store form data
      let formData = {};

      // Use FormData to capture the form data
      new FormData(form).forEach((value, key) => {
        formData[key] = value;
      });

      // Log the formData object to the console
      console.log(formData);

      // If you wish to see the data as a string
      console.log(JSON.stringify(formData));

      // Send the form data to the server
      fetch("your-server-url-here", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
}

function feedback() {
  // Fetching the JSON data for feedbacks
  // Assuming RestClient is imported and available
  RestClient.get("feedback", function (data) {
    const feedbackContainer = document.querySelector("#feedbackContainer");
    feedbackContainer.innerHTML = "";

    data.forEach((feedback) => {
      let item = document.createElement("div");
      item.innerHTML = `
        <div class="feedback-card">
          <div class="feedback-card-header">
            <img src="${feedback.photo}" class="img-fluid mb-5" />
            <h3>${feedback.name}</h3>
          </div>
          <div class="feedback-card-body">
            <p>${feedback.comment}</p>
          </div>
        </div>
      `;

      feedbackContainer.append(item);
    });
  }).catch((error) => console.error("Error fetching feedbacks:", error));
}

//services
function services() {
  // Fetching the JSON data for services
  // Assuming RestClient is imported and available
  RestClient.get("services", function (data) {
    let container = document.querySelector("#services");
    container.innerHTML = "";

    // Create a parent container for the grid layout
    const row = document.createElement("div");
    row.classList.add("row");

    data.forEach((service) => {
      let item = document.createElement("div");
      item.classList.add("col-md-6", "col-lg-4", "mb-5", "mb-md-0");
      item.innerHTML = `
        <div class="d-block services text-center">
          <div class="icon d-flex align-items-center justify-content-center">
            <img class="icons-in-services" src="${service.photo}" style="height: 50px;" alt="">
          </div>
          <div class="media-body p-4">
            <h3 class="heading">${service.name}</h3>
            <p>${service.description}</p>
          </div>
        </div>
      `;

      // Append the item to the row container
      row.appendChild(item);
    });

    // Append the row container to the main container
    container.appendChild(row);
  }).catch((error) => console.error("Error fetching services:", error));
}

app.run();
