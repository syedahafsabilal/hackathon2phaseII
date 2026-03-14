import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <>
      {/* Navbar - fixed, static, full width, h-20, no motion */}
      <nav
        className="fixed top-0 left-0 w-full h-20 px-6 flex items-center z-[100] shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C)',
          backgroundSize: '500% 500%',
          textAlign: 'left',
          transform: 'none',
          animation: 'none',
        }}
      >
        <div className="flex items-center gap-3" style={{ textAlign: 'left' }}>
          {/* Logo circle - light purple glitter with white X */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-bold !text-white text-2xl leading-none animate-logo-glitter"
            style={{
              backgroundImage: 'linear-gradient(135deg, #0F1B4C, #1E3A8A, #2563EB, #1E3A8A, #0F1B4C )',
              backgroundSize: '500% 500%',
              color: 'white',
              flexShrink: 0,
              minWidth: '6rem',
              minHeight: '4rem',
            }}
          >
            
          </div>
           <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
             <span className="text-white font-bold text-lg">X</span>
           </div>
          <span className="text-xl font-bold !text-white leading-none" style={{ color: 'white', textAlign: 'left' }}>
            TodoAppX
          </span>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="px-4 pt-16 pb-20">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main heading - white, bold, large, centered */}
          <h1 className="text-4xl md:text-6xl font-bold !text-white mb-6">
            Boost Your Productivity with{' '}
            <span className="!text-white">Smart Task Management</span>
          </h1>

          {/* Vertical gap - approximately one viewport slide */}
          <div className="h-[50vh]" />

          {/* Paragraph - white, smaller, centered */}
          <p className="text-lg md:text-xl !text-white mb-10 max-w-2xl mx-auto">
            Our modern todo application helps you organize your tasks, focus on what matters,
            and achieve your goals with a beautifully designed, intuitive interface.
          </p>

          {/* Get Started Free button */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/auth/sign-up">
              <Button
                size="lg"
                className="
                  px-8 py-4 text-white
                  bg-[#1E3A8A]
                  rounded-xl
                  font-bold
                  animate-glitter
                "
              >
                Get Started Free
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border">
          <div className="bg-muted border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
            <span className="!text-white">App Preview</span>
          </div>
        </div>
      </section>
    </>
  );
};
