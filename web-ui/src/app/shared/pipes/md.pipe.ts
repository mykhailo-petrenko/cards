import { Pipe, PipeTransform } from '@angular/core';
import marked from 'marked';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'md'
})
export class MdPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer
  ) {
  }


  transform(value: unknown, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustHtml(marked(value));
  }

}
