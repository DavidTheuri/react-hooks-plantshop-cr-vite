import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // This holds all the plants from the server
  const [plants, setPlants] = useState([]);
  
  // This holds whatever the user types in the search bar
  const [search, setSearch] = useState("");

  // When the page loads, fetch the plants from the backend
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  // Filter the plants based on the search text
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add a new plant to the list when the form is submitted
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  return (
    <main>
      {/* The form needs this function to update the page */}
      <NewPlantForm onAddPlant={handleAddPlant} />
      
      {/* The search bar controls the 'search' state */}
      <Search search={search} setSearch={setSearch} />
      
      {/* The list only shows the filtered plants */}
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;