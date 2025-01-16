// Ensuring only 1 Process accordion tab can be opened at a time:

document.querySelectorAll(".tab-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      document.querySelectorAll(".tab-checkbox").forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

document.querySelectorAll(".pricing-checkbox").forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      document
        .querySelectorAll(".pricing-checkbox")
        .forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
    }
  });
});

console.log("crap your drawers");

// -----------------------------   Contact Form   --------------------------- //

// Prevent Default and Call validateForm //

const myForm = document.getElementById("myForm");
if (myForm) {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });
}

// Query Selectors On Contact Form //

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");
const nameContainer = document.querySelector(".name-container");
const emailContainer = document.querySelector(".email-container");
const messageSection = document.querySelector(".message-section");

// Form Validation Logic //

function validateForm() {
  let errorFlag = false;

  if (nameInput.value.length < 1) {
    errorNodes[0].innerText = "Name must not blank";
    nameContainer.classList.add("name-container-error");
    errorFlag = true;
  }

  if (!emailIsValid(email.value)) {
    errorNodes[1].innerText = "Invalid email address";
    emailContainer.classList.add("name-container-error");
    errorFlag = true;
  }

  if (message.value.length < 1) {
    errorNodes[2].innerText = "Message must not be blank";
    messageSection.classList.add("message-error-border");
    errorFlag = true;
  }

  if (!errorFlag) {
    // success.innerText = "Your message was successfully submitted!";
    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";

    emailjs
      .send("service_8rfhzvw", "template_l02d47g", {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value,
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          success.innerText = "Your message has been sent!";
        },
        (error) => {
          console.error("FAILED...", error);
          success.innerText = "Failed to send your message. Please try again.";
        }
      );
  }
}

// Clear Error Message in NAME CONTAINER //

if (nameContainer) {
  nameContainer.addEventListener("click", () => {
    errorNodes[0].innerText = "";
    nameContainer.classList.remove("name-container-error");
  });
}

// Clear Error Messages in EMAIL CONTAINER //

if (emailContainer) {
  emailContainer.addEventListener("click", () => {
    errorNodes[1].innerText = "";
    emailContainer.classList.remove("name-container-error");
  });
}

// Clear Error Messages in MESSAGE CONTAINER //

if (messageSection) {
  messageSection.addEventListener("click", () => {
    errorNodes[2].innerText = "";
    messageSection.classList.remove("message-error-border");
  });
}

// Check Using A Regular Expression Pattern For Email Validation //

function emailIsValid(email) {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

// ----------------------  Hamburger Menu ---------------------//

const hamburgerButton = document.querySelector(".hamburger");
const hamburgerLinks = document.querySelector(".hamburger-links");

hamburgerButton.addEventListener("click", () => {
  hamburgerLinks.classList.toggle("active");
  console.log("clicked");
});
