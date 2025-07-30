const cadModels = [
    {
        id: 1,
        name: "Sample Part 1",
        thumbnail: "https://via.placeholder.com/300x200/333333/87CEEB?text=CAD+Model+1", // Placeholder for now
        modelPath: "models/sample1.stl", // Will point to your STL file
        description: "Complex mechanical component with precision tolerances"
    },
    {
        id: 2,
        name: "Sample Part 2", 
        thumbnail: "https://via.placeholder.com/300x200/333333/87CEEB?text=CAD+Model+2", // Placeholder for now
        modelPath: "models/sample2.stl", // Will point to your STL file
        description: "Lightweight design optimized for manufacturing"
    },
    {
        id: 3,
        name: "Sample Part 3",
        thumbnail: "https://via.placeholder.com/300x200/333333/87CEEB?text=CAD+Model+3", // Placeholder for now
        modelPath: "models/sample3.stl", // Will point to your STL file
        description: "Innovative housing design with integrated cooling"
    }
];

// Make available to other files
if (typeof window !== 'undefined') {
    window.cadModels = cadModels;
}

    // {
    //     id: 4,
    //     name: "Your Model Name",
    //     thumbnail: "thumbnails/your-model.jpg",
    //     modelPath: "models/your-model.stl", 
    //     description: "Description of your model"
    // }