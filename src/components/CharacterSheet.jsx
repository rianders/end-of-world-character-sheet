// src/components/CharacterSheet.jsx
import React, { useState, useEffect } from 'react';

const CharacterSheet = ({ character: initialCharacter, isEditable, onSave }) => {
  const [character, setCharacter] = useState(initialCharacter);
  const [savedMessage, setSavedMessage] = useState('');

  // Update state when props change
  useEffect(() => {
    setCharacter(initialCharacter);
  }, [initialCharacter]);

  const handleChange = (section, field, value) => {
    if (!isEditable) return;
    
    setCharacter({
      ...character,
      [section]: {
        ...character[section],
        [field]: value
      }
    });
  };

  const handleNestedChange = (section, field, index, value) => {
    if (!isEditable) return;
    
    const updatedArray = [...character[section][field]];
    updatedArray[index] = value;
    
    setCharacter({
      ...character,
      [section]: {
        ...character[section],
        [field]: updatedArray
      }
    });
  };

  const handleTraumaChange = (index, field, value) => {
    if (!isEditable) return;
    
    const updatedTraumas = [...character.traumas];
    updatedTraumas[index] = {
      ...updatedTraumas[index],
      [field]: value
    };
    
    setCharacter({
      ...character,
      traumas: updatedTraumas
    });
  };

  const handleStressChange = (section, index, checked) => {
    if (!isEditable) return;
    
    const updatedStress = [...character[section].stressResistance];
    updatedStress[index] = checked;
    
    setCharacter({
      ...character,
      [section]: {
        ...character[section],
        stressResistance: updatedStress
      }
    });
  };

  const handleEquipmentChange = (index, value) => {
    if (!isEditable) return;
    
    const updatedEquipment = [...character.equipment];
    updatedEquipment[index] = value;
    
    setCharacter({
      ...character,
      equipment: updatedEquipment
    });
  };

  const handleSaveCharacter = () => {
    onSave(character);
    setSavedMessage('Character saved successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
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
            {isEditable ? (
              <select 
                value={value} 
                onChange={(e) => handleChange(section, statName, parseInt(e.target.value))}
                className="absolute opacity-0 w-full h-full cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            ) : null}
            <div className="pointer-events-none">
              <div className="text-xl font-bold">{value}</div>
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
            isEditable ? (
              <input
                key={index}
                type="text"
                value={feature}
                onChange={(e) => handleNestedChange(section, 'features', index, e.target.value)}
                className="w-full mb-1 border-b border-gray-300 focus:outline-none focus:border-gray-500"
                placeholder={`Feature ${index + 1}`}
              />
            ) : (
              <div key={index} className="mb-1 border-b border-gray-300 pb-1 last:border-b-0 last:pb-0">
                {feature || <span className="text-gray-400 italic">No feature</span>}
              </div>
            )
          ))}
        </div>
      </div>
    );
  };

  const renderStressResistance = (section) => {
    const stressResistance = character[section].stressResistance;
    
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
                  return isEditable ? (
                    <input
                      key={box}
                      type="checkbox"
                      checked={stressResistance[index] || false}
                      onChange={(e) => handleStressChange(section, index, e.target.checked)}
                      className="w-6 h-6 border border-gray-400"
                    />
                  ) : (
                    <div
                      key={box}
                      className={`w-6 h-6 border border-gray-400 ${stressResistance[index] ? 'bg-gray-700' : 'bg-white'}`}
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
          {character.traumas.map((trauma, index) => (
            <div key={index} className="border-b border-gray-300 pb-1">
              {isEditable ? (
                <>
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
                </>
              ) : (
                trauma.description ? (
                  <>
                    <div className="font-medium mb-1">{trauma.description}</div>
                    <div className="flex space-x-1 mt-1">
                      <span className={`text-xs border border-gray-500 px-1 rounded ${trauma.severity === '1D' ? 'bg-gray-200' : ''}`}>1D</span>
                      <span className={`text-xs border border-gray-500 px-1 rounded ${trauma.severity === '1W' ? 'bg-gray-200' : ''}`}>1W</span>
                      <span className={`text-xs border border-gray-500 px-1 rounded ${trauma.severity === '1M' ? 'bg-gray-200' : ''}`}>1M</span>
                    </div>
                  </>
                ) : null
              )}
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
          {character.equipment.map((item, index) => (
            isEditable ? (
              <input
                key={index}
                type="text"
                value={item}
                onChange={(e) => handleEquipmentChange(index, e.target.value)}
                className="border-b border-gray-300 mb-1 focus:outline-none focus:border-gray-500"
                placeholder={`Item ${index + 1}`}
              />
            ) : (
              <div key={index} className="border-b border-gray-300 mb-1 pb-1">
                {item || <span className="text-gray-400 italic">Empty slot</span>}
              </div>
            )
          ))}
        </div>
      </div>
      
      {isEditable && (
        <div className="mt-4 text-center">
          {savedMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mb-4 rounded">
              {savedMessage}
            </div>
          )}
          <button 
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 focus:outline-none"
            onClick={handleSaveCharacter}
          >
            Save Character
          </button>
        </div>
      )}
    </div>
  );
};

export default CharacterSheet;