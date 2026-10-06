"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/adminAuth";
import type { GalleryItem } from "@/lib/api";
import { ImagesIcon, PencilIcon, PlusIcon, TrashIcon, VideoIcon } from "@/components/ui/Icons";
import { MediaPicker, MediaPreview } from "./MediaPicker";
import {
  Button,
  ConfirmDialog,
  Field,
  Modal,
  Notice,
  PageHeader,
  errorMessage,
  formatDate,
  inputClass,
} from "./ui";

const MAX_DESCRIPTION = 500;

/** The gallery page's photos and videos (the previous admin's "Status"):
 * add, edit (description and/or media) and delete. */
export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  // null: closed; "new": adding; an item: editing it.
  const [editing, setEditing] = useState<GalleryItem | "new" | null>(null);
  const [deleting, setDeleting] = useState<GalleryItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = useCallback(() => {
    adminFetch<GalleryItem[]>("/api/admin/gallery")
      .then((data) => {
        setItems(data);
        setLoadError(null);
      })
      .catch((err) => setLoadError(errorMessage(err)));
  }, []);

  useEffect(load, [load]);

  async function confirmDelete() {
    if (!deleting) return;
    setDeleteBusy(true);
    setDeleteError(null);
    try {
      await adminFetch(`/api/admin/gallery/${deleting.id}`, { method: "DELETE" });
      setDeleting(null);
      load();
    } catch (err) {
      setDeleteError(errorMessage(err));
    } finally {
      setDeleteBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Gallery"
        description="Photos and videos on the website's Gallery page. Changes appear on the site within a minute."
        action={
          <Button onClick={() => setEditing("new")}>
            <PlusIcon className="h-4 w-4" /> Add photo or video
          </Button>
        }
      />

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}
      {!items && !loadError && <p className="mt-6 text-sm text-muted">Loading…</p>}
      {items?.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
          <ImagesIcon className="mx-auto h-10 w-10 text-muted" />
          <p className="mt-3 text-sm text-muted">No photos or videos yet.</p>
        </div>
      )}

      {items && items.length > 0 && (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-navy-950">
                <MediaPreview src={item.path} type={item.media_type} alt={item.description} />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted uppercase">
                  {item.media_type === "video" ? <VideoIcon className="h-4 w-4" /> : <ImagesIcon className="h-4 w-4" />}
                  {item.media_type === "video" ? "Video" : "Photo"} · {formatDate(item.created_at)}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink">{item.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" onClick={() => setEditing(item)} className="flex-1 py-2">
                    <PencilIcon className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDeleteError(null);
                      setDeleting(item);
                    }}
                    className="flex-1 py-2 hover:!border-red-500 hover:!text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {editing && (
        <GalleryForm
          item={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this item?"
          message={
            <>
              This {deleting.media_type === "video" ? "video" : "photo"} will be removed from the website.
              This cannot be undone.
            </>
          }
          confirmLabel="Delete"
          busy={deleteBusy}
          error={deleteError}
          onConfirm={confirmDelete}
          onCancel={() => setDeleting(null)}
        />
      )}
    </div>
  );
}

function GalleryForm({
  item,
  onClose,
  onSaved,
}: {
  item: GalleryItem | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [description, setDescription] = useState(item?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!description.trim()) return setError("Please enter a description.");
    if (!item && !file) return setError("Please choose a photo or a video.");

    const form = new FormData();
    form.append("description", description.trim());
    if (file) form.append("file", file);

    setBusy(true);
    setError(null);
    try {
      await adminFetch(item ? `/api/admin/gallery/${item.id}` : "/api/admin/gallery", {
        method: item ? "PUT" : "POST",
        form,
      });
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <Modal title={item ? "Edit gallery item" : "Add a photo or video"} onClose={onClose} busy={busy}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <MediaPicker
          label={item ? "Photo or video (choose a file only to replace it)" : "Photo or video"}
          allowVideo
          current={item ? { path: item.path, type: item.media_type } : undefined}
          file={file}
          onChange={(picked, pickError) => {
            setFile(picked);
            setError(pickError);
          }}
        />
        <Field label="Description" hint={`${description.length}/${MAX_DESCRIPTION} characters`}>
          {(id) => (
            <textarea
              id={id}
              rows={3}
              maxLength={MAX_DESCRIPTION}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What does this photo or video show?"
              className={inputClass}
            />
          )}
        </Field>
        <Notice error={error} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? (file ? "Uploading…" : "Saving…") : item ? "Save changes" : "Add to gallery"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
