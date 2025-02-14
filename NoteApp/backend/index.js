const app = require("./app");

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    // console.log("MONGO_URI:", process.env.MONGO_URI);

    console.log(`Server running on port ${PORT}`);
});
