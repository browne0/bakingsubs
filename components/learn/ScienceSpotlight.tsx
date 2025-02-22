interface Props {
  title: string;
  content: string;
}

export default function ScienceSpotlight({ title, content }: Props) {
  return (
    <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
      <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
        🔬 Science Spotlight: {title}
      </h3>
      <p className="text-blue-800 dark:text-blue-200">{content}</p>
    </div>
  );
}
