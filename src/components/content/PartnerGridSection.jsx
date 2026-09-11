export default function PartnerCard({ partner }) {
  const imageUrl =
    partner?.imageUrl ||
    partner?.image?.assetUrl ||
    partner?.image?.asset?.url ||
    null;

  const content = imageUrl ? (
    <img
      src={imageUrl}
      alt={partner?.name || "Partner"}
      className="max-h-16 max-w-[180px] object-contain grayscale opacity-70 transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 md:max-h-20 md:max-w-[210px]"
    />
  ) : (
    <span className="font-display text-2xl font-medium text-slate-800 transition-colors duration-300 group-hover:text-[#9A7625]">
      {partner?.name}
    </span>
  );

  const card = (
    <div className="group flex h-40 w-[260px] shrink-0 items-center justify-center rounded-[28px] border border-slate-200/80 bg-white/90 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A227]/60 hover:shadow-xl hover:shadow-[#C9A227]/10 md:h-48 md:w-[300px]">
      {content}
    </div>
  );

  return partner?.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-[28px] outline-none focus:ring-2 focus:ring-[#9A7625]/50"
    >
      {card}
    </a>
  ) : (
    card
  );
}