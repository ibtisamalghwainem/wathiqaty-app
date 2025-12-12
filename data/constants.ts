export type DocumentStatus = 'سارية' | 'منتهية' | 'قرب انتهاء' | 'جديدة';

export type DocumentCategory =
  | 'الصحة والتأمين'
  | 'التعليم'
  | 'السكن والعقار'
  | 'الوظيفة والموارد البشرية'
  | 'العدل'
  | 'المالية'
  | 'الهوية والجوازات'
  | 'الأنشطة التجارية'
  | 'البيئة والزراعة'
  | 'النقل والمرور';

export interface GovDocument {
  doc_id: string;
  user_id: string;
  category: DocumentCategory;
  source_platform: string; 
  type_label: string;      
  issuer: string;          
  reference?: string;
  issue_date?: string;    
  expiry_date?: string;    
  uploaded_at?: string;    
  status: DocumentStatus;
  logo?: any;              
}

export interface UserProfile {
  user_id: string;
  name: string;
  national_id?: string;
  password?: string;
  avatar?: any;
}

export const COLORS = {
  brandDark: '#1A4F3F',
  brandMid: '#2E6B56',
  brandLight: '#AEE2C9',
  bg: '#F9FAF7',
  card: '#FFFFFF',
  mute: '#EEE',
  text: '#333',
  textDim: '#777',
  red: '#E74C3C',
  orange: '#F39C12',
  green: '#2ECC71',
};

export const CATEGORY_ICONS: Record<DocumentCategory, string> = {
  'الصحة والتأمين': 'heartbeat',
  'التعليم': 'graduation-cap',
  'السكن والعقار': 'building',
  'الوظيفة والموارد البشرية': 'briefcase',
  'العدل': 'balance-scale',
  'المالية': 'money',
  'الهوية والجوازات': 'id-card',
  'الأنشطة التجارية': 'store',
  'البيئة والزراعة': 'leaf',
  'النقل والمرور': 'car',
};

export const STATUS_STYLES: Record<DocumentStatus, { color: string; icon: string }> = {
  'سارية': { color: COLORS.green, icon: 'check-circle' },
  'قرب انتهاء': { color: COLORS.orange, icon: 'exclamation-circle' },
  'منتهية': { color: COLORS.red, icon: 'times-circle' },
  'جديدة': { color: COLORS.green, icon: 'star' },
};

export const NEAR_EXPIRY_MONTHS = 3;

export const OFFICIAL_SOURCES: Record<string, string> = {
  absher: 'أبشر',
  tawakkalna: 'توكلنا',
  najiz: 'وزارة العدل / منصة ناجز',
  balady: 'وزارة الشؤون البلدية / منصة بلدي',
  qiwa: 'قوى',
  gosi: 'التأمينات الاجتماعية',
  sehhaty: 'صحتي',
  sable: 'سبل',
  education: 'وزارة التعليم',
};

export const platformLabels: Record<string, string> = {
  absher: 'وزارة الداخلية',
  sehhaty: 'وزارة الصحة',
  qiwa: 'وزارة الموارد البشرية',
  najiz: 'وزارة العدل',
  balady: 'وزارة الشؤون البلدية والقروية والإسكان',
  mofa: 'وزارة الخارجية',
  moc: 'وزارة التجارة',
  ksu: 'وزارة التعليم',
  pnu: 'وزارة التعليم',
  moe: 'وزارة التعليم',
  education: 'وزارة التعليم',
  spl: 'البريد السعودي',
  sce: 'هيئة المهندسين',
  mewa: 'وزارة البيئة والمياه والزراعة',
  masar: 'منصة مسار (الموارد البشرية)',
  zatca: 'هيئة الزكاة والضريبة والجمارك',
  mc: 'وزارة التجارة',
  mim: 'وزارة الصناعة والثروة المعدنية',
};

export const getMinistryByPlatform = (platform: string): string => {
  return platformLabels[platform] || 'جهة غير معروفة';
};

export const correctPlatformByType = (doc: GovDocument): string => {
  const type = doc.type_label.trim();

  if (type.includes('رخصة قيادة') || type.includes('هوية وطنية')) return 'absher';
  if (type.includes('شهادة جامعية') || type.includes('سجل أكاديمي')) return 'ksu';
  if (type.includes('عقد عمل') || type.includes('شهادة خبرة')) return 'qiwa';
  if (type.includes('تأمين صحي') || type.includes('بطاقة صحية')) return 'sehhaty';
  if (type.includes('صك عقاري') || type.includes('ملكية')) return 'balady';

  return doc.source_platform;
};

export const statusColors: Record<string, string> = {
  'سارية': '#2e7d32',
  'منتهية': '#c62828',
  'قرب انتهاء': '#ef6c00',
  'جديدة': '#1565c0',
};

export const messages = {
  noDocs: 'لا توجد وثائق حتى الآن لهذه الجهة.',
};
