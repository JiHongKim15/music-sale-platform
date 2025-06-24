import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  DialogProps,
} from '@mui/material';
import { X } from 'lucide-react';
import { Button } from './Button';

interface ModalProps extends Omit<DialogProps, 'onClose'> {
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showActions?: boolean;
  children: React.ReactNode;
}

export function Modal({
  title,
  onClose,
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  showActions = true,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog
      onClose={onClose}
      {...props}
      PaperProps={{
        sx: {
          borderRadius: '0.5rem',
          width: '100%',
          maxWidth: '600px',
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {title}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'text.secondary',
            }}
          >
            <X />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
      {showActions && (
        <DialogActions sx={{ padding: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            {cancelText}
          </Button>
          {onConfirm && (
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
} 