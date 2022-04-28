import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    rating: { type: Number, max: 5, min: 1}
});

export default model('Ingredient', ingredientSchema);