import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  constructor() {
  }

  public copyTextToClipboard(text: string) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.left = '0';
    tempTextArea.style.top = '0';
    tempTextArea.style.opacity = '0';
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.focus();
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  }

  public copyTextAreaToClipboard(textArea: HTMLTextAreaElement) {
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.setSelectionRange(0, 0);
    document.body.removeChild(textArea);
  }
}
