const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// Sample contract templates
const templates = [
    { "id": 1, "name": "Contract Template 1", "content": "This is the content of Contract Template 1. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra pulvinar risus quis interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;" },
    { "id": 2, "name": "Contract Template 2", "content": "This is the content of Contract Template 2.\nNullam vitae sem ornare, imperdiet tortor sed, pretium ipsum. Curabitur imperdiet vitae enim et fringilla. Nullam eu ornare metus. Vestibulum mollis facilisis elit, nec viverra dolor egestas quis." },
    { "id": 3, "name": "Contract Template 3", "content": "This is the content of Contract Template 3. \nPellentesque faucibus tellus eu fermentum scelerisque. Mauris ut sem eros. In faucibus, nibh sed lobortis lacinia, enim eros egestas velit, nec rhoncus nibh eros eget risus. Integer elementum porttitor diam," }
];

// Endpoint to get templates
app.get('/templates', (req, res) => {
    res.json(templates);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
