export default function SectionHeading({
  heading,
  description,
  dark = false,
}) {
  return (
    <div className="max-w-3xl">
      {heading && (
        <h2
          className={`font-display text-4xl leading-tight md:text-5xl ${
            dark
              ? "text-[#F7F2E8]"
              : "text-[#111111]"
          }`}
        >
          {heading}
        </h2>
      )}

      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-7 ${
            dark
              ? "text-white/55"
              : "text-[#111111]/60"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}