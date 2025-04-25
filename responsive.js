// This script handles the integration with Google Sheets
// It requires a Google Apps Script deployed as a web app

// Function to set up the Google Sheets integration
function setupGoogleSheetsIntegration() {
  // Replace with your actual Google Apps Script web app URL
  const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

  const subscribeForm = document.getElementById("subscribeForm")

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("subscribe-email").value
      const timestamp = new Date().toISOString()

      // Prepare data for Google Sheets
      const data = {
        email: email,
        timestamp: timestamp,
        source: window.location.href,
      }

      // Send data to Google Sheets
      fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then((data) => {
          console.log("Success:", data)

          // Also send email notification
          sendEmailNotification(email)
        })
        .catch((error) => {
          console.error("Error:", error)

          // Fallback to email notification if Google Sheets fails
          sendEmailNotification(email)
        })
    })
  }
}

// Function to send email notification
function sendEmailNotification(email) {
  // In a real implementation, this would be done server-side
  // For demo purposes, we'll just log it
  console.log(`Email notification would be sent to wechezake@gmail.com about new subscriber: ${email}`)

  // You could use a service like EmailJS or a custom backend endpoint
  // to send the actual email notification
}

// Initialize when the DOM is ready
document.addEventListener("DOMContentLoaded", setupGoogleSheetsIntegration)


document.addEventListener("DOMContentLoaded", () => {
  // Show slogan bar on scroll
  const sloganBar = document.getElementById("sloganBar")
  const heroSection = document.querySelector(".hero")

  window.addEventListener("scroll", () => {
    if (window.scrollY > heroSection.offsetHeight - 100) {
      sloganBar.classList.add("visible")
    } else {
      sloganBar.classList.remove("visible")
    }
  })

  // Enhanced timeline animation
  const timelineItems = document.querySelectorAll(".journey-card")

  // Make timeline items visible by default
  timelineItems.forEach((item) => {
    item.style.opacity = "1"
    item.style.transform = "translateY(0)"
  })

  // Smooth scrolling with offset for fixed navbar
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.hash !== "") {
        e.preventDefault()
        const target = document.querySelector(this.hash)
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = target.offsetTop - navbarHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active class
        document.querySelectorAll(".navbar a").forEach((navLink) => {
          navLink.classList.remove("active")
        })
        this.classList.add("active")
      }
    })
  })

  // Update active link on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 100
    const navbarHeight = document.querySelector(".navbar").offsetHeight

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".navbar a").forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero")
    const scrollPosition = window.pageYOffset
    hero.style.backgroundPositionY = scrollPosition * 0.5 + "px"
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const formAction = contactForm.getAttribute("action")

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.textContent
      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      // Send form data
      fetch(formAction, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Network response was not ok.")
        })
        .then((data) => {
          // Show success message
          formStatus.textContent = "Thank you for your message! We will get back to you soon."
          formStatus.classList.add("success")
          formStatus.style.display = "block"

          // Reset form
          contactForm.reset()
        })
        .catch((error) => {
          // Show error message
          formStatus.textContent = "Oops! There was a problem submitting your form. Please try again."
          formStatus.classList.add("error")
          formStatus.style.display = "block"
        })
        .finally(() => {
          // Reset button state
          submitButton.textContent = originalButtonText
          submitButton.disabled = false
        })
    })
  }

  // Subscribe form handling
  const subscribeForm = document.getElementById("subscribeForm")
  const subscribeStatus = document.getElementById("subscribeStatus")

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get email value
      const email = document.getElementById("subscribe-email").value

      // Show loading state
      const submitButton = subscribeForm.querySelector('button[type="submit"]')
      const originalButtonText = submitButton.textContent
      submitButton.textContent = "Subscribing..."
      submitButton.disabled = true

      // Send to Google Sheets via a Google Apps Script web app
      // Replace with your actual Google Apps Script web app URL
      const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

      // Alternatively, send an email notification
      const emailNotification = `mailto:wechezake@gmail.com?subject=New Subscriber&body=New subscriber: ${email}`

      // For demo purposes, we'll simulate a successful subscription
      setTimeout(() => {
        // Show success message
        subscribeStatus.textContent = "Thank you for subscribing! You'll receive our updates soon."
        subscribeStatus.classList.add("success")
        subscribeStatus.style.display = "block"

        // Reset form
        subscribeForm.reset()

        // Reset button state
        submitButton.textContent = originalButtonText
        submitButton.disabled = false

        // Send email notification (in a real implementation, this would be done server-side)
        // window.open(emailNotification);

        console.log("New subscriber:", email)

        // Send notification email to wechezake@gmail.com
        fetch("https://formspree.io/f/your-form-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "wechezake@gmail.com",
            subject: "New Subscriber Alert",
            message: `New subscriber: ${email} joined on ${new Date().toLocaleString()}`,
          }),
        }).catch((error) => console.error("Error sending notification:", error))
      }, 1500)
    })
  }

  // FAQ accordion functionality - FIXED to properly show/hide answers
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Toggle active class on the clicked item
      item.classList.toggle("active")

      // Update the icon based on active state
      const icon = item.querySelector(".faq-toggle i")
      if (item.classList.contains("active")) {
        icon.className = "fas fa-minus"
      } else {
        icon.className = "fas fa-plus"
      }
    })
  })

  // Add animation to feature cards
  const featureCards = document.querySelectorAll(".feature-card")

  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 100)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  featureCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.5s ease"
    cardObserver.observe(card)
  })

  // Animate stats cards and numbers
  const statCards = document.querySelectorAll(".stat-card")
  const statNumbers = document.querySelectorAll(".stat-number")

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"

            // Animate the stat number if it's inside this card
            const statNumber = entry.target.querySelector(".stat-number")
            if (statNumber) {
              animateStatNumber(statNumber)
            }
          }, index * 150)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  statCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.5s ease"
    statsObserver.observe(card)
  })

  // Function to animate stat numbers
  function animateStatNumber(element) {
    const finalValue = Number.parseInt(element.getAttribute("data-count"))
    let currentValue = 0
    const duration = 2000 // 2 seconds
    const stepTime = 50 // update every 50ms
    const totalSteps = duration / stepTime
    const stepValue = finalValue / totalSteps

    const interval = setInterval(() => {
      currentValue += stepValue
      if (currentValue >= finalValue) {
        element.textContent = finalValue
        clearInterval(interval)
      } else {
        element.textContent = Math.floor(currentValue)
      }
    }, stepTime)
  }

  // Animate testimonial cards
  const testimonialCards = document.querySelectorAll(".testimonial-card")

  const testimonialObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 150)
        }
      })
    },
    {
      threshold: 0.1,
    },
  )

  testimonialCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "all 0.5s ease"
    testimonialObserver.observe(card)
  })

  // Add section background colors
  const sections = document.querySelectorAll(".section:not(.dark-section)")
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      section.style.backgroundColor = "var(--accent-light)"
    } else {
      section.style.backgroundColor = "var(--bg-light)"
    }
  })

  // View All News button functionality - Modified to redirect to Google News
  const viewAllNewsBtn = document.getElementById("viewAllNewsBtn")

  if (viewAllNewsBtn) {
    viewAllNewsBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Open Google News search for "Wecheza" in a new tab
      window.open("https://news.google.com/search?q=Wecheza", "_blank")
    })
  }
})


