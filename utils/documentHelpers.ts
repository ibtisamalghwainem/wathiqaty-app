export function monthsDiffFromNow(date?: string) {
  if (!date) return Infinity;
  const today = new Date();
  const d = new Date(date);
  return (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);
}

export function isNearExpiry(date?: string) {
  const m = monthsDiffFromNow(date);
  return m <= 3 && m > 0;
}

export function isExpired(date?: string) {
  if (!date) return false;
  return new Date(date) < new Date();
}

export function isNew(uploaded_at?: string) {
  if (!uploaded_at) return false;
  const months = (new Date().getTime() - new Date(uploaded_at).getTime()) / (1000 * 60 * 60 * 24 * 30);
  return months <= 6;
}

export function buildRecommendations(docs: any[]) {
  const recs: string[] = [];
  const near = docs.filter(d => isNearExpiry(d.expiry_date));
  const exp = docs.filter(d => isExpired(d.expiry_date));
  const newDocs = docs.filter(d => isNew(d.uploaded_at));

  if (near.length) recs.push(`لديك ${near.length} وثائق قريبة الانتهاء — جهزي التجديد الآن.`);
  if (exp.length) recs.push(`هناك ${exp.length} وثائق منتهية — ارفعي النسخة الجديدة أو جدديها.`);
  if (newDocs.length) recs.push(`تمت إضافة ${newDocs.length} وثيقة جديدة مؤخرًا — راجعي التفاصيل للتأكد من الاستخراج الصحيح.`);

  recs.push('نقترح الاطلاع على بيانات قوى: عمر الخدمة ومستحق نهاية الخدمة وتحديث عقد العمل إن لزم.');
  recs.push('أضيفي شهادات التدريب الأخيرة من وزارة التعليم لتقوية ملفك.');
  recs.push('راجعي سجل التطعيمات من صحتي وتحققي من صلاحية التأمين الصحي.');

  return recs.slice(0, 5);
}
