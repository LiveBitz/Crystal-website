import ImageUploader from "@/components/admin/ImageUploader";

type Defaults = {
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  section: string;
  order: number;
  active: boolean;
};

export default function ProductForm({
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
          Product name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description (shown on the product page)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="What this crystal does, how it feels to wear, what makes it special..."
          className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <ImageUploader
        name="imageUrl"
        label="Product image"
        defaultValue={defaultValues?.imageUrl ?? ""}
      />

      <div>
        <label htmlFor="section" className="text-sm font-medium text-foreground">
          Section
        </label>
        <select
          id="section"
          name="section"
          defaultValue={defaultValues?.section ?? "BESTSELLER"}
          className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        >
          <option value="BESTSELLER">Bestselling Products</option>
          <option value="NEW_ARRIVAL">New Arrivals</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="text-sm font-medium text-foreground">
            Price (₹)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            required
            defaultValue={defaultValues?.price}
            className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="originalPrice" className="text-sm font-medium text-foreground">
            Original price (₹)
          </label>
          <input
            id="originalPrice"
            name="originalPrice"
            type="number"
            defaultValue={defaultValues?.originalPrice ?? undefined}
            className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="rating" className="text-sm font-medium text-foreground">
            Rating (1–5)
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            defaultValue={defaultValues?.rating ?? 5}
            className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="reviews" className="text-sm font-medium text-foreground">
            Review count
          </label>
          <input
            id="reviews"
            name="reviews"
            type="number"
            defaultValue={defaultValues?.reviews ?? 0}
            className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
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
