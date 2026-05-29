document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

    // Entry Animation with staggering
    tl.from(".sidebar", { x: -50, opacity: 0 })
      .from(".content-area", { x: 20, opacity: 0 }, "-=0.8")
      .from(".reveal-text", { y: 30, opacity: 0 }, "-=0.6")
      .from(".stat-card", { 
          y: 30, 
          opacity: 0, 
          stagger: 0.15 
      }, "-=0.6")
      .from(".project-card", { 
          y: 20, 
          opacity: 0, 
          stagger: 0.1 
      }, "-=0.6");

    // Number Counter Logic
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isMoney = counter.innerText.includes('$');
        
        gsap.to(counter, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            onUpdate: function() {
                let val = Math.ceil(this.targets()[0].innerText);
                counter.innerText = isMoney ? `$${val.toLocaleString()}` : val;
                if (counter.parentElement.innerText.includes('Efficiency')) counter.innerText += '%';
            }
        });
    });

    // Elegant Hover State
    const allCards = document.querySelectorAll('.stat-card, .project-card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                y: -8, 
                backgroundColor: "#1c1c21", 
                borderColor: "rgba(0, 242, 255, 0.3)",
                duration: 0.4 
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                backgroundColor: "#16161a", 
                borderColor: "rgba(255, 255, 255, 0.08)",
                duration: 0.4 
            });
        });
    });
});