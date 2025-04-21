(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel

    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 50,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    // Check if WOW.js is available and initialize
    if (typeof WOW === 'function') {
        new WOW().init();
    }
    
    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the faster
    
    // Counter animation function
    const animateCounter = () => {
        counters.forEach(counter => {
            // Only animate if counter is visible and hasn't been animated yet
            if (isElementInViewport(counter) && counter.style.visibility !== 'visible') {
                counter.style.visibility = 'visible';
                const target = +counter.textContent;
                let count = 0;
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            }
        });
    };
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Run counter animation on page load
    setTimeout(animateCounter, 500);
    
    // Run counter animation on scroll
    window.addEventListener('scroll', animateCounter);
});

// JavaScript for toggling faculty visibility
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const moreFaculty = document.getElementById('more-faculty');
    
    if (showMoreBtn && moreFaculty) {
      showMoreBtn.addEventListener('click', function() {
        // Toggle visibility of hidden faculty members
        if (moreFaculty.style.display === 'none' || getComputedStyle(moreFaculty).display === 'none') {
          moreFaculty.style.display = 'grid';
          showMoreBtn.querySelector('.btn-text').textContent = 'Show Less';
          showMoreBtn.querySelector('i').classList.remove('fa-chevron-down');
          showMoreBtn.querySelector('i').classList.add('fa-chevron-up');
        } else {
          moreFaculty.style.display = 'none';
          showMoreBtn.querySelector('.btn-text').textContent = 'Show More Faculty';
          showMoreBtn.querySelector('i').classList.remove('fa-chevron-up');
          showMoreBtn.querySelector('i').classList.add('fa-chevron-down');
        }
        
        // Smooth scroll to newly displayed content
        if (moreFaculty.style.display === 'grid') {
          setTimeout(() => {
            window.scrollBy({
              top: 200,
              behavior: 'smooth'
            });
          }, 100);
        }
      });
    }
    
    // Optional: Add animation when scrolling
    function revealOnScroll() {
      const faculty = document.querySelectorAll('.faculty-member');
      
      faculty.forEach((member, index) => {
        if (isElementInViewport(member)) {
          setTimeout(() => {
            member.style.opacity = '1';
            member.style.transform = 'translateY(0)';
          }, index * 100); // Staggered animation
        }
      });
    }
    
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Initialize faculty with hidden state and prepare for animation
    const allFaculty = document.querySelectorAll('.faculty-member');
    allFaculty.forEach(member => {
      member.style.opacity = '0';
      member.style.transform = 'translateY(30px)';
      member.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on scroll and on page load
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on page load
  });

