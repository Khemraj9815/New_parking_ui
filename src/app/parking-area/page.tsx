"use client";
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

import {
    Button,
    } from "@/components/ui/button";

const DzongkhagList = () => {
  const [parking_areas, setDzongkhags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state with type

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchDzongkhags = async () => {
      try {
        const response = await fetch("http://localhost:9999/parking_areas");
        if (!response.ok) {
          throw new Error("Failed to fetch parking_areas data");
        }
        const data = await response.json();
        console.log("Fetched parking_areas:", data);
        setDzongkhags(data);
        setLoading(false);
      } catch (error: any) {
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
      <h1>Parking Area</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>parkingarea_id</TableHead>
            <TableHead>parking_location</TableHead>
            <TableHead>dzongkhag_id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parking_areas.map((parking_areas: any) => (
            <TableRow key={parking_areas.parkingarea_id}>
              <TableCell className="font-medium">
                {parking_areas.parkingarea_id}
              </TableCell>
              <TableCell>{parking_areas.parking_location}</TableCell>
              <TableCell>{parking_areas.dzongkhag_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button className="">ADD</Button>
    </div>
  );
};

export default DzongkhagList;
