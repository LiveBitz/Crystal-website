import Image from "next/image";
import ImageUploader from "@/components/admin/ImageUploader";

type Defaults = { name: string; imageUrl: string | null; order: number; active: boolean };

type ProductOption = {
  id: string;
  name: string;
  imageUrl: string | null;
  section: string;
};

const sectionLabel: Record<string, string> = {
  BESTSELLER: "Bestselling Products",
  NEW_ARRIVAL: "New Arrivals",
};

export default function CategoryForm({
  action,
  defaultValues,
  allProducts,
  selectedProductIds = [],
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Defaults;
  allProducts: ProductOption[];
  selectedProductIds?: string[];
}) {
  const selected = new Set(selectedProductIds);
  const bySection = allProducts.reduce<Record<string, ProductOption[]>>((acc, p) => {
    (acc[p.section] ??= []).push(p);
    return acc;
  }, {});

  return (
    <form action={action} className="mt-6 flex max-w-2xl flex-col gap-5">
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
          className="mt-1.5 w-full max-w-lg rounded-md border border-sage-200 px-3 py-2 text-sm focus:border-primary focus:outline-none"
        />
      </div>

      <ImageUploader
        name="imageUrl"
        label="Category image"
        defaultValue={defaultValues?.imageUrl ?? ""}
      />

      <div className="grid max-w-lg grid-cols-2 gap-4">
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

      <div>
        <p className="text-sm font-medium text-foreground">Products in this category</p>
        <p className="mt-0.5 text-xs text-foreground/50">
          Only the products checked below will show up when a customer clicks this category on
          the homepage.
        </p>

        {allProducts.length === 0 ? (
          <p className="mt-3 text-sm text-foreground/50">
            No products yet — add some under Products first.
          </p>
        ) : (
          <div className="mt-3 flex flex-col gap-5">
            {Object.entries(bySection).map(([section, products]) => (
              <div key={section}>
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
                  {sectionLabel[section] ?? section}
                </p>
                <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {products.map((product) => (
                    <label
                      key={product.id}
                      className="flex items-center gap-3 rounded-md border border-sage-200 px-3 py-2 text-sm hover:bg-sage-50"
                    >
                      <input
                        type="checkbox"
                        name="productIds"
                        value={product.id}
                        defaultChecked={selected.has(product.id)}
                        className="h-4 w-4 shrink-0 rounded border-sage-200 text-primary focus:ring-primary"
                      />
                      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded bg-sage-100">
                        {product.imageUrl && (
                          <Image
                            src={product.imageUrl}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        )}
                      </span>
                      <span className="truncate text-foreground/80">{product.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-2 w-fit rounded-md bg-primary px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-gold-light transition-colors hover:bg-primary-dark"
      >
        Save
      </button>
    </form>
  );
}
