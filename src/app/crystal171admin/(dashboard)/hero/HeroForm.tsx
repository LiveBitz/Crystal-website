import ImageUploader from "@/components/admin/ImageUploader";

export default function HeroForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: {
    imageUrl: string;
    mobileImageUrl: string | null;
    order: number;
    active: boolean;
  };
}) {
  return (
    <form action={action} className="mt-6 flex max-w-lg flex-col gap-5">
      <div>
        <ImageUploader
          name="imageUrl"
          label="Desktop banner image"
          defaultValue={defaultValues?.imageUrl}
        />
        <p className="mt-1.5 text-xs text-foreground/50">
          Recommended ratio 21:9 (e.g. 2520×1080px) — used on tablet and desktop screens.
        </p>
      </div>

      <div>
        <ImageUploader
          name="mobileImageUrl"
          label="Mobile banner image (optional)"
          defaultValue={defaultValues?.mobileImageUrl ?? ""}
        />
        <p className="mt-1.5 text-xs text-foreground/50">
          Recommended ratio 4:3 (e.g. 1200×900px) — shown on phone screens instead of the
          desktop image above. Leave empty to reuse the desktop image on mobile too.
        </p>
      </div>

      <div>
        <label htmlFor="order" className="text-sm font-medium text-foreground">
          Order
        </label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={defaultValues?.order ?? 0}
          className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <input
          type="checkbox"
          name="active"
          defaultChecked={defaultValues?.active ?? true}
          className="h-4 w-4 rounded border-sage-200 text-primary focus:ring-primary"
        />
        Active (visible on the site)
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-md bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-gold-light transition-colors hover:bg-primary-dark"
      >
        Save
      </button>
    </form>
  );
}
