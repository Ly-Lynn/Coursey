document.getElementById("add-course-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
        const response = await fetch("http://localhost:8080/adminPanel/courseService.php", {
            method: "POST",
            headers: {
                "Authorization": "Bearer eyJ1c2VybmFtZSI6Imx5bm4iLCJleHBpcnkiOjE3MzE4OTgxNzd9"
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
        } else {
            const result = await response.json();
            alert("Course added successfully!");
            console.log(result);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
    }
});
