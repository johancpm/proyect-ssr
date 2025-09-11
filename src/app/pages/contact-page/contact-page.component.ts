import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta)
  /*
   la siguente inyeccion de dependencia es necesaria para saber en que plataforma  se esta ejecutando nuestro codigo,
   en el servidor o el navegador;
  */
 /* private platform = inject(PLATFORM_ID); */
 /*
 hay algunas funciones que no se encuentran disponibles en el servidor las cuales son: "document, window, navigator y location"
 para ejecutar ese tipo de funciones se tiene que implementar un condicional y verificar que solo se ejecuten  en el navegador,
 para que no se muestre ningun error en la consola del servidor.
 */

  ngOnInit(): void {
  /*
   el siguiente codigo nos muestra como implementar codigo solo en el navegador y no en el servidor,
  */
    /* if(isPlatformBrowser(this.platform)){
      document.title = 'Contact Page'
    } */

    this.title.setTitle('Contact Page');
    this.meta.updateTag({name: 'description', content: 'esta es mi contact page'});
    this.meta.updateTag({name: 'Og: title', content: ' contact page'});
    this.meta.updateTag({name: 'KeyWords', content: 'angularPro, curso, ssr, aprender, avanzado'});

  }
}
