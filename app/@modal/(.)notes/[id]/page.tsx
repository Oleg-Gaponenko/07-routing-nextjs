import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const noteId = Number(id);
  const note = await fetchNoteById(noteId);

  return (
    <Modal isOpen={true} onClose={() => history.back()}>
      <NotePreview note={note} />
    </Modal>
  );
}
