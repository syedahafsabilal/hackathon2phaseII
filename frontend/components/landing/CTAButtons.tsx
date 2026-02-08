import { Button } from '../ui/Button';

export const CTAButtons = () => {
  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
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
    </section>
  );
};