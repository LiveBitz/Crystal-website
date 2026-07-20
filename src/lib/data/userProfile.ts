import { d1Exec, d1QueryFirst } from "@/lib/d1";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getUserProfileById(id: string): Promise<UserProfile | null> {
  return d1QueryFirst<UserProfile>(`SELECT * FROM UserProfile WHERE id = ?`, [id]);
}

export async function getUserProfileByEmail(email: string): Promise<UserProfile | null> {
  return d1QueryFirst<UserProfile>(`SELECT * FROM UserProfile WHERE email = ?`, [email]);
}

/** Create the profile row if it doesn't exist yet; otherwise leave it untouched. */
export async function ensureUserProfile(data: {
  id: string;
  name: string;
  email: string;
}): Promise<UserProfile> {
  await d1Exec(
    `INSERT INTO UserProfile (id, name, email) VALUES (?, ?, ?)
     ON CONFLICT (id) DO NOTHING`,
    [data.id, data.name, data.email],
  );
  const profile = await getUserProfileById(data.id);
  return profile as UserProfile;
}

type AddressFields = {
  phone: string | null;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
};

/** Update address/phone fields, creating the profile row first if needed. */
export async function upsertUserProfileFields(
  data: { id: string; name: string; email: string } & AddressFields,
): Promise<void> {
  await ensureUserProfile(data);
  await d1Exec(
    `UPDATE UserProfile
     SET phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?,
         updatedAt = strftime('%Y-%m-%dT%H:%M:%fZ','now')
     WHERE id = ?`,
    [
      data.phone, data.addressLine1, data.addressLine2, data.city,
      data.state, data.postalCode, data.country, data.id,
    ],
  );
}
