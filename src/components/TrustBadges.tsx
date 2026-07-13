import Image from "next/image";

const badges = [
  { label: "AAA Quality Crystals", image: "/icon-natural-crystals.png" },
  { label: "Verified Lab Certificate", image: "/icon-lab-certificate.png" },
  { label: "Cleansed & Energised", image: "/icon-cleansed-energised.png" },
  { label: "Luxury Packaging", image: "/icon-luxury-packaging.png" },
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {badges.map(({ label, image }) => (
        <div key={label} className="flex flex-col items-center gap-2 text-center">
          <span className="relative h-14 w-14 shrink-0">
            <Image src={image} alt="" fill sizes="56px" className="object-contain" />
          </span>
          <p className="text-xs font-semibold leading-tight text-foreground/70">{label}</p>
        </div>
      ))}
    </div>
  );
}
