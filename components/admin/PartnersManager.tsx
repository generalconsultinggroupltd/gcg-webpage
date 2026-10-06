"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { adminFetch } from "@/lib/adminAuth";
import type { Partner } from "@/lib/api";
import { HandshakeIcon, PencilIcon, PlusIcon, TrashIcon } from "@/components/ui/Icons";
import { MediaPicker, MediaPreview } from "./MediaPicker";
import {
  Button,
  ConfirmDialog,
  Field,
  Modal,
  Notice,
  PageHeader,
  errorMessage,
  inputClass,
} from "./ui";

const MAX_NAME = 120;
const MAX_DESCRIPTION = 1000;

/** The partners on the home and partners pages: add, edit (name,
 * description, logo) and delete. */
export function PartnersManager() {
  const [partners, setPartners] = useState<Partner[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Partner | "new" | null>(null);
  const [deleting, setDeleting] = useState<Partner | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const load = useCallback(() => {
    adminFetch<Partner[]>("/api/admin/partners")
      .then((data) => {
        setPartners(data);
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
      await adminFetch(`/api/admin/partners/${deleting.id}`, { method: "DELETE" });
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
        title="Partners"
        description="Logos shown on the home page and the Partners page. Changes appear on the site within a minute."
        action={
          <Button onClick={() => setEditing("new")}>
            <PlusIcon className="h-4 w-4" /> Add a partner
          </Button>
        }
      />

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}
      {!partners && !loadError && <p className="mt-6 text-sm text-muted">Loading…</p>}
      {partners?.length === 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-line bg-white px-6 py-14 text-center">
          <HandshakeIcon className="mx-auto h-10 w-10 text-muted" />
          <p className="mt-3 text-sm text-muted">No partners yet.</p>
        </div>
      )}

      {partners && partners.length > 0 && (
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.id} className="flex flex-col rounded-lg border border-line bg-white shadow-sm">
              <div className="relative h-36 border-b border-line">
                <MediaPreview src={partner.logo_path} type="image" alt={partner.name} contain />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-serif text-lg font-semibold text-navy-950">{partner.name}</h2>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">
                  {partner.description || <span className="italic">No description</span>}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" onClick={() => setEditing(partner)} className="flex-1 py-2">
                    <PencilIcon className="h-4 w-4" /> Edit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDeleteError(null);
                      setDeleting(partner);
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
        <PartnerForm
          partner={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete this partner?"
          message={
            <>
              <strong>{deleting.name}</strong> will be removed from the website. This cannot be undone.
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

function PartnerForm({
  partner,
  onClose,
  onSaved,
}: {
  partner: Partner | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(partner?.name ?? "");
  const [description, setDescription] = useState(partner?.description ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return setError("Please enter the partner's name.");
    if (!partner && !file) return setError("Please choose the partner's logo.");

    const form = new FormData();
    form.append("name", name.trim());
    form.append("description", description.trim());
    if (file) form.append("file", file);

    setBusy(true);
    setError(null);
    try {
      await adminFetch(partner ? `/api/admin/partners/${partner.id}` : "/api/admin/partners", {
        method: partner ? "PUT" : "POST",
        form,
      });
      onSaved();
    } catch (err) {
      setError(errorMessage(err));
      setBusy(false);
    }
  }

  return (
    <Modal title={partner ? `Edit ${partner.name}` : "Add a partner"} onClose={onClose} busy={busy}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <Field label="Name">
          {(id) => (
            <input
              id={id}
              type="text"
              maxLength={MAX_NAME}
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <Field label="Description (optional)" hint="Shown under the logo on the Partners page.">
          {(id) => (
            <textarea
              id={id}
              rows={3}
              maxLength={MAX_DESCRIPTION}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className={inputClass}
            />
          )}
        </Field>
        <MediaPicker
          label={partner ? "Logo (choose a file only to replace it)" : "Logo"}
          allowVideo={false}
          contain
          current={partner ? { path: partner.logo_path, type: "image" } : undefined}
          file={file}
          onChange={(picked, pickError) => {
            setFile(picked);
            setError(pickError);
          }}
        />
        <Notice error={error} />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : partner ? "Save changes" : "Add partner"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
