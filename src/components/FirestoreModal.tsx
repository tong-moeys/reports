import React, { useState } from 'react';
import { X, CheckCircle, Database, RefreshCw } from 'lucide-react';
import { DEFAULT_FIREBASE_CONFIG, getFirestoreDb } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { EndOfYearReport } from '../types';

interface FirestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: EndOfYearReport;
  currentDocId: string;
}

export const FirestoreModal: React.FC<FirestoreModalProps> = ({
  isOpen,
  onClose,
  currentData,
  currentDocId,
}) => {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  if (!isOpen) return null;

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const db = getFirestoreDb();
      const snap = await getDocs(collection(db, 'reports'));
      setTestResult(`✅ តភ្ជាប់ទៅ Firestore បានជោគជ័យ! រកឃើញ ${snap.size} ឯកសារក្នុង collection "reports"`);
    } catch (err: any) {
      setTestResult(`❌ កំហុសតភ្ជាប់: ${err.message}`);
    } finally {
      setTesting(false);
    }
  };

  const sectionsSummary = [
    { name: 'schoolInfo', title: 'ព័ត៌មានសាលា និងកម្រង', count: Object.keys(currentData.schoolInfo || {}).length },
    { name: 'section1_schools', title: 'I.១ សាលារៀន និងកម្រង', count: Object.keys(currentData.section1_schools || {}).length },
    { name: 'section1_studentComparison', title: 'I.២ ប្រៀបធៀបចំនួនសិស្ស', count: currentData.section1_studentComparison?.rows?.length || 0 },
    { name: 'section1_classLevels', title: 'I.៣ ចំនួនថ្នាក់តាមកម្រិត', count: currentData.section1_classLevels?.rows?.length || 0 },
    { name: 'section1_staffSummary', title: 'I.៤ អំពីមន្ត្រីអប់រំ', count: Object.keys(currentData.section1_staffSummary || {}).length },
    { name: 'section1_finance', title: 'I.៥ ហិរញ្ញប្បទាន', count: Object.keys(currentData.section1_finance || {}).length },
    { name: 'section1_library', title: 'I.៦ ការងារបណ្ណាល័យ', count: Object.keys(currentData.section1_library || {}).length },
    { name: 'section2_results', title: 'II.១ លទ្ធផលសិក្សាដំណាច់ឆ្នាំ', count: currentData.section2_results?.rows?.length || 0 },
    { name: 'section2_percentages', title: 'II.២ លទ្ធផលគិតជា %', count: currentData.section2_percentages?.rows?.length || 0 },
    { name: 'section2_curriculum', title: 'II.៣ ការអនុវត្តកម្មវិធីសិក្សា', count: currentData.section2_curriculum?.rows?.length || 0 },
    { name: 'section3_extracurricular', title: 'III. សកម្មភាពក្រៅសាលា', count: Object.keys(currentData.section3_extracurricular || {}).length },
    { name: 'section4_directions', title: 'IV. ទិសដៅសម្រាប់ឆ្នាំសិក្សាបន្ទាប់', count: 1 },
    { name: 'section5_conclusion', title: 'V. សន្និដ្ឋាន', count: 1 },
    { name: 'tab2_statistics', title: 'ស្ថិតិលម្អិត Tab 2', count: Object.keys(currentData.tab2_statistics || {}).length },
    { name: 'tab3_staff', title: 'បញ្ជីបុគ្គលិក Tab 3', count: (currentData.tab3_staff?.officers?.length || 0) + (currentData.tab3_staff?.teachers?.length || 0) },
    { name: 'signatures', title: 'ហត្ថលេខា និងកាលបរិច្ឆេទ', count: Object.keys(currentData.signatures || {}).length },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-blue-700 text-white">
          <div className="flex items-center gap-2">
            <Database size={18} />
            <h3 className="font-bold text-white text-base">ការកំណត់ Firestore និងរចនាសម្ព័ន្ធទិន្នន័យ</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-gray-800">
          <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs leading-relaxed">
            <p className="font-semibold text-blue-900">
              🔥 គម្រោង Firestore ដែលបានភ្ជាប់: <span className="font-mono">{DEFAULT_FIREBASE_CONFIG.projectId}</span>
            </p>
            <p className="text-blue-800 mt-1">
              ទិន្នន័យត្រូវបានរក្សាទុកក្នុង Collection <span className="font-mono font-bold">reports/{currentDocId}</span> ដោយបែងចែកដាច់ដោយឡែកទៅតាមផ្នែកនីមួយៗ (Categorized by Sections) ដូចខាងក្រោម៖
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-700 mb-2">រចនាសម្ព័ន្ធផ្នែកដែលរក្សាទុកក្នុង Firestore:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {sectionsSummary.map((sec, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-600 shrink-0" />
                    <div>
                      <div className="font-medium text-gray-900">{sec.title}</div>
                      <div className="font-mono text-[10px] text-gray-500">{sec.name}</div>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                    {sec.count} ធាតុ
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={testConnection}
              disabled={testing}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-xs transition"
            >
              {testing ? <RefreshCw size={14} className="animate-spin" /> : <Database size={14} />}
              សាកល្បងតភ្ជាប់ Firestore
            </button>
            {testResult && (
              <p className="mt-2 text-xs font-semibold p-2 rounded bg-gray-100 border border-gray-300">
                {testResult}
              </p>
            )}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded text-xs"
          >
            បិទ
          </button>
        </div>
      </div>
    </div>
  );
};
