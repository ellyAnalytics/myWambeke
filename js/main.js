
// Services Read More Toggle (Only targets .read-more-btn)
// Services Read More Toggle with typing effect
document.querySelectorAll(".btn.btn-success.btn-sm").forEach((button) => {
  const targetSelector = button.getAttribute("data-bs-target");
  const target = document.querySelector(targetSelector);

  if (target) {
    const paragraph = target.querySelector("p");
    let typingInterval = null; // store interval reference

    // Store original text and hide initially
    if (paragraph) {
      paragraph.dataset.fullText = paragraph.textContent.trim();
      paragraph.textContent = "";
    }

    target.addEventListener("shown.bs.collapse", () => {
      button.textContent = "Read Less";

      if (paragraph) {
        // Cancel any old typing first
        clearInterval(typingInterval);

        paragraph.textContent = "";
        let i = 0;
        const text = paragraph.dataset.fullText;

        typingInterval = setInterval(() => {
          paragraph.textContent += text.charAt(i);
          i++;
          if (i >= text.length) {
            clearInterval(typingInterval);
          }
        }, 40); // typing speed
      }
    });

    target.addEventListener("hide.bs.collapse", (e) => {
      // Stop Bootstrap from instantly hiding so we can erase first
      e.preventDefault();
      
      if (paragraph) {
        clearInterval(typingInterval);
        let text = paragraph.textContent;
        let i = text.length;

        typingInterval = setInterval(() => {
          paragraph.textContent = text.substring(0, i - 1);
          i--;
          if (i <= 0) {
            clearInterval(typingInterval);
            target.classList.remove("show"); // finally hide collapse
            button.textContent = "Read More";
          }
        }, 30); // erase speed
      }
    });
  }
});


// Services typing
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".card.h-100");
  const serviceHeadings = document.querySelectorAll(".card h5");

  // Store original text
  serviceHeadings.forEach(heading => {
    heading.dataset.fullText = heading.textContent;
    heading.textContent = "";
  });

  const typingIntervals = new WeakMap();
  const typingLocks = new WeakMap();
  const slideDirections = new WeakMap(); // Track last direction for each card

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const heading = entry.target.querySelector("h5");

      if (entry.isIntersecting) {
        if (typingLocks.get(heading)) return;
        typingLocks.set(heading, true);

        heading.textContent = "";

        // Get last direction and flip it
        let lastDirection = slideDirections.get(entry.target) || "right";
        let newDirection = lastDirection === "left" ? "right" : "left";
        slideDirections.set(entry.target, newDirection);

        // Apply slide animation with slower speed
        if (newDirection === "left") {
          entry.target.style.animation = "slideFromLeft 3s ease forwards";
        } else {
          entry.target.style.animation = "slideFromRight 3s ease forwards";
        }

        clearInterval(typingIntervals.get(heading));

        // Keep your current typing speed & effect
        let i = 0;
        const interval = setInterval(() => {
          heading.textContent += heading.dataset.fullText.charAt(i);
          i++;
          if (i === heading.dataset.fullText.length) {
            clearInterval(interval);
            typingLocks.set(heading, false);
          }
        }, 120);
        
        typingIntervals.set(heading, interval);

      } else {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateX(0)";
        heading.textContent = "";
        clearInterval(typingIntervals.get(heading));
        typingLocks.set(heading, false);
      }
    });
  }, { threshold: 0.2 });

  serviceCards.forEach(card => observer.observe(card));
});



// Animate on Scroll
const animatedElements = document.querySelectorAll(".animate__animated");
window.addEventListener("scroll", () => {
  animatedElements.forEach((el) => {
    const position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 100) {
      el.classList.add("animate__fadeInUp");
    }
  });
});


//Navbar on transparent
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const hero = document.querySelector(".hero-section"); // your hero section class

  function updateNavbar() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY < heroBottom - navbar.offsetHeight) {
      navbar.classList.add("transparent");
      navbar.classList.remove("scrolled");
    } else {
      navbar.classList.remove("transparent");
      navbar.classList.add("scrolled");
    }
  }

  document.addEventListener("scroll", updateNavbar);
  updateNavbar(); // run on page load
});



/*navbar drop down*/
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const toggler = document.querySelector(".navbar-toggler");
  const collapse = document.querySelector(".navbar-collapse");

  // Toggle frost effect when menu opens/closes
  toggler.addEventListener("click", function () {
    if (collapse.classList.contains("show")) {
      navbar.classList.remove("bg-open");
    } else {
      navbar.classList.add("bg-open");
    }
  });

  // Ensure correct state on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) {
      // Desktop → remove frosting
      navbar.classList.remove("bg-open");
    } else {
      // Mobile → if menu is open, keep frosting
      if (collapse.classList.contains("show")) {
        navbar.classList.add("bg-open");
      }
    }
  });
});

