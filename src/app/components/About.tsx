"use client";

import React, { useState, useEffect } from 'react';


const About = () => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const command = 'cat ./about.txt';
  const content = `
Ciao! Sono Vincenzo, un laureando nella facoltà di Informatica 
all\'Università degli Studi di Bari Aldo Moro.
Il mio principale obiettivo è quello di espandere le mie competenze
tecniche continuamente.
Ho una solida base in programmazione, algoritmi e strutture dati soprattutto 
in linguaggi OOP come Java.
La mia curiosità mi ha spinto verso lo sviluppo web, dove oggi sperimento 
con JavaScript, TypeScript e React e strumenti affini.
Utilizzo Node.js per la logica server-side 
e Git per un controllo di versione impeccabile.`;
  const fullText = `$ ${command}\n${content}`;

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
        setInterval(() => setShowCursor(show => !show), 500);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [fullText]);

  return (
    <section 
      id="about" 
      className="py-20 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-primary-text mb-12">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-700 p-3 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-grow text-center text-sm text-gray-400">
                vincxsh
              </div>
            </div>
            <div className="p-6 font-mono text-white text-sm sm:text-base">
              <pre className="whitespace-pre-wrap">
                {text}
                {showCursor && <span className="bg-white w-2 h-4 inline-block animate-pulse"></span>}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
