import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import AdoptedPetContext from "./AdoptedPetContext";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "../fetchRequests/fetchPet";
import Carousel from "./Carousel";
import Modal from "./Modal";

const Details = () => {
  // State to keep track of modal visibility
  const [showModal, setShowModal] = useState(false);

  // Programatically navigates user when activated
  const navigate = useNavigate();

  // Context for adopted pet
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  // Get the id from the URL parameters
  const { id } = useParams();

  // Fetch pet data based on id
  const results = useQuery(["details", id], fetchPet);

  // Loading spinner
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  // Set pet data
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        {/* Carousel */}
        <Carousel images={pet.images} />
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>

        {/* Modal */}
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  // On "Yes" set pet and navigate to home page
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  // On "No" close modal
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

// Error Boundary
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
