import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Alert, ListGroup, Badge } from 'react-bootstrap';

import Navbar from './components/Navbar';
import EventCard from './components/EventCard';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';

// ---------------------------------------------------------------------------
// Event data (Task 2) – no hardcoded data inside components
// ---------------------------------------------------------------------------
const initialEvents = [
  { id: 1, title: 'Coding Competition',  desc: 'Solve algorithmic problems under time pressure', category: 'Tech',   seats: 2 },
  { id: 2, title: 'Gaming Tournament',   desc: 'Compete in multiplayer games',                   category: 'Sports', seats: 1 },
  { id: 3, title: 'Singing Competition', desc: 'Showcase your vocal talent',                     category: 'Arts',   seats: 3 },
  { id: 4, title: 'Hackathon',           desc: 'Build a project in 24 hours',                    category: 'Tech',   seats: 2 },
  { id: 5, title: 'Debate Competition',  desc: 'Argue and persuade on trending topics',          category: 'Arts',   seats: 1 },
];

// ---------------------------------------------------------------------------
// App – maintains global state (Task 3)
// ---------------------------------------------------------------------------
function App() {
  // Global registration state
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [registeredEvents, setRegisteredEvents]     = useState([]);

  // Mirror of each event's remaining seats in App so we can sort (Bonus)
  const [eventSeats, setEventSeats] = useState(
    initialEvents.reduce((acc, e) => ({ ...acc, [e.id]: e.seats }), {})
  );

  // Filter & search state (Task 5)
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery,  setSearchQuery]  = useState('');

  // -----------------------------------------------------------------------
  // Called by EventCard when a registration happens
  // -----------------------------------------------------------------------
  const handleRegister = (title, id) => {
    setTotalRegistrations(prev => prev + 1);
    setRegisteredEvents(prev => [...prev, title]);
    setEventSeats(prev => ({ ...prev, [id]: prev[id] - 1 }));
  };

  // -----------------------------------------------------------------------
  // Derive filtered + searched + sorted event list
  // -----------------------------------------------------------------------
  const visibleEvents = initialEvents
    .filter(e => activeFilter === 'All' || e.category === activeFilter)                 // category filter
    .filter(e => e.title.toLowerCase().includes(searchQuery.toLowerCase()))             // search filter (Bonus)
    .sort((a, b) => eventSeats[a.id] - eventSeats[b.id]);                              // sort by seats asc (Bonus)

  // Bonus: check if every event is full
  const allEventsFull = initialEvents.every(e => eventSeats[e.id] === 0);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      {/* Task 1: Navbar receives totalRegistrations as prop */}
      <Navbar totalRegistrations={totalRegistrations} />

      <Container className="mt-4 flex-grow-1">

        {/* ----------------------------------------------------------------
            Task 5 – Registration summary
        ---------------------------------------------------------------- */}
        <div className="p-3 mb-4 bg-white rounded shadow-sm">
          <h4 className="mb-2">Total Registrations: {totalRegistrations}</h4>

          {registeredEvents.length > 0 ? (
            <>
              <p className="fw-semibold mb-1">Your Registered Events:</p>
              <ListGroup horizontal="sm" className="flex-wrap">
                {registeredEvents.map((title, i) => (
                  <ListGroup.Item key={i} className="py-1 px-2 me-1 mb-1 rounded">
                    <Badge bg="success" className="me-1">{i + 1}</Badge>
                    {title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          ) : (
            <p className="text-muted mb-0">No events registered yet.</p>
          )}
        </div>

        {/* Bonus: All events full alert */}
        {allEventsFull && (
          <Alert variant="danger" className="text-center fw-bold fs-5">
            🚫 All Events Are Full
          </Alert>
        )}

        {/* ----------------------------------------------------------------
            Task 5 – Filter buttons + Bonus search bar
        ---------------------------------------------------------------- */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* ----------------------------------------------------------------
            Tasks 2, 3, 4 – Event cards in responsive grid
        ---------------------------------------------------------------- */}
        <Row>
          {visibleEvents.length === 0 ? (
            <p className="text-center text-muted mt-3">No events match your filter.</p>
          ) : (
            visibleEvents.map(event => (
              <EventCard
                key={event.id}
                title={event.title}
                desc={event.desc}
                category={event.category}
                seats={event.seats}        // initial seats (EventCard initializes state from this)
                onRegister={(title) => handleRegister(title, event.id)}
              />
            ))
          )}
        </Row>

      </Container>

      {/* Task 1: Footer */}
      <Footer />
    </div>
  );
}

export default App;
