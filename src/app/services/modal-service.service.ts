import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  open(content: TemplateRef<any>, viewContainerRef: ViewContainerRef): void {
    viewContainerRef.clear();
    this.modalRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
    });

    this.modalRef.attach(new TemplatePortal(content, viewContainerRef));
  }

  dismiss(): void {
    this.modalRef.dispose();
  }
}
