import { useState, useEffect } from "react";

// ============================================================================
// TAGS CONFIGURATION
// ============================================================================
const TAGS_CONFIG = {
  MOCK_DATA: [
    { id: "1", name: "React", color: "#61dafb", count: 5 },
    { id: "2", name: "TypeScript", color: "#3178c6", count: 3 },
    { id: "3", name: "Storybook", color: "#ff4785", count: 2 },
  ] as Tag[],
  ERROR_MESSAGE: "Failed to fetch tags",
} as const;

interface Tag {
  id: string;
  name: string;
  color: string;
  count?: number;
}

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTags = async () => {
    setLoading(true);
    try {
      // Mock data for now
      setTags(TAGS_CONFIG.MOCK_DATA);
    } catch (err) {
      setError(TAGS_CONFIG.ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return {
    tags,
    loading,
    error,
    refetch: fetchTags,
  };
};

export default useTags;
