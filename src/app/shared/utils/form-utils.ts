import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

export default class FormUtils {
  /**
   * Marks all the controls and their nested controls as dirty.
   * @param abstractControls - an array of controls(can be FormControls, FormGroups or FormArrays)
   */
  public static markAllControlsAsDirty(
    abstractControls: AbstractControl[],
  ): void {
    abstractControls.forEach((abstractControl) => {
      if (abstractControl instanceof FormControl) {
        (abstractControl as FormControl).markAsDirty({ onlySelf: true });
      } else if (abstractControl instanceof FormGroup) {
        this.markAllControlsAsDirty(
          Object.values((abstractControl as FormGroup).controls),
        );
      } else if (abstractControl instanceof FormArray) {
        this.markAllControlsAsDirty((abstractControl as FormArray).controls);
      }
    });
  }
}
