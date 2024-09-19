document.getElementById("resumeForm")?.addEventListener("submit", function(event){
    event.preventDefault();

    // Get references to form elements using their IDs
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById("address") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const experienceElement = document.getElementById("experience") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    

    if (profilePictureInput  &&  nameElement && emailElement && phoneElement &&addressElement &&  educationElement && experienceElement 
        && skillsElement ) {
        
        // Get values from inputs
       
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;
        
        
        // Profile picture URL creation
        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : '';
  
        // Create Resume output
        const resumeOutput = `
        <h2>Resume</h2>
        ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ""} 
        
        <p><strong>Name:</strong> ${name}  </p>
        <p><strong>Email:</strong> ${email} </p>
        <p><strong>Phone Number:</strong> ${phone} </p>
        <p><strong> Address:</strong> ${address} </p>
        <h3>Education</h3>
        <p> ${education} </p>
        <h3>Experience</h3>
        <p> ${experience} </p>
        <h3>Skills</h3>
        <p> ${skills} </p>
        
       `;

       const resumeOutputElement = document.getElementById("resumeOutput");
       if (resumeOutputElement) {
           resumeOutputElement.innerHTML = resumeOutput;
           resumeOutputElement.classList.remove("hidden");

           // Create container for buttons
           const buttonsContainer = document.createElement('div');
           buttonsContainer.id = "buttonContainer";
           resumeOutputElement.appendChild(buttonsContainer); // Correctly append buttonsContainer here

           // Add Download PDF Button
           const downloadButton = document.createElement("button");
           downloadButton.textContent = "Download as PDF";
           downloadButton.addEventListener("click", () => {
               window.print();
           });
           buttonsContainer.appendChild(downloadButton); // Append button to buttonsContainer

           // Add Shareable Link Button
           const shareLinkButton = document.createElement("button");
           shareLinkButton.textContent = "Copy Shareable Link";
           shareLinkButton.addEventListener("click", async () => {
               try {
                   // Create a unique shareable link (simulated)
                   const shareableLink = `https://yourdomain.com/resume/${name.replace(/\s+/g, "_")}_cv.html`;
                   // Use clipboard API to copy the shareable link
                   await navigator.clipboard.writeText(shareableLink);
                   alert("Shareable Link copied to clipboard");
               } catch (err) {
                   console.error("Failed to copy link: ", err);
                   alert("Failed to copy link to clipboard. Please try again.");
               }
           });
           buttonsContainer.appendChild(shareLinkButton); // Append button to buttonsContainer
       }
   } else {
       console.error("Form elements are missing.");
   }
});