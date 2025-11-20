import React from 'react';
import { SlideData, SlideType } from '../types';
import { Volume2, Star, Info, ArrowRight, Check, Hash } from 'lucide-react';
import { COURSE_CONTENT } from '../constants';

interface RendererProps {
  slide: SlideData;
  onNavigate?: (id: number) => void;
}

// --- Helper Components ---

const SlideContainer: React.FC<{ children: React.ReactNode; className?: string; center?: boolean }> = ({ children, className = "", center = false }) => (
  <div className="w-full h-full overflow-y-auto scrollbar-hide overscroll-contain">
    <div className={`
      min-h-full w-full max-w-4xl mx-auto 
      px-6 pt-28 pb-40 md:px-16 md:pt-20 md:pb-36 
      flex flex-col ${center ? 'justify-center' : 'justify-start'} 
      ${className}
    `}>
      {children}
    </div>
  </div>
);

const FunFact = ({ text }: { text: string }) => (
  <div className="mt-12 mb-4 p-6 bg-gradient-to-br from-finnish-surface to-finnish-card border-l-4 border-finnish-warning rounded-xl animate-in slide-in-from-bottom-5 fade-in duration-700 shadow-lg">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-finnish-warning/10 rounded-full shrink-0">
         <Star className="text-finnish-warning fill-current" size={20} />
      </div>
      <div>
        <h4 className="text-xs font-bold text-finnish-warning uppercase tracking-widest mb-2">Fun Fact</h4>
        <p className="text-base text-gray-200 leading-relaxed font-light">{text}</p>
      </div>
    </div>
  </div>
);

const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-10 border-b border-white/10 pb-6">
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 tracking-tight leading-tight">{title}</h2>
    {subtitle && <p className="text-finnish-accent text-lg md:text-xl font-light tracking-wide uppercase">{subtitle}</p>}
  </div>
);

// --- Slide Implementations ---

const TitleSlide: React.FC<RendererProps> = ({ slide, onNavigate }) => (
  <SlideContainer center>
    <div className="flex flex-col items-center text-center space-y-8">
      {slide.image && (
        <div className="relative w-full max-w-lg mx-auto mb-4 group perspective-1000">
          <div className="absolute -inset-2 bg-gradient-to-r from-finnish-blue to-finnish-accent opacity-20 blur-2xl rounded-full group-hover:opacity-40 transition duration-1000"></div>
          <img 
            src={slide.image} 
            alt="Finnish Landscape" 
            className="relative w-full h-56 md:h-80 object-cover rounded-3xl shadow-2xl ring-1 ring-white/10 transform group-hover:scale-[1.02] transition duration-700 ease-out" 
          />
        </div>
      )}
      <div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-6 tracking-tight">
          {slide.title}
          </h1>
          <div className="h-1 w-24 bg-finnish-blue mx-auto rounded-full mb-6"></div>
          <h2 className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase">{slide.subtitle}</h2>
      </div>
      <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light">{slide.content}</p>
      
      {onNavigate && (
          <button 
              onClick={() => onNavigate(1)} 
              className="mt-8 px-10 py-4 bg-finnish-blue text-white rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-600 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-3"
          >
              Aloita (Start) <ArrowRight size={20} />
          </button>
      )}
    </div>
  </SlideContainer>
);

const TableOfContentsSlide: React.FC<RendererProps> = ({ slide, onNavigate }) => {
  // Filter out the Title and TOC slides from the list to show lessons
  const lessons = COURSE_CONTENT.slice(2);

  return (
    <SlideContainer>
      <Header title={slide.title} subtitle={slide.subtitle} />
      
      <div className="grid grid-cols-1 gap-3">
        {lessons.map((lesson, idx) => (
          <button
            key={lesson.id}
            onClick={() => onNavigate && onNavigate(idx + 2)}
            className="flex items-center justify-between p-5 bg-finnish-card hover:bg-finnish-surface border border-white/5 rounded-2xl transition-all group active:scale-[0.98] active:bg-finnish-surface/80 hover:border-white/10"
          >
            <div className="flex items-center gap-5 text-left">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-finnish-dark border border-white/5 text-finnish-accent font-mono text-base font-bold shadow-inner shrink-0 group-hover:bg-finnish-blue group-hover:text-white transition-colors">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
              <div>
                  <div className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{lesson.title.replace(/^\d+\.\s*/, '')}</div>
                  <div className="text-sm text-finnish-muted group-hover:text-gray-400 font-light">{lesson.subtitle}</div>
              </div>
            </div>
            <div className="bg-finnish-dark p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 text-white">
              <ArrowRight size={18} />
            </div>
          </button>
        ))}
      </div>
    </SlideContainer>
  );
};

const TextSlide: React.FC<RendererProps> = ({ slide }) => (
  <SlideContainer>
    <Header title={slide.title} subtitle={slide.subtitle} />
    <div className="prose prose-invert prose-lg md:prose-xl text-gray-300 leading-relaxed max-w-none">
      {slide.content?.split('\n').map((line, i) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('###')) return <h3 key={i} className="text-2xl font-bold mt-12 mb-6 text-finnish-blue flex items-center gap-3"><span className="h-8 w-1 bg-finnish-blue rounded-full"></span>{trimmed.replace('###', '')}</h3>;
        if (trimmed.startsWith('*')) return (
          <div key={i} className="flex gap-4 mb-4 ml-1 group pl-2 border-l-2 border-transparent hover:border-white/10 transition-colors py-1">
            <div className="w-2 h-2 rounded-full bg-finnish-accent mt-3 flex-shrink-0 group-hover:bg-white transition-colors shadow-[0_0_10px_#38BDF8]" />
            <p className="flex-1" dangerouslySetInnerHTML={{ 
              __html: trimmed.replace('*', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold text-xl">$1</strong>') 
            }} />
          </div>
        );
        if (trimmed === '') return <div key={i} className="h-4" />;
        
        return (
          <p key={i} className="mb-6 text-lg md:text-xl text-gray-300 font-light" dangerouslySetInnerHTML={{ 
            __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em class="text-finnish-accent not-italic font-medium">$1</em>')
          }} />
        );
      })}
    </div>
    {slide.funFact && <FunFact text={slide.funFact} />}
  </SlideContainer>
);

