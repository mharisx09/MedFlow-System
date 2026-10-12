import {
  FileText,
  ShieldCheck,
  Wallet,
  FileX2,
  Code2,
  BadgeCheck,
  ClipboardCheck,
  ReceiptText,
  Stethoscope,
  SmilePlus,
  Brain,
  HeartPulse,
  Bone,
  Siren,
  Activity,
  Plus,
  ScanSearch,
  type LucideIcon,
} from 'lucide-react';

export const serviceIcons: Record<string, LucideIcon> = {
  'medical-billing-and-claim-submission': FileText,
  'insurance-eligibility-and-benefits-verification': ShieldCheck,
  'advanced-eligibility-verification': ScanSearch,
  'accounts-receivable-follow-up': Wallet,
  'denial-management-and-appeals': FileX2,
  'medical-coding': Code2,
  'provider-credentialing': BadgeCheck,
  'prior-authorization': ClipboardCheck,
  'patient-billing-and-statements': ReceiptText,
};

export const specialtyIcons: Record<string, LucideIcon> = {
  'Primary Care': Stethoscope,
  Dental: SmilePlus,
  'Mental Health': Brain,
  Cardiology: HeartPulse,
  Orthopedics: Bone,
  'Urgent Care': Siren,
  'Physical Therapy': Activity,
  'More Specialties': Plus,
};
