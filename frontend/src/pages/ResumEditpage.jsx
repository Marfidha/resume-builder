import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,Save,CheckCircle2,Sparkles,MousePointer2, Plus, Trash2, Loader2, User, Briefcase, GraduationCap,
  Cpu,Award,Trophy,FolderGit2,Mail,Phone,MapPin,Camera,Edit3,ChevronDown,ChevronUp,Globe,Linkedin
} from 'lucide-react';
import axios from 'axios';
import {  useAuth } from "@clerk/react";
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config/api.js";

const ResumeEditpage = () => {
  const navigate = useNavigate();
    const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('Personal Info');
  const API_URL = `${API_BASE_URL}/api`;

  const [formData, setFormData] = useState({
    personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' },
    summary: { text: '' },
    education: { degree: '', institution: '', location: '', graduationDate: '', gpa: '' },
    experience: { isNotApplicable: false, entries: [] },
    skills: { isNotApplicable: false, skillsList: [] },
    certifications: { isNotApplicable: false, entries: [] },
    achievements: { isNotApplicable: false, entries: [] },
    projects: { isNotApplicable: false, entries: [] }
  });

  const [tempSkill, setTempSkill] = useState('');

  useEffect(() => {
   const fetchResume = async () => {
  try {

    const token = await getToken();

    if (!token) {
      navigate('/login');
      return;
    }

    const res = await axios.get(
      `${API_URL}/resumes/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      setFormData({
        personalInfo: res.data.personalInfo || formData.personalInfo,
        summary: res.data.summary || formData.summary,
        education: res.data.education || formData.education,
        experience: res.data.experience || formData.experience,
        skills: res.data.skills || formData.skills,
        certifications: res.data.certifications || formData.certifications,
        achievements: res.data.achievements || formData.achievements,
        projects: res.data.projects || formData.projects
      });
    }

  } catch (err) {

    if (err.response?.status === 404) {
      navigate('/type/new');
    } else {
      setError('Failed to fetch resume');
    }

  } finally {
    setLoading(false);
  }
};
    fetchResume();
  }, [navigate]);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => {
      const updatedEntries = [...prev.experience.entries];
      updatedEntries[index] = { ...updatedEntries[index], [field]: value };
      return { ...prev, experience: { ...prev.experience, entries: updatedEntries } };
    });
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        entries: [...prev.experience.entries, { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
      }
    }));
  };

  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        entries: prev.experience.entries.filter((_, i) => i !== index)
      }
    }));
  };

  const handleEntryChange = (section, index, field, value) => {
    setFormData(prev => {
      const updatedEntries = [...prev[section].entries];
      updatedEntries[index] = { ...updatedEntries[index], [field]: value };
      return { ...prev, [section]: { ...prev[section], entries: updatedEntries } };
    });
  };

  const handleAddEntry = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        entries: [...prev[section].entries, { title: '', issuer: '', date: '', description: '' }]
      }
    }));
  };

  const handleRemoveEntry = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        entries: prev[section].entries.filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && tempSkill.trim()) {
      e.preventDefault();
      if (formData.skills.skillsList.includes(tempSkill.trim())) return;
      setFormData(prev => ({
        ...prev,
        skills: { ...prev.skills, skillsList: [...prev.skills.skillsList, tempSkill.trim()] }
      }));
      setTempSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: { ...prev.skills, skillsList: prev.skills.skillsList.filter(s => s !== skillToRemove) }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken();
      await axios.post(
        `${API_URL}/resumes`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Resume saved successfully!');
    } catch (err) {
      setError('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionName) => {
    setActiveSection(activeSection === sectionName ? null : sectionName);
  };

  const sections = [
    { id: 'Summary', name: 'PROFILE', icon: User },
    { id: 'Experience', name: 'Professional Experience', icon: Briefcase },
    { id: 'Education', name: 'Education', icon: GraduationCap },
    { id: 'Skills', name: 'Skills', icon: Cpu },
    { id: 'Certifications', name: 'Certifications', icon: Award },
    { id: 'Achievements', name: 'Achievements', icon: Trophy },
    { id: 'Projects', name: 'Projects', icon: FolderGit2 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-16">
      
      {/* Top Action Bar */}
      <div className="w-full px-4 md:px-16 pt-24 pb-4">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
            <ChevronLeft size={18} />
            Back
          </button>
          <div className="flex items-center gap-3">
            {error && <span className="text-red-500 text-sm font-medium mr-2">{error}</span>}
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] text-sm font-bold transition-colors shadow-sm disabled:opacity-50">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save & Continue
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Layout */}
      <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Combined Editor Column */}
        <div className="lg:col-span-5 w-full space-y-4 max-h-[85vh] overflow-y-auto pr-2">
          {/* 1. Personal Info Card (Top Card in Image) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden transition-all">
            <div className="p-6">       
              {/* Pink floating edit button */}
              <button 
                onClick={() => toggleSection('Personal Info')}
                className="absolute top-4 right-4 bg-[#ec4899] text-white p-2.5 rounded-xl hover:bg-[#db2777] transition-all shadow-md focus:outline-none hover:scale-105"
                title="Edit Personal Information"
              >
                <Edit3 size={16} />
              </button>

              <div className="flex gap-4 justify-between items-start pr-12">
                <div className="space-y-3">
                  <h1 className="text-2xl font-extrabold text-[#064e3b] tracking-tight break-words max-w-[280px]">
                    {formData.personalInfo.fullName || 'YOUR NAME'}
                  </h1>
                  
                  {/* Headline fallback based on skills or summary */}
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed uppercase tracking-wider">
                    {formData.skills.skillsList.length > 0 
                      ? formData.skills.skillsList.slice(0, 5).join(' | ') 
                      : 'Full Stack Developer | React.js | Node.js'}
                  </p>

                  {/* Contact Info Grid */}
                  <div className="space-y-2 pt-2 text-slate-600 text-sm">
                    {formData.personalInfo.email && (
                      <div className="flex items-center gap-2.5">
                        <Mail size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[240px]">{formData.personalInfo.email}</span>
                      </div>
                    )}
                    {formData.personalInfo.phone && (
                      <div className="flex items-center gap-2.5">
                        <Phone size={15} className="text-slate-400 shrink-0" />
                        <span>{formData.personalInfo.phone}</span>
                      </div>
                    )}
                    {formData.personalInfo.location && (
                      <div className="flex items-center gap-2.5">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span>{formData.personalInfo.location}</span>
                      </div>
                    )}
                  </div>
                </div>

              
              </div>
            </div>

            {/* Inline expandable Personal Info editor form */}
            {activeSection === 'Personal Info' && (
              <div className="border-t border-slate-100 p-6 bg-[#fafafa] space-y-4 animate-in slide-in-from-top-4 duration-200">
                <h3 className="text-sm font-bold text-[#064e3b] mb-2">Edit Contact details</h3>
                <div className="grid grid-cols-1 gap-4">
                  <InputField label="Full Name" value={formData.personalInfo.fullName} onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)} />
                  <InputField label="Email" value={formData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
                  <InputField label="Phone" value={formData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
                  <InputField label="Location" value={formData.personalInfo.location} onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)} />
                  <InputField label="LinkedIn" value={formData.personalInfo.linkedin} onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)} />
                  <InputField label="Website" value={formData.personalInfo.website} onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)} />
                </div>
              </div>
            )}
          </div>

          {/* 2. Interactive Section Accordions */}
          {sections.map((sec) => {
            const IconComponent = sec.icon;
            const isOpen = activeSection === sec.id;
            
            return (
              <div key={sec.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all">
                
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleSection(sec.id)}
                  className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#f0fdf4] p-2.5 rounded-xl border border-emerald-50 text-[#064e3b]">
                      <IconComponent size={18} />
                    </div>
                    <span className="font-extrabold text-sm tracking-wide text-slate-800 uppercase">
                      {sec.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#065f46]" />
                    {isOpen ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </div>
                </div>

                {/* Accordion Content Block */}
                {isOpen && (
                  <div className="p-6 pt-2 border-t border-slate-100 bg-[#fafafa] animate-in slide-in-from-top-4 duration-200">
                    
                    {/* Render specific sections inside accordion */}
                    {sec.id === 'Summary' && (
                      <div className="space-y-4">
                        <TextAreaField label="Profile Summary" rows={8} value={formData.summary.text} onChange={(e) => handleInputChange('summary', 'text', e.target.value)} />
                      </div>
                    )}

                    {sec.id === 'Experience' && (
                      <div className="space-y-4">
                        <ToggleButton
                          label="I'm a fresher (No work experience)"
                          active={formData.experience.isNotApplicable}
                          onClick={() => setFormData(prev => ({ ...prev, experience: { ...prev.experience, isNotApplicable: !prev.experience.isNotApplicable } }))}
                        />
                        {!formData.experience.isNotApplicable && (
                          <div className="space-y-6">
                            {formData.experience.entries.map((entry, index) => (
                              <div key={index} className="p-4 bg-white border border-emerald-100 rounded-xl space-y-4 relative">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-[#064e3b] text-sm">Experience {index + 1}</span>
                                  <button onClick={() => handleRemoveExperience(index)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={16} /></button>
                                </div>
                                <InputField label="Job Title" value={entry.jobTitle} onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)} />
                                <InputField label="Company" value={entry.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
                                <InputField label="Location" value={entry.location} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} />
                                <div className="grid grid-cols-2 gap-4">
                                  <InputField label="Start Date" value={entry.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} />
                                  <InputField label="End Date" value={entry.endDate} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} />
                                </div>
                                <TextAreaField label="Description" value={entry.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} />
                              </div>
                            ))}
                            <button onClick={handleAddExperience} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Experience</button>
                          </div>
                        )}
                      </div>
                    )}

                    {sec.id === 'Education' && (
                      <div className="grid grid-cols-1 gap-4">
                        <InputField label="Degree" value={formData.education.degree} onChange={(e) => handleInputChange('education', 'degree', e.target.value)} />
                        <InputField label="Institution" value={formData.education.institution} onChange={(e) => handleInputChange('education', 'location', e.target.value)} />
                        <InputField label="Institution" value={formData.education.institution} onChange={(e) => handleInputChange('education', 'institution', e.target.value)}/>
                        <InputField label="Graduation Date" value={formData.education.graduationDate} onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value)} />
                        <InputField label="GPA" value={formData.education.gpa} onChange={(e) => handleInputChange('education', 'gpa', e.target.value)} />
                      </div>
                    )}

                    {sec.id === 'Skills' && (
                      <div className="space-y-4">
                        <ToggleButton
                          label="Not Applicable"
                          active={formData.skills.isNotApplicable}
                          onClick={() => setFormData(prev => ({ ...prev, skills: { ...prev.skills, isNotApplicable: !prev.skills.isNotApplicable } }))}
                        />
                        {!formData.skills.isNotApplicable && (
                          <div className="space-y-4">
                            <InputField
                              label="Add Skill (Type & Enter)"
                              value={tempSkill}
                              onChange={(e) => setTempSkill(e.target.value)}
                              onKeyDown={handleAddSkill}
                            />
                            <div className="flex flex-wrap gap-2">
                              {formData.skills.skillsList.map(skill => (
                                <span key={skill} className="bg-emerald-50 text-[#064e3b] px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-100 flex items-center gap-2">
                                  {skill}
                                  <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" onClick={() => handleRemoveSkill(skill)} />
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {sec.id === 'Certifications' && (
                      <div className="space-y-4">
                        <ToggleButton
                          label="Not Applicable"
                          active={formData.certifications.isNotApplicable}
                          onClick={() => setFormData(prev => ({ ...prev, certifications: { ...prev.certifications, isNotApplicable: !prev.certifications.isNotApplicable } }))}
                        />
                        {!formData.certifications.isNotApplicable && (
                          <div className="space-y-6">
                            {formData.certifications.entries.map((entry, index) => (
                              <div key={index} className="p-4 bg-white border border-emerald-100 rounded-xl space-y-4">
                                <div className="flex justify-end"><button onClick={() => handleRemoveEntry('certifications', index)} className="text-red-500"><Trash2 size={16} /></button></div>
                                <InputField label="Name" value={entry.title} onChange={(e) => handleEntryChange('certifications', index, 'title', e.target.value)} />
                                <InputField label="Issuer" value={entry.issuer} onChange={(e) => handleEntryChange('certifications', index, 'issuer', e.target.value)} />
                                <InputField label="Date" value={entry.date} onChange={(e) => handleEntryChange('certifications', index, 'date', e.target.value)} />
                              </div>
                            ))}
                            <button onClick={() => handleAddEntry('certifications')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Certification</button>
                          </div>
                        )}
                      </div>
                    )}

                    {sec.id === 'Achievements' && (
                      <div className="space-y-4">
                        <ToggleButton
                          label="Not Applicable"
                          active={formData.achievements.isNotApplicable}
                          onClick={() => setFormData(prev => ({ ...prev, achievements: { ...prev.achievements, isNotApplicable: !prev.achievements.isNotApplicable } }))}
                        />
                        {!formData.achievements.isNotApplicable && (
                          <div className="space-y-6">
                            {formData.achievements.entries.map((entry, index) => (
                              <div key={index} className="p-4 bg-white border border-emerald-100 rounded-xl space-y-4">
                                <div className="flex justify-end"><button onClick={() => handleRemoveEntry('achievements', index)} className="text-red-500"><Trash2 size={16} /></button></div>
                                <InputField label="Title" value={entry.title} onChange={(e) => handleEntryChange('achievements', index, 'title', e.target.value)} />
                                <TextAreaField label="Description" value={entry.description} onChange={(e) => handleEntryChange('achievements', index, 'description', e.target.value)} />
                              </div>
                            ))}
                            <button onClick={() => handleAddEntry('achievements')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Achievement</button>
                          </div>
                        )}
                      </div>
                    )}

                    {sec.id === 'Projects' && (
                      <div className="space-y-4">
                        <ToggleButton
                          label="Not Applicable"
                          active={formData.projects.isNotApplicable}
                          onClick={() => setFormData(prev => ({ ...prev, projects: { ...prev.projects, isNotApplicable: !prev.projects.isNotApplicable } }))}
                        />
                        {!formData.projects.isNotApplicable && (
                          <div className="space-y-6">
                            {formData.projects.entries.map((entry, index) => (
                              <div key={index} className="p-4 bg-white border border-emerald-100 rounded-xl space-y-4">
                                <div className="flex justify-end"><button onClick={() => handleRemoveEntry('projects', index)} className="text-red-500"><Trash2 size={16} /></button></div>
                                <InputField label="Project Name" value={entry.title} onChange={(e) => handleEntryChange('projects', index, 'title', e.target.value)} />
                                <TextAreaField label="Description" value={entry.description} onChange={(e) => handleEntryChange('projects', index, 'description', e.target.value)} />
                                <InputField label="Technologies" value={entry.issuer} onChange={(e) => handleEntryChange('projects', index, 'issuer', e.target.value)} />
                              </div>
                            ))}
                            <button onClick={() => handleAddEntry('projects')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Project</button>
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Tips Box */}
          <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl">
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} /> Quick Tips
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex gap-2 items-start">
                <span className="text-emerald-500">•</span>
                Click the pink edit badge on your Personal Info card to change contact details.
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-emerald-500">•</span>
                Click on any section card below to toggle edit fields instantly.
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: Premium Live Preview */}
        <div className="lg:col-span-7 w-full sticky top-28">
          <div className="w-full bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 p-8 md:p-12 h-[82vh] overflow-y-auto">
            
            {/* Resume Live Title / Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {formData.personalInfo.fullName || 'YOUR NAME'}
              </h1>
              <p className="text-sm text-slate-700 font-semibold uppercase tracking-wider mb-4">
                {formData.skills.skillsList.length > 0 
                  ? formData.skills.skillsList.slice(0, 5).join(' | ') 
                  : 'Full Stack Developer | React.js | Node.js'}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-slate-500 text-xs font-medium">
                {formData.personalInfo.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={12} /> {formData.personalInfo.email}
                  </span>
                )}
                {formData.personalInfo.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {formData.personalInfo.phone}
                  </span>
                )}
                {formData.personalInfo.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {formData.personalInfo.location}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-slate-500 text-xs">
                {formData.personalInfo.linkedin && (
                  <a 
                   href={formData.personalInfo.linkedin}
                   className="flex items-center gap-1 hover:underline">
                    <Linkedin size={12} /> {formData.personalInfo.linkedin}
                  </a>
                )}
                {formData.personalInfo.website && (
                  <a
                    href={formData.personalInfo.website}
                   className="flex items-center gap-1 hover:underline">
                    <Globe size={12} /> {formData.personalInfo.website}
                  </a>
                )}
              </div>
            </div>

            <hr className="border-slate-800 border-[1.5px] mb-6" />

            {/* Profile / Professional Summary */}
            {formData.summary.text && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  PROFILE
                </h2>
                <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                  {formData.summary.text}
                </p>
              </section>
            )}

            {/* Professional Experience */}
            {!formData.experience.isNotApplicable && formData.experience.entries.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                  Professional Experience
                </h2>
                {formData.experience.entries.map((entry, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="font-extrabold text-sm text-slate-800">{entry.jobTitle || 'Job Title'}</h3>
                      <span className="text-slate-500 text-[11px] font-semibold">{entry.startDate} {entry.startDate && entry.endDate && '-'} {entry.endDate}</span>
                    </div>
                    <div className="text-slate-600 font-medium text-xs mb-1.5">{entry.company || 'Company'} {entry.company && entry.location && '•'} {entry.location}</div>
                    <p className="text-slate-600 text-[13px] whitespace-pre-wrap pl-3.5 border-l-2 border-emerald-100">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Education */}
            {(formData.education.degree || formData.education.institution) && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                  Education
                </h2>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-extrabold text-sm text-slate-800">{formData.education.degree || 'Degree'}</h3>
                  <span className="text-slate-500 text-[11px] font-semibold">{formData.education.graduationDate}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <div className="text-slate-600 font-medium text-xs">{formData.education.institution || 'Institution'} {formData.education.institution && formData.education.location && `•`} {formData.education.location}</div>
                  {formData.education.gpa && <span className="text-slate-500 text-[11px] italic">GPA: {formData.education.gpa}</span>}
                </div>
              </section>
            )}

            {/* Skills */}
            {!formData.skills.isNotApplicable && formData.skills.skillsList.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Skills
                </h2>
                <p className="text-slate-700 text-sm leading-relaxed">
                  {formData.skills.skillsList.join(' • ')}
                </p>
              </section>
            )}

            {/* Certifications */}
            {!formData.certifications.isNotApplicable && formData.certifications.entries.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                  Certifications
                </h2>
                {formData.certifications.entries.map((entry, idx) => (
                  <div key={idx} className="flex justify-between items-baseline mb-2 last:mb-0">
                    <div>
                      <h3 className="font-bold text-xs text-slate-800">{entry.title || 'Certification Name'}</h3>
                      {entry.issuer && <p className="text-slate-500 text-[11px] italic">{entry.issuer}</p>}
                    </div>
                    {entry.date && <span className="text-slate-500 text-[11px] font-semibold">{entry.date}</span>}
                  </div>
                ))}
              </section>
            )}

            {/* Achievements */}
            {!formData.achievements.isNotApplicable && formData.achievements.entries.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2">
                  Achievements
                </h2>
                <ul className="list-disc pl-4 space-y-1.5 text-slate-700 text-[13px]">
                  {formData.achievements.entries.map((entry, idx) => (
                    <li key={idx}>
                      {entry.title && <strong className="text-slate-800">{entry.title}: </strong>}
                      {entry.description}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Projects */}
            {!formData.projects.isNotApplicable && formData.projects.entries.length > 0 && (
              <section className="mb-6">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                  Projects
                </h2>
                {formData.projects.entries.map((entry, idx) => (
                  <div key={idx} className="mb-3 last:mb-0">
                    <h3 className="font-bold text-xs text-slate-800">{entry.title || 'Project Name'}</h3>
                    <p className="text-slate-600 text-[13px] leading-relaxed mt-1 whitespace-pre-wrap">
                      {entry.description}
                    </p>
                    {entry.issuer && (
                      <div className="mt-1 text-[11px]">
                        <span className="font-bold text-slate-700">Technologies: </span>
                        <span className="text-slate-600">{entry.issuer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}

          </div>
        </div>

      </main>
    </div>
  );
};

// Reusable Sub-components
const ToggleButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 rounded-xl border transition-all ${active
      ? 'bg-[#ebfef5] border-emerald-200 text-[#064e3b]'
      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
      }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${active ? 'bg-[#064e3b] border-[#064e3b]' : 'border-slate-300 bg-white'}`}>
        {active && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className="font-bold text-[13px]">{label}</span>
    </div>
  </button>
);

const InputField = ({ label, placeholder, value, onChange, type = "text", onKeyDown }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white hover:bg-slate-50 placeholder:text-slate-400 font-medium text-sm"
    />
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange, rows = 4 }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white hover:bg-slate-50 placeholder:text-slate-400 resize-none font-medium text-sm leading-relaxed"
    />
  </div>
);

export default ResumeEditpage;




// import React, { useState, useEffect } from 'react';
// import {
//   ChevronLeft,
//   Save,
//   GripVertical,
//   CheckCircle2,
//   Sparkles,
//   MousePointer2,
//   Plus,
//   Trash2,
//   Loader2
// } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import API_BASE_URL from "../config/api.js";

// const API_URL = `${API_BASE_URL}/api`;

// const ResumeEditpage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [activeSection, setActiveSection] = useState('Personal Info');

//   const [formData, setFormData] = useState({
//     personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', website: '' },
//     summary: { text: '' },
//     education: { degree: '', institution: '', location: '', graduationDate: '', gpa: '' },
//     experience: { isNotApplicable: false, entries: [] },
//     skills: { isNotApplicable: false, skillsList: [] },
//     certifications: { isNotApplicable: false, entries: [] },
//     achievements: { isNotApplicable: false, entries: [] },
//     projects: { isNotApplicable: false, entries: [] }
//   });

//   const [tempSkill, setTempSkill] = useState('');

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }
//         const res = await axios.get(`${API_URL}/resumes/me`);
//         if (res.data) {
//           setFormData({
//             personalInfo: res.data.personalInfo || formData.personalInfo,
//             summary: res.data.summary || formData.summary,
//             education: res.data.education || formData.education,
//             experience: res.data.experience || formData.experience,
//             skills: res.data.skills || formData.skills,
//             certifications: res.data.certifications || formData.certifications,
//             achievements: res.data.achievements || formData.achievements,
//             projects: res.data.projects || formData.projects
//           });
//         }
//       } catch (err) {
//         if (err.response?.status === 404) {
//           navigate('/type/new');
//         } else {
//           setError('Failed to fetch resume');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResume();
//   }, [navigate]);

//   const handleInputChange = (section, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: { ...prev[section], [field]: value }
//     }));
//   };

//   const handleExperienceChange = (index, field, value) => {
//     setFormData(prev => {
//       const updatedEntries = [...prev.experience.entries];
//       updatedEntries[index] = { ...updatedEntries[index], [field]: value };
//       return { ...prev, experience: { ...prev.experience, entries: updatedEntries } };
//     });
//   };

//   const handleAddExperience = () => {
//     setFormData(prev => ({
//       ...prev,
//       experience: {
//         ...prev.experience,
//         entries: [...prev.experience.entries, { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }]
//       }
//     }));
//   };

//   const handleRemoveExperience = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       experience: {
//         ...prev.experience,
//         entries: prev.experience.entries.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const handleEntryChange = (section, index, field, value) => {
//     setFormData(prev => {
//       const updatedEntries = [...prev[section].entries];
//       updatedEntries[index] = { ...updatedEntries[index], [field]: value };
//       return { ...prev, [section]: { ...prev[section], entries: updatedEntries } };
//     });
//   };

//   const handleAddEntry = (section) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         entries: [...prev[section].entries, { title: '', issuer: '', date: '', description: '' }]
//       }
//     }));
//   };

//   const handleRemoveEntry = (section, index) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         entries: prev[section].entries.filter((_, i) => i !== index)
//       }
//     }));
//   };

//   const handleAddSkill = (e) => {
//     if (e.key === 'Enter' && tempSkill.trim()) {
//       e.preventDefault();
//       if (formData.skills.skillsList.includes(tempSkill.trim())) return;
//       setFormData(prev => ({
//         ...prev,
//         skills: { ...prev.skills, skillsList: [...prev.skills.skillsList, tempSkill.trim()] }
//       }));
//       setTempSkill('');
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setFormData(prev => ({
//       ...prev,
//       skills: { ...prev.skills, skillsList: prev.skills.skillsList.filter(s => s !== skillToRemove) }
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await axios.post(`${API_URL}/resumes`, formData);
//       alert('Resume saved successfully!');
//     } catch (err) {
//       setError('Failed to save resume');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const sections = [
//     { name: 'Personal Info', completed: true },
//     { name: 'Summary', completed: true },
//     { name: 'Experience', completed: true },
//     { name: 'Education', completed: true },
//     { name: 'Skills', completed: true },
//     { name: 'Certifications', completed: true },
//     { name: 'Achievements', completed: true },
//     { name: 'Projects', completed: true },
//   ];

//   const renderForm = () => {
//     switch (activeSection) {
//       case 'Personal Info':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Personal Information</h2>
//             <div className="grid grid-cols-1 gap-4">
//               <InputField label="Full Name" value={formData.personalInfo.fullName} onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)} />
//               <InputField label="Email" value={formData.personalInfo.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} />
//               <InputField label="Phone" value={formData.personalInfo.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} />
//               <InputField label="Location" value={formData.personalInfo.location} onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)} />
//               <InputField label="LinkedIn" value={formData.personalInfo.linkedin} onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)} />
//               <InputField label="Website" value={formData.personalInfo.website} onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)} />
//             </div>
//           </div>
//         );
//       case 'Summary':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Professional Summary</h2>
//             <TextAreaField label="Summary" rows={8} value={formData.summary.text} onChange={(e) => handleInputChange('summary', 'text', e.target.value)} />
//           </div>
//         );
//       case 'Education':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Education</h2>
//             <div className="grid grid-cols-1 gap-4">
//               <InputField label="Degree" value={formData.education.degree} onChange={(e) => handleInputChange('education', 'degree', e.target.value)} />
//               <InputField label="Institution" value={formData.education.institution} onChange={(e) => handleInputChange('education', 'institution', e.target.value)} />
//               <InputField label="Location" value={formData.education.location} onChange={(e) => handleInputChange('education', 'location', e.target.value)} />
//               <InputField label="Graduation Date" value={formData.education.graduationDate} onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value)} />
//               <InputField label="GPA" value={formData.education.gpa} onChange={(e) => handleInputChange('education', 'gpa', e.target.value)} />
//             </div>
//           </div>
//         );
//       case 'Experience':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Work Experience</h2>
//             <ToggleButton
//               label="I'm a fresher (No work experience)"
//               active={formData.experience.isNotApplicable}
//               onClick={() => setFormData(prev => ({ ...prev, experience: { ...prev.experience, isNotApplicable: !prev.experience.isNotApplicable } }))}
//             />
//             {!formData.experience.isNotApplicable && (
//               <div className="space-y-6">
//                 {formData.experience.entries.map((entry, index) => (
//                   <div key={index} className="p-4 border border-emerald-100 rounded-xl space-y-4">
//                     <div className="flex justify-between items-center">
//                       <span className="font-bold text-[#064e3b] text-sm">Experience {index + 1}</span>
//                       <button onClick={() => handleRemoveExperience(index)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
//                     </div>
//                     <InputField label="Job Title" value={entry.jobTitle} onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)} />
//                     <InputField label="Company" value={entry.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} />
//                     <InputField label="Location" value={entry.location} onChange={(e) => handleExperienceChange(index, 'location', e.target.value)} />
//                     <div className="grid grid-cols-2 gap-4">
//                       <InputField label="Start Date" value={entry.startDate} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} />
//                       <InputField label="End Date" value={entry.endDate} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} />
//                     </div>
//                     <TextAreaField label="Description" value={entry.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} />
//                   </div>
//                 ))}
//                 <button onClick={handleAddExperience} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Experience</button>
//               </div>
//             )}
//           </div>
//         );
//       case 'Skills':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Skills</h2>
//             <ToggleButton
//               label="Not Applicable"
//               active={formData.skills.isNotApplicable}
//               onClick={() => setFormData(prev => ({ ...prev, skills: { ...prev.skills, isNotApplicable: !prev.skills.isNotApplicable } }))}
//             />
//             {!formData.skills.isNotApplicable && (
//               <div className="space-y-4">
//                 <InputField
//                   label="Add Skill (Type & Enter)"
//                   value={tempSkill}
//                   onChange={(e) => setTempSkill(e.target.value)}
//                   onKeyDown={handleAddSkill}
//                 />
//                 <div className="flex flex-wrap gap-2">
//                   {formData.skills.skillsList.map(skill => (
//                     <span key={skill} className="bg-emerald-50 text-[#064e3b] px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-100 flex items-center gap-2">
//                       {skill}
//                       <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-red-500" onClick={() => handleRemoveSkill(skill)} />
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       case 'Certifications':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Certifications</h2>
//             <ToggleButton
//               label="Not Applicable"
//               active={formData.certifications.isNotApplicable}
//               onClick={() => setFormData(prev => ({ ...prev, certifications: { ...prev.certifications, isNotApplicable: !prev.certifications.isNotApplicable } }))}
//             />
//             {!formData.certifications.isNotApplicable && (
//               <div className="space-y-6">
//                 {formData.certifications.entries.map((entry, index) => (
//                   <div key={index} className="p-4 border border-emerald-100 rounded-xl space-y-4">
//                     <div className="flex justify-end"><button onClick={() => handleRemoveEntry('certifications', index)} className="text-red-500"><Trash2 size={16} /></button></div>
//                     <InputField label="Name" value={entry.title} onChange={(e) => handleEntryChange('certifications', index, 'title', e.target.value)} />
//                     <InputField label="Issuer" value={entry.issuer} onChange={(e) => handleEntryChange('certifications', index, 'issuer', e.target.value)} />
//                     <InputField label="Date" value={entry.date} onChange={(e) => handleEntryChange('certifications', index, 'date', e.target.value)} />
//                   </div>
//                 ))}
//                 <button onClick={() => handleAddEntry('certifications')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Certification</button>
//               </div>
//             )}
//           </div>
//         );
//       case 'Achievements':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Achievements</h2>
//             <ToggleButton
//               label="Not Applicable"
//               active={formData.achievements.isNotApplicable}
//               onClick={() => setFormData(prev => ({ ...prev, achievements: { ...prev.achievements, isNotApplicable: !prev.achievements.isNotApplicable } }))}
//             />
//             {!formData.achievements.isNotApplicable && (
//               <div className="space-y-6">
//                 {formData.achievements.entries.map((entry, index) => (
//                   <div key={index} className="p-4 border border-emerald-100 rounded-xl space-y-4">
//                     <div className="flex justify-end"><button onClick={() => handleRemoveEntry('achievements', index)} className="text-red-500"><Trash2 size={16} /></button></div>
//                     <InputField label="Title" value={entry.title} onChange={(e) => handleEntryChange('achievements', index, 'title', e.target.value)} />
//                     <TextAreaField label="Description" value={entry.description} onChange={(e) => handleEntryChange('achievements', index, 'description', e.target.value)} />
//                   </div>
//                 ))}
//                 <button onClick={() => handleAddEntry('achievements')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Achievement</button>
//               </div>
//             )}
//           </div>
//         );
//       case 'Projects':
//         return (
//           <div className="space-y-6 animate-in fade-in duration-300">
//             <h2 className="text-xl font-bold text-[#064e3b]">Projects</h2>
//             <ToggleButton
//               label="Not Applicable"
//               active={formData.projects.isNotApplicable}
//               onClick={() => setFormData(prev => ({ ...prev, projects: { ...prev.projects, isNotApplicable: !prev.projects.isNotApplicable } }))}
//             />
//             {!formData.projects.isNotApplicable && (
//               <div className="space-y-6">
//                 {formData.projects.entries.map((entry, index) => (
//                   <div key={index} className="p-4 border border-emerald-100 rounded-xl space-y-4">
//                     <div className="flex justify-end"><button onClick={() => handleRemoveEntry('projects', index)} className="text-red-500"><Trash2 size={16} /></button></div>
//                     <InputField label="Project Name" value={entry.title} onChange={(e) => handleEntryChange('projects', index, 'title', e.target.value)} />
//                     <TextAreaField label="Description" value={entry.description} onChange={(e) => handleEntryChange('projects', index, 'description', e.target.value)} />
//                     <InputField label="Technologies" value={entry.issuer} onChange={(e) => handleEntryChange('projects', index, 'issuer', e.target.value)} />
//                   </div>
//                 ))}
//                 <button onClick={() => handleAddEntry('projects')} className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline text-sm"><Plus size={16} /> Add Project</button>
//               </div>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
//         <Loader2 className="animate-spin text-emerald-600" size={48} />
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 ">

//         {/* Action Bar */}
//         <div className="w-full px-8 md:px-16 pt-28 pb-4">
//           <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
//             <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
//               <ChevronLeft size={18} />
//               Back
//             </button>
//             <div className="flex items-center gap-3">
//               {error && <span className="text-red-500 text-sm font-medium mr-2">{error}</span>}
//               <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2.5 bg-[#10b981] text-white rounded-lg hover:bg-[#059669] text-sm font-bold transition-colors shadow-sm disabled:opacity-50">
//                 {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
//                 Save & Continue
//               </button>
//             </div>
//           </div>
//         </div>

//         <main className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">

//           {/* Sidebar */}
//           <aside className="w-full md:w-64 flex-shrink-0">
//             <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-32 max-h-[80vh] overflow-y-auto">
//               <div className="flex items-center gap-2 mb-6 text-slate-700">
//                 <span className="font-bold text-sm tracking-wide uppercase flex items-center gap-2">
//                   <span className="text-lg">T</span> Resume Sections
//                 </span>
//               </div>

//               <div className="space-y-1">
//                 {sections.map((section, idx) => (
//                   <div
//                     key={idx}
//                     onClick={() => setActiveSection(section.name)}
//                     className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-colors ${activeSection === section.name ? 'bg-emerald-50 text-emerald-900' : 'hover:bg-slate-50'}`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <GripVertical size={14} className={activeSection === section.name ? "text-emerald-500" : "text-slate-300 group-hover:text-slate-400"} />
//                       <span className={`text-sm font-medium ${activeSection === section.name ? 'text-emerald-800 font-bold' : 'text-slate-600'}`}>{section.name}</span>
//                     </div>
//                     {section.completed && <CheckCircle2 size={16} className="text-[#065f46]" />}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-8 pt-6 border-t border-slate-100">
//                 <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Tips</h4>
//                 <ul className="space-y-3">
//                   <li className="flex gap-2 text-[11px] text-slate-500 items-start">
//                     <Sparkles size={12} className="mt-0.5 text-emerald-500 shrink-0" />
//                     Select a section to edit
//                   </li>
//                   <li className="flex gap-2 text-[11px] text-slate-500 items-start">
//                     <MousePointer2 size={12} className="mt-0.5 text-emerald-500 shrink-0" />
//                     Live preview updates instantly
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </aside>

//           {/* Editor Form (Middle Column) */}
//           <div className="w-full md:w-[400px] flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm max-h-[80vh] overflow-y-auto sticky top-32">
//             {renderForm()}
//           </div>

//           {/* Resume Preview */}
//           <div className="flex-grow flex flex-col items-center w-full sticky top-32">
//             <div className="w-full bg-white rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 p-12 h-[80vh] overflow-y-auto mb-8">
//               {/* Resume Header */}
//               <div className="mb-8">
//                 <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">{formData.personalInfo.fullName || 'Your Name'}</h1>
//                 <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 text-sm">
//                   {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
//                   {formData.personalInfo.email && formData.personalInfo.phone && <span>|</span>}
//                   {formData.personalInfo.phone && <span>{formData.personalInfo.phone}</span>}
//                   {formData.personalInfo.phone && formData.personalInfo.location && <span>|</span>}
//                   {formData.personalInfo.location && <span>{formData.personalInfo.location}</span>}
//                 </div>
//                 <div className="flex gap-x-4 mt-1 text-slate-500 text-sm">
//                   {formData.personalInfo.linkedin && <a href="#" className="hover:underline">{formData.personalInfo.linkedin}</a>}
//                   {formData.personalInfo.linkedin && formData.personalInfo.website && <span>•</span>}
//                   {formData.personalInfo.website && <a href="#" className="hover:underline">{formData.personalInfo.website}</a>}
//                 </div>
//               </div>

//               <hr className="border-slate-800 border-[1.5px] mb-8" />

//               {/* Professional Summary */}
//               {formData.summary.text && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Professional Summary</h2>
//                   <p className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-wrap">
//                     {formData.summary.text}
//                   </p>
//                 </section>
//               )}

//               {/* Work Experience */}
//               {!formData.experience.isNotApplicable && formData.experience.entries.length > 0 && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Work Experience</h2>
//                   {formData.experience.entries.map((entry, idx) => (
//                     <div key={idx} className="mb-6">
//                       <div className="flex justify-between items-baseline mb-1">
//                         <h3 className="font-bold text-[16px] text-slate-800">{entry.jobTitle || 'Job Title'}</h3>
//                         <span className="text-slate-500 text-xs">{entry.startDate} {entry.startDate && entry.endDate && '-'} {entry.endDate}</span>
//                       </div>
//                       <div className="text-slate-700 font-medium text-sm mb-2">{entry.company || 'Company'} {entry.company && entry.location && '•'} {entry.location}</div>
//                       <p className="text-slate-600 text-[14.5px] whitespace-pre-wrap pl-4 border-l-2 border-emerald-100">
//                         {entry.description}
//                       </p>
//                     </div>
//                   ))}
//                 </section>
//               )}

//               {/* Education */}
//               {(formData.education.degree || formData.education.institution) && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Education</h2>
//                   <div className="flex justify-between items-baseline mb-1">
//                     <h3 className="font-bold text-[16px] text-slate-800">{formData.education.degree || 'Degree'}</h3>
//                     <span className="text-slate-500 text-xs">{formData.education.graduationDate}</span>
//                   </div>
//                   <div className="flex justify-between items-baseline">
//                     <div className="text-slate-700 font-medium text-sm">{formData.education.institution || 'Institution'} {formData.education.institution && formData.education.location && `•`} {formData.education.location}</div>
//                     {formData.education.gpa && <span className="text-slate-500 text-xs italic">GPA: {formData.education.gpa}</span>}
//                   </div>
//                 </section>
//               )}

//               {/* Skills */}
//               {!formData.skills.isNotApplicable && formData.skills.skillsList.length > 0 && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Skills</h2>
//                   <p className="text-slate-600 text-[14.5px] leading-loose">
//                     {formData.skills.skillsList.join(' • ')}
//                   </p>
//                 </section>
//               )}

//               {/* Certifications */}
//               {!formData.certifications.isNotApplicable && formData.certifications.entries.length > 0 && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Certifications</h2>
//                   {formData.certifications.entries.map((entry, idx) => (
//                     <div key={idx} className="flex justify-between items-baseline mb-3">
//                       <div>
//                         <h3 className="font-bold text-[15px] text-slate-800">{entry.title || 'Certification Name'}</h3>
//                         {entry.issuer && <p className="text-slate-500 text-sm italic">{entry.issuer}</p>}
//                       </div>
//                       {entry.date && <span className="text-slate-500 text-xs">{entry.date}</span>}
//                     </div>
//                   ))}
//                 </section>
//               )}

//               {/* Achievements */}
//               {!formData.achievements.isNotApplicable && formData.achievements.entries.length > 0 && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-3">Achievements</h2>
//                   <ul className="list-disc pl-4 space-y-2 text-slate-600 text-[14.5px]">
//                     {formData.achievements.entries.map((entry, idx) => (
//                       <li key={idx}>
//                         {entry.title && <strong className="text-slate-800">{entry.title}: </strong>}
//                         {entry.description}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               )}

//               {/* Projects */}
//               {!formData.projects.isNotApplicable && formData.projects.entries.length > 0 && (
//                 <section className="mb-8">
//                   <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider mb-4">Projects</h2>
//                   {formData.projects.entries.map((entry, idx) => (
//                     <div key={idx} className="mb-4">
//                       <h3 className="font-bold text-[16px] text-slate-800">{entry.title || 'Project Name'}</h3>
//                       <p className="text-slate-600 text-[14.5px] leading-relaxed mt-1 whitespace-pre-wrap">
//                         {entry.description}
//                       </p>
//                       {entry.issuer && (
//                         <div className="mt-2 text-[13px]">
//                           <span className="font-bold text-slate-700">Technologies: </span>
//                           <span className="text-slate-600">{entry.issuer}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </section>
//               )}

//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// };

// // Sub-components
// const ToggleButton = ({ label, active, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`w-full text-left p-4 rounded-xl border transition-all ${active
//       ? 'bg-[#ebfef5] border-emerald-200 text-[#064e3b]'
//       : 'bg-[#f0fdf4] border-emerald-100 text-slate-600 hover:border-emerald-300'
//       }`}
//   >
//     <div className="flex items-center gap-3">
//       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${active ? 'bg-[#064e3b] border-[#064e3b]' : 'border-slate-300 bg-white'}`}>
//         {active && <div className="w-2 h-2 bg-white rounded-full" />}
//       </div>
//       <span className="font-bold text-[14px]">{label}</span>
//     </div>
//   </button>
// );

// const InputField = ({ label, placeholder, value, onChange, type = "text", onKeyDown }) => (
//   <div className="space-y-1.5">
//     <label className="block text-[12px] font-bold text-slate-700 ml-1">{label}</label>
//     <input
//       type={type}
//       value={value}
//       onChange={onChange}
//       onKeyDown={onKeyDown}
//       placeholder={placeholder}
//       className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 hover:bg-white placeholder:text-slate-400 font-medium text-sm"
//     />
//   </div>
// );

// const TextAreaField = ({ label, placeholder, value, onChange, rows = 4 }) => (
//   <div className="space-y-1.5">
//     <label className="block text-[12px] font-bold text-slate-700 ml-1">{label}</label>
//     <textarea
//       rows={rows}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/50 hover:bg-white placeholder:text-slate-400 resize-none font-medium text-sm leading-relaxed"
//     />
//   </div>
// );

// export default ResumeEditpage;