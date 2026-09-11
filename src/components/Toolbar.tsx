import React from 'react';
import {
  Printer,
  FileSpreadsheet,
  FileCode,
  CloudUpload,
  RefreshCw,
  Upload,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

interface ToolbarProps {
  onPrint: () => void;
  onExportXlsx: () => void;
  onExportJson: () => void;
  onSaveFirestore: () => void;
  onLoadFirestore: () => void;
  onImportJson: (file: File) => void;
  onOpenSettings: () => void;
  isSaving: boolean;
  isLoading: boolean;
  docId: string;
  onChangeDocId: (id: string) => void;
  statusMessage: { text: string; type: 'ok' | 'err' | 'info' | '' };
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onPrint,
  onExportXlsx,
  onExportJson,
  onSaveFirestore,
  onLoadFirestore,
  onImportJson,
  onOpenSettings,
  isSaving,
  isLoading,
  docId,
  onChangeDocId,
  statusMessage,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImportJson(e.target.files[0]);
    }
  };

  return (
    <div className="toolbar no-print">
      <button type="button" className="btn-print" onClick={onPrint} title="បោះពុម្ពរបាយការណ៍">
        <Printer size={15} /> 🖨️ Print
      </button>

      <button type="button" className="btn-xlsx" onClick={onExportXlsx} title="ទាញយកជាឯកសារ Excel">
        <FileSpreadsheet size={15} /> 📊 XLSX
      </button>

      <button type="button" className="btn-json" onClick={onExportJson} title="ទាញយកជា JSON">
        <FileCode size={15} /> 📄 JSON
      </button>

      <button
        type="button"
        className="btn-firebase"
        onClick={onSaveFirestore}
        disabled={isSaving}
        title="រក្សាទុកទិន្នន័យទាំងអស់ក្នុង Cloud Firestore តាមផ្នែកនីមួយៗ"
      >
        {isSaving ? <Loader2 size={15} className="animate-spin" /> : <CloudUpload size={15} />}
        ☁️ រក្សាទុក Firestore
      </button>

      <button
        type="button"
        className="btn-load"
        onClick={onLoadFirestore}
        disabled={isLoading}
        title="ទាញយកទិន្នន័យពី Cloud Firestore មកបំពេញក្នុងតារាង"
      >
        {isLoading ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />}
        🔄 ទាញយក Firestore
      </button>

      <label className="btn-import cursor-pointer" title="នាំចូលទិន្នន័យពីឯកសារ JSON">
        <Upload size={15} /> 📥 នាំចូល JSON
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </label>

      {/* Doc selector */}
      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded border border-gray-300 text-xs">
        <span className="text-gray-500 font-medium">កូដឯកសារ:</span>
        <input
          type="text"
          value={docId}
          onChange={(e) => onChangeDocId(e.target.value)}
          className="outline-none font-semibold text-blue-800 bg-transparent w-32 px-1"
          placeholder="e.g. end_year_2026"
        />
      </div>

      <button
        type="button"
        onClick={onOpenSettings}
        className="bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200"
        title="ការកំណត់ និងមើលទិន្នន័យ Firestore"
      >
        <Database size={15} /> ⚙️ Firestore
      </button>

      {statusMessage.text && (
        <span id="fbStatus" className={statusMessage.type}>
          {statusMessage.type === 'ok' && <CheckCircle2 size={13} />}
          {statusMessage.type === 'err' && <AlertCircle size={13} />}
          {statusMessage.type === 'info' && <RefreshCw size={13} className="animate-spin" />}
          {statusMessage.text}
        </span>
      )}
    </div>
  );
};
