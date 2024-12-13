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
