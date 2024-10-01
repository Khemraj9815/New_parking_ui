'use client';
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const DzongkhagList = () => {
  const [dzongkhags, setDzongkhags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchDzongkhags = async () => {
        try {
            const response = await fetch("http://localhost:9999/dzongkhags");
            if (!response.ok) {
                throw new Error("Failed to fetch dzongkhag data");
            }
            const data = await response.json();
            setDzongkhags(data);
            setLoading(false);
        } catch (error: any) { // Add type annotation to specify 'error' as type 'any'
            setError(error.message);
            setLoading(false);
        }
    };

    fetchDzongkhags();
  }, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

return (
  <div>
    <h1>Dzongkhag List</h1>
    <Table>
      <TableCaption>A list of all 20 Dzongkhags.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Dzongkhag_id</TableHead>
          <TableHead>Dzongkhag_name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>Thimphu</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
);
};

export default DzongkhagList;
