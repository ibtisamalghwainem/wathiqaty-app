
import { I18nManager, Platform } from 'react-native';

export function ensureRTL() {
  try {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      if (Platform.OS !== 'web') {
        // في الموبايل قد تحتاجين لإعادة تشغيل التطبيق حتى يتفعل RTL
      }
    }
  } catch {}
}