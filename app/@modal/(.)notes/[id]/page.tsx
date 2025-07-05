import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Note } from '@/types/note';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const noteId = Number(id);
  const note: Note = await fetchNoteById(noteId);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
