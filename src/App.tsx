import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, Linkedin, Mail, Twitter, ChevronRight, FileText, 
  ExternalLink, Code2, Terminal, Globe, Cpu, Quote, X, Sun, Moon 
} from 'lucide-react';
import { PROJECTS, SKILLS, BLOG_POSTS, TESTIMONIALS } from './data';
import { useState, useEffect } from 'react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'DevOps' | 'Tools'>('All');
  const [activeProjectTag, setActiveProjectTag] = useState<string>('All');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 5000);
        (e.target as HTMLFormElement).reset();
      } else {
        setErrorStatus(result.error || 'Failed to send message');
      }
    } catch (err) {
      setErrorStatus('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  const allProjectTags = ['All', ...Array.from(new Set(PROJECTS.flatMap(p => p.tags)))];

  const filteredProjects = activeProjectTag === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeProjectTag));

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId);

  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProjectId]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0a0a0a';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#fcfcfc';
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const textPrimary = theme === 'dark' ? 'text-[#e4e4e4]' : 'text-[#1a1a1a]';
  const textSecondary = theme === 'dark' ? 'text-white/40' : 'text-black/40';
  const textMuted = theme === 'dark' ? 'text-white/60' : 'text-black/60';
  const bgCard = theme === 'dark' ? 'bg-white/[0.02]' : 'bg-black/[0.02]';
  const borderCard = theme === 'dark' ? 'border-white/5' : 'border-black/5';
  const bgSection = theme === 'dark' ? 'bg-white/[0.01]' : 'bg-black/[0.01]';

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
    }
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-400 relative transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0a0a] text-[#e4e4e4]' : 'bg-[#fcfcfc] text-[#1a1a1a]'
    }`}>
      {/* Background Grid Pattern */}
      <div className={`fixed inset-0 z-0 pointer-events-none opacity-[0.03] transition-opacity duration-300 ${
        theme === 'dark' ? 'invert-0' : 'invert'
      }`} 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 border-b backdrop-blur-md transition-colors duration-300 ${
          theme === 'dark' ? 'border-white/5 bg-[#0a0a0a]/80' : 'border-black/5 bg-[#fcfcfc]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono font-bold text-xl tracking-tighter">
            <span className="text-emerald-500">&lt;</span>
            Chetan Ganta
            <span className="text-emerald-500">/&gt;</span>
          </div>
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${
            theme === 'dark' ? 'text-white/60' : 'text-black/60'
          }`}>
            <a href="#projects" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Projects</a>
            <a href="#skills" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Skills</a>
            <a href="#blog" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Blog</a>
            <a href="#testimonials" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Reviews</a>
            <a href="#contact" className={`hover:text-white active:text-white transition-colors group flex items-center gap-1 px-4 py-2 rounded-full border transition-all duration-300 ${
              theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-emerald-500/50' : 'bg-black/5 border-black/10 hover:border-emerald-500/50 hover:bg-emerald-500 hover:text-white'
            }`}>
              Contact
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-black'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for new opportunities
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
                Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">digital future</span>, line by line.
              </h1>
              <p className={`text-xl leading-relaxed mb-10 transition-colors duration-300 ${
                theme === 'dark' ? 'text-white/50' : 'text-black/50'
              }`}>
                Full-stack software engineer specializing in high-performance cloud architectures, 
                interactive web experiences, and scalable system design.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  View Projects
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 border rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 text-black hover:bg-black/10'
                  }`}
                >
                  Contact Me
                </motion.a>
                <motion.a 
                  href="./resume.pdf" 
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, backgroundColor: theme === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 border rounded-lg font-semibold transition-all flex items-center gap-2 group ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10 text-black'
                  }`}
                >
                  <FileText className="w-5 h-5 opacity-60" />
                  Download Resume
                  <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-0.5 transition-transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats / Tech Stack Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`border-y transition-colors duration-300 ${
            theme === 'dark' ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-8">
             <div className="flex items-center gap-3">
               <Terminal className="w-5 h-5 text-emerald-500" />
               <span className={`font-mono text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Stack</span>
               <span className="font-mono text-sm font-semibold">T3 STACK / K8S / AWS</span>
             </div>
             <div className="flex items-center gap-3">
               <Globe className="w-5 h-5 text-blue-500" />
               <span className={`font-mono text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Based In</span>
               <span className="font-mono text-sm font-semibold">SAN FRANCISCO, CA</span>
             </div>
             <div className="flex items-center gap-3">
               <Cpu className="w-5 h-5 text-amber-500" />
               <span className={`font-mono text-xs uppercase tracking-widest ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Latency</span>
               <span className="font-mono text-sm font-semibold">&lt; 15MS RESPONSE</span>
             </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="py-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${textPrimary}`}>
              <div>
                <h2 className="text-4xl font-bold mb-4">Selected Works</h2>
                <p className={`max-w-md italic ${textSecondary}`}>A collection of systems I've built that push the boundaries of performance and user experience.</p>
              </div>
              <div className={`flex flex-wrap gap-2 ${textPrimary}`}>
                {allProjectTags.map(tag => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveProjectTag(tag)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono transition-all border ${
                      activeProjectTag === tag 
                        ? 'bg-emerald-500 border-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20' 
                        : `${theme === 'dark' ? 'bg-white/5 text-white/40 border-white/10' : 'bg-black/5 text-black/40 border-black/10'} hover:border-emerald-500/30`
                    }`}
                  >
                    {tag.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div 
              layout
              className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${textPrimary}`}
            >
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`group relative border rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all hover:-translate-y-2 cursor-pointer ${bgCard} ${borderCard}`}
                >
                  <div className="aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span key={tag} className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors ${
                          theme === 'dark' ? 'bg-white/5 border-white/10 text-white/50' : 'bg-black/5 border-black/10 text-black/50'
                        }`}>{tag}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3 flex items-center justify-between group/title">
                      {project.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-40 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${textSecondary}`}>
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      {project.github && (
                        <div className={`transition-colors ${theme === 'dark' ? 'text-white/40 group-hover:text-white' : 'text-black/40 group-hover:text-black'}`}>
                          <Github className="w-5 h-5" />
                        </div>
                      )}
                      <div className="text-emerald-500 text-sm font-semibold flex items-center gap-1 group-hover:underline underline-offset-4">
                        Details <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Project Expanded Modal Overlay */}
        <AnimatePresence>
          {selectedProjectId && selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0a0a]/95 backdrop-blur-xl"
              onClick={() => setSelectedProjectId(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`${theme === 'dark' ? 'bg-[#0f0f0f] border-white/10' : 'bg-[#ffffff] border-black/10'} border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl ${theme === 'dark' ? 'shadow-emerald-500/5' : 'shadow-black/5'}`}
                onClick={e => e.stopPropagation()}
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setSelectedProjectId(null)}
                    className={`absolute top-6 right-6 p-3 backdrop-blur-md rounded-full border transition-all ${
                      theme === 'dark' 
                        ? 'bg-black/50 border-white/20 text-white hover:bg-emerald-500 hover:text-black' 
                        : 'bg-white/50 border-black/20 text-black hover:bg-emerald-500 hover:text-white'
                    }`}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className={`p-8 md:p-12 ${textPrimary}`}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-mono text-emerald-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl font-bold mb-6">{selectedProject.title}</h2>
                  
                  <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                    <div className="space-y-12">
                      <div>
                        <p className={`text-xl leading-relaxed ${theme === 'dark' ? 'text-white/80' : 'text-black/80'}`}>
                          {selectedProject.description}
                        </p>
                      </div>

                      {selectedProject.caseStudy && (
                        <div className="space-y-10">
                          <div className="group">
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-2">
                              <span className="w-8 h-px bg-emerald-500/20" />
                              The Challenge
                            </h4>
                            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                              {selectedProject.caseStudy.problem}
                            </p>
                          </div>

                          <div className="group">
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-2">
                              <span className="w-8 h-px bg-emerald-500/20" />
                              The Solution
                            </h4>
                            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                              {selectedProject.caseStudy.solution}
                            </p>
                          </div>

                          <div className="group">
                            <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-500 mb-4 flex items-center gap-2">
                              <span className="w-8 h-px bg-emerald-500/20" />
                              The Outcome
                            </h4>
                            <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                              {selectedProject.caseStudy.outcome}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-8">
                      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'}`}>
                        <h4 className={`text-xs font-mono uppercase tracking-widest mb-6 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>Details</h4>
                        
                        <div className="space-y-6">
                          <div>
                            <span className={`text-[10px] font-mono uppercase tracking-wider block mb-2 ${textSecondary}`}>Stack</span>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map(t => (
                                <span key={t} className="text-sm font-medium">{t}</span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-white/5 space-y-3">
                            {selectedProject.link && (
                              <a 
                                href={selectedProject.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 bg-emerald-500 rounded-xl text-black font-bold hover:bg-emerald-400 transition-colors group"
                              >
                                Live Demo 
                                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </a>
                            )}
                            {selectedProject.github && (
                              <a 
                                href={selectedProject.github} 
                                target="_blank" 
                                rel="noreferrer"
                                className={`flex items-center justify-between p-4 border rounded-xl font-bold transition-colors ${
                                  theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10 text-black'
                                }`}
                              >
                                Source Code <Github className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className={`py-32 border-y transition-colors duration-300 ${bgSection} ${borderCard}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 ${textPrimary}`}>
              <div>
                <h2 className="text-4xl font-bold mb-4">Technical Stack</h2>
                <p className={`${textSecondary} max-w-sm`}>My focus is on TypeScript, high-availability cloud infrastructure, and modern frontend frameworks.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Frontend', 'Backend', 'DevOps', 'Tools'] as const).map(cat => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                      activeCategory === cat 
                        ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20' 
                        : `${theme === 'dark' ? 'bg-white/5 text-white/40 border-white/10' : 'bg-black/5 text-black/40 border-black/10'} hover:bg-emerald-500/10`
                    }`}
                  >
                    {cat.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-8">
              {filteredSkills.map((skill, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={skill.name}
                  transition={{ delay: idx * 0.05 }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-all ${
                        theme === 'dark' ? 'bg-white/5 text-emerald-500' : 'bg-black/5 text-emerald-600'
                      }`}>
                        <Code2 className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-bold tracking-tight ${textPrimary}`}>{skill.name}</span>
                    </div>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className={`text-xs font-mono font-bold ${theme === 'dark' ? 'text-emerald-500/80' : 'text-emerald-600/80'}`}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className={`relative h-2 w-full rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        bounce: 0, 
                        duration: 1.5, 
                        delay: 0.2 + (idx * 0.05) 
                      }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                    >
                      <motion.div 
                        animate={{ 
                          opacity: [0.4, 0.7, 0.4],
                          x: ['0%', '100%', '0%'] 
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute inset-0 w-1/4 bg-white/20 blur-md"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section 
          id="blog" 
          className={`py-32 transition-colors duration-300 ${textPrimary}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Latest Insights</h2>
                  <p className={`max-w-md italic ${textSecondary}`}>Writing about system design, frontend architecture, and the future of web tech.</p>
                </div>
                <div className="text-sm font-mono text-emerald-500 hidden sm:block">
                  [02] LOG_FILE
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                {BLOG_POSTS.map((post, idx) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden mb-6 relative">
                      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className={`flex items-center gap-3 text-xs font-mono mb-3 ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                      <span>{post.date}</span>
                      <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-6 ${textSecondary}`}>
                      {post.excerpt}
                    </p>
                    <button className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer">
                      Read Entry <ChevronRight className="w-3 h-3" />
                    </button>
                  </motion.article>
                ))}
              </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section 
          id="testimonials" 
          className={`py-32 border-y transition-colors duration-300 ${bgSection} ${borderCard} ${textPrimary}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                <p className={`max-w-md italic ${textSecondary}`}>Feedback from some of the visionary teams I've had the privilege to collaborate with.</p>
              </div>
              <div className="text-sm font-mono text-emerald-500 hidden sm:block">
                [03] PEER_REVIEWS
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div 
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    delay: idx * 0.15, 
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98] 
                  }}
                  className={`p-8 border rounded-2xl relative group hover:border-emerald-500/30 transition-all duration-500 cursor-default shadow-xl ${
                    theme === 'dark' ? 'bg-[#0d0d0d] border-white/5 shadow-black' : 'bg-white border-black/5 shadow-gray-200'
                  }`}
                >
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
                  
                  <p className={`italic leading-relaxed mb-8 relative z-10 ${theme === 'dark' ? 'text-white/70' : 'text-black/70'}`}>
                    "{t.quote}"
                  </p>
                  
                  <div className={`flex items-center gap-4 border-t pt-6 ${theme === 'dark' ? 'border-white/5' : 'border-black/5'}`}>
                    <img 
                      src={t.avatar} 
                      alt={t.name} 
                      className={`w-12 h-12 rounded-full border transition-colors ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} group-hover:border-emerald-500/30`}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className={`text-sm font-bold group-hover:text-emerald-400 transition-colors ${textPrimary}`}>{t.name}</h4>
                      <p className={`text-[10px] uppercase font-mono tracking-wider ${textSecondary}`}>
                        {t.role} @ <span className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>{t.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className={`py-32 relative transition-colors duration-300 ${textPrimary}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-8">Let's create something <span className="italic text-emerald-500">extraordinary</span>.</h2>
            <p className={`text-lg mb-12 ${textMuted}`}>
              Whether you have a specific project in mind or just want to chat about tech, I'm always open to new connections.
            </p>
            
            <div className={`border p-8 rounded-3xl text-left ${bgCard} ${borderCard}`}>
              <form 
                className="space-y-6" 
                onSubmit={handleContactSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-mono tracking-widest ml-1 ${textSecondary}`}>Full Name</label>
                    <input required name="name" type="text" placeholder="John Doe" className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-colors ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`} />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-[10px] uppercase font-mono tracking-widest ml-1 ${textSecondary}`}>Email Address</label>
                    <input required name="email" type="email" placeholder="john@example.com" className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-colors ${
                      theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                    }`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-[10px] uppercase font-mono tracking-widest ml-1 ${textSecondary}`}>Message</label>
                  <textarea required name="message" rows={5} placeholder="Tell me about your project..." className={`w-full border rounded-xl px-4 py-3 outline-none focus:border-emerald-500/50 transition-colors resize-none ${
                    theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                  }`}></textarea>
                </div>

                {errorStatus && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    {errorStatus}
                  </div>
                )}

                <motion.button
                  disabled={isSubmitting || isSent}
                  whileHover={{ scale: isSubmitting || isSent ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || isSent ? 1 : 0.98 }}
                  type="submit"
                  className={`w-full py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${
                    isSent 
                      ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-500 cursor-default' 
                      : 'bg-emerald-500 hover:bg-emerald-600 text-black shadow-emerald-500/10'
                  } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : isSent ? (
                    'Message Sent!'
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-8">
               <motion.a 
                 href="mailto:chetanganta272@gmail.com" 
                 whileHover={{ y: -2 }}
                 className={`flex items-center gap-2 transition-colors group ${theme === 'dark' ? 'text-white/40 hover:text-emerald-400' : 'text-black/40 hover:text-emerald-600'}`}
               >
                 <Mail className="w-5 h-5" />
                 chetanganta272@gmail.com
               </motion.a>
               <motion.a 
                 href="https://github.com/ChetanGanta" 
                 target="_blank" 
                 rel="noreferrer" 
                 whileHover={{ y: -2 }}
                 className={`flex items-center gap-2 transition-colors group ${theme === 'dark' ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
               >
                 <Github className="w-5 h-5" />
                 github.com/ChetanGanta
               </motion.a>
               <motion.a 
                 href="https://www.instagram.com/chetanganta/" 
                 target="_blank" 
                 rel="noreferrer" 
                 whileHover={{ y: -2 }}
                 className={`flex items-center gap-2 transition-colors group ${theme === 'dark' ? 'text-white/40 hover:text-pink-400' : 'text-black/40 hover:text-pink-600'}`}
               >
                 <Twitter className="w-5 h-5" />
                 @chetanganta
               </motion.a>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 transition-colors duration-300 ${borderCard} ${textPrimary}`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-mono font-bold text-sm">
            <span className="text-emerald-500 opacity-50">&lt;</span>
            Chetan Ganta
            <span className="text-emerald-500 opacity-50">/&gt;</span>
            <span className={`font-normal ml-4 transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>© 2024 DESIGNED & CODED BY CHETAN GANTA</span>
          </div>
          <div className={`flex flex-wrap gap-8 text-[10px] font-mono tracking-widest uppercase transition-colors ${theme === 'dark' ? 'text-white/20' : 'text-black/20'}`}>
             <a href="#projects" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Projects</a>
             <a href="#skills" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Skills</a>
             <a href="#blog" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Blog</a>
             <a href="#testimonials" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Reviews</a>
             <a href="#contact" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Contact</a>
             <span className="opacity-10">|</span>
             <a href="https://github.com/ChetanGanta/Portfolio" target="_blank" rel="noreferrer" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Source</a>
             <a href="https://github.com/ChetanGanta" target="_blank" rel="noreferrer" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>GitHub</a>
             <a href="https://www.instagram.com/chetanganta/" target="_blank" rel="noreferrer" className={`transition-colors ${theme === 'dark' ? 'hover:text-white' : 'hover:text-black'}`}>Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
