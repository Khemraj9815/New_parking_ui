"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button} from "@/components/ui/button"; // Assuming you have Input and Label in your UI library
import { Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label"

const parkingArea = () => {
  const [parking_areas, setparkingArea] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Error state with type

  // State to hold form input values
  const [newParkingArea, setNewParkingArea] = useState({
    parkingarea_id: "",
    parking_location: "",
    dzongkhag_id: "",
  });

  useEffect(() => {
    // Fetch dzongkhag data from the backend API
    const fetchparkingArea = async () => {
      try {
        const response = await fetch("http://localhost:9999/parking_areas");
        if (!response.ok) {
          throw new Error("Failed to fetch parking_areas data");
        }
        const data = await response.json();
        console.log("Fetched parking_areas:", data);
        setparkingArea(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchparkingArea();
  }, []);

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewParkingArea({
      ...newParkingArea,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleAddParkingArea = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9999/add_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParkingArea),
      });
      if (!response.ok) {
        throw new Error("Failed to add parking area");
      }
      const data = await response.json();
      console.log("Data added successfully:", data);
      // Optionally, fetch the updated list of parking areas again
      setparkingArea((prev) => [...prev, newParkingArea]);
      setNewParkingArea({
        parkingarea_id: "",
        parking_location: "",
        dzongkhag_id: "",
      }); // Reset the form
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Parking Area</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parkingarea id</TableHead>
            <TableHead>Parking location</TableHead>
            <TableHead>Dzongkhag id</TableHead>
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
      {/* Add Parking Area Form */}
      <form onSubmit={handleAddParkingArea}>
        <div>
          <Label htmlFor="parkingarea_id">Parking Area ID:</Label>
          <Input
            type="text"
            name="parkingarea_id"
            value={newParkingArea.parkingarea_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="parking_location">Parking Location:</Label>
          <Input
            type="text"
            name="parking_location"
            value={newParkingArea.parking_location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dzongkhag_id">Dzongkhag ID:</Label>
          <Input
            type="text"
            name="dzongkhag_id"
            value={newParkingArea.dzongkhag_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" className="mt-6">
          Add Parking Area
        </Button>
      </form>
    </div>
  );
};

export default parkingArea;
