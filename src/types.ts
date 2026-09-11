/**
 * TypeScript types for the School End-of-Year Report System
 * (របាយការណ៍បូកសរុបលទ្ធផលការងារអប់រំ ផ្នែកបឋមសិក្សា នាដំណាច់ឆ្នាំ)
 */

export interface SchoolHeaderInfo {
  kingdom: string;
  motto: string;
  district: string;
  office: string;
  cluster: string;
  school: string;
  reportTitle: string;
  academicYear: string;
}

export interface SchoolQuantData {
  clusterCount: number;
  urban: number;
  normal: number;
  remote: number;
  unusual: number;
  schoolName: string;
  annexCount: number;
  classesCount: number;
  roomsCount: number;
  otherNotes: string;
}

export interface StudentComparisonRow {
  grade: number;
  classes: number;
  startStudents: number;
  startFemale: number;
  endStudents: number;
  endFemale: number;
  changeCount: number;
  causes: string;
}

export interface StudentComparisonSection {
  rows: StudentComparisonRow[];
  totalStudents: number;
  totalFemale: number;
  totalClasses: number;
  note: string;
}

export interface ClassLevelRow {
  grade: number;
  classes: number;
  rooms: number;
  doubleShift: number;
  students: number;
  female: number;
}

export interface ClassLevelsSection {
  totalClasses: number;
  rows: ClassLevelRow[];
}

export interface StaffSummarySection {
  totalStaff: number;
  totalFemale: number;
  primaryTeachers: number;
  primaryFemale: number;
  kindergartenTeachers: number;
  kindergartenFemale: number;
  contractTeachers: number;
  contractFemale: number;
}

export interface FinanceSection {
  newBuildings: number;
  newRooms: number;
  newCost: string;
  repairBuildings: number;
  repairRooms: number;
  repairCost: string;
  stateBudget: string;
  partnerBudget: string;
  communityBudget: string;
}

export interface LibrarySection {
  clusterHasLibrary: number;
  schoolHasLibrary: number;
  totalLibraries: number;
  librarians: number;
  femaleLibrarians: number;
  hasReadingSchedule: string;
  readingHoursPerWeek: number;
}

export interface ExamResultRow {
  grade: number;
  endStudents: number;
  endFemale: number;
  startStudents: number;
  startFemale: number;
  passStudents: number;
  passFemale: number;
  failStudents: number;
  failFemale: number;
  notes: string;
}

export interface ExamResultsSection {
  rows: ExamResultRow[];
  totalEndStudents: number;
  totalEndFemale: number;
  totalStartStudents: number;
  totalStartFemale: number;
  totalPass: number;
  totalPassFemale: number;
  totalFail: number;
  totalFailFemale: number;
}

export interface PercentageRow {
  grade: number;
  passTotalPct: string;
  passFemalePct: string;
  failTotalPct: string;
  failFemalePct: string;
  repeatPct?: string;
  dropoutPct?: string;
  notes: string;
}

export interface PercentageSection {
  rows: PercentageRow[];
  totalPassPct: string;
  totalPassFemalePct: string;
  totalFailPct: string;
  totalFailFemalePct: string;
}

export interface CurriculumRow {
  grade: number;
  goodTotal: number;
  goodFemale: number;
  midTotal: number;
  midFemale: number;
  weakTotal: number;
  weakFemale: number;
  khmerPct: number;
  mathPct: number;
  socialPct: number;
  sciencePct: number;
  englishPct: number;
}

export interface CurriculumSection {
  rows: CurriculumRow[];
  sumGoodTotal: number;
  sumGoodFemale: number;
  sumMidTotal: number;
  sumMidFemale: number;
  sumWeakTotal: number;
  sumWeakFemale: number;
  avgKhmer: number;
  avgMath: number;
  avgSocial: number;
  avgScience: number;
  avgEnglish: number;
}

export interface ExtracurricularSection {
  socialWork: string;
  production: string;
  studyTour: string;
  sports: {
    matchCount: number;
    clusterLevel: number;
    districtLevel: number;
    provinceLevel: number;
  };
  arts: {
    perfCount: number;
    clusterLevel: number;
    districtLevel: number;
    provinceLevel: number;
  };
  inspection: {
    ministryCount: number;
    ministryClasses: number;
    provinceCount: number;
    provinceClasses: number;
    districtCount: number;
    districtClasses: number;
    clusterCount: number;
    clusterClasses: number;
  };
  community: {
    clusterName: string;
    description: string;
  };
}

export interface DirectionsSection {
  nextYearPlan: string;
}

export interface ConclusionSection {
  text: string;
}

export interface OfficerStaff {
  id: number;
  name: string;
  gender: string;
  framework: string;
  education: string;
  role: string;
  phone: string;
  other: string;
}

export interface TeacherStaff {
  id: number;
  name: string;
  gender: string;
  framework: string;
  education: string;
  className: string;
  studentsTotal: number;
  studentsFemale: number;
  shiftMorning: boolean;
  shiftAfternoon: boolean;
  phone: string;
  other: string;
}

export interface Tab3StaffSection {
  officers: OfficerStaff[];
  teachers: TeacherStaff[];
  kindergarten: TeacherStaff[];
  summaryNote: {
    totalStaff: number;
    femaleStaff: number;
    teachingStaff: number;
    teachingFemale: number;
    officerStaff: number;
    officerFemale: number;
  };
}

export interface SignaturesSection {
  approvedTitle: string;
  approvedRole: string;
  approvedName: string;
  place: string;
  reporterTitle: string;
  reporterName: string;
  lunarDate: string;
  solarDate: string;
}

/**
 * Complete End-of-Year Report Data organized strictly by section for Firestore
 */
export interface EndOfYearReport {
  id: string;
  metadata: {
    type: 'end_of_year_report';
    titleKhmer: string;
    academicYear: string;
    lastUpdated: string;
    savedAtMillis: number;
    version: number;
  };
  // Section I
  schoolInfo: SchoolHeaderInfo;
  section1_schools: SchoolQuantData;
  section1_studentComparison: StudentComparisonSection;
  section1_classLevels: ClassLevelsSection;
  section1_staffSummary: StaffSummarySection;
  section1_finance: FinanceSection;
  section1_library: LibrarySection;
  // Section II
  section2_results: ExamResultsSection;
  section2_percentages: PercentageSection;
  section2_curriculum: CurriculumSection;
  // Section III
  section3_extracurricular: ExtracurricularSection;
  // Section IV
  section4_directions: DirectionsSection;
  // Section V
  section5_conclusion: ConclusionSection;
  // Tab 2 Detailed Tables
  tab2_statistics: Record<string, any>;
  // Tab 3 Staff
  tab3_staff: Tab3StaffSection;
  // Signatures
  signatures: SignaturesSection;
  // Optional raw field map for any additional contenteditable elements
  _fieldMap?: Record<string, string>;
}
