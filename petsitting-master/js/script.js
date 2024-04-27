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
    animals();
    feedback();
    frequentlyAskedQuestions();
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

app.route({
  view: "contact",
  load: "contact.html",
  onCreate: function () {},
  onReady: function () {
    contact();
  },
});

app.route({
  view: "login",
  load: "login.html",
  onCreate: function () {},
  onReady: function () {
    login();
  },
});

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
// Get the element with id="defaultOpen" and click on it
//document.getElementById("defaultOpen").click();

function login() {
  // Add a submit event listener to the sign-up form
  const signUpForm = document.getElementById("sign-up-form");
  signUpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the user input from the form fields
    const fullName = document.getElementById("full_name").value;
    const email = document.getElementById("your_email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;

    // Check if the passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match, please try again.");
      return;
    }
    // Display the user input in the console
    console.log(`Full Name: ${fullName}`);
    console.log(`E-Mail: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPassword}`);
  });

  // Add a submit event listener to the sign-in form
  const signInForm = document.getElementById("sign-in-form");
  signInForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the user input from the form fields
    const fullName = document.getElementById("full_name_1").value;
    const password = document.getElementById("password_1").value;

    // Display the user input in the console
    console.log(`Full Name: ${fullName}`);
    console.log(`Password: ${password}`);
  });
}

function contact() {
  function validateContactForm() {
    // Get the form fields
    const fullName = document.getElementById("fullName").value;
    const emailAddress = document.getElementById("emailAddress").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Display the form data in the console
    console.log(`Full Name: ${fullName}`);
    console.log(`Email Address: ${emailAddress}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);

    // Prevent the form from being submitted in the default way
    return false;
  }

  // Add a submit event listener to the form
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateContactForm();
  });
}

function frequentlyAskedQuestions() {
  fetch("/WEB-PROJECT/petsitting-master/json/FAQ.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch FAQs");
      }
      return response.json();
    })
    .then((data) => {
      const accordion = document.getElementById("accordion");
      if (Array.isArray(data.faqs)) {
        data.faqs.forEach((faq, index) => {
          // Check if the question already exists
          const existingQuestion = document.querySelector(
            `[aria-labelledby="heading${index + 1}"]`
          );
          if (existingQuestion) {
            return; // Skip adding the question if it already exists
          }

          const card = document.createElement("div");
          card.classList.add("card");

          const cardHeader = document.createElement("div");
          cardHeader.classList.add("card-header", "p-0");
          cardHeader.id = `heading${index + 1}`;

          const h2 = document.createElement("h2");
          h2.classList.add("mb-0");

          const button = document.createElement("button");
          button.href = `#collapse${index + 1}`;
          button.classList.add(
            "d-flex",
            "py-3",
            "px-4",
            "align-items-center",
            "justify-content-between",
            "btn",
            "btn-link"
          );
          button.setAttribute("data-parent", "#accordion");
          button.setAttribute("data-toggle", "collapse");
          button.setAttribute("aria-expanded", "false");
          button.setAttribute("aria-controls", `collapse${index + 1}`);
          button.innerHTML = `<p class="mb-0">${faq.question}</p><i class="fa" aria-hidden="true"></i>`;

          // Add click event listener to toggle collapse
          button.addEventListener("click", () => {
            const collapseDiv = document.getElementById(`collapse${index + 1}`);
            const isCollapsed = collapseDiv.classList.contains("show");
            if (isCollapsed) {
              collapseDiv.classList.remove("show");
              button.setAttribute("aria-expanded", "false");
            } else {
              collapseDiv.classList.add("show");
              button.setAttribute("aria-expanded", "true");
            }
          });

          h2.appendChild(button);
          cardHeader.appendChild(h2);
          card.appendChild(cardHeader);

          const collapseDiv = document.createElement("div");
          collapseDiv.classList.add("collapse");
          collapseDiv.id = `collapse${index + 1}`;
          collapseDiv.setAttribute("role", "tabpanel");
          collapseDiv.setAttribute("aria-labelledby", `heading${index + 1}`);

          const cardBody = document.createElement("div");
          cardBody.classList.add("card-body", "py-3", "px-0");
          cardBody.innerHTML = `<ol><li>${faq.answer1}</li><li>${faq.answer2}</li></ol>`;

          collapseDiv.appendChild(cardBody);
          card.appendChild(collapseDiv);

          accordion.appendChild(card);
        });
      } else {
        throw new Error("FAQ data is not in the expected format");
      }
    })
    .catch((error) =>
      console.error("Error fetching or processing FAQs:", error)
    );
}

