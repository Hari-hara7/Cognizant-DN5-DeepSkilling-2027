import { CanDeactivateFn } from '@angular/router';

export interface CanLeaveDirtyForm {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanLeaveDirtyForm> = (component) => {
  return component.canDeactivate();
};
