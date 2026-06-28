import Reveal from './Reveal';

/** Consistent section header: small eyebrow label + large title + optional subtitle. */
export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-2xl text-center">
      {eyebrow && (
        <span className="text-brand-500 mb-3 inline-block text-sm font-semibold tracking-widest uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </Reveal>
  );
}
