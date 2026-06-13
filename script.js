/* ==========================
   MOBILE NAVIGATION
========================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}

/* ==========================
   CONTACT FORM VALIDATION
========================== */

const contactForm = document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener("submit", function(e){

e.preventDefault();

const name =
document.getElementById("name").value.trim();

const email =
document.getElementById("email").value.trim();

const phone =
document.getElementById("phone").value.trim();

const subject =
document.getElementById("subject").value.trim();

const message =
document.getElementById("message").value.trim();

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern =
/^[0-9]{10}$/;

if(name === ""){

alert("Please enter your name.");
return;

}

if(!emailPattern.test(email)){

alert("Please enter a valid email address.");
return;

}

if(!phonePattern.test(phone)){

alert("Please enter a valid 10-digit phone number.");
return;

}

if(subject === ""){

alert("Please enter a subject.");
return;

}

if(message === ""){

alert("Please enter your message.");
return;

}

alert(
"Thank you! Your message has been sent successfully."
);

contactForm.reset();

});

}

/* ==========================
   ANIMATED COUNTERS
========================== */

const counters =
document.querySelectorAll(".counter");

const speed = 100;

counters.forEach(counter => {

const updateCount = () => {

const target =
+counter.getAttribute("data-target");

const count =
+counter.innerText;

const increment =
target / speed;

if(count < target){

counter.innerText =
Math.ceil(count + increment);

setTimeout(updateCount,20);

}
else{

counter.innerText = target;

}

};

updateCount();

});

/* ==========================
   TESTIMONIAL SLIDER
========================== */

const testimonials = [

{
name:"Rahul",
review:
"Fast delivery and excellent customer service."
},

{
name:"Priya",
review:
"Beautiful interface and easy ordering experience."
},

{
name:"Arjun",
review:
"The best food delivery platform I've used."
},

{
name:"Meena",
review:
"Quick delivery and amazing offers every day."
}

];

const testimonialText =
document.getElementById("testimonial-text");

const testimonialName =
document.getElementById("testimonial-name");

let testimonialIndex = 0;

function showTestimonials(){

if(
testimonialText &&
testimonialName
){

testimonialText.innerText =
testimonials[testimonialIndex].review;

testimonialName.innerText =
testimonials[testimonialIndex].name;

testimonialIndex++;

if(
testimonialIndex >= testimonials.length
){
testimonialIndex = 0;
}

}

}

setInterval(showTestimonials,3000);

/* ==========================
   FOOD SEARCH
========================== */

const searchInput =
document.getElementById("foodSearch");

const restaurantCards =
document.querySelectorAll(".restaurant-card");

if(searchInput){

searchInput.addEventListener("keyup", () => {

const searchValue =
searchInput.value.toLowerCase();

restaurantCards.forEach(card => {

const title =
card.querySelector("h3")
.innerText
.toLowerCase();

if(
title.includes(searchValue)
){

card.style.display = "block";

}
else{

card.style.display = "none";

}

});

});

}

/* ==========================
   SCROLL REVEAL EFFECT
========================== */

const revealElements =
document.querySelectorAll(
".feature-card, .restaurant-card, .category-card, .stat"
);

function reveal(){

revealElements.forEach(element => {

const windowHeight =
window.innerHeight;

const revealTop =
element.getBoundingClientRect().top;

const revealPoint = 100;

if(revealTop < windowHeight - revealPoint){

element.classList.add("active-reveal");

}

});

}

window.addEventListener("scroll", reveal);

/* ==========================
   PAGE LOAD ANIMATION
========================== */

window.addEventListener("load", () => {

document.body.classList.add("loaded");

});