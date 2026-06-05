import React from 'react';
import { ButtonGroup, Button, InputGroup, Form, Row, Col } from 'react-bootstrap';

const CATEGORIES = ['All', 'Tech', 'Sports', 'Arts'];

// FilterBar renders category filter buttons + a search bar (bonus)
function FilterBar({ activeFilter, onFilterChange, searchQuery, onSearchChange }) {
  return (
    <Row className="mb-4 g-2 align-items-center">
      {/* Category filter buttons */}
      <Col xs={12} md="auto">
        <ButtonGroup>
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={activeFilter === cat ? 'dark' : 'outline-dark'}
              onClick={() => onFilterChange(cat)}
            >
              {cat}
            </Button>
          ))}
        </ButtonGroup>
      </Col>

      {/* Search input (Bonus) */}
      <Col xs={12} md={5} className="ms-md-auto">
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <Button variant="outline-secondary" onClick={() => onSearchChange('')}>
              ✕
            </Button>
          )}
        </InputGroup>
      </Col>
    </Row>
  );
}

export default FilterBar;
