        // Initialize EmailJS with your Public Key
        emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
        
        // Dark Mode Toggle
        const themeBtn = document.getElementById('theme-toggle');
        const icon = themeBtn.querySelector('i');
        let darkMode = localStorage.getItem('darkMode') === 'true';
        
        // Apply saved theme
        if (darkMode) {
            document.body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }
        
        themeBtn.addEventListener('click', () => {
            darkMode = !darkMode;
            localStorage.setItem('darkMode', darkMode);
            
            if (darkMode) {
                document.body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                themeBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
            } else {
                document.body.classList.remove('dark-mode');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeBtn.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
            }
        });
        
        // Contact Form Handling
        const contactForm = document.getElementById('contact-form');
        const statusEl = document.getElementById('form-status');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state with spinner
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            statusEl.style.display = 'none';

            // Get form data
            const formData = {
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value,
                phone: this.querySelector('#phone').value
            };

            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
                .then(function(response) {
                    // Show success message with fade-in effect
                    statusEl.textContent = 'Message sent successfully! I will get back to you soon.';
                    statusEl.style.backgroundColor = '#d4edda';
                    statusEl.style.color = '#155724';
                    statusEl.style.border = '1px solid #c3e6cb';
                    statusEl.style.opacity = 0;
                    statusEl.style.display = 'block';
                    setTimeout(() => { statusEl.style.transition = 'opacity 0.5s'; statusEl.style.opacity = 1; }, 10);

                    // Reset the form with a shake effect
                    contactForm.reset();
                    contactForm.classList.add('shake');
                    setTimeout(() => contactForm.classList.remove('shake'), 500);
                }, function(error) {
                    // Show error message with fade-in effect
                    statusEl.textContent = 'There was a problem sending your message. Please try again later.';
                    statusEl.style.backgroundColor = '#f8d7da';
                    statusEl.style.color = '#721c24';
                    statusEl.style.border = '1px solid #f5c6cb';
                    statusEl.style.opacity = 0;
                    statusEl.style.display = 'block';
                    setTimeout(() => { statusEl.style.transition = 'opacity 0.5s'; statusEl.style.opacity = 1; }, 10);

                    // Shake the form to indicate error
                    contactForm.classList.add('shake');
                    setTimeout(() => contactForm.classList.remove('shake'), 500);

                    console.error('EmailJS error:', error);
                })
                .finally(() => {
                    // Reset button state
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });

        // Add shake animation CSS if not already present
        if (!document.getElementById('shake-style')) {
            const style = document.createElement('style');
            style.id = 'shake-style';
            style.textContent = `
                @keyframes shake {
                    0% { transform: translateX(0); }
                    20% { transform: translateX(-5px); }
                    40% { transform: translateX(5px); }
                    60% { transform: translateX(-5px); }
                    80% { transform: translateX(5px); }
                    100% { transform: translateX(0); }
                }
                .shake {
                    animation: shake 0.5s;
                }
            `;
            document.head.appendChild(style);
        }
        /* Certificate Image Modal Effect */
        document.querySelectorAll('.certificate-img').forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                // Create modal elements if not already present
                let modal = document.getElementById('certificate-modal');
                if (!modal) {
                    modal = document.createElement('div');
                    modal.id = 'certificate-modal';
                    modal.style.position = 'fixed';
                    modal.style.top = 0;
                    modal.style.left = 0;
                    modal.style.width = '100vw';
                    modal.style.height = '100vh';
                    modal.style.background = 'rgba(0,0,0,0.8)';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.zIndex = 9999;
                    modal.innerHTML = `
                        <img id="modal-img" style="max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 4px 32px #0008;">
                        <span id="modal-close" style="position:absolute;top:32px;right:48px;font-size:2.5rem;color:#fff;cursor:pointer;font-family:sans-serif;">&times;</span>
                    `;
                    document.body.appendChild(modal);
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal || e.target.id === 'modal-close') {
                            modal.style.display = 'none';
                        }
                    });
                }
                modal.querySelector('#modal-img').src = this.src;
                modal.style.display = 'flex';
            });
        });

        // Add modal CSS if not already present
        if (!document.getElementById('certificate-modal-style')) {
            const style = document.createElement('style');
            style.id = 'certificate-modal-style';
            style.textContent = `
                #certificate-modal {
                    animation: fadeIn 0.3s;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
                #certificate-modal #modal-img {
                    transition: transform 0.3s;
                }
                #certificate-modal #modal-img:hover {
                    transform: scale(1.03) rotate(-1deg);
                }
                #certificate-modal #modal-close:hover {
                    color: #ffb300;
                }
            `;
            document.head.appendChild(style);
        }
        /* Smooth Scroll for Navigation Links */
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        