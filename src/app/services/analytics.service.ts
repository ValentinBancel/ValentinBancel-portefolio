import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface AnalyticsEvent {
  event_type: 'page_view' | 'click' | 'project_view' | 'service_view' | 'cv_download';
  page_url: string;
  referrer?: string;
  target_id?: number;
  target_type?: string;
  session_id: string;
  user_agent: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private apiUrl = environment.apiUrl;
  private sessionId: string;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.initializeRouteTracking();
  }

  private getOrCreateSessionId(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return '';
    }

    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = this.generateSessionId();
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  }

  private initializeRouteTracking(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.trackPageView(event.urlAfterRedirects);
    });
  }

  trackPageView(pageUrl: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const event: AnalyticsEvent = {
      event_type: 'page_view',
      page_url: pageUrl,
      referrer: document.referrer,
      session_id: this.sessionId,
      user_agent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  trackClick(targetType?: string, targetId?: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const event: AnalyticsEvent = {
      event_type: 'click',
      page_url: this.router.url,
      session_id: this.sessionId,
      user_agent: navigator.userAgent,
      target_type: targetType,
      target_id: targetId
    };

    this.sendEvent(event);
  }

  trackProjectView(projectId: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const event: AnalyticsEvent = {
      event_type: 'project_view',
      page_url: this.router.url,
      session_id: this.sessionId,
      user_agent: navigator.userAgent,
      target_type: 'project',
      target_id: projectId
    };

    this.sendEvent(event);
  }

  trackServiceView(serviceId: number): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const event: AnalyticsEvent = {
      event_type: 'service_view',
      page_url: this.router.url,
      session_id: this.sessionId,
      user_agent: navigator.userAgent,
      target_type: 'service',
      target_id: serviceId
    };

    this.sendEvent(event);
  }

  trackCVDownload(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const event: AnalyticsEvent = {
      event_type: 'cv_download',
      page_url: this.router.url,
      session_id: this.sessionId,
      user_agent: navigator.userAgent
    };

    this.sendEvent(event);
  }

  private sendEvent(event: AnalyticsEvent): void {
    this.http.post(`${this.apiUrl}/analytics/`, event).subscribe({
      error: (error) => {
        console.error('Analytics tracking error:', error);
      }
    });
  }
}
