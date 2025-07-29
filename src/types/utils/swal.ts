import Swal, { SweetAlertIcon } from 'sweetalert2';

export default Swal;

export async function confirmDialog({
  title = 'Are you sure?',
  text = '',
  confirmButtonText = 'Yes',
  cancelButtonText = 'Cancel',
  icon = 'warning',
  confirmButtonColor = '#dc3545',
}: {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: SweetAlertIcon;
  confirmButtonColor?: string;
} = {}): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor,
  });
  return !!result.isConfirmed;
} 