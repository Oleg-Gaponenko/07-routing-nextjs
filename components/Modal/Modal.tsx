'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const root = document.getElementById('modal');
    setModalRoot(root);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') router.back();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [router]);

  if (!modalRoot) return null;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) router.back();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
}
