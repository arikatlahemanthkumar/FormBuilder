import { Schema, model } from "mongoose";

const formSchema = new Schema({
  title: { type: String, required: true },
  sections: [
    {
      name: { type: String, required: true },
      fields: [
        {
          id: { type: String },
          label: { type: String, required: true },
          placeholder: { type: String },
          type: { type: String, enum: ['email', 'text', 'password', 'date', 'number', 'textarea', 'select', 'checkbox'], required: true },
          options: [String]
        }
      ]
    }
  ]
}, { timestamps: true });

const Form = model("Form", formSchema);

export default Form;