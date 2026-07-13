"use client";

export default function DeleteForm({
  action,
  label = "Delete",
}: {
  action: () => void | Promise<void>;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this?")) e.preventDefault();
      }}
    >
      <button type="submit" className="text-xs font-semibold text-red-600 hover:underline">
        {label}
      </button>
    </form>
  );
}
