import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AutenticacionService } from './services/autenticacion.service';
import {CookieService} from "ngx-cookie-service";
import {logIn} from "ionicons/icons";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  // Hace que se muestre u oculte el menú. Permie ocultarlo en el login
  showMenu: boolean = false;
  private cookie_name='';
  private all_cookies:any='';

  public appPages = [
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Dashboard', url: '/dashboard', icon: 'speedometer' },
    { title: 'Videojuegos', url: '/listado-videojuegos', icon: 'rocket' },
    { title: 'Usuarios', url: '/listado-usuarios', icon: 'people' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(

    // Obtengo la instancia al router
    private router: Router,
    private cookieService:CookieService,
    // Servicio de autenticación
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {

    this.router.events.pipe(

      // Filtra los elementos de entrada. Solo devuelve aquellos que cumplen el criterio
      filter(event => event instanceof NavigationEnd)

    ).subscribe((event: any) => {

      // IONIC -> He detectado que no entra aquí

      // La propiedad showMenu se iguala a startsWith auth ya que esto indica que estamos en login
      this.showMenu = !event.url.startsWith("/login");

    });

//    this.autenticacionService.escucharInicioSesion((si: boolean) => {
//      debugger;
//      this.showMenu = si;
//    });
    this.cookie_name=this.cookieService.get('login');
    this.all_cookies=this.cookieService.getAll();
  }

  cerrarSesion() {

    // Cierra la sesión
    this.autenticacionService.cerrarSesion();

    // Navega a la página de login
    this.router.navigate([ '/login' ]);
  }
  setCookie(){
    this.cookieService.set('name','Tutorialswebsite');
  }

  deleteCookie(){
    this.cookieService.delete('name');
  }

  deleteAll(){
    this.cookieService.deleteAll();
  }
}
