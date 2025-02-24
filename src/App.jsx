import React, { useState, useEffect } from 'react';

const CharacterSheet = () => {
  const [characters, setCharacters] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState({
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
  });
  const [savedMessage, setSavedMessage] = useState('');

  // Load characters from localStorage on component mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem('endOfWorldCharacters');
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
  }, []);

  const handleChange = (section, field, value) => {
    setCurrentCharacter({
      ...currentCharacter,
      [section]: {
        ...currentCharacter[section],
        [field]: value
      }
    });
  };

  const handleNestedChange = (section, field, index, value) => {
    const updatedArray = [...currentCharacter[section][field]];
    updatedArray[index] = value;
    
    setCurrentCharacter({
      ...currentCharacter,
      [section]: {
        ...currentCharacter[section],
        [field]: updatedArray
      }
    });
  };

  const handleTraumaChange = (index, field, value) => {
    const updatedTraumas = [...currentCharacter.traumas];
    updatedTraumas[index] = {
      ...updatedTraumas[index],
      [field]: value
    };
    
    setCurrentCharacter({
      ...currentCharacter,
      traumas: updatedTraumas
    });
  };

  const handleStressChange = (section, index, checked) => {
    const updatedStress = [...currentCharacter[section].stressResistance];
    updatedStress[index] = checked;
    
    setCurrentCharacter({
      ...currentCharacter,
      [section]: {
        ...currentCharacter[section],
        stressResistance: updatedStress
      }
    });
  };

  const handleEquipmentChange = (index, value) => {
    const updatedEquipment = [...currentCharacter.equipment];
    updatedEquipment[index] = value;
    
    setCurrentCharacter({
      ...currentCharacter,
      equipment: updatedEquipment
    });
  };

  const saveCharacter = () => {
    // Check if we're updating an existing character or creating a new one
    const existingIndex = characters.findIndex(char => char.id === currentCharacter.id);
    
    let updatedCharacters;
    if (existingIndex >= 0) {
      // Update existing character
      updatedCharacters = [...characters];
      updatedCharacters[existingIndex] = currentCharacter;
    } else {
      // Add new character
      updatedCharacters = [...characters, currentCharacter];
    }
    
    // Save to state and localStorage
    setCharacters(updatedCharacters);
    localStorage.setItem('endOfWorldCharacters', JSON.stringify(updatedCharacters));
    
    // Show saved message
    setSavedMessage('Character saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const createNewCharacter = () => {
    setCurrentCharacter({
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
    });
  };

  const loadCharacter = (id) => {
    const characterToLoad = characters.find(char => char.id === id);
    if (characterToLoad) {
      setCurrentCharacter(characterToLoad);
    }
  };

  const deleteCharacter = (id) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      const updatedCharacters = characters.filter(char => char.id !== id);
      setCharacters(updatedCharacters);
      localStorage.setItem('endOfWorldCharacters', JSON.stringify(updatedCharacters));
      
      // If we deleted the current character, create a new one
      if (currentCharacter.id === id) {
        createNewCharacter();
      }
    }
  };

  const renderStatDial = (section, statName, value) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-sm font-bold uppercase mb-1">{statName}</div>
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 border-2 border-gray-700 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              {statName === 'dexterity' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>}
              {statName === 'vitality' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>}
              {statName === 'logic' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>}
              {statName === 'willpower' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>}
              {statName === 'charisma' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>}
              {statName === 'empathy' && <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>}
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <select 
              value={value} 
              onChange={(e) => handleChange(section, statName, parseInt(e.target.value))}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <div className="flex w-full justify-between px-2 pointer-events-none">
              <div className="text-xs font-bold flex flex-col items-center">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
              </div>
              <div className="text-xs font-bold flex flex-col items-center">
                <div>5</div>
                <div>4</div>
                <div>3</div>
                <div>2</div>
                <div>1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFeatures = (section, features) => {
    return (
      <div className="mt-3">
        <div className="text-sm font-bold uppercase mb-1">Features</div>
        <div className="border border-gray-700 p-2">
          {features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleNestedChange(section, 'features', index, e.target.value)}
              className="w-full mb-1 border-b border-gray-300 focus:outline-none focus:border-gray-500"
              placeholder={`Feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderStressResistance = (section) => {
    const stressResistance = currentCharacter[section].stressResistance;
    
    return (
      <div className="mt-3">
        <div className="text-sm font-bold uppercase mb-1">Stress & Resistance</div>
        <div className="border border-gray-700">
          {[3, 2, 1].map((level) => (
            <div key={level} className="flex items-center border-b border-gray-300 last:border-b-0 p-1">
              <div className="bg-gray-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                {level}
              </div>
              <div className="flex space-x-1">
                {[0, 1, 2].map((box) => {
                  const index = (3 - level) * 3 + box;
                  return (
                    <input
                      key={box}
                      type="checkbox"
                      checked={stressResistance[index] || false}
                      onChange={(e) => handleStressChange(section, index, e.target.checked)}
                      className="w-6 h-6 border border-gray-400"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTraumas = () => {
    return (
      <div className="mt-4 border border-gray-700 p-2">
        <div className="text-sm font-bold uppercase mb-2 bg-gray-700 text-white p-1 text-center">
          Traumas
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {currentCharacter.traumas.map((trauma, index) => (
            <div key={index} className="border-b border-gray-300 pb-1">
              <input
                type="text"
                value={trauma.description}
                onChange={(e) => handleTraumaChange(index, 'description', e.target.value)}
                className="w-full mb-1 focus:outline-none focus:border-gray-500"
                placeholder="Trauma description"
              />
              <div className="flex space-x-1 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`trauma-${index}`}
                    checked={trauma.severity === '1D'}
                    onChange={() => handleTraumaChange(index, 'severity', '1D')}
                    className="mr-1"
                  />
                  <span className="text-xs border border-gray-500 px-1 rounded">1D</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`trauma-${index}`}
                    checked={trauma.severity === '1W'}
                    onChange={() => handleTraumaChange(index, 'severity', '1W')}
                    className="mr-1"
                  />
                  <span className="text-xs border border-gray-500 px-1 rounded">1W</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`trauma-${index}`}
                    checked={trauma.severity === '1M'}
                    onChange={() => handleTraumaChange(index, 'severity', '1M')}
                    className="mr-1"
                  />
                  <span className="text-xs border border-gray-500 px-1 rounded">1M</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderEquipment = () => {
    return (
      <div className="mt-4 border border-gray-700 p-2">
        <div className="text-sm font-bold uppercase mb-2">
          Equipment
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {currentCharacter.equipment.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              onChange={(e) => handleEquipmentChange(index, e.target.value)}
              className="border-b border-gray-300 mb-1 focus:outline-none focus:border-gray-500"
              placeholder={`Item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderCharacterList = () => {
    if (characters.length === 0) {
      return <p className="text-gray-500 italic">No saved characters yet.</p>;
    }

    return (
      <div className="mt-4">
        <h3 className="font-bold text-lg mb-2">Saved Characters</h3>
        <div className="max-h-64 overflow-y-auto">
          {characters.map((char) => (
            <div key={char.id} className="flex justify-between items-center p-2 border-b">
              <span className="font-medium">{char.name || 'Unnamed Character'}</span>
              <div>
                <button 
                  onClick={() => loadCharacter(char.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-blue-600"
                >
                  Load
                </button>
                <button 
                  onClick={() => deleteCharacter(char.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const exportCharacters = () => {
    const dataStr = JSON.stringify(characters, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'end-of-world-characters.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importCharacters = (event) => {
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
          localStorage.setItem('endOfWorldCharacters', JSON.stringify(mergedCharacters));
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
      <div className="text-center text-2xl font-bold mb-4">THE END OF THE WORLD</div>
      
      <div className="bg-white p-4 shadow-md rounded">
        <div className="flex justify-between mb-4">
          <button 
            onClick={createNewCharacter}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            New Character
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={exportCharacters}
              className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
            >
              Export All
            </button>
            <label className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 cursor-pointer">
              Import
              <input 
                type="file" 
                accept=".json" 
                className="hidden"
                onChange={importCharacters}
              />
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">NAME:</label>
          <input
            type="text"
            value={currentCharacter.name}
            onChange={(e) => setCurrentCharacter({...currentCharacter, name: e.target.value})}
            className="w-full border border-gray-300 p-2 focus:outline-none focus:border-gray-500"
            placeholder="Character Name"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 p-3">
            <div className="bg-gray-600 text-white text-center font-bold py-1 mb-3">PHYSICAL</div>
            <div className="flex justify-between">
              {renderStatDial('physical', 'dexterity', currentCharacter.physical.dexterity)}
              {renderStatDial('physical', 'vitality', currentCharacter.physical.vitality)}
            </div>
            {renderFeatures('physical', currentCharacter.physical.features)}
            {renderStressResistance('physical')}
          </div>
          
          <div className="border border-gray-200 p-3">
            <div className="bg-gray-600 text-white text-center font-bold py-1 mb-3">MENTAL</div>
            <div className="flex justify-between">
              {renderStatDial('mental', 'logic', currentCharacter.mental.logic)}
              {renderStatDial('mental', 'willpower', currentCharacter.mental.willpower)}
            </div>
            {renderFeatures('mental', currentCharacter.mental.features)}
            {renderStressResistance('mental')}
          </div>
          
          <div className="border border-gray-200 p-3">
            <div className="bg-gray-600 text-white text-center font-bold py-1 mb-3">SOCIAL</div>
            <div className="flex justify-between">
              {renderStatDial('social', 'charisma', currentCharacter.social.charisma)}
              {renderStatDial('social', 'empathy', currentCharacter.social.empathy)}
            </div>
            {renderFeatures('social', currentCharacter.social.features)}
            {renderStressResistance('social')}
          </div>
        </div>
        
        {renderTraumas()}
        {renderEquipment()}
        
        <div className="mt-4 text-center">
          {savedMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded">
              {savedMessage}
            </div>
          )}
          <button 
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
            onClick={saveCharacter}
          >
            Save Character
          </button>
        </div>
        
        {renderCharacterList()}
      </div>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Character Sheet for "The End of the World" RPG
      </div>
    </div>
  );
};

// Standalone SPA wrapper
const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <CharacterSheet />
    </div>
  );
};

export default App;
