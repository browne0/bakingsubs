interface ScienceTopic {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
}

interface ScienceSectionProps {
  title: string;
  description: string;
  topics: ScienceTopic[];
  conclusion: {
    title: string;
    content: string;
    image: string;
    imageAlt: string;
  };
}

export default function ScienceSection({
  title,
  description,
  topics,
  conclusion,
}: ScienceSectionProps) {
  return (
    <section id="science" className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">{description}</p>

        <div className="space-y-16">
          {topics.map((topic, index) => (
            <div
              key={topic.title}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? '' : 'md:[direction:rtl]'
              }`}
            >
              <div className="aspect-square relative overflow-hidden rounded-lg max-w-md mx-auto w-full">
                <img
                  src={topic.image}
                  alt={topic.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className={`flex gap-4 ${index % 2 === 1 ? 'md:[direction:ltr]' : ''}`}>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    {topic.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{topic.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 md:pr-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {conclusion.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">{conclusion.content}</p>
          </div>

          <div className="relative bg-white p-3 rotate-2 shadow-lg md:w-72 flex-shrink-0">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={conclusion.image}
                alt={conclusion.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
