import { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import ResumePDF from '../components/ResumePDF'; // Import the PDF layout

// Dynamically import the PDFDownloadLink to avoid Server-Side Rendering errors
const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed">
        Loading PDF...
      </button>
    ),
  }
);

export default function ResumeEditor({ initialResume }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  // 1. STATE MANAGEMENT
  const [resume, setResume] = useState(
    initialResume || {
      personal: {
        name: '',
        email: '',
        phone: '',
        location: '',
        headline: '',
      },
      experience: [
        { id: crypto.randomUUID(), jobTitle: '', company: '', dates: '', description: '' },
      ],
      education: [
        { id: crypto.randomUUID(), school: '', degree: '', dates: '' },
      ],
      skills: [{ id: crypto.randomUUID(), name: '' }],
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [generatingId, setGeneratingId] = useState(null); // For AI loading state

  // 2. FORM HANDLERS
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      personal: { ...prev.personal, [name]: value },
    }));
  };

  // --- Experience Handlers ---
  const handleExperienceChange = (id, e) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }));
  };

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { id: crypto.randomUUID(), jobTitle: '', company: '', dates: '', description: '' },
      ],
    }));
  };

  const removeExperience = (id) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };
  
  // --- Education Handlers ---
  const handleEducationChange = (id, e) => {
    const { name, value } = e.target;
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      ),
    }));
  };

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: crypto.randomUUID(), school: '', degree: '', dates: '' },
      ],
    }));
  };

  const removeEducation = (id) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  // --- Skills Handlers ---
  const handleSkillChange = (id, e) => {
    const { value } = e.target;
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => item.id === id ? { ...item, name: value } : item),
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: crypto.randomUUID(), name: '' }],
    }));
  };

  const removeSkill = (id) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  // 3. AI GENERATION HANDLER
  const handleAIGenerate = async (id, fieldName, currentText) => {
    if (!currentText || currentText.length < 5) {
      alert("Please write a little more text first so the AI has something to work with!");
      return;
    }
    
    setGeneratingId(id); 

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: currentText, type: 'improve' }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      setResume((prev) => ({
        ...prev,
        experience: prev.experience.map((item) =>
          item.id === id ? { ...item, [fieldName]: data.suggestion } : item
        ),
      }));

    } catch (error) {
      console.error(error);
      alert("AI generation failed. Please try again.");
    } finally {
      setGeneratingId(null);
    }
  };

  // 4. SAVE FUNCTION
  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    if (!user) {
      setMessage({ type: 'error', text: 'You must be logged in to save.' });
      setIsLoading(false);
      return;
    }

    const resumeData = {
      user_id: user.id,
      content: resume,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('resumes')
      .upsert(resumeData, { onConflict: 'user_id' });

    setIsLoading(false);

    if (error) {
      console.error('Error saving resume:', error);
      setMessage({ type: 'error', text: `Error: ${error.message}` });
    } else {
      setMessage({ type: 'success', text: 'Resume saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  // 5. RENDER
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Resume Editor
          </h1>
          <div className="flex space-x-3">
            {/* PDF Download Button */}
            <PDFDownloadLink
              document={<ResumePDF data={resume} />}
              fileName={`${resume.personal.name.replace(/\s+/g, '_')}_Resume.pdf`}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
            >
              {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
            </PDFDownloadLink>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Resume'}
            </button>
          </div>
        </div>

        {/* Message Bar */}
        {message && (
          <div
            className={`rounded-md p-4 mb-4 ${
              message.type === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          {/* Personal Details */}
          <section className="bg-white shadow sm:rounded-lg p-6">
            <h2 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={resume.personal.name}
                onChange={handlePersonalChange}
              />
              <Input
                label="Headline (e.g. Software Engineer)"
                name="headline"
                value={resume.personal.headline}
                onChange={handlePersonalChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={resume.personal.email}
                onChange={handlePersonalChange}
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={resume.personal.phone}
                onChange={handlePersonalChange}
              />
              <Input
                label="Location (e.g. San Francisco, CA)"
                name="location"
                value={resume.personal.location}
                onChange={handlePersonalChange}
              />
            </div>
          </section>

          {/* Experience */}
          <section className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Work Experience
              </h2>
              <button
                onClick={addExperience}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                + Add Experience
              </button>
            </div>
            <div className="space-y-6">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Job Title"
                      name="jobTitle"
                      value={exp.jobTitle}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                    <Input
                      label="Company"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                    <Input
                      label="Dates (e.g. Jan 2020 - Present)"
                      name="dates"
                      value={exp.dates}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label="Description / Achievements"
                      name="description"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, e)}
                      rows={4}
                      placeholder="• Achieved X by doing Y..."
                      onGenerate={() => handleAIGenerate(exp.id, 'description', exp.description)}
                      isGenerating={generatingId === exp.id}
                    />
                  </div>
                  <div className="text-right mt-2">
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Education */}
          <section className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium leading-6 text-gray-900">
                Education
              </h2>
              <button
                onClick={addEducation}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                + Add Education
              </button>
            </div>
            <div className="space-y-6">
              {resume.education.map((edu) => (
                <div key={edu.id} className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="School or University"
                      name="school"
                      value={edu.school}
                      onChange={(e) => handleEducationChange(edu.id, e)}
                    />
                    <Input
                      label="Degree (e.g. B.S. in Computer Science)"
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, e)}
                    />
                    <Input
                      label="Dates (e.g. Aug 2016 - May 2020)"
                      name="dates"
                      value={edu.dates}
                      onChange={(e) => handleEducationChange(edu.id, e)}
                    />
                  </div>
                  <div className="text-right mt-2">
                    <button
                      onClick={() => removeEducation(edu.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="bg-white shadow sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium leading-6 text-gray-900">Skills</h2>
              <button onClick={addSkill} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">+ Add Skill</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {resume.skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="flex-grow">
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={skill.name}
                      onChange={(e) => handleSkillChange(skill.id, e)}
                      placeholder="e.g. React"
                    />
                  </div>
                  <button onClick={() => removeSkill(skill.id)} className="text-red-600 hover:text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}

// 6. SERVER-SIDE LOGIC
export const getServerSideProps = withPageAuth({
  redirectTo: '/login',
  async getServerSideProps(ctx) {
    const supabase = createServerSupabaseClient(ctx);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { props: { initialResume: null } };

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();

    // Check 'Pro' status - ADAPT LOGIC AS NEEDED
    if (profileError || !profile || profile.subscription_status !== 'active') {
      return { redirect: { destination: '/pricing', permanent: false } };
    }

    const { data: resumeData } = await supabase
      .from('resumes')
      .select('content')
      .eq('user_id', user.id)
      .single();

    return {
      props: { initialResume: resumeData?.content || null },
    };
  },
});

// 7. COMPONENTS
const Input = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <div className="mt-1">
      <input
        type={type}
        name={name}
        id={name}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  </div>
);

const TextArea = ({ label, name, value, onChange, rows = 3, placeholder, onGenerate, isGenerating }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {onGenerate && (
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !value}
          className={`text-xs font-medium inline-flex items-center px-2 py-1 rounded border 
            ${isGenerating 
              ? 'bg-gray-100 text-gray-400' 
              : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100'
            } transition-colors`}
        >
          {isGenerating ? 'Improving...' : '✨ Improve with AI'}
        </button>
      )}
    </div>
    <div className="mt-1">
      <textarea
        name={name}
        id={name}
        rows={rows}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  </div>
);