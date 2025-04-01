document.addEventListener('DOMContentLoaded', function() {
    // Enhanced timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
  
    // Smooth scrolling with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if(this.hash !== "") {
          e.preventDefault();
          const target = document.querySelector(this.hash);
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
  
          // Update active class
          document.querySelectorAll('.navbar a').forEach(navLink => {
            navLink.classList.remove('active');
          });
          this.classList.add('active');
        }
      });
    });
  
    // Update active link on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 100;
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollPosition >= sectionTop && 
           scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
      const hero = document.querySelector('.hero');
      const scrollPosition = window.pageYOffset;
      hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    });
  });