/**
 * Analytics and Performance Monitoring System
 * Tracks Core Web Vitals, user interactions, and performance metrics
 */

interface AnalyticsEvent {
  name: string;
  value?: number;
  data?: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface PerformanceMetrics {
  lcp?: number;
  inp?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  loadTime?: number;
  domContentLoaded?: number;
}

interface UserInteraction {
  type: 'click' | 'scroll' | 'hover' | 'focus' | 'form_submit' | 'search' | 'filter';
  target: string;
  timestamp: number;
  sessionId: string;
  data?: Record<string, any>;
}

class AnalyticsService {
  private sessionId: string;
  private events: AnalyticsEvent[] = [];
  private interactions: UserInteraction[] = [];
  private metrics: PerformanceMetrics = {};
  private isEnabled: boolean = true;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking(): void {
    if (typeof window === 'undefined') return;

    // Track page load metrics
    this.trackPageLoad();
    
    // Track Core Web Vitals
    this.trackCoreWebVitals();
    
    // Track user interactions
    this.trackUserInteractions();
    
    // Track errors
    this.trackErrors();

    // Send analytics data periodically
    this.startPeriodicReporting();
  }

  private trackPageLoad(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
        this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart;
      }
    });
  }

  private trackCoreWebVitals(): void {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.trackEvent('core_web_vital', lastEntry.startTime, { metric: 'lcp' });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.fcp = lastEntry.startTime;
      this.trackEvent('core_web_vital', lastEntry.startTime, { metric: 'fcp' });
    });
    fcpObserver.observe({ type: 'paint', buffered: true });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      this.metrics.cls = clsValue;
      this.trackEvent('core_web_vital', clsValue, { metric: 'cls' });
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Interaction to Next Paint (INP) - approximation
    this.trackINP();
  }

  private trackINP(): void {
    let maxInteractionDelay = 0;
    
    const trackInteractionDelay = (event: Event) => {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const delay = endTime - startTime;
        
        if (delay > maxInteractionDelay) {
          maxInteractionDelay = delay;
          this.metrics.inp = delay;
          this.trackEvent('core_web_vital', delay, { metric: 'inp' });
        }
      });
    };

    ['click', 'keydown', 'pointerdown'].forEach(eventType => {
      document.addEventListener(eventType, trackInteractionDelay, { passive: true });
    });
  }

  private trackUserInteractions(): void {
    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      this.trackInteraction('click', this.getElementSelector(target), {
        tagName: target.tagName,
        className: target.className,
        text: target.textContent?.substring(0, 50)
      });
    });

    // Track scrolling
    let scrollTimeout: ReturnType<typeof setTimeout>;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.trackInteraction('scroll', 'window', {
          scrollY: window.scrollY,
          scrollPercentage: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
        });
      }, 100);
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackInteraction('form_submit', this.getElementSelector(form), {
        formId: form.id,
        formAction: form.action
      });
    });

    // Track search and filter interactions
    document.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.type === 'search' || target.id === 'project-search') {
        this.trackInteraction('search', this.getElementSelector(target), {
          query: target.value,
          queryLength: target.value.length
        });
      }
    });
  }

  private trackErrors(): void {
    window.addEventListener('error', (event) => {
      this.trackEvent('error', 0, {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.trackEvent('promise_rejection', 0, {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });
  }

  private getElementSelector(element: HTMLElement): string {
    if (element.id) return `#${element.id}`;
    if (element.className) return `.${element.className.split(' ')[0]}`;
    return element.tagName.toLowerCase();
  }

  private trackEvent(name: string, value?: number, data?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const event: AnalyticsEvent = {
      name,
      value,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId
    };

    this.events.push(event);
    
    // Keep only last 100 events to prevent memory issues
    if (this.events.length > 100) {
      this.events = this.events.slice(-100);
    }
  }

  private trackInteraction(type: UserInteraction['type'], target: string, data?: Record<string, any>): void {
    if (!this.isEnabled) return;

    const interaction: UserInteraction = {
      type,
      target,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      data
    };

    this.interactions.push(interaction);
    
    // Keep only last 50 interactions
    if (this.interactions.length > 50) {
      this.interactions = this.interactions.slice(-50);
    }
  }

  private startPeriodicReporting(): void {
    // Send analytics data every 30 seconds
    setInterval(() => {
      this.sendAnalyticsData();
    }, 30000);

    // Send data before page unload
    window.addEventListener('beforeunload', () => {
      this.sendAnalyticsData();
    });
  }

  private sendAnalyticsData(): void {
    if (!this.isEnabled || this.events.length === 0) return;

    const payload = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      metrics: this.metrics,
      events: this.events,
      interactions: this.interactions,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      url: window.location.href
    };

    // For now, just log to console. In production, you'd send to your analytics service
    console.log('📊 Analytics Data:', payload);
    
    // You could send to services like:
    // - Google Analytics 4
    // - PostHog
    // - Mixpanel
    // - Custom analytics endpoint
    
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) });
    
    // Clear sent events and interactions
    this.events = [];
    this.interactions = [];
  }

  // Public API methods
  public trackCustomEvent(name: string, value?: number, data?: Record<string, any>): void {
    this.trackEvent(name, value, data);
  }

  public trackPageView(page: string): void {
    this.trackEvent('page_view', 0, { page, url: window.location.href });
  }

  public trackProjectView(projectId: string): void {
    this.trackEvent('project_view', 0, { projectId });
  }

  public trackProjectExpand(projectId: string): void {
    this.trackEvent('project_expand', 0, { projectId });
  }

  public trackContactFormSubmit(success: boolean): void {
    this.trackEvent('contact_form_submit', success ? 1 : 0);
  }

  public trackResumeDownload(format: string): void {
    this.trackEvent('resume_download', 0, { format });
  }

  public trackSectionView(sectionId: string): void {
    this.trackEvent('section_view', 0, { sectionId });
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public disable(): void {
    this.isEnabled = false;
  }

  public enable(): void {
    this.isEnabled = true;
  }
}

// Create a singleton instance
const analytics = new AnalyticsService();

// Export the analytics instance and key functions
export default analytics;
export { analytics, AnalyticsService };
export type { AnalyticsEvent, PerformanceMetrics, UserInteraction };