import { confirmDialog } from "./swal";

export async function handleDeleteAction({
  id,
  mutation,
  t,
  setToast,
  confirmTitle,
  confirmButtonText,
  cancelButtonText,
  successMessage,
  errorMessage,
}: {
  id: number;
  mutation: (id: number) => Promise<any>;
  t: (key: string) => string;
  setToast: (toast: { show: boolean; message: string; variant: "success" | "danger" }) => void;
  confirmTitle?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
}) {
  const confirmed = await confirmDialog({
    title: confirmTitle || t("confirmDelete"),
    confirmButtonText: confirmButtonText || t("delete"),
    cancelButtonText: cancelButtonText || t("cancel"),
  });
  if (!confirmed) return;
  try {
    await mutation(id);
    setToast({
      show: true,
      message: successMessage || t("messages.userDeleted"),
      variant: "success",
    });
  } catch (err: any) {
    setToast({
      show: true,
      message: err?.message || errorMessage || t("messages.error"),
      variant: "danger",
    });
  }
} 