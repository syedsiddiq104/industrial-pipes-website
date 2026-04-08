document.addEventListener("DOMContentLoaded", () => {

  /* ===================================
     STICKY HEADER
  =================================== */
  const stickyHeader = document.getElementById("stickyHeader");

  if (stickyHeader) {
    const onScroll = () => {
      // Always visible (removed useless condition)
      stickyHeader.classList.add("visible");
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
  }


  /* ===================================
     MOBILE MENU TOGGLE
  =================================== */
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const closeMobileMenu = document.getElementById("closeMobileMenu");

  const openMenu = () => {
    if (!mobileMenu || !mobileMenuOverlay) return;
    mobileMenu.classList.add("active");
    mobileMenuOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    if (!mobileMenu || !mobileMenuOverlay) return;
    mobileMenu.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  hamburgerMenu?.addEventListener("click", openMenu);
  closeMobileMenu?.addEventListener("click", closeMenu);
  mobileMenuOverlay?.addEventListener("click", closeMenu);

  mobileMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });


  /* ===================================
     PRODUCT IMAGE CAROUSEL
  =================================== */
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  let currentIndex = 0;

  const images = [...thumbnails].map(img => img.src);

  const updateImage = (index) => {
    if (!mainImage || images.length === 0) return;

    currentIndex = (index + images.length) % images.length;
    mainImage.src = images[currentIndex];

    thumbnails.forEach((img, i) => {
      img.classList.toggle("active", i === currentIndex);
    });
  };

  thumbnails.forEach((thumb, i) => {
    thumb.addEventListener("click", () => updateImage(i));
  });

  prevBtn?.addEventListener("click", () => updateImage(currentIndex - 1));
  nextBtn?.addEventListener("click", () => updateImage(currentIndex + 1));


  /* ===================================
     FAQ ACCORDION
  =================================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question?.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      faqItems.forEach(i => i.classList.remove("active"));
      if (!isOpen) item.classList.add("active");
    });
  });


  /* ===================================
     APPLICATION CAROUSEL SCROLL
  =================================== */
  document.querySelectorAll(".carousel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.carousel;
      const track = document
        .getElementById(`${name}Carousel`)
        ?.querySelector(".carousel-track");

      if (!track) return;

      const card = track.querySelector(".application-card");
      const scrollAmount = card.offsetWidth + 16;

      const direction = btn.classList.contains("prev") ? -1 : 1;

      track.scrollBy({
        left: scrollAmount * direction,
        behavior: "smooth"
      });
    });
  });


  /* ===================================
     TABS (PROCESS SECTION)
  =================================== */
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  const setActiveTab = (id) => {
    tabButtons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.tab === id)
    );

    tabContents.forEach(content =>
      content.classList.toggle("active", content.id === id)
    );
  };

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveTab(btn.dataset.tab);
    });
  });


/* ===================================
   IMAGE ARROWS (FIXED FOR ALL TABS)
=================================== */

document.querySelectorAll(".image-arrow").forEach(arrow => {

  arrow.addEventListener("click", () => {

    const activeIndex = [...tabButtons].findIndex(btn =>
      btn.classList.contains("active")
    );

    if (activeIndex === -1) return;

    let newIndex;

    if (arrow.classList.contains("left")) {
      newIndex = (activeIndex - 1 + tabButtons.length) % tabButtons.length;
    } else {
      newIndex = (activeIndex + 1) % tabButtons.length;
    }

    setActiveTab(tabButtons[newIndex].dataset.tab);
  });

});

  /* ===================================
     SMOOTH SCROLL (ANCHORS)
  =================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });


  /* ===================================
     FORM HANDLING
  =================================== */
  document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted successfully!");
      form.reset();
    });
  });

});




  

  document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     MODALS (FIXED)
  ============================== */
  const modals = document.querySelectorAll(".modal");

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  // OPEN
  document.querySelectorAll("[data-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.modal);
    });
  });

  // CLOSE
  modals.forEach(modal => {

    // overlay + close btn
    modal.querySelectorAll("[data-close-modal]").forEach(el => {
      el.addEventListener("click", () => closeModal(modal));
    });

  });

  // ESC CLOSE
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach(modal => {
        if (modal.classList.contains("active")) {
          closeModal(modal);
        }
      });
    }
  });

});