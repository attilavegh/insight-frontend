import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable, of } from 'rxjs';

export interface ScriptInjectorServiceShape {
  inject(id: string, fromPath: string): Observable<Event>;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptInjectorService implements ScriptInjectorServiceShape {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  inject(id: string, fromPath: string): Observable<Event | null> {
    return this.hasScript(id) ? of(null) : this.createScript(id, fromPath);
  }

  private hasScript(id: string): boolean {
    return !!this.document.getElementById(id);
  }

  private createScript(id: string, fromPath: string) {
    const script = this.createScriptElement(id, fromPath);
    this.insertScript(script);
    return this.getScriptInsertionResult(script);
  }

  private createScriptElement(id: string, fromPath: string) {
    const script: HTMLScriptElement = this.document.createElement('script');

    script.async = true;
    script.id = id;
    script.type = 'text/javascript';
    script.src = fromPath;

    return script;
  }

  private insertScript(script: HTMLScriptElement) {
    this.document.body.appendChild(script);
  }

  private getScriptInsertionResult(script: HTMLScriptElement): Observable<Event> {
    return new Observable<Event>((observer) => {
      script.addEventListener('load', () => {
        observer.next();
        observer.complete();
      });

      script.addEventListener('error', () => {
        observer.error('Script cannot be loaded.');
      });
    });
  }
}