// Initialize WOW.js for animations
document.addEventListener('DOMContentLoaded', function() {
  new WOW().init();
  
  // Network lines connecting animation
  // This creates a more dynamic network effect by occasionally connecting
  // particles with lines to simulate a network graph
  function animateNetwork() {
      const particles = document.querySelectorAll('.particle');
      const lines = document.querySelectorAll('.network-line');
      
      // Randomly position lines to connect particles
      lines.forEach((line, index) => {
          const randomParticleIndex1 = Math.floor(Math.random() * particles.length);
          let randomParticleIndex2 = Math.floor(Math.random() * particles.length);
          
          // Ensure we're connecting to a different particle
          while(randomParticleIndex1 === randomParticleIndex2) {
              randomParticleIndex2 = Math.floor(Math.random() * particles.length);
          }
          
          // Get positions after a delay to ensure elements are rendered
          setTimeout(() => {
              updateLinePosition(line, 
                  particles[randomParticleIndex1].getBoundingClientRect(),
                  particles[randomParticleIndex2].getBoundingClientRect());
          }, 500);
      });
  }
  
  function updateLinePosition(line, pos1, pos2) {
      // Calculate center points of particles
      const x1 = pos1.left + pos1.width/2;
      const y1 = pos1.top + pos1.height/2;
      const x2 = pos2.left + pos2.width/2;
      const y2 = pos2.top + pos2.height/2;
      
      // Calculate distance and angle
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      
      // Set line position and rotation
      line.style.width = `${length}px`;
      line.style.left = `${x1}px`;
      line.style.top = `${y1}px`;
      line.style.transform = `rotate(${angle}deg)`;
      
      // Randomly refresh connections
      setTimeout(() => animateNetwork(), 8000 + Math.random() * 5000);
  }
  
  // Call once to initialize
  animateNetwork();
  
  // Optional: Add parallax effect on scroll
  window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      
      // Move background elements at different speeds
      const circles = document.querySelectorAll('.circle');
      const particles = document.querySelectorAll('.particle');
      
      circles.forEach((circle, index) => {
          circle.style.transform = `translateY(${scrollY * 0.1 * (index + 1)}px)`;
      });
      
      particles.forEach((particle, index) => {
          particle.style.transform = `translateY(${scrollY * 0.05 * (index + 1)}px)`;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Initialize WOW.js for animations
  new WOW().init();
  
  // Progress indicator for timeline
  function animateTimelineProgress() {
    const timelineProgress = document.querySelector('.timeline-progress');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            timelineProgress.style.transform = 'scaleY(1)';
          }, 500);
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(document.querySelector('.timeline-container'));
  }
  
  // Handle timeline item animations on scroll
  function handleTimelineItemsAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -100px 0px' });
    
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Interactive timeline hover effects
  function addTimelineHoverEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        timelineItems.forEach(i => {
          if (i !== item) {
            i.style.opacity = '0.5';
            i.style.transform = 'scale(0.98)';
          } else {
            i.style.transform = 'scale(1.02)';
          }
        });
      });
      
      item.addEventListener('mouseleave', () => {
        timelineItems.forEach(i => {
          i.style.opacity = '1';
          i.style.transform = 'scale(1)';
        });
      });
    });
  }
  
  // Handle timeline navigation when clicking on dots
  function setupTimelineNavigation() {
    const dots = document.querySelectorAll('.timeline-dot');
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const timelineItem = dot.closest('.timeline-item');
        const itemTop = timelineItem.offsetTop;
        
        window.scrollTo({
          top: itemTop - 100,
          behavior: 'smooth'
        });
        
        // Add highlight effect
        const card = timelineItem.querySelector('.timeline-card');
        card.style.boxShadow = '0 20px 50px rgba(212, 175, 55, 0.3)';
        
        setTimeout(() => {
          card.style.boxShadow = '';
        }, 1500);
      });
    });
  }
  
  // Add custom cursor effect on timeline items
  function addCustomCursorEffect() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        
        card.style.transform = `translateY(-10px) rotateX(${y * 3}deg) rotateY(${x * 3}deg)`;
        
        // Add shine effect
        const shine = card.querySelector('.shine-effect') || document.createElement('div');
        if (!card.querySelector('.shine-effect')) {
          shine.classList.add('shine-effect');
          shine.style.position = 'absolute';
          shine.style.top = '0';
          shine.style.left = '0';
          shine.style.right = '0';
          shine.style.bottom = '0';
          shine.style.pointerEvents = 'none';
          shine.style.background = 'radial-gradient(circle at ' + 
            e.clientX - left + 'px ' + (e.clientY - top) + 
            'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
          card.appendChild(shine);
        } else {
          shine.style.background = 'radial-gradient(circle at ' + 
            e.clientX - left + 'px ' + (e.clientY - top) + 
            'px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(-10px) rotateX(0) rotateY(0)';
        const shine = card.querySelector('.shine-effect');
        if (shine) shine.remove();
      });
    });
  }
  
  // Animate the dots with a subtle pulse
  function animateTimelineDots() {
    const dots = document.querySelectorAll('.timeline-dot');
    
    dots.forEach((dot, index) => {
      setTimeout(() => {
        dot.classList.add('pulse-once');
        setTimeout(() => {
          dot.classList.remove('pulse-once');
        }, 1000);
      }, index * 300);
    });
  }
  
  // Count animation for any numbers in the timeline
  function setupCountAnimations() {
    const animatedNumbers = document.querySelectorAll('.count-animation');
    
    if (animatedNumbers.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const endValue = parseInt(target.getAttribute('data-count'));
            let startValue = 0;
            const duration = 2000;
            const increment = endValue / (duration / 16);
            
            const updateCount = () => {
              startValue += increment;
              if (startValue < endValue) {
                target.textContent = Math.floor(startValue);
                requestAnimationFrame(updateCount);
              } else {
                target.textContent = endValue;
              }
            };
            
            requestAnimationFrame(updateCount);
            observer.unobserve(target);
          }
        });
      }, { threshold: 0.5 });
      
      animatedNumbers.forEach(number => {
        observer.observe(number);
      });
    }
  }
  
  // Add parallax effect on scroll
  function setupParallaxEffect() {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const timelineSection = document.querySelector('.timeline-section');
      const sectionOffset = timelineSection.offsetTop;
      const sectionHeight = timelineSection.offsetHeight;
      
      // Only apply effect when timeline section is in viewport
      if (scrollPosition > sectionOffset - window.innerHeight && 
          scrollPosition < sectionOffset + sectionHeight) {
        
        // Calculate parallax amount based on scroll position relative to section
        const parallaxValue = (scrollPosition - (sectionOffset - window.innerHeight)) / (sectionHeight + window.innerHeight);
        
        // Apply subtle movement to timeline elements
        document.querySelectorAll('.timeline-item.left').forEach((item, index) => {
          const offset = 15 * (index % 3 + 1) * parallaxValue;
          item.style.transform = `translateX(${-offset}px)`;
        });
        
        document.querySelectorAll('.timeline-item.right').forEach((item, index) => {
          const offset = 15 * (index % 3 + 1) * parallaxValue;
          item.style.transform = `translateX(${offset}px)`;
        });
      }
    });
  }
  
  // Initialize all timeline functions
  animateTimelineProgress();
  handleTimelineItemsAnimation();
  addTimelineHoverEffects();
  setupTimelineNavigation();
  setupCountAnimations();
  
  // Call the dot animation after a short delay
  setTimeout(animateTimelineDots, 1000);
  
  // Setup parallax effect
  setupParallaxEffect();
  
  // Only add 3D effect on desktop devices
  if (window.innerWidth > 992) {
    addCustomCursorEffect();
  }
  
  // Add some additional hover effects to the button
  const button = document.querySelector('.btn-burgundy');
  if (button) {
    button.addEventListener('mouseenter', () => {
      button.style.letterSpacing = '1.5px';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.letterSpacing = '1px';
    });
  }
});

