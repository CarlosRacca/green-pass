'use client'

import { ReactNode } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Trash2, CheckCircle, Info } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  isLoading?: boolean
  children?: ReactNode
}

export function ConfirmationModal({ isOpen, onClose, onConfirm, title, description, confirmText = 'Confirmar', cancelText = 'Cancelar', variant = 'default', isLoading = false, children }: ConfirmationModalProps) {
  const getIcon = () => {
    switch (variant) {
      case 'destructive':
        return <Trash2 className="h-6 w-6 text-red-600" />
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      default:
        return <Info className="h-6 w-6 text-blue-600" />
    }
  }

  const getButtonVariant = () => {
    switch (variant) {
      case 'destructive':
        return 'destructive' as const
      default:
        return 'default' as const
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            {getIcon()}
            <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-sm text-muted-foreground mt-2">{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {children && <div className="py-4">{children}</div>}

        <AlertDialogFooter className="flex gap-2 sm:gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              {cancelText}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={getButtonVariant()} onClick={onConfirm} disabled={isLoading}>
              {isLoading ? 'Procesando...' : confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

interface DeleteConfirmationProps { isOpen: boolean; onClose: () => void; onConfirm: () => void; itemName: string; itemType?: string; isLoading?: boolean }
export function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName, itemType = 'elemento', isLoading }: DeleteConfirmationProps) {
  return (
    <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} title={`Eliminar ${itemType}`} description={`¿Estás seguro de que deseas eliminar "${itemName}"? Esta acción no se puede deshacer.`} confirmText="Eliminar" cancelText="Cancelar" variant="destructive" isLoading={isLoading} />
  )
}

interface SaveConfirmationProps { isOpen: boolean; onClose: () => void; onConfirm: () => void; hasUnsavedChanges?: boolean; isLoading?: boolean }
export function SaveConfirmation({ isOpen, onClose, onConfirm, hasUnsavedChanges = true, isLoading }: SaveConfirmationProps) {
  return (
    <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} title="Guardar cambios" description={hasUnsavedChanges ? 'Tienes cambios sin guardar. ¿Deseas guardar antes de continuar?' : '¿Deseas guardar los cambios realizados?'} confirmText="Guardar" cancelText="Descartar" variant="success" isLoading={isLoading} />
  )
}

interface LogoutConfirmationProps { isOpen: boolean; onClose: () => void; onConfirm: () => void; isLoading?: boolean }
export function LogoutConfirmation({ isOpen, onClose, onConfirm, isLoading }: LogoutConfirmationProps) {
  return (
    <ConfirmationModal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} title="Cerrar sesión" description="¿Estás seguro de que deseas cerrar tu sesión? Tendrás que iniciar sesión nuevamente para acceder." confirmText="Cerrar sesión" cancelText="Cancelar" variant="warning" isLoading={isLoading} />
  )
}


