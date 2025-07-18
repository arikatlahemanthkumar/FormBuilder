import Form from "../models/Form.js";

const formCtrl = {};

formCtrl.create = async (req, res) => {
    try {
        const body = req.body;
        const form = new Form({ title: body.title, sections: body.sections });
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "something went wrong" });
    }
};

formCtrl.list = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "something went wrong" });
    }
};

formCtrl.update = async (req, res) => {
    try {
        const body = req.body;
        const id = req.params.id;
        const form = await Form.findByIdAndUpdate(id, { title: body.title, sections: body.sections }, { new: true, runValidators: true });
        if (!form) {
            return res.status(404).json({ errors: "form not found" });
        }
        res.status(200).json(form);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "something went wrong" });
    }
};

formCtrl.getById = async (req, res) => {
    try {
        const id = req.params.id;
        const form = await Form.findById(id);
        if (!form) {
            return res.status(404).json({ errors: "form not found" });
        }
        res.status(200).json(form);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "Something went wrong" });
    }
};

formCtrl.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const form = await Form.findByIdAndDelete(id);
        if (!form) {
            return res.status(404).json({ errors: "form not found" });
        }
        res.status(200).json(form);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "something went wrong" });
    }
};

export default formCtrl;