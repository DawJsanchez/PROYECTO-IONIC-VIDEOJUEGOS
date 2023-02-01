import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate, CanLoad {

  constructor(

    private autenticacionService: AutenticacionService,
    private router: Router

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.autenticacionService.isSesionIniciada()
      .pipe(
        tap(autenticado => {

          if(!autenticado) {
            this.router.navigate(['/auth/login']);
          }

          return autenticado;
        })
      );
  }

  // Solo sirve para impedir que la persona cargue el módulo pero si el módulo ya está cargado, no impide que el usuario acceda.
  // Es importante para evitar errores implementar el CanActivate
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    // return this.autenticacionService.isSesionIniciada()
    //   .pipe(
    //     tap(autenticado => {
    //
    //       if(!autenticado) {
    //         this.router.navigate(['/auth/login']);
    //       }
    //
    //       return autenticado;
    //     })
    //   );
  }
}
