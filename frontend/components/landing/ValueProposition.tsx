'use client';

export const ValueProposition = () => {
  const featureBoxes = [
    {
      emoji: "✨",
      title: "Intuitive Interface",
      description: [
        "Clean, modern design that makes task management effortless and enjoyable."
      ]
    },
    {
      emoji: "📊",
      title: "Smart Organization",
      description: [
        "Categorize and prioritize tasks with our intelligent system."
      ]
    },
    {
      emoji: "🔄",
      title: "Cross-Device Sync",
      description: [
        "Access your tasks anywhere, anytime with seamless synchronization."
      ]
    },
    {
      emoji: "",
      title: "Ready to Transform Your Productivity?",
      description: [
        "Join thousands of users who have already improved their task management workflow."
      ]
    }
  ]; // <-- no empty line or comment after this line

  return (
    <section className="py-10 w-full">
      <div className="container mx-auto px-4 space-y-6">
        {featureBoxes.map((box, index) => (
          <div
            key={index}
            className="bg-[#1E3A8A] rounded-xl p-6"
          >
            <div className="flex items-start">
              {box.emoji && (
                <span className="text-3xl mr-4 mt-1 flex-shrink-0">{box.emoji}</span>
              )}
              <div>
                <h3 className="text-xl font-bold text-white">{box.title}</h3>
                {box.description.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-base text-white">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
