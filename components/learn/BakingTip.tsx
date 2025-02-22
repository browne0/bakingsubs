interface Props {
  title: string;
  content: string;
}

export default function BakingTip({ title, content }: Props) {
  return (
    <div className="my-8 p-6 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-100 dark:border-amber-800">
      <h3 className="text-xl font-semibold text-amber-900 dark:text-amber-100 mb-3">💡 {title}</h3>
      <p className="text-amber-800 dark:text-amber-200">{content}</p>
    </div>
  );
}