/*auto-closing after selecting a link*/
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
  const collapse = document.querySelector(".navbar-collapse");
  const bsCollapse = new bootstrap.Collapse(collapse, { toggle: false });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) { // Only in mobile/tablet view
        bsCollapse.hide();
      }
    });
  });
});

//folding effect


// Navbar Active Link Highlight
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// products
const products = [
  {
    
    category: "Diagnostic Devices",
    subtitle: "Blood pressure monitors, stethoscopes, and more...",
    items: [
      {
        name: "Digital Blood Pressure Monitor",
        images: ["./images/bp-monitor.jpg"],
        description: "Accurate digital monitors for home or hospital use.",
      },
      {
        name: "Stethoscope",
        images: ["./images/stethoscope.jpg"],
        description: "Clear audio for precise auscultation.",
      },
      {
        name: "Pulse Oximeter",
        images: ["./images/pulse-oximeter.jpg"],
        description: "Non-invasive device to monitor oxygen saturation.",
      },
      {
        name: "Thermometer",
        images: ["./images/thermometer.jpg"],
        description: "Quick, reliable temperature readings for all ages.",
      },
      {
        name: "Electrocardiogram (ECG/EKG) Machine",
        images: ["./images/electrocardiogram.jpg"],
        description: "Designed for quick setup and crystal-clear waveforms, it helps detect and assess heart conditions with unmatched accuracy.",
      },
      {
        name: "Glucometer",
        images: ["./images/glucometer.jpg"],
        description: "Compact and easy-to-use, it delivers accurate blood sugar readings in seconds.",
      },

    ],
  },
  {
    category: "Surgical Instruments",
    subtitle: "Scissors, forceps, scalpels, and more",
    items: [
      {
        name: "Surgical Scissors",
        images: ["./images/scissors.jpg"],
        description:
          "High-quality surgical instruments used for various operations.",
      },
      {
        name: "Forceps",
        images: ["./images/forceps.jpg"],
        description: "Durable forceps for precision handling in procedures.",
      },
       {
        name: "Trocars",
        images: ["./images/trocar.jpg"],
        description: "Engineered for safety and efficiency, the Trocar is essential for minimally invasive surgeries. Its sharp, precise tip allows smooth access. Perfect for laparoscopic procedures.",
      },
      {
        name: "Scalpel",
        images: ["./images/scalpel.jpg"],
        description:
          "Sharp and sterile scalpels ideal for surgical procedures.",
      },
      
      {
        name: "Retractor",
        images: ["./images/retractor.jpg"],
        description: "Our high-quality surgical retractors are expertly crafted to provide maximum visibility and access during procedures.",
      },
      {
        name: "Hemostat",
        images: ["./images/hemostat.jpg"],
        description: "Crafted from durable, medical-grade stainless steel, it delivers reliability and grip you can trust, even in the most delicate operations.",
      },
      
    ],
  },
  {
    category: "View More Medical Tools",
    subtitle: "Kidney dishes, thermometers, and other essential equipment",
    items: [
      {
        name: "Kidney Dish",
        images: ["./images/kidney-dish.jpg"],
        description:
          "Curved design for collecting bodily fluids or instruments.",
      },
       {
        name: "Syringes & Needles",
        images: ["./images/syringes.jpg"],
        description: "Sterile syringes for precise dosage and injection.",
      },
      {
        name: "Cannular",
        images: ["./images/cannular.jpg"],
        description:
          "Our Cannulas are designed for optimal fluid transfer, drainage, or suction during medical procedures.",
      },
      
      {
        name: "Surgical Masks",
        images: ["./images/masks.jpg"],
        description:
          "Disposable, sterile surgical masks for infection control.",
      },
      {
        name: "Medical Gloves",
        images: ["./images/gloves.jpg"],
        description:
          "Latex and nitrile gloves for hygienic medical procedures.",
      },
     
      {
        name: "Sutures & Blades",
        images: ["./images/sutures.jpg"],
        description:
          "High-quality sutures and surgical blades for wound closure.",
      },
      {
        name: "Clamps",
        images: ["./images/clamps.jpg"],
        description:
          "Instruments for holding tissues and securing blood vessels.",
      },
      {
        name: "Dressing Sets",
        images: ["./images/dressing-set.jpg"],
        description:
          "Pre-packaged sterile kits for wound cleaning and dressing.",
      },
      {
        name: "Blood Lancet",
        images: ["./images/lancet.jpg"],
        description:
          "Get accurate blood samples in seconds with our safe, comfortable, and hygienic lancet pen — perfect for clinics or home use",
      },
    ],
  },
];

