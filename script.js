//your code here
// Select all the image elements that are draggable
const images = document.querySelectorAll('.image');

// Add event listeners for the drag events
images.forEach(image => {
  image.addEventListener('dragstart', dragStart);
  image.addEventListener('dragover', dragOver);
  image.addEventListener('drop', drop);
  image.addEventListener('dragenter', dragEnter);
  image.addEventListener('dragleave', dragLeave);
});

// Keep track of the dragged element
let draggedItem = null;

// Drag Start event handler
function dragStart(e) {
  draggedItem = e.target; // Store the element being dragged
  e.target.style.opacity = '0.5'; // Give visual feedback that this item is being dragged
}

// Drag Over event handler - this is necessary to allow dropping
function dragOver(e) {
  e.preventDefault(); // Allow drop
}

// Drag Enter event handler
function dragEnter(e) {
  e.preventDefault();
  // Highlight the potential drop target (optional visual effect)
  e.target.classList.add('over');
}

// Drag Leave event handler
function dragLeave(e) {
  e.target.classList.remove('over');
}

// Drop event handler
function drop(e) {
  e.preventDefault();

  // Remove the 'over' class to stop highlighting the target
  e.target.classList.remove('over');

  // Check if the drop target is not the dragged item itself
  if (draggedItem !== e.target) {
    // Reorder the elements
    const parent = document.getElementById('parent');
    const allImages = [...parent.children]; // Convert to array

    // Find the index of both dragged item and the target
    const draggedIndex = allImages.indexOf(draggedItem);
    const targetIndex = allImages.indexOf(e.target);

    // Remove dragged item and insert it after the target
    if (targetIndex < draggedIndex) {
      parent.insertBefore(draggedItem, e.target); // Insert before
    } else {
      parent.insertBefore(draggedItem, e.target.nextSibling); // Insert after
    }
  }

  // Reset opacity for dragged item
  draggedItem.style.opacity = '1';
  draggedItem = null;
}
