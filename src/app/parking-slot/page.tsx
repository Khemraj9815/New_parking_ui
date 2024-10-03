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

const parkingSlots = () => {
  const [parking_slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state with type

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchSlots = async () => {
      try {
        const response = await fetch("http://localhost:9999/parking_slots");
        if (!response.ok) {
          throw new Error("Failed to fetch parking_slots data");
        }
        const data = await response.json();
        console.log("Fetched parking_slots:", data);
        setSlots(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Parking slots</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Serial number</TableHead>
            <TableHead>Slot id</TableHead>
            <TableHead>Parking Detail id</TableHead>
            <TableHead>Is Occupied</TableHead>
            <TableHead>Arrival Time</TableHead>
            <TableHead>Departure Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parking_slots.map((parking_slots: any) => (
            <TableRow key={parking_slots.slot_id}>
              <TableCell className="font-medium">
                {parking_slots.serial_number}
              </TableCell>
              <TableCell>{parking_slots.slot_id}</TableCell>
              <TableCell>{parking_slots.parkingdetail_id}</TableCell>
              <TableCell>{parking_slots.is_occupied}</TableCell>
              <TableCell>{parking_slots.arrival_time}</TableCell>
              <TableCell>{parking_slots.departure_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default parkingSlots;
