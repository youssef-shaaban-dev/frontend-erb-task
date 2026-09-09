import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload, File as FileIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface FileUploadZoneProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export function FileUploadZone({ files, onChange }: FileUploadZoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange([...files, ...acceptedFiles]);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024, // 10MB
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  const removeFile = (indexToRemove: number) => {
    onChange(files.filter((_, index) => index !== indexToRemove));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-colors cursor-pointer text-center flex flex-col items-center justify-center",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/10 hover:bg-muted/30"
        )}
      >
        <input {...getInputProps()} />
        <div className="bg-primary/10 p-3 rounded-full mb-4">
          <CloudUpload className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm font-medium text-foreground mb-1">
          اسحب وأفلت الملفات هنا أو <span className="text-primary hover:underline">استعرض جهازك</span>
        </p>
        <p className="text-xs text-muted-foreground">
          يدعم PDF, JPG, PNG بحجم أقصى 10MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-md border border-border bg-background shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-muted p-2 rounded-md">
                  <FileIcon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none mb-1 line-clamp-1">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
