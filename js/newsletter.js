// const newsletterOverlay = document.getElementById("newsletter-overlay");
//   const closeNewsletter = document.getElementById("close-newsletter");
//   const openNewsletterBtn = document.getElementById("open-newsletter-btn");
//   const form = document.getElementById("newsletter-form");
//   const errorDiv = document.getElementById("form-error");

//   openNewsletterBtn.addEventListener("click", () => {
//     newsletterOverlay.style.display = "flex";
//   });

//   closeNewsletter.addEventListener("click", () => {
//     newsletterOverlay.style.display = "none";
//   });

//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const email = form.email.value;
//     const password = form.mdp.value;
//     const confirmed = form.querySelector('input[type="checkbox"]').checked;

//     if (email && password.length >= 8 && confirmed) {
//       errorDiv.style.display = "none";
//       alert("Merci pour votre inscription !");
//       newsletterOverlay.style.display = "none";
//       form.reset();
//     } else {
//       errorDiv.style.display = "block";
//     }
//   });