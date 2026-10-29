import React from 'react';
import { X, Award, Download, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
    });
    alert('Certificate & Transcript Record downloaded as verified PDF (YEP-CERT-2025-AN01.pdf).');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="p-4 px-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Official Learning Record & Certificate</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Canvas / Card */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-50">
          <div className="w-full max-w-2xl bg-white border-8 border-double border-slate-300 p-8 sm:p-12 rounded-2xl shadow-lg relative text-center space-y-6">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-blue-800" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-blue-800" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-blue-800" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-blue-800" />

            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">YEP</span>
              <span className="text-xs font-semibold text-slate-600 border-l border-slate-300 pl-2 text-left leading-tight">
                Youth Empowerment<br />Project · East Africa
              </span>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                Certificate of Achievement & Virtual Exchange
              </p>
              <p className="text-xs text-slate-400 mt-0.5">This certifies that</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#11243B] mt-2 font-serif tracking-tight">
                {studentName}
              </h1>
              <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                has successfully completed Level 1 & Level 2 Virtual Exchange modules in Digital Literacy, AI Ethics, and Community Impact Projects for East Africa.
              </p>
            </div>

            {/* Badges / Metrics */}
            <div className="grid grid-cols-3 gap-3 py-2 border-t border-b border-slate-100 max-w-lg mx-auto text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Overall Score</span>
                <span className="text-slate-900 font-bold text-sm">68% Distinction</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Completed Lessons</span>
                <span className="text-slate-900 font-bold text-sm">24 Lessons</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Projects Contributed</span>
                <span className="text-slate-900 font-bold text-sm">2 Projects</span>
              </div>
            </div>

            {/* Signatures & Verification */}
            <div className="pt-4 flex items-end justify-between text-left text-xs max-w-lg mx-auto">
              <div>
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 w-32">
                  Daniel Kiiza
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-medium">Lead Mentor, YEP Uganda</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-500/80 flex items-center justify-center bg-amber-50 text-amber-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">CERT-YEP-849301</span>
              </div>

              <div className="text-right">
                <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 w-32 ml-auto">
                  Nadia Akello
                </div>
                <div className="text-[10px] text-slate-500 mt-1 font-medium">Program Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">Official verified digital credential</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Record PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
