"use client";

import { useCallback, useEffect, useState } from "react";

interface UseServerTableParams {
  endpoint: string;
}

export function useServerTableData<T>({ endpoint }: UseServerTableParams) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); // Default 10 rows per page
  const [totalRows, setTotalRows] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${endpoint}?page=${page}&limit=${pageSize}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.items || []);
      setTotalRows(result.total || 0);
    } catch (error) {
      console.error("Failed to fetch server-side table data:", error);
      setData([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    refetch: fetchData,
  };
}