function renderProducts() {
  const container = document.getElementById("product-groups");
  container.innerHTML = "";

  products.forEach((group, index) => {
    const groupEl = document.createElement("div");
    groupEl.className = "mb-5";

    const groupId = `product-group-${index}`;
    const isToggleable = group.category.toLowerCase() === "view more medical tools";

    groupEl.innerHTML = `
      <h4 class="fw-bold mt-4">
        ${
          isToggleable
            ? `<button class="btn btn-danger rounded-pill px-4 py-2" onclick="toggleGroup('${groupId}')">${group.category}</button>`
            : group.category
        }
      </h4>
      <p class="text-muted mb-4">${group.subtitle}</p>
      <div id="${groupId}" class="row g-4 ${isToggleable ? "d-none" : ""}">
        ${group.items
          .map(
            (item) => `
          <div class="col-6 col-md-4">
            <div class="product-card">
              <img src="${item.images[0]}" class="img-fluid mb-3" alt="${
              item.name
            }">
              <h6 class="fw-bold">${item.name}</h6>
              <button class="btn btn-success btn-sm" onclick='showProductModal(${JSON.stringify(
                item
              )})'>View Details</button>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    container.appendChild(groupEl);
  });
}

function toggleGroup(id) {
  const section = document.getElementById(id);
  section.classList.toggle("d-none");
}

function showProductModal(product) {
  const modalTitle = document.getElementById("productModalLabel");
  const modalBody = document.querySelector("#productModal .modal-body");

  modalTitle.textContent = product.name;
  modalBody.innerHTML = `
    <div class="mb-3">
      ${product.images
        .map(
          (img) =>
            `<img src="${img}" class="modal-product-img" alt="${product.name}">`
          

        )
        .join("")}
    </div>
    <p>${product.description}</p>
    <a href="https://wa.me/254757324165?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(
      product.name
    )}" target="_blank" class="btn btn-success mt-3">Order Now on WhatsApp</a>
  `;

  const modal = new bootstrap.Modal(document.getElementById("productModal"));
  modal.show();
}

const searchInput = document.getElementById("productSearch");
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");
  let anyVisible = false;

  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    const isMatch = text.includes(value);
    card.parentElement.style.display = isMatch ? "" : "none";
    if (isMatch) anyVisible = true;
  });

  const messageBox = document.getElementById("noResultsMessage");
  messageBox.classList.toggle("d-none", anyVisible || value === "");
});

renderProducts();

/*form*/

  function openPopup() {
    document.getElementById("whatsappPopup").classList.add("show");
    document.getElementById("whatsappOverlay").classList.add("show");
  }

  function closePopup() {
    document.getElementById("whatsappPopup").classList.remove("show");
    document.getElementById("whatsappOverlay").classList.remove("show");
  }

  function sendWhatsAppMessage() {
    const name = document.getElementById("userName").value;
    const service = document.getElementById("userService").value;
    const message = document.getElementById("userMessage").value;

    const fullMessage = `Hello Wambeke Tech, my name is: ${name}. I'm interested in: ${service}. ${message ? 'Message: ' + message : ''}`;

    const phoneNumber = "254757324165"; // Replace with your real WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappURL, "_blank");
    closePopup();
  }
// FAQs typing effect
document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll('.accordion-collapse');
  let typingInterval = null; // Store the interval globally

  accordions.forEach(acc => {
    acc.addEventListener('show.bs.collapse', function () {
      const body = this.querySelector('.accordion-body');
      const text = body.getAttribute('data-text') || "";

      // Stop any previous typing animation
      if (typingInterval) clearInterval(typingInterval);

      body.textContent = ""; // Clear text
      let index = 0;

      typingInterval = setInterval(() => {
        if (index < text.length) {
          body.textContent += text.charAt(index);
          index++;
        } else {
          clearInterval(typingInterval);
          typingInterval = null; // Reset
        }
      }, 40); // Typing speed
    });
  });
});

// Testimonials
document.addEventListener("DOMContentLoaded", function () {
  const speed = 70; // typing speed
  const pauseBetween = 1000; // pause before switching sentence

  document.querySelectorAll(".testimonial-card").forEach(card => {
    const textEl = card.querySelector(".testimonial-text");
    const nameEl = card.querySelector(".client-name");

    const texts = JSON.parse(textEl.getAttribute("data-texts"));
    const names = JSON.parse(nameEl.getAttribute("data-names"));

    let index = 0; // sentence index
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      let currentText = texts[index];
      
      if (!isDeleting) {
        // typing forward
        textEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          // reached end of sentence
          setTimeout(() => {
            // change name instantly before retyping
            index = (index + 1) % texts.length;
            nameEl.textContent = names[index];
            charIndex = 0;
            textEl.textContent = ""; // clear text instantly
            type();
          }, pauseBetween);
          return;
        }
      }
      setTimeout(type, speed);
    }

    // Initialize with first name
    nameEl.textContent = names[index];
    type();
  });

});
