import * as Font from "expo-font";

export async function loadFonts() {
  try {
    await Font.loadAsync({
      GESSTwoLight: require("../assets/font/GESSTwoLight.ttf"),
      GESSTwoBold: require("../assets/font/GESSTwoBold.ttf"),
    });
    return true; // ✅ الخطوط تحملت بنجاح
  } catch (error) {
    console.warn("⚠️ لم يتم تحميل الخطوط، سيتم استخدام الخط الافتراضي.", error);
    return false; // ❌ fallback للخط الافتراضي
  }
}
