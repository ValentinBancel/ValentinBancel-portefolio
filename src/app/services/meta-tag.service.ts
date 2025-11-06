import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

export interface MetaTagConfig {
  description?: string;
  title?: string;
  author?: string;
  keywords?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaTagService {
  constructor(private meta: Meta) {}

  setPageMetaTags(config: MetaTagConfig): void {
    // Remove existing tags
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="title"');
    this.meta.removeTag('name="keywords"');

    // Build tags array
    const tags = [];

    if (config.description) {
      tags.push({ name: 'description', content: config.description });
    }

    if (config.title) {
      tags.push({ name: 'title', content: config.title });
    }

    if (config.author) {
      tags.push({ name: 'author', content: config.author });
    }

    if (config.keywords) {
      tags.push({ name: 'keywords', content: config.keywords });
    }

    // Add all tags at once
    if (tags.length > 0) {
      this.meta.addTags(tags);
    }
  }
}
