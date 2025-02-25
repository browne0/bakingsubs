'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploadProps {
  onChange?: (file: File | null) => void;
  value?: File | null;
  className?: string;
  existingUrl?: string;
}

export function FileUpload({ onChange, value, className, existingUrl }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingUrl || null);

  // Handle initial value and value changes
  useEffect(() => {
    if (value) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (existingUrl) {
      setPreview(existingUrl);
    }
  }, [value, existingUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onChange?.(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    if (preview && !existingUrl) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn('flex items-center justify-center w-full cursor-pointer', className)}
    >
      <div
        className={cn(
          'flex flex-col items-center justify-center w-full rounded-lg transition-colors',
          preview ? 'h-auto p-4' : 'h-64 border-2 border-dashed',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600'
        )}
      >
        {preview ? (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-black/5">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
          </div>
        )}
        <input {...getInputProps()} />
      </div>
    </div>
  );
}
