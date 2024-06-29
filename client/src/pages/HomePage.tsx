import React, { useEffect, useState } from 'react';

import axios from 'axios'; 

import { Container } from 'react-bootstrap';
import CodeBlockList from '../components/CodeBlockList';
import CodeBlock from "../components/CodeBlockList"

export interface CodeBlock {
  _id: string;
  title: string;
  code:string;
}

const HomePage: React.FC = () => {

  const [codeBlocks, setCodeBlocks] = useState<CodeBlock[]>([]);

  useEffect(() => {
    const fetchCodeBlocks = async () => {
      try {
        const response = await axios.get<CodeBlock[]>('live-code-sessions.up.railway.app/codeblocks'); 
        setCodeBlocks(response.data);
      } catch (error) {
        console.error('Error fetching code blocks:', error);
      }
    };

    fetchCodeBlocks();
  }, []);



  return (
    <Container fluid className="lobby d-flex flex-column justify-content-center align-items-center text-white" style={{ minHeight: '100vh', backgroundColor: '#363636' }}>
      <div>
        <div className="text-center mb-5">
          <h1 className="mb-5">Welcome to Live-Code-Sessions</h1>
          <h2 className="mb-4">Choose Code Block</h2>
        </div> 
        <CodeBlockList codeBlocks={codeBlocks} />
      </div>
    </Container>
  );
};

export default HomePage;
