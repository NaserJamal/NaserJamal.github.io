// Navigation menu toggle for mobile devices
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Header scroll effect
const headerScroll = () => {
    const header = document.querySelector('header');
    const scrollTrigger = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= scrollTrigger) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scrolling for anchor links
const smoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing effect for the hero section
const typeWriter = () => {
    const text = document.querySelector('.hero h2');
    const fullText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < fullText.length) {
            text.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(() => {
        type();
    }, 1000);
}

// Intersection Observer for fade-in animations
const observeElements = () => {
    const sections = document.querySelectorAll('section');
    
    const options = {
        root: null,
        threshold: 0.25,
        rootMargin: "0px"
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Form submission handling
const handleFormSubmission = () => {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });
            
            // Clear the form
            form.reset();
            
            // Show success message (you would implement this)
            showFormSuccess();
        });
    }
}

// Show form success message
const showFormSuccess = () => {
    const form = document.getElementById('contact-form');
    const successMessage = document.createElement('div');
    successMessage.classList.add('success-message');
    successMessage.textContent = 'Thank you! Your message has been sent.';
    
    form.appendChild(successMessage);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    navSlide();
    headerScroll();
    smoothScroll();
    typeWriter();
    observeElements();
    handleFormSubmission();
    
    // Add fade-in animation class to styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .in-view {
            opacity: 1;
            transform: translateY(0);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .success-message {
            background-color: rgba(100, 255, 218, 0.1);
            color: var(--secondary-color);
            padding: 15px;
            margin-top: 20px;
            border-radius: 4px;
            text-align: center;
            animation: fadeIn 0.5s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}); 
