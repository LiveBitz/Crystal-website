import HeroForm from "../HeroForm";
import { createHeroSlide } from "../actions";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Hero Banner</h1>
      <HeroForm action={createHeroSlide} />
    </div>
  );
}
