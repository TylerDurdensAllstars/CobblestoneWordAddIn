async function loadTemplates() {
  try {
    document.getElementById('message').innerText = 'Loading templates...'; // Show loading status (RFink 09272024)

    const response = await fetch('http://localhost:3000/templates');
    if (!response.ok) {
      throw new Error('Network response was not ok'); // (RFink 09272024)
    }

    const templates = await response.json();
    displayTemplates(templates);
    
    // Update message to indicate successful load (RFink 09272024)
    document.getElementById('message').innerText = 'Templates loaded successfully!';
  } catch (error) {
    console.error('Error fetching templates:', error); // (RFink 09272024)
    document.getElementById('message').innerText = 'Failed to load templates. Please try again.'; // (RFink 09272024)
  }
}

function displayTemplates(templates) {
  const dropdown = document.getElementById('template-dropdown');
  dropdown.innerHTML = ''; // Clear out any old options (RFink 09272024)

  templates.forEach(template => {
    const option = document.createElement('option');
    option.value = template.id; // Set the value to the template's ID (RFink 09272024)
    option.textContent = template.name; // Show the template's name (RFink 09272024)
    dropdown.appendChild(option);
  });
}

async function insertTemplate() {
  console.log('Insert template function called'); // Log when this function runs (RFink 09272024)
  
  const dropdown = document.getElementById('template-dropdown');
  const selectedTemplateId = dropdown.value;

  // Make sure a template is actually selected (RFink 09272024)
  if (!selectedTemplateId) {
    document.getElementById('message').innerText = 'Please select a template.'; // (RFink 09272024)
    return; // Exit if no template is selected (RFink 09272024)
  }

  // Clear any existing messages before we insert (RFink 09272024)
  document.getElementById('message').innerText = '';

  // Disable the button to avoid double clicks (RFink 09272024)
  const button = document.getElementById('insert-template');
  button.disabled = true;

  try {
    document.getElementById('message').innerText = 'Inserting template...'; // Show insertion status (RFink 09272024)
    
    // Get the templates from the server to find the content (RFink 09272024)
    const response = await fetch('http://localhost:3000/templates');
    const templates = await response.json();
    
    // Find the template content based on the selected ID (RFink 09272024)
    const selectedTemplate = templates.find(template => template.id == selectedTemplateId);
    
    if (selectedTemplate) {
      const templateContent = selectedTemplate.content || `Default content for template ID: ${selectedTemplateId}`; // Fallback if no content is provided (RFink 09272024)

      await Word.run(async (context) => {
        const body = context.document.body;
        // Insert the selected template content into the Word document (RFink 09272024)
        body.insertText(templateContent, Word.InsertLocation.end);
        await context.sync();
      });

      document.getElementById('message').innerText = 'Template inserted successfully!'; // Update status after insertion (RFink 09272024)
    } else {
      console.error('Template not found'); // (RFink 09272024)
      document.getElementById('message').innerText = 'Template not found.'; // (RFink 09272024)
    }

    // Optionally clear the dropdown after insertion (RFink 09272024)
    dropdown.selectedIndex = 0; // Deselect the template (RFink 09272024)
  } catch (error) {
    console.error('Error inserting template:', error); // (RFink 09272024)
    document.getElementById('message').innerText = 'Error inserting template. Please try again.'; // (RFink 09272024)
  } finally {
    // Re-enable the button after everything's done (RFink 09272024)
    button.disabled = false;
  }
}

// Load templates when the add-in is ready (RFink 09272024)
Office.onReady(() => {
  loadTemplates(); // Load templates when the add-in is ready (RFink 09272024)

  // Add click event listener to the insert button just once (RFink 09272024)
  const button = document.getElementById('insert-template');

  // For debugging: Remove any existing listeners (RFink 09272024)
  const clone = button.cloneNode(true);
  button.parentNode.replaceChild(clone, button);

  // Attach the click event listener after cloning (RFink 09272024)
  clone.addEventListener('click', insertTemplate);
});
