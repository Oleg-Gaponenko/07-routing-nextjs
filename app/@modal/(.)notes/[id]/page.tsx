import { fetchNoteById } from '@/lib/api';
import NotePreview from '@/components/NotePreview/NotePreview';
import { Note } from '@/types/note';
import NotFound from '@/app/not-found';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const noteId = Number(id);
  const note: Note = await fetchNoteById(noteId);

  if (isNaN(noteId)) return NotFound();

  return <NotePreview note={note} />;
}
