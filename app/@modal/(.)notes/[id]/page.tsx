'use client';

import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { use, useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { Note } from '@/types/note';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = use(params);
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const noteId = Number(id);
      const loadedNote = await fetchNoteById(noteId);
      setNote(loadedNote);
    };
    fetchNote();
  }, [id]);

  if (!note) return <Loader />;

  return (
    <Modal isOpen={true} onClose={() => history.back()}>
      <NotePreview note={note} />
    </Modal>
  );
}
