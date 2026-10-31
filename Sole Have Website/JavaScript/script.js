// PRODUCT SEARCH FUNCTIONALITY

const searchInput = document.getElementById("productSearch");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const products = document.querySelectorAll(".product");

        products.forEach(function (product) {

            const productName =
                product.querySelector("h3").textContent.toLowerCase();

            if (productName.includes(searchValue)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}
// PRODUCT SORTING

const priceSort = document.getElementById("priceSort");

if (priceSort) {

    priceSort.addEventListener("change", function () {

        const productsContainer =
            document.querySelector(".products");

        const products = Array.from(
            productsContainer.querySelectorAll(".product")
        );

        products.sort(function (a, b) {

            const priceA = parseFloat(
                a.querySelector(".price").textContent.replace(/[^\d.]/g, "")
            );

            const priceB = parseFloat(
                b.querySelector(".price").textContent.replace(/[^\d.]/g, "")
            );

            if (this.value === "low") {
                return priceA - priceB;
            }

            if (this.value === "high") {
                return priceB - priceA;
            }

            return 0;

        }.bind(this));

        products.forEach(function (product) {
            productsContainer.appendChild(product);
        });

    });

}
// FAQ ACCORDION

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer = this.nextElementSibling;

        answer.classList.toggle("active");

    });

});
// IMAGE LIGHTBOX

document.querySelectorAll(".product img").forEach(function (img) {

    img.style.cursor = "pointer";

    img.addEventListener("click", function () {

        const lightbox = document.createElement("div");

        lightbox.className = "lightbox";

        const largeImage = document.createElement("img");

        largeImage.src = this.src;
        largeImage.alt = this.alt;

        lightbox.appendChild(largeImage);

        document.body.appendChild(lightbox);

        lightbox.addEventListener("click", function () {
            lightbox.remove();
        });

    });

});
// SOLE HAVEN SHOES - ENQUIRY FORM VALIDATION

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Get customer information

        const fullName =
            document.getElementById("fullName").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const enquiryType =
            document.getElementById("enquiryType").value;

        const category =
            document.getElementById("category").value;

        const product =
            document.getElementById("product").value.trim();

        const shoeSize =
            document.getElementById("shoeSize").value;

        const message =
            document.getElementById("message").value.trim();


        // Validate name

        if (fullName.length < 2) {

            alert("Please enter your full name.");

            return;

        }


        // Validate South African phone number

        const phonePattern = /^0[1-9][0-9]{8}$/;

        if (!phonePattern.test(phone)) {

            alert("Please enter a valid 10-digit phone number.");

            return;

        }


        // Validate message

        if (message.length < 10) {

            alert("Please enter at least 10 characters in your message.");

            return;

        }


        // Display successful enquiry response

        const response =
            document.getElementById("enquiryResponse");

        response.innerHTML = `
            <h3>Thank You, ${fullName}!</h3>

            <p>Your enquiry has been successfully validated.</p>

            <h4>Enquiry Summary</h4>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Phone:</strong> ${phone}</p>

            <p><strong>Enquiry Type:</strong> ${enquiryType}</p>

            <p><strong>Category:</strong> ${category}</p>

            <p><strong>Product:</strong> ${product}</p>

            <p><strong>Shoe Size:</strong> ${shoeSize}</p>

            <p><strong>Message:</strong> ${message}</p>

            <p>
                Thank you for your interest in Sole Haven Shoes.
                Our team can assist you with your enquiry and
                confirm product pricing and availability.
            </p>
        `;

        response.scrollIntoView({
            behavior: "smooth"
        });

        enquiryForm.reset();

    });

}
// SOLE HAVEN SHOES CONTACT FORM

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const messageType = document.getElementById("messageType").value;
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const response = document.getElementById("contactResponse");

        // Check that required information is provided
        if (
            !fullName ||
            !email ||
            !messageType ||
            !subject ||
            !message
        ) {
            response.textContent =
                "Please complete all required fields.";

            return;
        }

        if (fullName.length < 2) {
            response.textContent =
                "Please enter a valid full name.";

            return;
        }

        if (subject.length < 3) {
            response.textContent =
                "Your subject must contain at least 3 characters.";

            return;
        }

        if (message.length < 10) {
            response.textContent =
                "Your message must contain at least 10 characters.";

            return;
        }

        // Check South African phone number if provided
        if (phone && !/^0[1-9][0-9]{8}$/.test(phone)) {
            response.textContent =
                "Please enter a valid 10-digit South African phone number.";

            return;
        }

        // Prepare the email
        const recipient = "YOUR_EMAIL@example.com";

        const emailSubject = encodeURIComponent(
            "Sole Haven Shoes: " + subject
        );

        const emailBody = encodeURIComponent(
            "New Contact Form Message\n\n" +
            "Full Name: " + fullName + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + (phone || "Not provided") + "\n" +
            "Message Type: " + messageType + "\n" +
            "Subject: " + subject + "\n\n" +
            "Message:\n" + message
        );

        response.textContent =
            "Your email application will open with your message ready to send.";

        // Open the user's email application
        window.location.href =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

    });

}