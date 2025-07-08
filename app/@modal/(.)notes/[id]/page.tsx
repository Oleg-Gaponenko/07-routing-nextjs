import { fetchNoteById } from '@/lib/api';
import NotFound from '@/app/not-found';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import NotePreviewModal from './NotePreview.client';

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) return <NotFound />;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState: DehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider dehydratedState={dehydratedState}>
      <NotePreviewModal noteId={noteId} />
    </TanStackProvider>
  );
}
