import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ingredientSchema = new Schema({
    name: { type: String},
    description: { type: String},
    rating: { type: Number}
});

export default model('Ingredient', ingredientSchema);