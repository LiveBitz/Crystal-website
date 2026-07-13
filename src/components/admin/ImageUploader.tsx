"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploader({
  name,
  label,
  defaultValue = "",
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [preview, setPreview] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setError("");
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      setUrl(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div className="mt-1.5 flex items-center gap-4">
        {preview ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-sage-200 bg-sage-100">
            <Image src={preview} alt="" fill sizes="80px" className="object-cover" />
          </div>
        ) : (
          <div className="h-20 w-20 shrink-0 rounded-lg border border-dashed border-sage-200 bg-sage-100" />
        )}

        <div className="flex flex-col gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="text-sm text-foreground/70 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-gold-light hover:file:bg-primary-dark"
          />
          {uploading && <p className="text-xs text-foreground/50">Uploading…</p>}
          {error && <p className="text-xs font-medium text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
