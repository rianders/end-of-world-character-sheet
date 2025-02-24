// src/App.jsx
import React, { useState, useEffect } from 'react';
import CharacterSheet from './components/CharacterSheet';
import CharacterList from './components/CharacterList';
import BobPreset from './presets/BobPreset';
// Assuming the logo will be in the assets folder
import logoImg from './assets/end-of-world-logo.svg';

function App() {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'view', 'edit', 'create'

  // Load characters from localStorage on component mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem('endOfWorldCharacters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    } else {
      // If no characters exist, add Bob as a preset
      const bobCharacter = BobPreset;
      setCharacters([bobCharacter]);
      localStorage.setItem('endOfWorldCharacters', JSON.stringify([bobCharacter]));
    }
  }, []);

  // Save characters to localStorage whenever they change
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem('endOfWorldCharacters', JSON.stringify(characters));
    }
  }, [characters]);

  const handleCreateCharacter = () => {
    const newCharacter = {
      id: Date.now().toString(),
      name: '',
      physical: {
        dexterity: 3,
        vitality: 3,
        features: ['', '', '', '', '', ''],
        stressResistance: [false, false, false, false, false, false, false, false, false]
      },
      mental: {
        logic: 3,
        willpower: 3,
        features: ['', '', '', '', '', ''],
        stressResistance: [false, false, false, false, false, false, false, false, false]
      },
      social: {
        charisma: 3,
        empathy: 3,
        features: ['', '', '', '', '', ''],
        stressResistance: [false, false, false, false, false, false, false, false, false]
      },
      traumas: [
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' },
        { description: '', severity: '' }
      ],
      equipment: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    };
    setCurrentCharacter(newCharacter);
    setViewMode('edit');
  };

  const handleViewCharacter = (id) => {
    const character = characters.find(char => char.id === id);
    if (character) {
      setCurrentCharacter(character);
      setViewMode('view');
    }
  };

  const handleEditCharacter = (id) => {
    const character = characters.find(char => char.id === id);
    if (character) {
      setCurrentCharacter(character);
      setViewMode('edit');
    }
  };

  const handleSaveCharacter = (updatedCharacter) => {
    const existingIndex = characters.findIndex(char => char.id === updatedCharacter.id);
    
    if (existingIndex >= 0) {
      // Update existing character
      const updatedCharacters = [...characters];
      updatedCharacters[existingIndex] = updatedCharacter;
      setCharacters(updatedCharacters);
    } else {
      // Add new character
      setCharacters([...characters, updatedCharacter]);
    }
    
    setViewMode('list');
  };

  const handleDeleteCharacter = (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      const updatedCharacters = characters.filter(char => char.id !== id);
      setCharacters(updatedCharacters);
      
      if (currentCharacter && currentCharacter.id === id) {
        setCurrentCharacter(null);
        setViewMode('list');
      }
    }
  };

  const handleExportCharacters = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'end-of-world-characters.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportCharacters = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedCharacters = JSON.parse(e.target.result);
        if (Array.isArray(importedCharacters)) {
          const mergedCharacters = [...characters];
          
          // Add imported characters, avoiding duplicates by ID
          importedCharacters.forEach(importedChar => {
            if (!mergedCharacters.some(char => char.id === importedChar.id)) {
              mergedCharacters.push(importedChar);
            }
          });
          
          setCharacters(mergedCharacters);
          alert(`Imported ${importedCharacters.length} characters successfully!`);
        } else {
          alert('Invalid file format. Expected an array of characters.');
        }
      } catch (error) {
        alert('Error importing characters: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100 min-h-screen">
      <div className="text-center mb-4">
        <img src={logoImg} alt="The End of the World" className="h-24 mx-auto" />
      </div>
      
      {viewMode === 'list' && (
        <CharacterList 
          characters={characters}
          onView={handleViewCharacter}
          onEdit={handleEditCharacter}
          onDelete={handleDeleteCharacter}
          onCreate={handleCreateCharacter}
          onExport={handleExportCharacters}
          onImport={handleImportCharacters}
        />
      )}
      
      {(viewMode === 'view' || viewMode === 'edit') && currentCharacter && (
        <div>
          <div className="mb-4">
            <button 
              onClick={() => setViewMode('list')}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 mr-2"
            >
              Back to List
            </button>
            
            {viewMode === 'view' && (
              <button 
                onClick={() => setViewMode('edit')}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit Character
              </button>
            )}
          </div>
          
          <CharacterSheet 
            character={currentCharacter}
            isEditable={viewMode === 'edit'}
            onSave={handleSaveCharacter}
          />
        </div>
      )}
    </div>
  );
}

export default App;