// Add styles for the pulse-once class
const style = document.createElement('style');
style.textContent = `
  @keyframes pulseOnce {
    0% { transform: translateX(-50%) scale(1); }
    50% { transform: translateX(-50%) scale(1.5); box-shadow: 0 0 20px rgba(212, 175, 55, 0.7); }
    100% { transform: translateX(-50%) scale(1); }
  }
  
  .pulse-once {
    animation: pulseOnce 1s ease-out;
  }
`;
document.head.appendChild(style);

// Faculty Hero Banner Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
  const heroBanner = document.querySelector('.faculty-hero-banner');
  
  // Create interactive nodes when mouse moves
  heroBanner.addEventListener('mousemove', function(e) {
      // Get banner position
      const rect = heroBanner.getBoundingClientRect();
      
      // Calculate relative position
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create nodes only occasionally
      if (Math.random() > 0.95) {
          createNode(x, y);
      }
      
      // Subtle light effect following cursor
      const light = document.querySelector('.faculty-cursor-light') || createCursorLight();
      light.style.left = `${x}px`;
      light.style.top = `${y}px`;
      
      // Create hexagon effect on click
      heroBanner.addEventListener('click', function(e) {
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          createHexRipple(clickX, clickY);
      });
  });
  
  // Remove light effect when mouse leaves
  heroBanner.addEventListener('mouseleave', function() {
      const light = document.querySelector('.faculty-cursor-light');
      if (light) {
          light.style.opacity = '0';
          setTimeout(() => {
              if (light.parentNode) {
                  light.parentNode.removeChild(light);
              }
          }, 300);
      }
  });
  
  // Create subtle light following cursor
  function createCursorLight() {
      const light = document.createElement('div');
      light.className = 'faculty-cursor-light';
      light.style.cssText = `
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(142, 29, 87, 0.1) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 2;
          transition: opacity 0.3s ease;
      `;
      heroBanner.appendChild(light);
      return light;
  }
  
  // Create node function - AI/ML node effect
  function createNode(x, y) {
      const node = document.createElement('div');
      
      // Random size
      const size = Math.random() * 6 + 3;
      
      // Set styles for node point
      node.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: #D4AF37;
          border-radius: 50%;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 3;
          box-shadow: 0 0 10px #D4AF37;
          animation: faculty-node-pulse 2s forwards ease-out;
      `;
      
      heroBanner.appendChild(node);
      
      // Create 1-3 connection lines
      const connections = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < connections; i++) {
          createConnection(x, y, size);
      }
      
      // Remove after animation completes
      setTimeout(() => {
          if (node.parentNode) {
              node.parentNode.removeChild(node);
          }
      }, 2000);
  }
  
  // Create connection lines between nodes
  function createConnection(x, y, size) {
      const connection = document.createElement('div');
      
      // Random angle and length
      const angle = Math.random() * 360;
      const length = Math.random() * 80 + 30;
      
      // Calculate end point
      const endX = x + length * Math.cos(angle * Math.PI / 180);
      const endY = y + length * Math.sin(angle * Math.PI / 180);
      
      // Distance between points
      const distance = Math.sqrt(Math.pow(endX - x, 2) + Math.pow(endY - y, 2));
      
      // Calculate rotation angle
      const rotationAngle = Math.atan2(endY - y, endX - x) * 180 / Math.PI;
      
      // Set styles for connection line
      connection.style.cssText = `
          position: absolute;
          height: 1px;
          width: 0px;
          background: linear-gradient(90deg, #D4AF37, rgba(212, 175, 55, 0.3));
          left: ${x}px;
          top: ${y}px;
          transform-origin: left center;
          transform: rotate(${rotationAngle}deg);
          pointer-events: none;
          z-index: 2;
          opacity: 0.7;
          animation: faculty-connection-grow 1.5s forwards;
      `;
      
      heroBanner.appendChild(connection);
      
      // Set final width with animation
      connection.style.animationName = 'faculty-connection-grow';
      connection.style.animationDuration = '1.5s';
      connection.style.animationFillMode = 'forwards';
      
      // Remove after animation completes
      setTimeout(() => {
          if (connection.parentNode) {
              connection.parentNode.removeChild(connection);
          }
      }, 1500);
  }
  
  // Create hexagon ripple effect on click
  function createHexRipple(x, y) {
      const hexRipple = document.createElement('div');
      
      hexRipple.style.cssText = `
          position: absolute;
          width: 60px;
          height: 60px;
          left: ${x}px;
          top: ${y}px;
          transform: translate(-50%, -50%);
          background: transparent;
          pointer-events: none;
          z-index: 2;
          border: 1px solid rgba(212, 175, 55, 0.7);
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          animation: faculty-hex-ripple 2s forwards ease-out;
      `;
      
      heroBanner.appendChild(hexRipple);
      
      // Remove after animation completes
      setTimeout(() => {
          if (hexRipple.parentNode) {
              hexRipple.parentNode.removeChild(hexRipple);
          }
      }, 2000);
  }
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
      @keyframes faculty-node-pulse {
          0% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
          }
          100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(2.5);
          }
      }
      
      @keyframes faculty-connection-grow {
          0% {
              width: 0;
              opacity: 0.7;
          }
          70% {
              width: 100%;
              opacity: 0.7;
          }
          100% {
              width: 100%;
              opacity: 0;
          }
      }
      
      @keyframes faculty-hex-ripple {
          0% {
              width: 50px;
              height: 50px;
              opacity: 0.8;
              border-width: 2px;
          }
          100% {
              width: 150px;
              height: 150px;
              opacity: 0;
              border-width: 1px;
          }
      }
  `;
  document.head.appendChild(style);
  
  // Initialize automatic node creation
  function createRandomNode() {
      const width = heroBanner.offsetWidth;
      const height = heroBanner.offsetHeight;
      
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      createNode(x, y);
      
      // Schedule next node creation
      setTimeout(createRandomNode, Math.random() * 3000 + 1000); // 1-4 seconds
  }
  
  // Start automatic node creation
  setTimeout(createRandomNode, 1000);
});