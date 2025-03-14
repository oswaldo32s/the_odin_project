import createElement from "../functions/elements.js";

export default function signUp() {
  function inputField(label, validation) {
    function handleValidation(e) {
      const input = e.target;
      const error = e.target.previousElementSibling;

      if (input.validity.valid) {
        input.className = "signup-input";
        error.textContent = "";
        error.className = "error";
      } else {
        showError();
      }

      function showError() {
        if (validation == "email") {
          if (input.validity.valueMissing) {
            error.textContent = "You need to enter a email";
          } else if (input.validity.typeMismatch) {
            error.textContent =
              "Entered value needs to be an email (example@email.com).";
          } else if (input.validity.tooShort) {
            error.textContent =
              "Entered value needs to be at least 6 characters long.";
          } else if (input.validity.tooLong) {
            error.textContent =
              "Entered value needs to be at maximum 50 characters long.";
          }
          input.className = "signup-input error-input";
          error.className = "error active";
        } else if (validation == "name") {
          if (input.validity.valueMissing) {
            error.textContent = "You need to enter a Name";
          } else if (input.validity.typeMismatch) {
            error.textContent = "Entered value needs to be a String.";
          } else if (input.validity.tooShort) {
            error.textContent =
              "Entered value needs to be at least 2 characters long.";
          } else if (input.validity.tooLong) {
            error.textContent =
              "Entered value needs to be at maximum 20 characters long.";
          }
          input.className = "signup-input error-input";
          error.className = "error active";
        } else if (validation == "phone") {
          if (input.validity.valueMissing) {
            error.textContent = "You need to enter a Phone Number";
          } else if (input.validity.typeMismatch) {
            error.textContent = "Entered value needs to be a Phone Number.";
          } else if (input.validity.tooShort) {
            error.textContent = "Entered value needs to be have 10 characters.";
          } else if (input.validity.tooLong) {
            error.textContent = "Entered value needs to be have 10 characters.";
          }
          input.className = "signup-input error-input";
          error.className = "error active";
        } else if (validation == "password") {
          if (input.validity.valueMissing) {
            error.textContent = "You need to enter a password";
          } else if (input.validity.typeMismatch) {
            error.textContent = "Entered value needs to be a Password.";
          } else if (input.validity.tooShort) {
            error.textContent =
              "Entered value needs to be at least 8 characters long.";
          } else if (input.validity.tooLong) {
            error.textContent =
              "Entered value needs to be at maximum 20 characters long.";
          }
          input.className = "signup-input error-input";
          error.className = "error active";
        }
      }
    }

    function checkInputType(type) {
      if (type == "email") {
        return {
          minlength: "6",
          maxlength: "50",
          type: "email",
          require: true,
        };
      } else if (type == "name") {
        return {
          minlength: "2",
          maxlength: "20",
          type: "text",
          require: true,
        };
      } else if (type == "phone") {
        return {
          minlength: "10",
          maxlength: "10",
          type: "text",
          require: true,
        };
      } else if (type == "password") {
        return {
          minlength: "8",
          maxlength: "20",
          type: "password",
          require: true,
        };
      }

      return {};
    }

    return createElement("div", {
      class: "input-field",
      childElements: [
        createElement("label", {
          class: "signup-label",
          text: label,
        }),
        createElement("div", {
          class: "signup-input-div",
          childElements: [
            createElement("span", {
              class: "error",
            }),
            createElement("input", {
              class: "signup-input",
              attribute: checkInputType(validation),
              events: {
                input: handleValidation,
              },
            }),
          ],
        }),
      ],
    });
  }

  const signUp = createElement("div", {
    class: "signup",
    childElements: [
      createElement("form", {
        class: "signup-form",
        attribute: {
          novalidate: true,
        },
        childElements: [
          createElement("h2", {
            class: "form-title",
            text: "Sign Up",
          }),
          inputField("First Name", "name"),
          inputField("Last Name", "name"),
          inputField("Phone Number", "phone"),
          inputField("Email", "email"),
          inputField("Country", "name"),
          inputField("Password", "password"),
          inputField("Confirm Password", "password"),
          createElement("button", {
            class: "signup-submit",
            text: "Submit",
          }),
        ],
      }),
    ],
  });

  return signUp;
}
