
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
        }, 10); // typing speed
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
        }, 20); // erase speed
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
        images: ["../images/bp-monitor.jpg"],
        description: "Stay on top of your health with our accurate, easy-to-use digital blood pressure monitor. Perfect for home or clinical use, it delivers quick results with a simple touch, helping you track your heart health with confidence.",
      },
      {
        name: "Stethoscope",
        images: ["../images/stethoscope.jpg"],
        description: "Experience clear, crisp sound for accurate diagnoses with our high-quality stethoscope. Designed for comfort and precision, it’s a trusted tool for every healthcare professional.",
      },
      {
        name: "Pulse Oximeter",
        images: ["../images/pulse-oximeter.jpg"],
        description: "Monitor your oxygen levels and pulse rate instantly with our reliable pulse oximeter. Compact, lightweight, and easy to use,  a must-have for both medical facilities and home care.",
      },
      {
        name: "Thermometer",
        images: ["../images/thermometer.jpg"],
        description: "Get fast, precise temperature readings with our advanced thermometer. Designed for convenience and accuracy, it’s ideal for hospitals, clinics, and home use.",
      },
      {
        name: "Electrocardiogram (ECG/EKG) Machine",
        images: ["../images/electrocardiogram.jpg"],
        description: "Deliver accurate cardiac readings with our state-of-the-art ECG machine. Built for efficiency, it provides clear, reliable data to support quick and confident medical decisions.",
      },
      {
        name: "Glucometer",
        images: ["../images/glucometer.jpg"],
        description: "Manage blood sugar levels with ease using our compact and precise glucometer. Designed for speed, accuracy, and portability, perfect for everyday monitoring.",
      },
    ],
  },
  {
    category: "Surgical Instruments",
    subtitle: "Scissors, forceps, scalpels, and more",
    items: [
      {
        name: "Surgical Scissors",
        images: ["../images/scissors.jpg"],
        description:
          "Experience unmatched precision with our premium surgical scissors, engineered for smooth, effortless cuts that save time in the operating room. Crafted from high-grade stainless steel, they deliver lasting sharpness, exceptional control, and easy sterilization, making them the surgeon’s trusted choice.",
      },
      {
        name: "Forceps",
        images: ["../images/forceps.jpg"],
        description: "Take control with our expertly designed surgical forceps, built for a confident, non-slip grip and gentle tissue handling. Whether for delicate procedures or firm holds, their ergonomic design ensures comfort, accuracy, and reliability in every movement.",
      },
       {
        name: "Trocars",
        images: ["../images/trocar.jpg"],
        description: "Make every laparoscopic entry smooth and precise with our state-of-the-art trocars. Designed for minimal patient trauma and maximum efficiency, they feature razor-sharp tips, durable construction, and seamless performance you can depend on.",
      },
      {
        name: "Scalpel",
        images: ["../images/scalpel.jpg"],
        description:
          "Achieve flawless incisions with our precision-balanced surgical scalpel. Engineered for a surgeon’s hand, it combines razor-sharp edges, exceptional durability, and unmatched control, giving you confidence in every cut.",
      },
      
      {
        name: "Retractor",
        images: ["../images/retractor.jpg"],
        description: "Keep your surgical field clear with our strong yet gentle retractors. Designed for comfort and efficiency, they provide maximum visibility while minimizing patient tissue stress — helping you work faster, safer, and with greater accuracy.",
      },
      {
        name: "Hemostat",
        images: ["../images/hemostat.jpg"],
        description: "Control bleeding like a pro with our dependable hemostats, engineered for a secure lock, easy handling, and lasting performance. Their precise grip ensures quick vessel clamping, giving you one less thing to worry about during critical procedures.",
      }, 
    ],
  },
  {
    category: "Theatre Equipments",
    subtitle: "Theatre lights, Anaesthetia Machine, Theatre Bed and Much More...",
    items: [
      {
        name: "Anaesthetia Machine",
        images: ["../images/anaesthetic-machine.jpg"],
        description: "Engineered for safety and control, our anaesthetic machine ensures smooth, accurate delivery of anaesthesia in surgical environments — combining precision technology with ease of use for every procedure.",
      },
      {
        name: "Suction Machine",
        images: ["../images/suction-machine.jpg"],
        description: "High-performance and portable, our suction machine delivers powerful, consistent suction for emergency and clinical use — ensuring clear airways and a safe environment for patients.",
      },
      {
        name: "Theatre Bed",
        images: ["../images/theatre-bed.jpg"],
        description: "Designed for versatility and comfort, this theatre bed offers full adjustability, sturdy support, and easy positioning for optimal surgical access during any procedure.",
      },
      {
        name: "Theatre Lights",
        images: ["../images/theatre-lights.jpg"],
        description: "Illuminate every detail with bright, shadow-free LED theatre lights. Energy-efficient, long-lasting, and adjustable, they ensure optimal visibility for surgical precision.",
      },
       {
        name: "Diathermy Machine",
        images: ["../images/diathermy-machine.jpg"],
        description: "Achieve precision in every procedure with our high-frequency Diathermy machine. Safe, efficient, and easy to operate — perfect for surgical and therapeutic applications requiring the utmost accuracy.",
      },
      {
        name: "Dental Unit",
        images: ["../images/dental-unit.jpg"],
        description: "Upgrade your dental practice with this fully integrated unit featuring ergonomic controls, high-precision tools, and a patient-friendly design built to enhance comfort and efficiency during every procedure.",
      },
    ],
  },
  {
    category: "Hospital Equipments",
    subtitle: "Hospital beds, Dental Units, Diathermy Machines and Much More...",
    items: [
      {
        name: "Hospital Bed",
        images: ["../images/hospital-bed.jpg"],
        description: "Built for exceptional patient comfort and caregiver convenience, our hospital beds feature adjustable height, smooth-rolling wheels, and sturdy construction, making them the perfect blend of safety, durability, and ease of use.",
      },
      
      {
        name: "CT Scan",
        images: ["../images/CT-Scan.jpg"],
        description: "Experience unmatched imaging clarity with our CT Scan machine. Designed for speed and accuracy, it provides detailed cross-sectional views that help medical teams make confident, life-saving decisions.",
      },
      {
        name: "Ultrasound Machine",
        images: ["../images/ultrasound-machine.jpg"],
        description: "Deliver precise, real-time imaging with our advanced ultrasound system. Compact, reliable, and easy to operate, it’s perfect for everything from routine check-ups to detailed diagnostic examinations.",
      },
       {
        name: "X-Ray Machine",
        images: ["../images/x-ray.jpg"],
        description: "Delivering crystal-clear diagnostic images every time, this X-ray machine ensures accurate results with minimal exposure. Designed for speed, reliability, and patient safety, it’s a must-have for any modern healthcare facility.",
      },
     
      {
        name: "Defibrillator",
        images: ["../images/defibrillator.jpg"],
        description: "Fast, reliable, and easy to use, our defibrillator delivers life-saving shocks with precision. Designed for both professional and emergency responders, it’s a vital tool for every medical facility.",
      },
      {
        name: "Emergency Trolley",
        images: ["../images/emergency-trolley.jpg"],
        description: "Organize and access critical supplies instantly with our mobile emergency trolleys, built for speed, durability, and reliability in life-saving situations.",
      },
      {
        name: "Patient Trolley",
        images: ["../images/pt-trolley.jpg"],
        description: "Transport patients comfortably and safely with our ergonomic patient trolleys. Smooth-rolling wheels, sturdy construction, and easy height adjustment make transfers effortless.",
      },
      {
        name: "Mortuary Equipments (Autopsy Table)",
        images: ["../images/mortuary-equipment.jpg"],
        description: "Engineered for professional use, this autopsy table offers a corrosion-resistant stainless steel surface, efficient drainage, and ergonomic design,ensuring hygienic, efficient, and safe examinations every time.",
      },
    ],
  },
  {
    category: "View More Medical Tools",
    subtitle: "Kidney dishes, Syringes, Needles, and Much More..",
    items: [
      {
        name: "Kidney Dish",
        images: ["../images/kidney-dish.jpg"],
        description:
          "Curved design for collecting bodily fluids or instruments.",
      },
       {
        name: "Syringes & Needles",
        images: ["../images/syringes.jpg"],
        description: "Sterile syringes for precise dosage and injection.",
      },
      {
        name: "Cannular",
        images: ["../images/cannular.jpg"],
        description:
          "Our Cannulas are designed for optimal fluid transfer, drainage, or suction during medical procedures.",
      },
      
      {
        name: "Surgical Masks",
        images: ["../images/masks.jpg"],
        description:
          "Disposable, sterile surgical masks for infection control.",
      },
      {
        name: "Medical Gloves",
        images: ["../images/gloves.jpg"],
        description:
          "Latex and nitrile gloves for hygienic medical procedures.",
      },
     
      {
        name: "Sutures & Blades",
        images: ["../images/sutures.jpg"],
        description:
          "High-quality sutures and surgical blades for wound closure.",
      },
      {
        name: "Clamps",
        images: ["../images/clamps.jpg"],
        description:
          "Instruments for holding tissues and securing blood vessels.",
      },
      {
        name: "Dressing Sets",
        images: ["../images/dressing-set.jpg"],
        description:
          "Pre-packaged sterile kits for wound cleaning and dressing.",
      },
      {
        name: "Blood Lancet",
        images: ["../images/lancet.jpg"],
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
      <h4 class="fw-bold mt-4"
      ${isToggleable ? `id="viewMoreHeader"` : ""}
      >
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

  // Show/hide individual product cards as before
  cards.forEach((card) => {
    const text = card.innerText.toLowerCase();
    const isMatch = text.includes(value);
    card.parentElement.style.display = isMatch ? "" : "none";
    if (isMatch) anyVisible = true;
  });

  // Handle toggleable "View More Medical Tools" group visibility
  const viewMoreGroupContainer = document.getElementById("product-group-4"); // index 2 = View More group
  if (value === "") {
    // No search input - collapse "View More" group
    if (viewMoreGroupContainer) {
      viewMoreGroupContainer.classList.add("d-none");
    }
  } else {
    // Expand View More group if matching cards inside
    let anyInViewMore = false;
    if (viewMoreGroupContainer) {
      const viewMoreCards = viewMoreGroupContainer.querySelectorAll(".product-card");
      viewMoreCards.forEach((card) => {
        if (card.parentElement.style.display !== "none") {
          anyInViewMore = true;
        }
      });
      if (anyInViewMore) {
        viewMoreGroupContainer.classList.remove("d-none");
      } else {
        viewMoreGroupContainer.classList.add("d-none");
      }
    }
  }

  // NEW: Show or hide entire category groups based on whether any product inside is visible
  const allGroups = document.querySelectorAll("#product-groups > div.mb-5");
  allGroups.forEach((groupEl) => {
    // Check if group has any visible product cards
    const visibleProducts = groupEl.querySelectorAll(".product-card").length
      ? Array.from(groupEl.querySelectorAll(".product-card")).some(card => card.parentElement.style.display !== "none")
      : false;

    // Show group only if visibleProducts and search input is NOT empty
    if (value === "") {
      // Show all groups normally when search empty
      groupEl.style.display = "";
    } else {
      // Hide groups with no visible products during search
      groupEl.style.display = visibleProducts ? "" : "none";
    }
  });

  // Show or hide no results message
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