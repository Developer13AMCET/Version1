/**
 * ADIC Website - Main Navigation & Interaction Script
 */
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation toggle
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            navToggle.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", false);
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("open");
                navToggle.classList.remove("open");
                navToggle.setAttribute("aria-expanded", false);
            }
        });
    }

    // Modal handling for Projects Page if present
    const ideaPopup = document.getElementById("idea-popup");
    const ideaModal = document.querySelector(".idea-modal");
    if (ideaModal && ideaPopup) {
        ideaModal.addEventListener("click", (e) => {
            if (e.target === ideaModal) {
                ideaPopup.checked = false;
            }
        });
    }
});
