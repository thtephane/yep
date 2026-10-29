import React, { useState } from 'react';
import { FileText, Download, Bookmark, Upload, ExternalLink, MoreVertical, Plus, Check, Search, Share2, Globe, Code, Copy, CheckCheck, Terminal, FolderGit2 } from 'lucide-react';
import { ResourceItem, User } from '../../types';
import { JAVA_SOURCE_FILES, JavaFileItem } from '../../data/javaSourceFiles';

interface ResourcesViewProps {
  currentUser: User;
  resources: ResourceItem[];
  onToggleSave: (id: string) => void;
  onAddResource: (newRes: ResourceItem) => void;
  onTogglePublish?: (id: string) => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  currentUser,
  resources,
  onToggleSave,
  onAddResource,
  onTogglePublish,
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedJavaFile, setSelectedJavaFile] = useState<JavaFileItem>(JAVA_SOURCE_FILES[0]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'PDF' | 'DOCX' | 'PPT' | 'ZIP' | 'Link'>('PDF');
  const [newCategory, setNewCategory] = useState<'course_materials' | 'project_tools' | 'staff_resources' | 'student_library'>('course_materials');
  const [search, setSearch] = useState('');

  const getSubheading = () => {
    switch (currentUser.role) {
      case 'student':
        return 'Find course guides, project tools, materials, and complete Java OOP backend code.';
      case 'mentor':
        return 'Organize learning materials, rubrics, and Java backend architectures.';
      case 'admin':
        return 'Manage approved learning materials and backend platform source code.';
    }
  };

  const getTabs = () => {
    switch (currentUser.role) {
      case 'student':
        return [
          { id: 'all', label: 'All' },
          { id: 'course_materials', label: 'Course materials' },
          { id: 'project_tools', label: 'Project tools' },
          { id: 'saved', label: 'Saved' },
          { id: 'java_code', label: 'Java Files (.java)' },
        ];
      case 'mentor':
        return [
          { id: 'all', label: 'All' },
          { id: 'my_resources', label: 'My resources' },
          { id: 'shared_students', label: 'Shared with students' },
          { id: 'java_code', label: 'Java Files (.java)' },
        ];
      case 'admin':
        return [
          { id: 'all', label: 'All' },
          { id: 'staff_resources', label: 'Staff resources' },
          { id: 'student_library', label: 'Student library' },
          { id: 'java_code', label: 'Java Files (.java)' },
        ];
    }
  };

  const handleDownload = (res: ResourceItem) => {
    alert(`Downloading ${res.title} (${res.type} · ${res.fileSize}). Prepared for low-bandwidth access.`);
  };

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const res: ResourceItem = {
      id: `res_${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      fileSize: newType === 'Link' ? 'External Link' : '2.1 MB',
      authorOrSource: currentUser.name,
      dateAdded: 'Today',
      category: newCategory,
      saved: false,
      published: true,
    };
    onAddResource(res);
    setShowUploadModal(false);
    setNewTitle('');
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'saved') return res.saved;
    if (activeTab === 'course_materials') return res.category === 'course_materials';
    if (activeTab === 'project_tools') return res.category === 'project_tools';
    if (activeTab === 'staff_resources') return res.category === 'staff_resources';
    if (activeTab === 'student_library') return res.category === 'course_materials' || res.category === 'student_library';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Title & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-900 tracking-tight">Resources</h1>
          <p className="text-sm text-slate-500 mt-1">{getSubheading()}</p>
        </div>

        {currentUser.role !== 'student' && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14263D] hover:bg-[#0D1B2D] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Upload resource</span>
          </button>
        )}
      </div>

      {/* Tabs matching screenshot */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-medium">
        {getTabs().map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-xs sm:text-sm transition-colors relative cursor-pointer ${
              activeTab === tab.id
                ? 'text-blue-900 font-bold border-b-2 border-blue-900'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Java Source Files Browser */}
      {activeTab === 'java_code' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900">
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-5 h-5 text-blue-700 shrink-0" />
              <div>
                <span className="font-semibold">Java 17 OOP Package:</span> <code className="bg-white/80 px-2 py-0.5 rounded-md font-mono text-[11px] text-blue-800">org.yep.*</code> located in <code className="bg-white/80 px-2 py-0.5 rounded-md font-mono text-[11px] text-blue-800">/java/src/main/java/org/yep/</code>
              </div>
            </div>
            <div className="text-slate-600 text-[11px]">
              Encapsulation · Inheritance · Polymorphism · Abstraction · Interfaces
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-white border border-slate-200/90 rounded-3xl p-4 sm:p-6 shadow-xs">
            {/* File list navigation */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-4 lg:pb-0 lg:pr-4 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
                Project Files ({JAVA_SOURCE_FILES.length})
              </div>
              <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
                {JAVA_SOURCE_FILES.map((file) => {
                  const isSelected = selectedJavaFile.name === file.name;
                  return (
                    <button
                      key={file.name}
                      onClick={() => setSelectedJavaFile(file)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#14263D] text-white shadow-xs'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Code className={`w-4 h-4 shrink-0 ${isSelected ? 'text-blue-300' : 'text-slate-400'}`} />
                        <div className="min-w-0">
                          <div className="text-xs font-mono font-semibold truncate">{file.name}</div>
                          <div className={`text-[10px] truncate ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                            {file.packagePath}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {file.category.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Code viewer pane */}
            <div className="lg:col-span-8 flex flex-col min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold font-mono text-slate-900">{selectedJavaFile.name}</h3>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-sans">
                      {selectedJavaFile.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedJavaFile.description}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(selectedJavaFile.code);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedCode ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const blob = new Blob([selectedJavaFile.code], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = selectedJavaFile.name;
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14263D] hover:bg-[#0D1B2D] text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>

              {/* Code Box */}
              <div className="bg-slate-900 rounded-2xl p-4 overflow-x-auto max-h-[480px] font-mono text-xs leading-relaxed text-slate-200 border border-slate-800 shadow-inner">
                <pre>
                  <code>{selectedJavaFile.code}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Resource Rows List */
        <div className="space-y-3">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              {/* Left: Icon & Title info */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    res.type === 'PDF'
                      ? 'bg-blue-50 text-blue-700 border border-blue-100'
                      : res.type === 'DOCX'
                      ? 'bg-amber-50 text-amber-700 border border-amber-100'
                      : res.type === 'PPT'
                      ? 'bg-orange-50 text-orange-700 border border-orange-100'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-800">{res.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {res.type} · {res.fileSize} · {res.authorOrSource}
                  </div>
                </div>
              </div>

              {/* Right: Actions matching screenshot */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => handleDownload(res)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Download resource"
                >
                  <Download className="w-4 h-4" />
                </button>

                {currentUser.role === 'student' && (
                  <button
                    onClick={() => onToggleSave(res.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      res.saved
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {res.saved ? 'Saved ✓' : 'Save'}
                  </button>
                )}

                {currentUser.role === 'mentor' && (
                  <button
                    onClick={() => alert(`Resource link copied! Share with your cohort students.`)}
                    className="px-4 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Share
                  </button>
                )}

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => onTogglePublish && onTogglePublish(res.id)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      res.published
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {res.published ? 'Published' : 'Publish'}
                  </button>
                )}

                <button
                  onClick={() => alert('Options: Copy link, Report issue, View details.')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Upload New Learning Resource</h3>
            <p className="text-xs text-slate-500 mb-4">
              Add toolkit, slides, or guidelines for East African youth cohorts.
            </p>

            <form onSubmit={handleCreateResource} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. AI Prompt Engineering Handbook"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Format
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">Word / DOCX</option>
                    <option value="PPT">Presentation PPT</option>
                    <option value="ZIP">ZIP Archive</option>
                    <option value="Link">External Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="course_materials">Course materials</option>
                    <option value="project_tools">Project tools</option>
                    <option value="staff_resources">Staff resources</option>
                    <option value="student_library">Student library</option>
                  </select>
                </div>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-500">
                <Upload className="w-6 h-6 mx-auto text-slate-400 mb-1.5" />
                <span>Drag and drop file here or click to browse</span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-xs"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
