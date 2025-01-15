import { personalInfo } from './est-personal-info.model';
import { establishmentInfo } from './establishment-info.model';

export interface CompleteFormData {
  establishmentOwnerInfo: personalInfo;
  establishmentInfo: establishmentInfo;
}
