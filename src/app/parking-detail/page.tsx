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

const parkingDetail = () => {
  const [parking_details, setparkingDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state with type

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchparkingDetail = async () => {
      try {
        const response = await fetch("http://localhost:9999/parking_details");
        if (!response.ok) {
          throw new Error("Failed to fetch parking_details data");
        }
        const data = await response.json();
        console.log("Fetched parking_details:", data);
        setparkingDetail(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchparkingDetail();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Parking Details</h1>
      <h2>Total parking slot:  </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>parkingdetail_id</TableHead>
            <TableHead>parkingarea_id</TableHead>
            <TableHead>total_parking_slot</TableHead>
            <TableHead>vehiclein-parking</TableHead>
            <TableHead>free_parking_slot</TableHead>
            <TableHead>current_time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parking_details.map((parking_details: any) => (
            <TableRow key={parking_details.parkingdetail_id}>
              <TableCell className="font-medium">
                {parking_details.parkingdetail_id}
              </TableCell>
              <TableCell>{parking_details.parkingarea_id}</TableCell>
              <TableCell>{parking_details.total_parking_slot}</TableCell>
              <TableCell>{parking_details.vehiclein_parking}</TableCell>
              <TableCell>{parking_details.free_parking_slot}</TableCell>
              <TableCell>{parking_details.current_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default parkingDetail;
