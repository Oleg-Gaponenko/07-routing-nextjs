import { NoteTag } from '@/types/note';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const slug = await params;
  const tag = slug[0] as NoteTag | undefined;
  const allTags = tag !== 'all';
  const notesData = await fetchNotes({ tag: allTags ? tag : undefined });
  return <NotesClient initialData={notesData} />;
}
