import { GovDocument, UserProfile } from './constants';

export const users: UserProfile[] = [
  {
    user_id: 'u-ibtesam',
    name: 'إبتسام ال غوينم',
    national_id: '1234567890',
    password: '111',
    avatar: null,
  },
];

export const documents: GovDocument[] = [
  {
    doc_id: 'ABS-001',
    user_id: 'u-ibtesam',
    category: 'الهوية والجوازات',
    source_platform: 'absher',
    type_label: 'هوية وطنية',
    issuer: 'وزارة الداخلية',
    issue_date: '2015-01-01',
    expiry_date: '2020-01-01',
    uploaded_at: '2025-12-10T10:00:00Z',
    status: 'منتهية',
    logo: null,
    reference: 'ID-123456',
  },
  {
    doc_id: 'ABS-002',
    user_id: 'u-ibtesam',
    category: 'النقل والمرور',
    source_platform: 'absher',
    type_label: 'رخصة قيادة',
    issuer: 'وزارة الداخلية',
    issue_date: '2018-01-01',
    expiry_date: '2028-01-01',
    uploaded_at: '2025-12-10T10:00:00Z',
    status: 'سارية',
    logo: null,
    reference: 'DL-987654',
  },
  {
    doc_id: 'EDU-001',
    user_id: 'u-ibtesam',
    category: 'التعليم',
    source_platform: 'ksu',
    type_label: 'شهادة جامعية',
    issuer: 'وزارة التعليم',
    issue_date: '2019-06-01',
    expiry_date: undefined,
    uploaded_at: '2025-12-09T14:00:00Z',
    status: 'جديدة',
    logo: null,
    reference: 'EDU-2023',
  },
  {
    doc_id: 'HLT-001',
    user_id: 'u-ibtesam',
    category: 'الصحة والتأمين',
    source_platform: 'sehhaty',
    type_label: 'بطاقة تأمين صحي',
    issuer: 'وزارة الصحة',
    issue_date: '2023-01-01',
    expiry_date: '2025-12-30',
    uploaded_at: '2025-12-10T08:00:00Z',
    status: 'قرب انتهاء',
    logo: null,
    reference: 'HLT-INS-001',
  },
  {
    doc_id: 'JOB-001',
    user_id: 'u-ibtesam',
    category: 'الوظيفة والموارد البشرية',
    source_platform: 'qiwa',
    type_label: 'عقد عمل',
    issuer: 'وزارة الموارد البشرية',
    issue_date: '2022-01-01',
    expiry_date: '2026-01-01',
    uploaded_at: '2025-12-08T10:00:00Z',
    status: 'سارية',
    logo: null,
    reference: 'JOB-2022',
  },
  {
    doc_id: 'REAL-001',
    user_id: 'u-ibtesam',
    category: 'السكن والعقار',
    source_platform: 'balady',
    type_label: 'صك عقاري',
    issuer: 'وزارة الشؤون البلدية والقروية والإسكان',
    issue_date: '2020-05-01',
    expiry_date: undefined,
    uploaded_at: '2025-12-07T09:00:00Z',
    status: 'جديدة',
    logo: null,
    reference: 'REAL-2020',
  },
];

export const platforms = {
  absher: {
    name: 'منصة أبشر',
    logo: require('../assets/images/logo_absher.png'),
  },
  sehhaty: {
    name: 'منصة صحتي',
    logo: require('../assets/images/sehhaty.png'),
  },
  ksu: {
    name: 'جامعة الملك سعود',
    logo: require('../assets/images/logo_ksu.png'),
  },
  pnu: {
    name: 'جامعة الأميرة نورة',
    logo: require('../assets/images/logo_pnu.png'),
  },
  moe: {
    name: 'وزارة التعليم',
    logo: require('../assets/images/logo_moi.png'),
  },
  qiwa: {
    name: 'منصة قوى',
    logo: require('../assets/images/qiwa.png'),
  },
  balady: {
    name: 'منصة بلدي',
    logo: require('../assets/images/logo_balady.png'),
  },
  default: {
    name: 'جهة غير معروفة',
    logo: require('../assets/images/logo_masar.png'),
  },
};

export const OFFICIAL_SOURCES = {
  absher: 'وزارة الداخلية',
  sehhaty: 'وزارة الصحة',
  ksu: 'وزارة التعليم',
  pnu: 'وزارة التعليم',
  moe: 'وزارة التعليم',
  qiwa: 'وزارة الموارد البشرية',
  balady: 'وزارة الشؤون البلدية والقروية والإسكان',
};
