/**
 * @OnlyCurrentDoc
 */

// This function is called when the add-on is opened.
function onOpen() {
  DocumentApp.getUi()
    .createMenu('Contract Templates')
    .addItem('Show Sidebar', 'showSidebar')
    .addToUi();
}

// This function displays the sidebar in the document.
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Insert Contract Template')
      .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}

/*
function getTemplates() {
  const response = UrlFetchApp.fetch('http://localhost:3000/templates'); // Commented Out, Would need public server URL
  return JSON.parse(response.getContentText());
}
*/

// Fetch templates for the sidebar
function getTemplates() {
  return [
     { "id": 1, "name": "Contract Template 1", "content": "This is the content of Contract Template 1. \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum viverra pulvinar risus quis interdum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;" },
    { "id": 2, "name": "Contract Template 2", "content": "This is the content of Contract Template 2.\nNullam vitae sem ornare, imperdiet tortor sed, pretium ipsum. Curabitur imperdiet vitae enim et fringilla. Nullam eu ornare metus. Vestibulum mollis facilisis elit, nec viverra dolor egestas quis." },
    { "id": 3, "name": "Contract Template 3", "content": "This is the content of Contract Template 3. \nPellentesque faucibus tellus eu fermentum scelerisque. Mauris ut sem eros. In faucibus, nibh sed lobortis lacinia, enim eros egestas velit, nec rhoncus nibh eros eget risus. Integer elementum porttitor diam," }
];

}

// Insert the selected template content into the document
function insertTemplate(templateId) {
  const templates = getTemplates();
  const selectedTemplate = templates.find(template => template.id == templateId);
  
  if (selectedTemplate) {
    const doc = DocumentApp.getActiveDocument();
    const body = doc.getBody();
    const content = selectedTemplate.content || `Default content for template ID: ${templateId}`; // Fallback content
    body.appendParagraph(content); // Insert the content as a new paragraph
  } else {
    throw new Error('Template not found.');
  }
}
