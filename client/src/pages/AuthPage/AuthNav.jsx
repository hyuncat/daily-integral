import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';

function AuthNav({ activeKey, setActiveKey }) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20px', marginTop: '30px'}}>
      <Nav variant="underline" activeKey={activeKey} onSelect={(selectedKey) => setActiveKey(selectedKey)}>
        <Nav.Item>
          <Nav.Link href="/login">login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/signup">signup</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default AuthNav;