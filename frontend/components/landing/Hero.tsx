import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Boost Your Productivity with <span className="text-primary">Smart Task Management</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Our modern todo application helps you organize your tasks, focus on what matters,
          and achieve your goals with a beautifully designed, intuitive interface.
        </p>

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
          <span className="text-muted-foreground">App Preview</span>
        </div>
      </div>
    </section>
  );
};