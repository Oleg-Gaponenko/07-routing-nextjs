import { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const initialTag = slug?.[0];
  const tag =
    initialTag && initialTag.toLowerCase() !== 'all'
      ? (initialTag as NoteTag)
      : undefined;
  const notesData = await fetchNotes({ tag });

  return <NotesClient initialData={notesData} tag={tag} />;
}
