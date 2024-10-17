require("dotenv").config();

const { USERNAME, PASSWORD, DB_NAME } = process.env;

export const connectDB = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hcf5r.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
