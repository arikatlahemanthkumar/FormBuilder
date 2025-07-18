import {useState,useEffect} from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import "./FormViewer.css"

export default function FormViewer(){
    const {id} = useParams()
    const [form,setForm] = useState(null)
    const [responses,setResponses] = useState({})
    const [errors, setErrors] = useState({})

    useEffect(()=>{
        const fetchForm = async () => {
            try {
                const res = await axios.get(`http://localhost:3050/api/form/${id}`);
                setForm(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchForm();
    },[id])

    const handleChange = (sectionIndex , fieldIndex , value) =>{
        setResponses({
            ...responses,
            [`${sectionIndex}-${fieldIndex}`]:value
        })
    }

    const validate = () => {
        const newErrors = {};
        if (!form) return newErrors;
        form.sections.forEach((section, secIndex) => {
            section.fields.forEach((field, fieldIndex) => {
                const key = `${secIndex}-${fieldIndex}`;
                const value = responses[key] || '';
                
                if (!value) {
                    newErrors[key] = 'This field is required';
                    return;
                }
                
                if (field.type === 'email') {
                    
                    const atIndex = value.indexOf('@');
                    const dotIndex = value.lastIndexOf('.');
                    if (atIndex < 1 || dotIndex < atIndex + 2 || dotIndex === value.length - 1) {
                        newErrors[key] = 'Invalid email address';
                    }
                } else if (field.type === 'number') {
                    if (isNaN(value)) {
                        newErrors[key] = 'Must be a number';
                    }
                } else if (field.type === 'date') {
                    if (isNaN(Date.parse(value))) {
                        newErrors[key] = 'Invalid date';
                    }
                }
            });
        });
        return newErrors;
    }

    const handleSubmit = ()=>{
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            alert('Please fix validation errors before submitting.');
            return;
        }
        console.log("Form responses:" , responses)
        alert("submitted Successfully")
    }

    if(!form){
        return <p>Loading...</p>
    }

    return(
        <div className="formviewer-container">
            <div className="formviewer-title">{form.title}</div>
            {form.sections.map((section , secIndex)=>(
                <div className="formviewer-section" key={secIndex}>
                    <div className="formviewer-section-title">{section.name}</div>
                    <div className="formviewer-fields">
                        {section.fields.map((field,fieldIndex)=>(
                            <div className="formviewer-field" key={fieldIndex}>
                                <div className="formviewer-label">{field.label}</div>
                                <input
                                    className="formviewer-input"
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={responses[`${secIndex}-${fieldIndex}`] || ''}
                                    onChange={(e)=>handleChange(secIndex,fieldIndex,e.target.value)}
                                />
                                {errors[`${secIndex}-${fieldIndex}`] && (
                                    <div className="formviewer-error">{errors[`${secIndex}-${fieldIndex}`]}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="formviewer-submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
    )
}