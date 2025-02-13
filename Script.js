document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("survey-form");
    const saveFormBtn = document.getElementById("save-form");
    const filenameInput = document.getElementById("filename");


    saveFormBtn.addEventListener("click", (event) => {
        event.preventDefault(); 

        const filename = filenameInput.value.trim();
        if (!filename) {
            alert("Please enter a filename.");
            return;
        }

        let formData = "Survey Form Data:\n\n";
        const inputs = form.querySelectorAll("input, textarea, select");

        if (inputs.length === 0) {
            alert("No form fields found! Please add fields before saving.");
            return;
        }

        inputs.forEach((input) => {
            if (input.type === "checkbox" || input.type === "radio") {
                formData += `${input.name}: ${input.checked ? "Checked" : "Unchecked"}\n`;
            } else if (input.type === "file") {
                formData += `${input.name}: [File Uploaded: ${input.files.length > 0 ? input.files[0].name : "No file"}]\n`;
            } else {
                formData += `${input.name}: ${input.value}\n`;
            }
        });


        const finalFilename = filename.endsWith(".txt") ? filename : filename + ".txt";


        const blob = new Blob([formData], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = finalFilename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});
