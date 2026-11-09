
const form = document.getElementById("auth-form");
const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const nameGroup = document.getElementById("name-group");
const confirmGroup = document.getElementById("confirm-group");

const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");

const message = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");
const dashboard = document.getElementById("dashboard");
const authView = document.getElementById("auth-view");

let mode = "login";

function setMode(nextMode) {
  mode = nextMode;
  form.reset();
  message.textContent = "";
  message.className = "message";

  const signup = mode === "signup";

  nameGroup.hidden = !signup;
  confirmGroup.hidden = !signup;

  nameInput.required = signup;
  confirmInput.required = signup;

  passwordInput.autocomplete =
    signup ? "new-password" : "current-password";

  loginTab.classList.toggle("active", !signup);
  signupTab.classList.toggle("active", signup);

  document.getElementById("form-heading").textContent =
    signup ? "Create your space." : "Welcome back.";

  document.getElementById("form-subheading").textContent =
    signup
      ? "Explore the registration interface."
      : "Sign in to explore your workspace.";

  submitBtn.textContent =
    signup ? "Create Demo Account →" : "Sign In →";
}

loginTab.addEventListener("click", () => setMode("login"));
signupTab.addEventListener("click", () => setMode("signup"));

document.getElementById("toggle-password")
  .addEventListener("click", event => {
    const visible = passwordInput.type === "text";
    passwordInput.type = visible ? "password" : "text";
    event.target.textContent = visible ? "Show" : "Hide";
  });

form.addEventListener("submit", event => {
  event.preventDefault();

  const password = passwordInput.value;

  if (password.length < 8) {
    message.textContent =
      "Please enter at least 8 characters.";
    return;
  }

  if (mode === "signup") {
    if (password !== confirmInput.value) {
      message.textContent = "Passwords do not match.";
      return;
    }
  }

  // Demonstration only:
  // No credentials are checked against a backend.
  // No account or password is stored.
  const displayName = mode === "signup"
    ? nameInput.value.trim()
    : "Demo User";

  document.getElementById("welcome-message").textContent =
    `Welcome, ${displayName || "Demo User"}!`;

  form.reset();
  authView.hidden = true;
  dashboard.hidden = false;
});

document.getElementById("logout-btn")
  .addEventListener("click", () => {
    dashboard.hidden = true;
    authView.hidden = false;
    setMode("login");
  });

setMode("login");
