import { UseFormSetValue, Path } from "react-hook-form";

export function setFormValues<T extends object>(
  initialData: Partial<T> | undefined,
  initialValues: Partial<T>,
  setValue: UseFormSetValue<T>
) {
  if (!initialData || !initialValues || !setValue) return;

  Object.keys(initialValues).forEach((key) => {
    const value =
      initialData?.[key as keyof T] ?? initialValues[key as keyof T];
    if (value !== undefined) {
      setValue(key as Path<T>, value as any);
    }
  });
}

export const isValidJsonString = (str: string) => {
  if (!str) {
    return false;
  }
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