document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const navbar = document.getElementById("myNavbar")

  // Check if we need to collapse the navbar on small screens
  function checkNavbarCollapse() {
    if (window.innerWidth <= 768) {
      const navLinks = navbar.querySelectorAll("a")
      let totalWidth = 0

      navLinks.forEach((link) => {
        totalWidth += link.offsetWidth
      })

      if (totalWidth > window.innerWidth) {
        navbar.classList.add("collapsed")
      } else {
        navbar.classList.remove("collapsed")
      }
    } else {
      navbar.classList.remove("collapsed")
    }
  }

  // Run on load and resize
  checkNavbarCollapse()
  window.addEventListener("resize", checkNavbarCollapse)

  // Responsive image loading
  function loadResponsiveImages() {
    const images = document.querySelectorAll("img[data-src]")

    images.forEach((img) => {
      const mobileSrc = img.getAttribute("data-src-mobile")
      const desktopSrc = img.getAttribute("data-src")

      if (window.innerWidth <= 768 && mobileSrc) {
        img.src = mobileSrc
      } else {
        img.src = desktopSrc
      }

      // Remove data attributes after setting src
      img.removeAttribute("data-src")
      img.removeAttribute("data-src-mobile")
    })
  }

  // Run on load and resize
  loadResponsiveImages()
  window.addEventListener("resize", loadResponsiveImages)
})


document.addEventListener("DOMContentLoaded", () => {
  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".mission-statement, .vision-statement, .team-member, .feature-card, .subscribe-container, .news-card, .faq-item",
  )

  const fadeInObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 150)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    element.style.transition = "all 0.8s ease"
    fadeInObserver.observe(element)
  })

  // Parallax scrolling for sections
  const sections = document.querySelectorAll(".section")

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition > sectionTop - window.innerHeight && scrollPosition < sectionTop + sectionHeight) {
        const speed = section.getAttribute("data-parallax-speed") || 0.1
        const yPos = (scrollPosition - sectionTop) * speed

        if (section.querySelector(".container")) {
          section.querySelector(".container").style.transform = `translateY(${yPos}px)`
        }
      }
    })
  })

  // Animate hero content on load
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = "1"
      heroContent.style.transform = "translateY(0)"
    }, 300)
  }

  // Enhanced timeline animation
  const timelineItems = document.querySelectorAll(".timeline-item")

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated")
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
        }
      })
    },
    {
      threshold: 0.2,
    },
  )

  timelineItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-30px)"
    item.style.transition = "all 0.8s ease " + index * 0.2 + "s"
    timelineObserver.observe(item)
  })
})
