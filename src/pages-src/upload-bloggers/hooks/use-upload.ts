import { useState } from 'react';
import { useMutation } from 'react-query';
import { saveBloggerPlatformCsv } from '../api';
import { enqueueSnackbar } from 'notistack';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: saveBloggerPlatformCsv,
    onMutate: () => {
      setIsUploading(true);
    },
    onSuccess: () => {
      enqueueSnackbar('Файл успешно загружен', { variant: 'success' });
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || 'Ошибка при загрузке файла';
      enqueueSnackbar(message, { variant: 'error' });
    },
    onSettled: () => {
      setIsUploading(false);
    }
  });

  return {
    isUploading,
    upload: mutateAsync
  };
}; 