import { useEffect } from 'react';
import { UseFormSetValue, Path } from 'react-hook-form';

export function useSyncFormValues<T extends object>(defaultValues: Partial<T> | undefined, setValue: UseFormSetValue<T>) {
  useEffect(() => {
    if (defaultValues) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as Path<T>, value as any);
      });
    }
  }, [defaultValues, setValue]);
} 