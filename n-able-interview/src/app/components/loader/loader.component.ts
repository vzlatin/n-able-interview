import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  private loaderService = inject(LoaderService);
  show$ = this.loaderService.loadState;
}
