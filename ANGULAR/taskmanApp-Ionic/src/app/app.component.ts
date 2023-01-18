import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    // { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    // { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    { title: 'Login', url: '/login', icon: 'mail' },
    { title: 'Dashboard-v', url: '/folder/Dashboard-v', icon: 'paper-plane' },
    { title: 'Videojuegos', url: '/folder/Videojuegos', icon: 'heart' },
    { title: 'Usuarios', url: '/folder/Usuarios', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Tipos-videojuego', url: '/folder/Tipos-videojuego', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
