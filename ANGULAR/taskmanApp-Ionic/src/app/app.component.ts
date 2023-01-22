import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Dashboard-v', url: '/folder/Dashboard-v', icon: 'analytics' },
    { title: 'Videojuegos', url: '/folder/Videojuegos', icon: 'game-controller' },
    { title: 'Usuarios', url: '/usuarios/listado', icon: 'people' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Tipos-videojuego', url: '/folder/Tipos-videojuego', icon: 'albums' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
