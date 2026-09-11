/**
 * Utility functions for Khmer calendar, numbers, and dates
 */

export const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];

export const toKhmerNum = (num: number | string): string => {
  return String(num).replace(/\d/g, (c) => khmerDigits[parseInt(c, 10)] || c);
};

export const parseKhmerNum = (str: string): number => {
  if (!str) return 0;
  const standard = str.replace(/[០-៩]/g, (c) => String(khmerDigits.indexOf(c)));
  const clean = standard.replace(/[^0-9.-]/g, '');
  return parseFloat(clean) || 0;
};

export const khmerMonths = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ',
];

export const khmerDays = [
  'អាទិត្យ',
  'ចន្ទ',
  'អង្គារ',
  'ពុធ',
  'ព្រហស្បតិ៍',
  'សុក្រ',
  'សៅរ៍',
];

export const getKhmerDateStrings = (d = new Date()) => {
  const dayName = khmerDays[d.getDay()];
  const monthName = khmerMonths[d.getMonth()];
  const dayNum = toKhmerNum(d.getDate());
  const yearNum = toKhmerNum(d.getFullYear());

  // Approximate Buddhist era (BE)
  const beYear = toKhmerNum(d.getFullYear() + 544);

  const lunar = `ថ្ងៃ${dayName} ទី១៥កើត ខែផល្គុន ឆ្នាំម្សាញ់ សប្តស័ក ព.ស.${beYear}`;
  const solar = `រោគ, ថ្ងៃទី${dayNum} ខែ${monthName} ឆ្នាំ${yearNum}`;

  return { lunar, solar, plain: `${dayNum} ${monthName} ${yearNum}` };
};
