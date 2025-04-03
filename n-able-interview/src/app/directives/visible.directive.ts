import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
} from "@angular/core";
import { debounceTime, distinctUntilChanged, filter, Subject } from "rxjs";

@Directive({
  selector: "[appVisible]",
  standalone: true,
})
export class VisibleDirective implements OnInit, AfterViewInit, OnDestroy {
  private debounceMs = 300;
  private threshold = 1;
  userId = input.required<number>();
  isLast = input.required<boolean>();
  lastUserVisible = output<string>();

  private observer: IntersectionObserver | undefined;
  private observer$ = new Subject<{
    entry: IntersectionObserverEntry;
    observer: IntersectionObserver;
  }>();

  private hostElement = inject(ElementRef);

  ngOnInit(): void {
    this.createObserver();
  }

  ngAfterViewInit(): void {
    this.observe();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = undefined;
    }
    this.observer$.complete();
  }

  createObserver(): void {
    const isIntersecting = (entry: IntersectionObserverEntry) => {
      return entry.isIntersecting || entry.intersectionRatio > 0;
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      const intersections = entries.filter(isIntersecting);
      intersections.forEach((
        intersection,
      ) => (this.observer$.next({ entry: intersection, observer })));
    }, { rootMargin: "0px", threshold: this.threshold });
  }

  observe(): void {
    if (!this.observer) return;

    this.observer.observe(this.hostElement.nativeElement);

    this.observer$.pipe(
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      filter(Boolean), // kinda redundant
      filter(() => this.isLast()),
    ).subscribe(({ entry, observer }) => {
      this.lastUserVisible.emit(this.userId().toString());
      observer.unobserve(entry.target);
    });
  }
}
