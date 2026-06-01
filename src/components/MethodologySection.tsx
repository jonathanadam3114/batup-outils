interface MethodologyBlock {
  heading: string;
  body: string;
}

interface MethodologySectionProps {
  title: string;
  intro?: string;
  blocks: MethodologyBlock[];
}

export function MethodologySection({ title, intro, blocks }: MethodologySectionProps) {
  return (
    <section className="bg-white pt-14 pb-20 lg:pt-20 lg:pb-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-gray-600">{intro}</p>}
        <div className="mt-10 space-y-8">
          {blocks.map((block) => (
            <div key={block.heading}>
              <h3 className="text-xl font-semibold text-gray-900">{block.heading}</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-600">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
