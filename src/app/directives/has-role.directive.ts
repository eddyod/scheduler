import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { takeUntil } from 'rxjs/operators';

// @Directive({selector: '[appHasRole]'})
export class HasRoleDirective implements OnInit, OnDestroy {
  // the role the user must have
  // @Input() appHasRole: string;
  @Input() appHasRole: boolean;
  stop$ = new Subject();

  isVisible = false;

  /**
   * @param {ViewContainerRef} viewContainerRef
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService
   *   -- will give us access to the roles a user has
   */
  constructor(
    // private viewContainerRef: ViewContainerRef,
    // private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) { }

  ngOnInit() {
    let role = this.authService.user.is_superuser;
    if (role) {
      this.isVisible = true;
      // this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.isVisible = false;
      // this.viewContainerRef.clear();
    }
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }
}
