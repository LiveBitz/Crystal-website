import ImageUploader from "@/components/admin/ImageUploader";

type Defaults = { name: string; imageUrl: string | null; order: number; active: boolean };

export default function CategoryForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Defaults;
}) {
  return (
    <form action={action} className="mt-6 flex max-w-lg flex-col gap-5">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Category name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="e.g. Wealth, Love, Protection"
          className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <ImageUploader
        name="imageUrl"
        label="Category image"
        defaultValue={defaultValues?.imageUrl ?? ""}
      />

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
