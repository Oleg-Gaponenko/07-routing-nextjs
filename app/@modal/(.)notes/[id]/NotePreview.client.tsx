'use client';

import AbsentDataMessage from '@/components/AbsentDataMessage/AbsentDataMessage';
import Loader from '@/components/Loader/Loader';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function NotePreviewModal() {
  const params = useParams();
  const id = Number(params?.id);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading)
    return (
      <Modal>
        <Loader />
      </Modal>
    );

  if (isError || !note)
    return (
      <Modal>
        <AbsentDataMessage />
      </Modal>
    );

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
