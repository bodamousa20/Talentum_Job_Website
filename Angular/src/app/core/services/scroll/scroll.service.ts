import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable()
export class ScrollService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  scrollToTop(): void {
    this.renderer.setProperty(window, 'scrollTo', {
      top: 0,
      behavior: 'smooth',
    });
  }
}
