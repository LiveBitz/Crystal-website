import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-sage-200 bg-white p-8 shadow-sm">
        <h1 className="text-center font-serif text-2xl font-semibold text-foreground">
          Crystalenii <span className="text-primary">Admin</span>
        </h1>
        <p className="mt-1 text-center text-sm text-foreground/60">
          Enter the admin password to continue.
        </p>

        <form action={login} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next ?? "/crystal171admin"} />
          <div>
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="mt-1.5 w-full rounded-md border border-sage-200 px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600">Incorrect password. Try again.</p>
          )}

          <button
            type="submit"
            className="mt-2 rounded-md bg-primary py-2.5 text-sm font-semibold uppercase tracking-wide text-gold-light transition-colors hover:bg-primary-dark"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
