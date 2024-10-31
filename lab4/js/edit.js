document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('submit_button');
    const titleInput = document.getElementById('perfume_title');
    const descriptionInput = document.getElementById('perfume-description');
    const expenseInput = document.getElementById('perfume-expense');
    const typeInput = document.getElementById('perfume_type');

    const editPerfumeId = localStorage.getItem('editPerfumeId');
    console.log('Edit Perfume ID:', editPerfumeId);
    if (!editPerfumeId) {
        window.location.href = 'index.html'; 
        return;
    }

    let perfumes = JSON.parse(localStorage.getItem('perfumes')) || [];
    const perfumeToEdit = perfumes.find(perfume => perfume.id === editPerfumeId);
    
    if (!perfumeToEdit) {
        console.error("Perfume not found for ID:", editPerfumeId);
        window.location.href = 'index.html';
        return;
    }

    titleInput.value = perfumeToEdit.title;
    descriptionInput.value = perfumeToEdit.description;
    expenseInput.value = perfumeToEdit.expense;
    typeInput.value = perfumeToEdit.type;

    editButton.addEventListener('click', (event) => {
        event.preventDefault();

        perfumeToEdit.title = titleInput.value;
        perfumeToEdit.description = descriptionInput.value;
        perfumeToEdit.expense = parseFloat(expenseInput.value);
        perfumeToEdit.type = typeInput.value;

        perfumes[perfumes.indexOf(perfumeToEdit)] = perfumeToEdit;
        localStorage.setItem('perfumes', JSON.stringify(perfumes));
        localStorage.removeItem('editPerfumeId');
        window.location.href = 'index.html'; 
    });
});
