import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import getQueryClient from '@/lib/getQueryClient';
import NoteDetails from './NoteDetails.client';

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: NoteDetailsProps) {
  const { id } = await params;
  const noteId = Number(id);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetails />
    </HydrationBoundary>
  );
}
