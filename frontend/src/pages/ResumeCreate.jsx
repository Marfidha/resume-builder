import React, { useState } from 'react';
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  Trophy,
  FolderGit2,
  ChevronLeft,
  Plus,
  Sparkles,
  CheckCircle2,
  Layout,
  Trash2,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../config/api.js";


const API_URL = `${API_BASE_URL}/api`;

const ResumeCreate = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('Personal Info');
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: {
      text: ''
    },
    education: {
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: ''
    },
    experience: {
      isNotApplicable: false,
      entries: [
        {
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    },
    skills: {
      isNotApplicable: false,
      skillsList: []
    },
    certifications: {
      isNotApplicable: false,
      entries: []
    },
    achievements: {
      isNotApplicable: false,
      entries: []
    },
    projects: {
      isNotApplicable: false,
      entries: []
    }
  });

  const [completedSections, setCompletedSections] = useState({
    'Personal Info': false,
    'Summary': false,
    'Education': false,
    'Experience': false,
    'Skills': false,
    'Certifications': false,
    'Achievements': false,
    'Projects': false
  });

  const [tempSkill, setTempSkill] = useState('');

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && tempSkill.trim()) {
      e.preventDefault();

      if (formData.skills.skillsList.includes(tempSkill.trim())) return;

      setFormData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          skillsList: [...prev.skills.skillsList, tempSkill.trim()]
        }
      }));

      setTempSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        skillsList: prev.skills.skillsList.filter(skill => skill !== skillToRemove)
      }
    }));
  };

  // Handle adding experience entry
  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        entries: [
          ...prev.experience.entries,
          { jobTitle: '', company: '', location: '', startDate: '', endDate: '', description: '' }
        ]
      }
    }));
  };

  // Handle experience input change
  const handleExperienceChange = (index, field, value) => {
    setFormData(prev => {
      const updatedEntries = [...prev.experience.entries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [field]: value
      };

      return {
        ...prev,
        experience: {
          ...prev.experience,
          entries: updatedEntries
        }
      };
    });
  };

  // Handle removing experience entry
  const handleRemoveExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        entries: prev.experience.entries.filter((_, i) => i !== index)
      }
    }));
  };

  // Generic handler for adding entries (certifications, achievements, projects)
  const handleAddEntry = (section) => {
    const newEntry = { title: '', issuer: '', date: '', description: '' };
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        entries: [...prev[section].entries, newEntry]
      }
    }));
  };

  // Handle entry change
  const handleEntryChange = (section, index, field, value) => {
    setFormData(prev => {
      const updatedEntries = [...prev[section].entries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [field]: value
      };

      return {
        ...prev,
        [section]: {
          ...prev[section],
          entries: updatedEntries
        }
      };
    });
  };

  // Handle removing entry
  const handleRemoveEntry = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        entries: prev[section].entries.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSaveSection = () => {
    if (!isSectionComplete()) {
      alert('Please fill all required fields before continuing.');
      return;
    }

    setCompletedSections(prev => ({
      ...prev,
      [activeSection]: true
    }));

    const sectionOrder = [
      'Personal Info',
      'Summary',
      'Education',
      'Experience',
      'Skills',
      'Certifications',
      'Achievements',
      'Projects'
    ];

    const currentIndex = sectionOrder.indexOf(activeSection);

    if (currentIndex < sectionOrder.length - 1) {
      setActiveSection(sectionOrder[currentIndex + 1]);
    }
  };

  // Save resume to database
  const saveResumeToDB = async () => {
    setLoading(true);
    setError('');

    try {
      // Clean up the data before sending
      const resumeData = {
        personalInfo: formData.personalInfo,
        summary: formData.summary,
        education: formData.education,
        experience: {
          isNotApplicable: formData.experience.isNotApplicable,
          entries: formData.experience.entries.filter(entry =>
            entry.jobTitle || entry.company || entry.description
          )
        },
        skills: {
          isNotApplicable: formData.skills.isNotApplicable,
          skillsList: formData.skills.skillsList
        },
        certifications: {
          isNotApplicable: formData.certifications.isNotApplicable,
          entries: formData.certifications.entries.filter(entry =>
            entry.title || entry.issuer
          )
        },
        achievements: {
          isNotApplicable: formData.achievements.isNotApplicable,
          entries: formData.achievements.entries.filter(entry =>
            entry.title || entry.description
          )
        },
        projects: {
          isNotApplicable: formData.projects.isNotApplicable,
          entries: formData.projects.entries.filter(entry =>
            entry.title || entry.description
          )
        }
      };

      const response = await axios.post(`${API_URL}/resumes`, resumeData);
      setResumeId(response.data._id);
      return response.data._id;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save resume');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResume = async () => {
    if (!isAllSectionsComplete()) {
      setError("Please complete all required sections before generating resume.");
      return;
    }
    setError('');
    try {
      const id = await saveResumeToDB();

      if (!id) return;

      // 🔥 NAVIGATE TO NEW PAGE
      navigate(`/resume/${id}`);

    } catch (err) {
      console.error('Failed to generate resume:', err);
    }
  };


  const isAllSectionsComplete = () => {
    // Personal Info
    if (
      !formData.personalInfo.fullName.trim() ||
      !formData.personalInfo.email.trim() ||
      !formData.personalInfo.phone.trim() ||
      !formData.personalInfo.location.trim()
    ) return false;

    // Summary
    if (!formData.summary.text.trim()) return false;

    // Education
    if (
      !formData.education.degree.trim() ||
      !formData.education.institution.trim() ||
      !formData.education.graduationDate.trim()
    ) return false;

    // Experience
    if (!formData.experience.isNotApplicable) {
      const validExperience = formData.experience.entries.some(entry =>
        entry.jobTitle.trim() &&
        entry.company.trim() &&
        entry.startDate.trim() &&
        entry.description.trim()
      );
      if (!validExperience) return false;
    }

    // Skills
    if (!formData.skills.isNotApplicable && formData.skills.skillsList.length === 0) {
      return false;
    }

    return true; // others optional
  };

  // Check if current section is complete
  const isSectionComplete = () => {
    switch (activeSection) {
      case 'Personal Info':
        return Boolean(
          formData.personalInfo.fullName.trim() &&
          formData.personalInfo.email.trim() &&
          formData.personalInfo.phone.trim() &&
          formData.personalInfo.location.trim()
        );

      case 'Summary':
        return Boolean(formData.summary.text.trim());

      case 'Education':
        return Boolean(
          formData.education.degree.trim() &&
          formData.education.institution.trim() &&
          formData.education.graduationDate.trim()
        );

      case 'Experience':
        if (formData.experience.isNotApplicable) return true;

        return formData.experience.entries.some(entry =>
          entry.jobTitle.trim() &&
          entry.company.trim() &&
          entry.startDate.trim() &&
          entry.description.trim()
        );

      case 'Skills':
        return formData.skills.isNotApplicable || formData.skills.skillsList.length > 0;

      case 'Certifications':
      case 'Achievements':
      case 'Projects':
        return true;

      default:
        return false;
    }
  };
  // Sections configuration with completion status
  const sections = [
    { id: 'Personal Info', icon: User, completed: completedSections['Personal Info'] },
    { id: 'Summary', icon: FileText, completed: completedSections['Summary'] },
    { id: 'Education', icon: GraduationCap, completed: completedSections['Education'] },
    { id: 'Experience', icon: Briefcase, completed: completedSections['Experience'] },
    { id: 'Skills', icon: Wrench, completed: completedSections['Skills'] },
    { id: 'Certifications', icon: Award, completed: completedSections['Certifications'] },
    { id: 'Achievements', icon: Trophy, completed: completedSections['Achievements'] },
    { id: 'Projects', icon: FolderGit2, completed: completedSections['Projects'] },
  ];

  // Show resume preview if all sections are completed
  //   if (showResumePreview) {
  //     return <ResumePreview 
  //       formData={formData} 
  //       onBack={() => setShowResumePreview(false)} 
  //       resumeId={resumeId}
  //     />;
  //   }

  const renderContent = () => {
    switch (activeSection) {
      case 'Personal Info':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Personal Information</h2>
            <div className="grid grid-cols-1 gap-5">
              <InputField
                label="Full Name *"
                placeholder="Sarah Johnson"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
              />
              <InputField
                label="Email *"
                placeholder="sarah.johnson@email.com"
                value={formData.personalInfo.email}
                onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
              />
              <InputField
                label="Phone *"
                placeholder="+1 (555) 234-5678"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
              />
              <InputField
                label="Location *"
                placeholder="San Francisco, CA"
                value={formData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
              />
              <InputField
                label="LinkedIn"
                placeholder="linkedin.com/in/sarahjohnson"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
              />
              <InputField
                label="Website"
                placeholder="sarahjohnson.dev"
                value={formData.personalInfo.website}
                onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
              />
            </div>
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={!isSectionComplete() || loading}
            />
          </div>
        );

      case 'Summary':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#064e3b]">Professional Summary</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981] text-white rounded-lg text-sm font-bold hover:bg-[#059669] transition-all">
                <Sparkles size={16} /> AI Generate
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">Summary *</label>
              <textarea
                className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none h-56 resize-none transition-all placeholder:text-slate-300 bg-white"
                placeholder="Write a compelling summary..."
                value={formData.summary.text}
                onChange={(e) => handleInputChange('summary', 'text', e.target.value)}
              />
            </div>
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={!isSectionComplete() || loading}
            />
          </div>
        );

      case 'Education':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Education</h2>
            <div className="grid grid-cols-1 gap-5">
              <InputField
                label="Degree *"
                placeholder="Bachelor of Science in Computer Science"
                value={formData.education.degree}
                onChange={(e) => handleInputChange('education', 'degree', e.target.value)}
              />
              <InputField
                label="Institution *"
                placeholder="Stanford University"
                value={formData.education.institution}
                onChange={(e) => handleInputChange('education', 'institution', e.target.value)}
              />
              <InputField
                label="Location"
                placeholder="Stanford, CA"
                value={formData.education.location}
                onChange={(e) => handleInputChange('education', 'location', e.target.value)}
              />
              <InputField
                label="Graduation Date *"
                placeholder="May 2019"
                value={formData.education.graduationDate}
                onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value)}
              />
              <InputField
                label="GPA"
                placeholder="3.8/4.0"
                value={formData.education.gpa}
                onChange={(e) => handleInputChange('education', 'gpa', e.target.value)}
              />
            </div>
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={!isSectionComplete() || loading}
            />
          </div>
        );

      case 'Experience':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Work Experience</h2>
            <ToggleButton
              label="I'm a fresher (No work experience)"
              active={formData.experience.isNotApplicable}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  experience: {
                    ...prev.experience,
                    isNotApplicable: !prev.experience.isNotApplicable
                  }
                }));
              }}
            />
            {!formData.experience.isNotApplicable ? (
              <div className="space-y-6 pt-2">
                {formData.experience.entries.map((entry, index) => (
                  <div key={index} className="space-y-4 p-4 border border-emerald-100 rounded-xl relative">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#064e3b]">Experience {index + 1}</h3>
                      {index > 0 && (
                        <button
                          onClick={() => handleRemoveExperience(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                    <InputField
                      label="Job Title *"
                      placeholder="Senior Software Engineer"
                      value={entry.jobTitle}
                      onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                    />
                    <InputField
                      label="Company *"
                      placeholder="TechCorp"
                      value={entry.company}
                      onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    />
                    <InputField
                      label="Location"
                      placeholder="San Francisco, CA"
                      value={entry.location}
                      onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Start Date *"
                        placeholder="Jan 2022"
                        value={entry.startDate}
                        onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      />
                      <InputField
                        label="End Date"
                        placeholder="Present"
                        value={entry.endDate}
                        onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      />
                    </div>
                    <TextAreaField
                      label="Description *"
                      placeholder="• Achievement 1&#10;• Achievement 2&#10;• Achievement 3"
                      value={entry.description}
                      onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    />
                  </div>
                ))}
                <button
                  onClick={handleAddExperience}
                  className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline"
                >
                  <Plus size={18} /> Add Another Experience
                </button>
              </div>
            ) : (
              <div className="bg-[#ecfdf5] border border-[#d1fae5] p-6 rounded-xl flex items-center justify-center min-h-[100px]">
                <p className="text-[#065f46] font-medium text-center">Currently in fresher mode. Work experience will not be displayed on your resume.</p>
              </div>
            )}
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={!isSectionComplete() || loading}
            />
          </div>
        );

      case 'Skills':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Skills</h2>
            <ToggleButton
              label="Not Applicable"
              active={formData.skills.isNotApplicable}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  skills: {
                    ...prev.skills,
                    isNotApplicable: !prev.skills.isNotApplicable
                  }
                }));
              }}
            />
            {!formData.skills.isNotApplicable && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[13px] font-bold text-slate-700 ml-1">Skills (Type and press Enter)</label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/30 hover:bg-white placeholder:text-slate-300 font-medium"
                    placeholder="JavaScript, React, Node.js, Python, AWS"
                    value={tempSkill}
                    onChange={(e) => setTempSkill(e.target.value)}
                    onKeyDown={handleAddSkill}
                  />
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.skills.skillsList.map(skill => (
                    <span key={skill} className="bg-emerald-50 text-[#064e3b] px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-100 flex items-center gap-2">
                      {skill}
                      <Trash2
                        className="w-3.5 h-3.5 cursor-pointer hover:text-red-500"
                        onClick={() => handleRemoveSkill(skill)}
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={!isSectionComplete() || loading}
            />
          </div>
        );

      case 'Certifications':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Certifications</h2>
            <ToggleButton
              label="Not Applicable"
              active={formData.certifications.isNotApplicable}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  certifications: {
                    ...prev.certifications,
                    isNotApplicable: !prev.certifications.isNotApplicable
                  }
                }));
              }}
            />
            {!formData.certifications.isNotApplicable && (
              <div className="space-y-4">
                {formData.certifications.entries.length === 0 ? (
                  <div className="p-10 border-2 border-dashed border-emerald-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Plus size={40} className="text-emerald-200" />
                    <p className="font-medium text-center">Add your certifications to stand out to recruiters.</p>
                    <button
                      onClick={() => handleAddEntry('certifications')}
                      className="bg-emerald-50 text-[#064e3b] px-6 py-2 rounded-xl font-bold hover:bg-emerald-100 transition-all"
                    >
                      Add Certification
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.certifications.entries.map((entry, index) => (
                      <div key={index} className="p-4 border border-emerald-100 rounded-xl relative">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => handleRemoveEntry('certifications', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <InputField
                          label="Certification Name"
                          placeholder="AWS Certified Developer"
                          value={entry.title}
                          onChange={(e) => handleEntryChange('certifications', index, 'title', e.target.value)}
                        />
                        <InputField
                          label="Issuing Organization"
                          placeholder="Amazon Web Services"
                          value={entry.issuer}
                          onChange={(e) => handleEntryChange('certifications', index, 'issuer', e.target.value)}
                        />
                        <InputField
                          label="Date"
                          placeholder="2023"
                          value={entry.date}
                          onChange={(e) => handleEntryChange('certifications', index, 'date', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddEntry('certifications')}
                      className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline"
                    >
                      <Plus size={18} /> Add Another Certification
                    </button>
                  </div>
                )}
              </div>
            )}
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={loading}
            />
          </div>
        );

      case 'Achievements':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Achievements</h2>
            <ToggleButton
              label="Not Applicable"
              active={formData.achievements.isNotApplicable}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  achievements: {
                    ...prev.achievements,
                    isNotApplicable: !prev.achievements.isNotApplicable
                  }
                }));
              }}
            />
            {!formData.achievements.isNotApplicable && (
              <div className="space-y-4">
                {formData.achievements.entries.length === 0 ? (
                  <div className="p-10 border-2 border-dashed border-emerald-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Plus size={40} className="text-emerald-200" />
                    <p className="font-medium text-center">Add your achievements to stand out to recruiters.</p>
                    <button
                      onClick={() => handleAddEntry('achievements')}
                      className="bg-emerald-50 text-[#064e3b] px-6 py-2 rounded-xl font-bold hover:bg-emerald-100 transition-all"
                    >
                      Add Achievement
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.achievements.entries.map((entry, index) => (
                      <div key={index} className="p-4 border border-emerald-100 rounded-xl relative">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => handleRemoveEntry('achievements', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <InputField
                          label="Achievement Title"
                          placeholder="Employee of the Month"
                          value={entry.title}
                          onChange={(e) => handleEntryChange('achievements', index, 'title', e.target.value)}
                        />
                        <TextAreaField
                          label="Description"
                          placeholder="Describe your achievement..."
                          value={entry.description}
                          onChange={(e) => handleEntryChange('achievements', index, 'description', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddEntry('achievements')}
                      className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline"
                    >
                      <Plus size={18} /> Add Another Achievement
                    </button>
                  </div>
                )}
              </div>
            )}
            <ActionButton
              text="Save & Continue"
              onClick={handleSaveSection}
              disabled={loading}
            />
          </div>
        );

      case 'Projects':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-2xl font-bold text-[#064e3b]">Projects</h2>
            <ToggleButton
              label="Not Applicable"
              active={formData.projects.isNotApplicable}
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  projects: {
                    ...prev.projects,
                    isNotApplicable: !prev.projects.isNotApplicable
                  }
                }));
              }}
            />
            {!formData.projects.isNotApplicable && (
              <div className="space-y-4">
                {formData.projects.entries.length === 0 ? (
                  <div className="p-10 border-2 border-dashed border-emerald-100 rounded-3xl flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Plus size={40} className="text-emerald-200" />
                    <p className="font-medium text-center">Add your projects to stand out to recruiters.</p>
                    <button
                      onClick={() => handleAddEntry('projects')}
                      className="bg-emerald-50 text-[#064e3b] px-6 py-2 rounded-xl font-bold hover:bg-emerald-100 transition-all"
                    >
                      Add Project
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.projects.entries.map((entry, index) => (
                      <div key={index} className="p-4 border border-emerald-100 rounded-xl relative">
                        <div className="flex justify-end mb-2">
                          <button
                            onClick={() => handleRemoveEntry('projects', index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <InputField
                          label="Project Name"
                          placeholder="E-commerce Platform"
                          value={entry.title}
                          onChange={(e) => handleEntryChange('projects', index, 'title', e.target.value)}
                        />
                        <TextAreaField
                          label="Description"
                          placeholder="Describe your project, technologies used, and your role..."
                          value={entry.description}
                          onChange={(e) => handleEntryChange('projects', index, 'description', e.target.value)}
                        />
                        <InputField
                          label="Technologies"
                          placeholder="React, Node.js, MongoDB"
                          value={entry.issuer}
                          onChange={(e) => handleEntryChange('projects', index, 'issuer', e.target.value)}
                        />
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddEntry('projects')}
                      className="flex items-center gap-2 text-[#064e3b] font-bold hover:underline"
                    >
                      <Plus size={18} /> Add Another Project
                    </button>
                  </div>
                )}
              </div>
            )}
            <ActionButton
              text={loading ? "Saving..." : "Generate Resume"}
              icon={loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              className="bg-gradient-to-r from-[#064e3b] to-[#10b981]"
              onClick={handleGenerateResume}
              disabled={loading}
            />
            {error && (
              <p className="text-red-500 text-sm mt-3 text-center font-medium">
                {error}
              </p>
            )}
          </div>
        );

      default:
        return <div className="p-10 text-center text-gray-500">Select a section to edit content.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf9] font-sans text-slate-900">



      <main className="max-w-6xl mx-auto px-8 md:px-16 py-8 pt-24">
        {/* Back Button */}
        <button className="flex items-center gap-2 text-slate-600 hover:text-[#064e3b] transition-colors mb-6 group font-bold">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        {/* Tab Switcher */}
        <div className="flex gap-8 md:gap-12 border-b border-emerald-100 mb-8 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 pb-4 text-[#064e3b] font-bold border-b-2 border-[#064e3b] whitespace-nowrap">
            <FileText size={18} /> Content
          </button>
          <button className="flex items-center gap-2 pb-4 text-slate-400 font-bold hover:text-slate-600 transition-colors whitespace-nowrap">
            <Layout size={18} /> Customize
          </button>
          <button className="flex items-center gap-2 pb-4 text-slate-400 font-bold hover:text-slate-600 transition-colors whitespace-nowrap">
            <Sparkles size={18} /> AI Tools
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 space-y-2 sticky top-24">
            <h3 className="px-3 py-2 text-sm font-black text-gray-800 uppercase tracking-wider mb-2">Resume Sections</h3>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              const isCompleted = section.completed;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${isActive
                    ? 'bg-[#064e3b] text-white shadow-lg shadow-emerald-900/10'
                    : isCompleted
                      ? 'bg-[#8de3c6] text-[#064e3b]'
                      : 'text-slate-500 hover:bg-emerald-50'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <section.icon size={20} className={isActive ? 'text-white' : isCompleted ? 'text-[#064e3b]' : 'text-slate-400 group-hover:text-[#064e3b]'} />
                    <span className="font-bold text-sm">{section.id}</span>
                  </div>
                  {isCompleted && !isActive && (
                    <CheckCircle2 size={18} className="text-[#064e3b] fill-current" />
                  )}
                  {isActive && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="bg-white p-6 md:p-12 rounded-[2.5rem] shadow-sm border border-emerald-50 min-h-[600px] flex flex-col">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
            <div className="flex-1 w-full max-w-2xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components
const ToggleButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4.5 rounded-2xl border transition-all ${active
      ? 'bg-[#ebfef5] border-emerald-200 text-[#064e3b]'
      : 'bg-[#f0fdf4] border-emerald-100 text-slate-600 hover:border-emerald-300'
      }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${active ? 'bg-[#064e3b] border-[#064e3b]' : 'border-slate-300 bg-white'}`}>
        {active && <div className="w-2 h-2 bg-white rounded-full" />}
      </div>
      <span className="font-bold text-[15px]">{label}</span>
    </div>
  </button>
);

const InputField = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-[13px] font-bold text-slate-700 ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-5 py-4 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/30 hover:bg-white placeholder:text-slate-300 font-medium"
    />
  </div>
);

const TextAreaField = ({ label, placeholder, value, onChange, rows = 5 }) => (
  <div className="space-y-2">
    <label className="block text-[13px] font-bold text-slate-700 ml-1">{label}</label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-5 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-slate-50/30 hover:bg-white placeholder:text-slate-300 resize-none font-medium leading-relaxed"
    />
  </div>
);

const ActionButton = ({ text, icon, onClick, disabled, className }) => (
  <div className="pt-8">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-4.5 rounded-xl font-black text-white transition-all shadow-xl shadow-emerald-900/10 active:scale-[0.98] flex items-center justify-center gap-2 ${disabled
        ? 'bg-gray-300 cursor-not-allowed opacity-50'
        : className || 'bg-[#064e3b] hover:bg-[#043d2e]'
        }`}
    >
      {icon}
      {text}
    </button>
  </div>
);

// Add this to your existing exports
export default ResumeCreate;