function pets() {
  // Fetching the JSON data for pets
  fetch("/WEB-PROJECT/petsitting-master/json/animals.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      return response.json();
    })
    .then((data) => {
      const petContainer = document.getElementById("pets1");
      petContainer.innerHTML = "";
      if (data.hasOwnProperty("pets")) {
        data.pets.forEach((pet) => {
          const col = document.createElement("div");
          col.classList.add("col-md-4", "ftco-animate");

          const work = document.createElement("div");
          work.classList.add(
            "work",
            "mb-4",
            "img",
            "d-flex",
            "align-items-end"
          );
          work.style.backgroundImage = `url(${pet.photo})`;

          const link = document.createElement("a");
          link.href = pet.photo;
          link.classList.add(
            "icon",
            "image-popup",
            "d-flex",
            "justify-content-center",
            "align-items-center"
          );

          const expandIcon = document.createElement("span");
          expandIcon.classList.add("fa", "fa-expand");

          const desc = document.createElement("div");
          desc.classList.add("desc", "w-100", "px-4");

          const text = document.createElement("div");
          text.classList.add("text", "w-100", "mb-3");

          const span = document.createElement("span");
          span.textContent = pet.name;

          const h2 = document.createElement("h2");
          const h2Link = document.createElement("a");
          h2Link.href = "#"; // Replace '#' with appropriate link
          h2Link.textContent = pet.breed;
          h2.appendChild(h2Link);

          // Appending elements
          link.appendChild(expandIcon);
          text.appendChild(span);
          text.appendChild(h2);
          desc.appendChild(text);
          work.appendChild(link);
          work.appendChild(desc);
          col.appendChild(work);
          petContainer.appendChild(col);
        });
      } else {
        throw new Error("No pets data found");
      }
    })
    .catch((error) => console.error("Error fetching pets:", error));
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
  fetch("/WEB-PROJECT/petsitting-master/json/feedback.json")
    .then((response) => response.json())
    .then((data) => {
      // Selecting the container element to append feedbacks
      const testimonialContainer = document.querySelector(
        ".carousel-testimony"
      );
      testimonialContainer.innerHTML = "";
      // Looping through each feedback and creating HTML elements
      data["Clients & Feedbacks"].forEach((feedback) => {
        // Creating elements
        const item = document.createElement("div");
        item.classList.add("item");

        const testimonyWrap = document.createElement("div");
        testimonyWrap.classList.add("testimony-wrap", "py-4");

        const icon = document.createElement("div");
        icon.classList.add(
          "icon",
          "d-flex",
          "align-items-center",
          "justify-content-center"
        );

        const quoteIcon = document.createElement("span");
        quoteIcon.classList.add("fa", "fa-quote-left");

        const text = document.createElement("div");
        text.classList.add("text");

        const comment = document.createElement("p");
        comment.classList.add("mb-4");
        comment.textContent = feedback.comment;

        const userDiv = document.createElement("div");
        userDiv.classList.add("d-flex", "align-items-center");

        const userImg = document.createElement("div");
        userImg.classList.add("user-img");
        userImg.style.backgroundImage = `url(${feedback.photo})`;

        const userName = document.createElement("div");
        userName.classList.add("pl-3");

        const name = document.createElement("p");
        name.classList.add("name");
        name.textContent = feedback.name;

        // Appending elements
        icon.appendChild(quoteIcon);
        userDiv.appendChild(userImg);
        userName.appendChild(name);
        userDiv.appendChild(userName);
        text.appendChild(comment);
        text.appendChild(userDiv);
        testimonyWrap.appendChild(icon);
        testimonyWrap.appendChild(text);
        item.appendChild(testimonyWrap);
        testimonialContainer.appendChild(item);
      });
    })
    .catch((error) => console.error("Error fetching feedbacks:", error));
}

function animals() {
  fetch("/WEB-PROJECT/petsitting-master/json/animals.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      return response.json();
    })
    .then((data) => {
      const petContainer = document.getElementById("pets");
      petContainer.innerHTML = "";
      data.pets.forEach((pet) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "ftco-animate");

        const work = document.createElement("div");
        work.classList.add("work", "mb-4", "img", "d-flex", "align-items-end");
        work.style.backgroundImage = `url(${pet.photo})`;

        const link = document.createElement("a");
        link.href = pet.photo;
        link.classList.add(
          "icon",
          "image-popup",
          "d-flex",
          "justify-content-center",
          "align-items-center"
        );

        const expandIcon = document.createElement("span");
        expandIcon.classList.add("fa", "fa-expand");

        const desc = document.createElement("div");
        desc.classList.add("desc", "w-100", "px-4");

        const text = document.createElement("div");
        text.classList.add("text", "w-100", "mb-3");

        const span = document.createElement("span");
        span.textContent = pet.name;

        const h2 = document.createElement("h2");
        const h2Link = document.createElement("a");
        h2Link.href = "#"; // Replace '#' with appropriate link
        h2Link.textContent = pet.breed;
        h2.appendChild(h2Link);

        // Appending elements
        link.appendChild(expandIcon);
        text.appendChild(span);
        text.appendChild(h2);
        desc.appendChild(text);
        work.appendChild(link);
        work.appendChild(desc);
        col.appendChild(work);
        petContainer.appendChild(col);
      });
    })
    .catch((error) => console.error("Error fetching pets:", error));
}

app.run();
