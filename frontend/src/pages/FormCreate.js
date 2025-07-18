import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormCreate.css";

export default function FormCreate() {
  const [title, setTitle] = useState("Job Application");
  const [sections, setSections] = useState([
    { name: "Section 1", fields: [] }
  ]);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const [showAddInput, setShowAddInput] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [draggedFieldIndex, setDraggedFieldIndex] = useState(null);
  const [dragOverFieldIndex, setDragOverFieldIndex] = useState(null);
  const navigate = useNavigate();

  const addSection = () => {
    if (sections.length >= 10) {
      alert("Maximum of 10 sections allowed.");
      return;
    }
    const newSection = { name: `Section ${sections.length + 1}`, fields: [] };
    setSections([...sections, newSection]);
    setSelectedSectionIndex(sections.length);
  };

  const removeSection = (index) => {
    if (sections.length === 1) {
      alert("At least one section is required.");
      return;
    }
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
    setSelectedSectionIndex(Math.max(0, selectedSectionIndex - (index < selectedSectionIndex ? 1 : 0)));
  };

  const renameSection = (index, newName) => {
    const updatedSections = [...sections];
    updatedSections[index].name = newName;
    setSections(updatedSections);
  };

  const addField = (type) => {
    if (sections[selectedSectionIndex].fields.length >= 20) {
      alert("Maximum of 20 inputs per section allowed.");
      return;
    }
    const newField = {
      id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      type,
      label: "",
      placeholder: "",
    };
    const updatedSections = [...sections];
    updatedSections[selectedSectionIndex].fields.push(newField);
    setSections(updatedSections);
    setShowAddInput(false);
    setSelectedField(newField);
  };

  const handleEditField = (field) => {
    setSelectedField(field);
  };

  const handleDeleteField = (fieldIndex) => {
    const updatedSections = [...sections];
    updatedSections[selectedSectionIndex].fields.splice(fieldIndex, 1);
    setSections(updatedSections);
    setSelectedField(null);
  };

  const handleFieldChange = (key, value) => {
    if (!selectedField) return;
    const updatedSections = [...sections];
    const idx = updatedSections[selectedSectionIndex].fields.findIndex(f => f.id === selectedField.id);
    if (idx !== -1) {
      updatedSections[selectedSectionIndex].fields[idx][key] = value;
      setSections(updatedSections);
      setSelectedField({ ...updatedSections[selectedSectionIndex].fields[idx] });
    }
  };

  const handleTitleEdit = () => {
    setEditingTitle(true);
  };
  const handleTitleSave = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setEditingTitle(false);
    }
  };

  const handleDragStart = (index) => {
    setDraggedFieldIndex(index);
  };

  const handleDragOver = (index, e) => {
    e.preventDefault();
    setDragOverFieldIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedFieldIndex === null || draggedFieldIndex === index) return;
    const updatedSections = [...sections];
    const fields = updatedSections[selectedSectionIndex].fields;
    const [moved] = fields.splice(draggedFieldIndex, 1);
    fields.splice(index, 0, moved);
    updatedSections[selectedSectionIndex].fields = fields;
    setSections(updatedSections);
    setDraggedFieldIndex(null);
    setDragOverFieldIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedFieldIndex(null);
    setDragOverFieldIndex(null);
  };

  const saveForm = async () => {
    if (!title) {
      return alert("Title is required");
    }
    try {
      await axios.post("http://localhost:3050/api/form/create", { title, sections });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const currentSection = sections[selectedSectionIndex] || { fields: [] };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "40px" }}>Create New Form</h1>
      <div className="formcreate-container">
      
        <div className="formcreate-left">
          <div className="formcreate-title-row">
            {editingTitle ? (
              <input
                className="formcreate-editor-input"
                value={title}
                autoFocus
                onChange={e => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleSave}
                style={{ fontSize: '2rem', fontWeight: 'bold', width: '70%' }}
              />
            ) : (
              <>
                {title}
                <span className="formcreate-edit-icon" onClick={handleTitleEdit}>
                  ✎
                </span>
              </>
            )}
          </div>
          
          <div className="formcreate-section-tabs">
            {sections.map((section, idx) => (
              <div
                key={idx}
                className={`formcreate-section-tab${selectedSectionIndex === idx ? ' active' : ''}`}
                onClick={() => setSelectedSectionIndex(idx)}
              >
                <input
                  className="formcreate-section-name"
                  value={section.name}
                  onChange={e => renameSection(idx, e.target.value)}
                  style={{ fontWeight: 'bold', width: '80px', marginRight: '8px' }}
                />
                <span
                  className="formcreate-section-remove"
                  onClick={e => { e.stopPropagation(); removeSection(idx); }}
                  style={{ color: '#d32f2f', cursor: 'pointer', marginLeft: '4px' }}
                >
                  ✕
                </span>
              </div>
            ))}
            <button className="formcreate-add-section-btn" onClick={addSection} style={{ marginLeft: '12px' }}>+ Add Section</button>
          </div>
          <div className="formcreate-fields-grid">
            {currentSection.fields.map((field, fieldIndex) => (
              <div
                className="formcreate-field-card"
                key={field.id}
                onClick={() => handleEditField(field)}
                style={{
                  border: selectedField && selectedField.id === field.id ? "2px solid #1976d2" : undefined,
                  opacity: draggedFieldIndex === fieldIndex ? 0.5 : 1,
                  background: dragOverFieldIndex === fieldIndex ? "#e3f2fd" : undefined,
                  cursor: "grab"
                }}
                draggable
                onDragStart={() => handleDragStart(fieldIndex)}
                onDragOver={e => handleDragOver(fieldIndex, e)}
                onDrop={() => handleDrop(fieldIndex)}
                onDragEnd={handleDragEnd}
              >
                <span className="formcreate-drag" style={{ cursor: "grab" }}>⋮⋮</span>
                <span className="formcreate-label">{field.label}</span>
                <span
                  className="formcreate-field-edit"
                  onClick={e => { e.stopPropagation(); handleEditField(field); }}
                >
                  ✎
                </span>
                <span
                  className="formcreate-field-delete"
                  onClick={e => { e.stopPropagation(); handleDeleteField(fieldIndex); }}
                >🗑️</span>
              </div>
            ))}
          </div>
          
          
          {!showAddInput ? (
            <button className="formcreate-add-btn" onClick={() => setShowAddInput(true)}>
              ADD INPUT
            </button>
          ) : (
            <div>
              <button className="formcreate-close-btn" onClick={() => setShowAddInput(false)}>
                CLOSE ADD INPUT
              </button>
              <div className="formcreate-input-types">
                {["text", "number", "email", "password", "date"].map(type => (
                  <button
                    key={type}
                    className="formcreate-type-btn"
                    onClick={() => addField(type)}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        
        <div className="formcreate-right">
          <div className="formcreate-editor-title">Form Editor</div>
          {selectedField ? (
            <div>
              <div className="formcreate-editor-label">Title</div>
              <input
                className="formcreate-editor-input"
                value={selectedField.label}
                onChange={e => handleFieldChange("label", e.target.value)}
              />
              <div className="formcreate-editor-label">Placeholder</div>
              <input
                className="formcreate-editor-placeholder"
                value={selectedField.placeholder}
                onChange={e => handleFieldChange("placeholder", e.target.value)}
              />
              <div className="formcreate-select-editor">Type: {selectedField.type}</div>
            </div>
          ) : (
            <div style={{ color: "#888", marginTop: "40px" }}>Select a field to edit</div>
          )}
        </div>
      </div>
      <button className="formcreate-create-btn" onClick={saveForm}>
        CREATE FORM
      </button>
    </div>
  );
}