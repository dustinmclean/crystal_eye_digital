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

// Full Service Slide In Effect Trigger //

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".full-service-container");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("show");
          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(section);
});

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

  if (!emailIsValid(emailInput.value)) {
    errorNodes[1].innerText = "Invalid email address";
    emailContainer.classList.add("name-container-error");
    errorFlag = true;
  }

  if (messageInput.value.length < 1) {
    errorNodes[2].innerText = "Message must not be blank";
    messageSection.classList.add("message-error-border");
    errorFlag = true;
  }

  if (!errorFlag) {
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

          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
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
  hamburgerButton.classList.toggle("active");
  console.log("clicked");
});

// --------------------- Lighthouse Eye Mouse Follow -------------//

const eye = document.querySelector(".eye");
const pupil = document.querySelector(".pupil");
const mainBackground = document.querySelector(".main-background");

if (eye && pupil && mainBackground) {
  mainBackground.addEventListener("mousemove", (e) => {
    const eyeBounds = eye.getBoundingClientRect();
    const mainBounds = mainBackground.getBoundingClientRect();
    // console.log(eyeBounds);

    // Store client mouse positions //

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate the center of the eye //

    const centerX = eyeBounds.left + eyeBounds.width / 2;
    const centerY = eyeBounds.top + eyeBounds.height / 2;

    // Calculate the distance from the mouse to the center of the eye

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distanceToMouse = Math.sqrt(dx ** 2 + dy ** 2);

    //Calculate the maximum possible distance based on the mainBackground
    const maxPossibleDistance = Math.sqrt(
      Math.pow(mainBounds.width, 2) + Math.pow(mainBounds.height, 2) / 2
    );

    // Normalize the distance to a value beween 0 and 1

    const normalizedDistance = Math.min(
      distanceToMouse / maxPossibleDistance,
      1
    );

    // Calculate the maximum distance the pupil can move within the eye
    const maxPupilDistance = eyeBounds.width / 2 - pupil.offsetWidth / 2;

    // Scale the distance for the pupil based on the normalized distance
    const pupilDistance = normalizedDistance * maxPupilDistance;

    // Calculate the angle to position the pupil
    const angle = Math.atan2(dy, dx);

    // Determine the pupil's position
    const pupilX =
      centerX +
      Math.cos(angle) * pupilDistance -
      eyeBounds.left -
      pupil.offsetWidth / 2;
    const pupilY =
      centerY +
      Math.sin(angle) * pupilDistance -
      eyeBounds.top -
      pupil.offsetHeight / 2;

    // Ensure the pupils stays within the boundaries of the eye
    // pupilX = Math.max(Math.min(pupilX, maxPupilDistance), -maxPupilDistance);
    // pupilY = Math.max(Math.min(pupilY, maxPupilDistance), -maxPupilDistance);

    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });

  const resetPupil = () => {
    pupil.style.transform = `translate(13px, 0px)`;
  };

  resetPupil();
}
