// src/components/CharacterList.jsx
import React from 'react';

const CharacterList = ({ 
  characters, 
  onView, 
  onEdit, 
  onDelete, 
  onCreate,
  onExport,
  onImport
}) => {
  return (
    <div className="bg-white shadow-md rounded p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Characters</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onCreate}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            New Character
          </button>
          
          <button 
            onClick={onExport}
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
              onChange={onImport}
            />
          </label>
        </div>
      </div>
      
      {characters.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No characters yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {characters.map(character => (
            <div key={character.id} className="border rounded p-4 bg-gray-50 hover:bg-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{character.name || 'Unnamed Character'}</h3>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => onView(character.id)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => onEdit(character.id)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => onDelete(character.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <span className="font-semibold">Physical:</span>
                  <div className="flex space-x-1">
                    <div title="Dexterity" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.physical.dexterity}
                    </div>
                    <div title="Vitality" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.physical.vitality}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">Mental:</span>
                  <div className="flex space-x-1">
                    <div title="Logic" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.mental.logic}
                    </div>
                    <div title="Willpower" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.mental.willpower}
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">Social:</span>
                  <div className="flex space-x-1">
                    <div title="Charisma" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.social.charisma}
                    </div>
                    <div title="Empathy" className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center font-bold">
                      {character.social.empathy}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 text-sm">
                <span className="font-semibold">Traumas:</span> {character.traumas.filter(t => t.description).length}
              </div>
              
              <div className="mt-2 text-sm">
                <span className="font-semibold">Equipment:</span> {character.equipment.filter(e => e).length} items
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterList;
