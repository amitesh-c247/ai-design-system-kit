import { useState, useEffect } from 'react';

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
      const mockAssets: Asset[] = [
        { id: '1', name: 'Asset 1', type: 'image', url: '/placeholder1.jpg' },
        { id: '2', name: 'Asset 2', type: 'document', url: '/placeholder2.pdf' },
      ];
      setAssets(mockAssets);
    } catch (err) {
      setError('Failed to fetch assets');
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