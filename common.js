// Helper function to extract code text excluding buttons
function getCodeText(preElement) {
    const clone = preElement.cloneNode(true);
    const buttons = clone.querySelectorAll('.copy-button');
    buttons.forEach(btn => btn.remove());
    return clone.textContent.trim();
}

// Helper function to copy text to clipboard
async function copyToClipboard(text) {
    try {
    await navigator.clipboard.writeText(text);
    return true;
    } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    } catch (fallbackErr) {
        document.body.removeChild(textArea);
        return false;
    }
    }
}

// Add copy buttons to all pre.code elements
document.querySelectorAll('pre.code').forEach(pre => {
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    // Add copy button click handler
    copyButton.addEventListener('click', async (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    const text = getCodeText(pre);
    const success = await copyToClipboard(text);
    
    if (success) {
        // Visual feedback
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
        copyButton.textContent = originalText;
        copyButton.classList.remove('copied');
        }, 2000);
    } else {
        copyButton.textContent = 'Failed';
        setTimeout(() => {
        copyButton.textContent = 'Copy';
        }, 2000);
    }
    });
    
    // Append button to pre element
    pre.appendChild(copyButton);
});