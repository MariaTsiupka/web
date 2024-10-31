const form = document.getElementById('form');
const perfumeTitleInput = document.getElementById('perfume_title');
const perfumeDescriptionInput = document.getElementById('perfume_description');
const perfumeExpenseInput = document.getElementById('perfume_expense');
const perfumeTypeInput = document.getElementById('perfume_type');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const perfume = {
        id: uuid.v1(),
        title: perfumeTitleInput.value,
        description: perfumeDescriptionInput.value,
        expense: perfumeExpenseInput.value,
        type: perfumeTypeInput.value
    };

    if (!perfume.title || !perfume.description || !perfume.expense || !perfume.type) {
        alert('Please fill in all fields.');
        return;
    }

    const perfumes = JSON.parse(localStorage.getItem('perfumes')) || [];

    const isTitleDuplicate = perfumes.some(existingPerfume => existingPerfume.title === perfume.title);
    
    if (isTitleDuplicate) {
        alert('Please choose a different title. This perfume already exists.');
        return;
    }

    perfumes.push(perfume);
    localStorage.setItem('perfumes', JSON.stringify(perfumes));
    form.reset();
    window.location.href = 'index.html';
});
