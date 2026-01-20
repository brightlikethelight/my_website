// Intersection Observer utility for scroll animations
export function createScrollObserver(callback: (entries: IntersectionObserverEntry[]) => void, options?: IntersectionObserverInit) {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
}

// Svelte action for scroll animations
export function scrollAnimation(node: HTMLElement, params: {
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  once?: boolean;
} = {}) {
  const {
    animation = 'fadeIn',
    delay = 0,
    duration = 600,
    once = true
  } = params;

  // Set initial state
  node.style.opacity = '0';
  node.style.transition = `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
  
  switch (animation) {
    case 'slideUp':
      node.style.transform = 'translateY(30px)';
      break;
    case 'slideLeft':
      node.style.transform = 'translateX(-30px)';
      break;
    case 'slideRight':
      node.style.transform = 'translateX(30px)';
      break;
    case 'scaleIn':
      node.style.transform = 'scale(0.95)';
      break;
    default:
      node.style.transform = 'translateY(20px)';
  }

  const observer = createScrollObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        setTimeout(() => {
          target.style.opacity = '1';
          target.style.transform = 'translateY(0) translateX(0) scale(1)';
        }, delay);

        if (once) {
          observer?.unobserve(entry.target);
        }
      } else if (!once) {
        target.style.opacity = '0';
        switch (animation) {
          case 'slideUp':
            target.style.transform = 'translateY(30px)';
            break;
          case 'slideLeft':
            target.style.transform = 'translateX(-30px)';
            break;
          case 'slideRight':
            target.style.transform = 'translateX(30px)';
            break;
          case 'scaleIn':
            target.style.transform = 'scale(0.95)';
            break;
          default:
            target.style.transform = 'translateY(20px)';
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
  });

  if (observer) {
    observer.observe(node);
  }

  return {
    destroy() {
      observer?.unobserve(node);
    }
  };
}

// Stagger animation for multiple elements
export function staggerAnimation(nodes: NodeListOf<HTMLElement> | HTMLElement[], delay: number = 100) {
  nodes.forEach((node, index) => {
    if (node instanceof HTMLElement) {
      scrollAnimation(node, {
        animation: 'fadeIn',
        delay: index * delay,
        duration: 600
      });
    }
  });
}

// Parallax scroll effect
export function parallaxScroll(node: HTMLElement, speed: number = 0.5) {
  if (typeof window === 'undefined') return {};

  const handleScroll = () => {
    const scrolled = window.pageYOffset;
    const rect = node.getBoundingClientRect();
    const elementTop = rect.top + scrolled;
    const windowHeight = window.innerHeight;
    
    // Only apply parallax when element is in viewport
    if (scrolled + windowHeight > elementTop && scrolled < elementTop + rect.height) {
      const yPos = -(scrolled - elementTop) * speed;
      node.style.transform = `translateY(${yPos}px)`;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return {
    destroy() {
      window.removeEventListener('scroll', handleScroll);
    }
  };
}

// Counter animation
export function animateCounter(node: HTMLElement, target: number, duration: number = 2000) {
  if (typeof window === 'undefined') return {};

  const observer = createScrollObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          node.textContent = Math.floor(start).toString();
        }, 16);
        
        observer?.unobserve(entry.target);
      }
    });
  });

  if (observer) {
    observer.observe(node);
  }

  return {
    destroy() {
      observer?.unobserve(node);
    }
  };
}