import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  faFile,
  faPhotoVideo,
  faEnvelope,
  faChevronCircleLeft,
  faChevronCircleRight,
  faTachometerAlt,
  faSignOutAlt,
  faThLarge,
  faHome,
  faWallet,
  faUser,
  faThList,
  faCamera,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import { AuthService, LogoService } from '../../../core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  /*Font Awesome Icons*/
  faFile = faFile;
  faPhotoVideo = faPhotoVideo;
  faEnvelope = faEnvelope;
  faThLarge = faThLarge;
  faChevronCircleLeft = faChevronCircleLeft;
  faChevronCircleRight = faChevronCircleRight;
  faTachometerAlt = faTachometerAlt;
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  faWallet = faWallet;
  faUser = faUser;
  faThList = faThList;
  faCamera = faCamera;
  faInstagram = faInstagram;
  faCog = faCog;

  public logo$: Observable<string>;
  private unsubscribe$: Subject<void> = new Subject<void>();

  public isReduced = false;

  @Output() reduce = new EventEmitter<boolean>();

  constructor(
    private logoService: LogoService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getLogo();
  }

  private getLogo() {
    this.logo$ = this.logoService.getLogo().pipe(takeUntil(this.unsubscribe$));
  }

  public logout() {
    this.authService.signOutUser();
    this.router.navigate(['/admin/login']);
  }

  public toggleReduce() {
    this.isReduced = !this.isReduced;
    this.reduce.emit(this.isReduced);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