const VocabularyTableSlide: React.FC<RendererProps> = ({ slide }) => (
  <SlideContainer>
    <Header title={slide.title} subtitle={slide.subtitle} />
    
    <div className="grid gap-3 md:gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {slide.vocabulary?.map((item, idx) => (
        <div key={idx} className="bg-finnish-card p-5 rounded-2xl border border-white/5 hover:border-finnish-accent/40 hover:bg-finnish-surface transition-all flex justify-between items-center group active:scale-[0.99]">
          <div className="flex items-center gap-5 overflow-hidden">
            {item.note && (
              <div className="w-14 h-14 rounded-xl bg-finnish-dark border border-white/5 text-finnish-accent flex items-center justify-center text-xs font-bold shadow-inner shrink-0 text-center leading-tight p-1 group-hover:bg-finnish-blue group-hover:text-white transition-colors">
                 {item.note}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="text-xl font-bold text-white group-hover:text-finnish-accent transition-colors truncate">{item.fi}</span>
              <span className="text-base text-finnish-muted truncate group-hover:text-gray-300">{item.en}</span>
            </div>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const u = new SpeechSynthesisUtterance(item.fi);
              u.lang = 'fi-FI';
              window.speechSynthesis.speak(u);
            }}
            className="p-3 rounded-full text-gray-500 bg-white/5 hover:text-white hover:bg-finnish-blue transition-all active:scale-90 shadow-lg"
            title="Listen"
          >
            <Volume2 size={20} />
          </button>
        </div>
      ))}
    </div>
    {slide.funFact && <FunFact text={slide.funFact} />}
  </SlideContainer>
);

const GrammarCardSlide: React.FC<RendererProps> = ({ slide }) => (
  <SlideContainer>
    <Header title={slide.title} subtitle={slide.subtitle} />

    <div className="bg-finnish-surface/30 p-6 rounded-2xl border border-white/5 mb-10 text-center backdrop-blur-sm">
        <p className="text-gray-200 text-xl font-light leading-relaxed">{slide.content}</p>
    </div>

    <div className="space-y-4">
      {slide.grammarPoints?.map((point, idx) => (
        <div key={idx} className="bg-finnish-card rounded-2xl p-6 shadow-lg border border-white/5 flex flex-col md:flex-row md:items-center gap-6 group hover:border-finnish-blue/30 transition-colors">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-1 h-10 bg-finnish-blue rounded-full shadow-[0_0_10px_#2563EB]"></div>
                <h4 className="text-2xl font-bold text-white">{point.rule}</h4>
            </div>
          </div>
          
          <div className="flex-1 bg-finnish-dark rounded-xl p-5 border border-white/5 group-hover:bg-black/40 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
                <Check size={40} />
            </div>
            <div className="text-finnish-accent font-medium text-lg mb-1">{point.example}</div>
            <div className="text-gray-500 italic font-serif">{point.translation}</div>
          </div>
        </div>
      ))}
    </div>
    {slide.funFact && <FunFact text={slide.funFact} />}
  </SlideContainer>
);

const ImageTextSlide: React.FC<RendererProps> = ({ slide }) => (
  <SlideContainer>
    <Header title={slide.title} subtitle={slide.subtitle} />
    
    {slide.image && (
      <div className="w-full h-56 md:h-80 mb-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
         <div className="absolute inset-0 bg-gradient-to-t from-finnish-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
         <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transform group-hover:scale-105 transition duration-1000" />
      </div>
    )}
    
    <div className="prose prose-invert prose-lg md:prose-xl text-gray-300">
      {slide.content?.split('\n').map((line, i) => {
         const trimmed = line.trim();
         if (!trimmed) return <div key={i} className="h-4" />;
         if (trimmed.startsWith('###')) return <h3 key={i} className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">{trimmed.replace('###', '')}</h3>;
         if (trimmed.startsWith('*')) return (
          <div key={i} className="flex gap-4 mb-4 ml-1 items-start">
             <div className="w-1.5 h-1.5 bg-finnish-accent rounded-full mt-3 shrink-0 shadow-[0_0_8px_#38BDF8]" />
             <span className="text-lg leading-relaxed font-light" dangerouslySetInnerHTML={{ 
               __html: trimmed.replace('*', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white text-xl font-bold">$1</strong>') 
             }} />
          </div>
         );
         return <p key={i} className="mb-4 text-lg font-light leading-relaxed" dangerouslySetInnerHTML={{ __html: trimmed.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />;
      })}
    </div>
    {slide.funFact && <FunFact text={slide.funFact} />}
  </SlideContainer>
);

export const SlideRenderer: React.FC<RendererProps> = (props) => {
  switch (props.slide.type) {
    case SlideType.TITLE: return <TitleSlide {...props} />;
    case SlideType.TABLE_OF_CONTENTS: return <TableOfContentsSlide {...props} />;
    case SlideType.TEXT: return <TextSlide {...props} />;
    case SlideType.VOCABULARY_TABLE: return <VocabularyTableSlide {...props} />;
    case SlideType.GRAMMAR_CARD: return <GrammarCardSlide {...props} />;
    case SlideType.IMAGE_TEXT: return <ImageTextSlide {...props} />;
    default: return <TextSlide {...props} />;
  }
};