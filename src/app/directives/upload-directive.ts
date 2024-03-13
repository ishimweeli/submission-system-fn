import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

export interface FileHandler {
  file: File;
  url: string;
}

@Directive({
  selector: '[appDrag]'
})
export class AppDrag {
  @Output() fileUpload: EventEmitter<File> = new EventEmitter();
  @HostBinding('style.background') background = '#fff';
  constructor() {}

  @HostListener('dragover', ['$event']) public onDragover(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#c7c7c7';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fff';
  }

  @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.background = '#fff';

    let files: File | null = null;
    if (event.dataTransfer) {
        const file = event.dataTransfer.files[0];
        files = file
      }
    if (files) {
      this.fileUpload.emit(files);
    }
  }
}
