import { useParams, Navigate } from 'react-router-dom';

export default function ResearchSlugRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/bitcoin-media-research/${slug || ''}`} replace />;
}
