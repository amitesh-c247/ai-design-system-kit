import { useState, useEffect } from "react";

// ============================================================================
// ASSETS CONFIGURATION
// ============================================================================
const ASSETS_CONFIG = {
  MOCK_DATA: [
    { id: "1", name: "Asset 1", type: "image", url: "/placeholder1.jpg" },
    { id: "2", name: "Asset 2", type: "document", url: "/placeholder2.pdf" },
  ] as Asset[],
  ERROR_MESSAGE: "Failed to fetch assets",
} as const;

interface Asset {
  id: string;
  name: string;
  type: string;
  url: string;
}

export const useAssets = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      // Mock data for now
      setAssets(ASSETS_CONFIG.MOCK_DATA);
    } catch (err) {
      setError(ASSETS_CONFIG.ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  return {
    assets,
    loading,
    error,
    refetch: fetchAssets,
  };
};

export const useResourceTreeFilter = () => {
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelectionChange = (resources: string[]) => {
    setSelectedResources(resources);
  };

  return {
    selectedResources,
    loading,
    handleSelectionChange,
  };
};

export default useAssets;
