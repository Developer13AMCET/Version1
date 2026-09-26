/**
 * ADIC Website - Main Navigation & Interaction Script
 */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile navigation toggle
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

    // 2. Modal backdrop click handling for Projects Page
    const ideaPopup = document.getElementById("idea-popup");
    const ideaModal = document.querySelector(".idea-modal");
    if (ideaModal && ideaPopup) {
        ideaModal.addEventListener("click", (e) => {
            if (e.target === ideaModal) {
                ideaPopup.checked = false;
            }
        });
    }

    // 3. AJAX Form Submission Handlers (No redirection)
    function setupAjaxForm(formId, statusId, submitBtnId, successText, isModal = false) {
        const form = document.getElementById(formId);
        const statusEl = document.getElementById(statusId);
        const submitBtn = document.getElementById(submitBtnId) || (form ? form.querySelector("button[type='submit']") : null);

        if (!form || !statusEl) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Store original button text & show loading state
            const originalBtnContent = submitBtn ? submitBtn.innerHTML : "Submit";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add("btn-submitting");
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Submitting...`;
            }

            // Reset status message display
            statusEl.style.display = "none";
            statusEl.className = "form-status-msg";
            statusEl.innerHTML = "";

            try {
                const formData = new FormData(form);

                // Use FormSubmit AJAX endpoint to prevent external redirects
                const response = await fetch("https://formsubmit.co/ajax/monikagopi3@gmail.com", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: formData
                });

                let isSuccess = false;
                try {
                    const data = await response.json();
                    if (response.ok && (data.success === "true" || data.success === true || data.message)) {
                        isSuccess = true;
                    }
                } catch (parseErr) {
                    if (response.ok) isSuccess = true;
                }

                if (isSuccess || response.ok) {
                    form.reset();
                    statusEl.className = "form-status-msg success";
                    statusEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${successText}</span>`;
                    statusEl.style.display = "flex";

                    // If modal form, close modal after brief delay so user sees feedback
                    if (isModal) {
                        setTimeout(() => {
                            const popupCheckbox = document.getElementById("idea-popup");
                            if (popupCheckbox) {
                                popupCheckbox.checked = false;
                            }
                            setTimeout(() => {
                                statusEl.style.display = "none";
                                statusEl.innerHTML = "";
                            }, 500);
                        }, 2500);
                    }
                } else {
                    throw new Error("Submission could not be completed.");
                }
            } catch (error) {
                console.error("Submission failed:", error);
                statusEl.className = "form-status-msg error";
                statusEl.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <span>Submission failed. Please try again or email us at adic@amcet.in</span>`;
                statusEl.style.display = "flex";
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove("btn-submitting");
                    submitBtn.innerHTML = originalBtnContent;
                }
            }
        });
    }

    // Attach to Join Form (index.html)
    setupAjaxForm(
        "joinForm",
        "joinStatus",
        "joinSubmitBtn",
        "Application submitted successfully! We will get back to you soon.",
        false
    );

    // Attach to Idea Form (Projects.html)
    setupAjaxForm(
        "ideaForm",
        "ideaStatus",
        "ideaSubmitBtn",
        "Idea submitted successfully! Thank you for sharing.",
        true
    );
});
