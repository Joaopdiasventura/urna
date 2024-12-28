import { Component, Input, HostListener } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string | null = null;
  @Input() children: string | null = null;

  @Input() onClose: () => void = () => {};

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.onClose();
  }
}
