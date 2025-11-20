import React, { useState, useEffect } from 'react';
import { COURSE_CONTENT } from './constants';
import { SlideRenderer } from './components/SlideRenderers';
import { ProgressBar } from './components/ProgressBar';
import { AITutor } from './components/AITutor';
import { ChevronLeft, ChevronRight, BookOpen, Menu, X, List, Home } from 'lucide-react';
import { SlideType } from './types';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const currentSlide = COURSE_CONTENT[currentSlideIndex];
  const totalSlides = COURSE_CONTENT.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const jumpToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlideIndex(index);
    }
  };

  const goToTOC = () => {
    const tocIndex = COURSE_CONTENT.findIndex(s => s.type === SlideType.TABLE_OF_CONTENTS);
    if (tocIndex !== -1) setCurrentSlideIndex(tocIndex);
    else setCurrentSlideIndex(1);
  };

  const slideContext = `
    Slide Title: ${currentSlide.title}
    Subtitle: ${currentSlide.subtitle}
    Content Type: ${currentSlide.type}
    Main Text: ${currentSlide.content || ''}
    Vocabulary: ${JSON.stringify(currentSlide.vocabulary || [])}
    Grammar Points: ${JSON.stringify(currentSlide.grammarPoints || [])}
    Fun Fact: ${currentSlide.funFact || ''}
  `;

  return (
    <div className="fixed inset-0 bg-finnish-black text-gray-100 flex flex-col font-sans overflow-hidden">
      <ProgressBar current={currentSlideIndex} total={totalSlides} />

      {/* Mobile Header */}
      <div className="md:hidden absolute top-0 left-0 right-0 px-6 py-5 flex justify-between items-center z-40 pointer-events-none">
        <button 
            onClick={goToTOC}
            className="text-finnish-accent font-bold text-lg pointer-events-auto opacity-90 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 shadow-lg"
        >
           <BookOpen size={16} />
           <span className="text-xs tracking-wider font-mono">FINNISH 1&2</span>
        </button>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="bg-finnish-card/80 backdrop-blur-md p-2.5 rounded-full shadow-lg text-gray-200 pointer-events-auto border border-white/10 active:scale-90 transition-transform hover:bg-finnish-surface"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex flex-1 h-full relative">
        {/* Sidebar Navigation */}
        <aside 
          className={`
            fixed inset-y-0 right-0 z-[60] w-80 bg-finnish-card/95 backdrop-blur-2xl border-l border-white/10 transform transition-transform duration-300 ease-out shadow-2xl
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            md:static md:translate-x-0 md:w-72 md:border-l-0 md:border-r md:bg-finnish-dark md:z-0
            flex flex-col
          `}
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-finnish-dark/50">
            <div className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <BookOpen className="text-finnish-accent" size={20} />
              <span>Course Index</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white p-2 bg-white/5 rounded-full">
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-hide pb-24">
            {COURSE_CONTENT.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all border group
                  ${currentSlideIndex === idx 
                    ? 'bg-finnish-blue text-white border-transparent shadow-lg shadow-blue-900/20' 
                    : 'text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200'}
                `}
              >
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono w-5 ${currentSlideIndex === idx ? 'text-blue-200' : 'opacity-30 group-hover:opacity-60'}`}>
                        {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="truncate">{slide.title.replace(/^\d+\.\s*/, '')}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative w-full bg-finnish-black overflow-hidden">
          <div className="absolute inset-0">
             <SlideRenderer slide={currentSlide} onNavigate={jumpToSlide} />
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
             {/* Gradient fade for text going under controls */}
             <div className="h-32 bg-gradient-to-t from-finnish-black via-finnish-black/90 to-transparent" />
             
             <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:pb-10 md:px-12 flex items-center justify-between max-w-5xl mx-auto">
                <button
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="pointer-events-auto w-14 h-14 rounded-full bg-finnish-card/90 backdrop-blur-xl border border-white/10 flex items-center justify-center text-gray-300 shadow-xl disabled:opacity-0 transition-all active:scale-95 hover:bg-finnish-surface hover:border-white/20"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={28} />
                </button>

                {/* Page Indicator */}
                <div 
                    onClick={goToTOC}
                    className="pointer-events-auto flex flex-col items-center cursor-pointer group opacity-70 hover:opacity-100 transition-all active:scale-95" 
                >
                  <div className="text-finnish-accent font-mono text-xs font-bold tracking-[0.2em] mb-2 shadow-black drop-shadow-sm">
                    {currentSlideIndex + 1} / {totalSlides}
                  </div>
                  <div className="h-1 w-20 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                        className="h-full bg-finnish-accent shadow-[0_0_10px_#38BDF8]" 
                        style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%`, transition: 'width 0.3s ease-out' }} 
                    />
                  </div>
                </div>

                <button
                  onClick={nextSlide}
                  disabled={currentSlideIndex === totalSlides - 1}
                  className={`
                    pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 border
                    ${currentSlideIndex === totalSlides - 1 
                        ? 'bg-transparent border-transparent opacity-0 pointer-events-none' 
                        : 'bg-finnish-blue text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:bg-blue-600 border-blue-400/30 hover:shadow-[0_0_35px_rgba(37,99,235,0.6)]'}
                  `}
                  aria-label="Next Slide"
                >
                  <ChevronRight size={28} />
                </button>
             </div>
          </div>
        </main>
      </div>

      {/* AI Tutor Overlay */}
      <AITutor currentContext={slideContext} />
    </div>
  );
};

export default App;