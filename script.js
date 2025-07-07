// Inicializa AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Dados dos burgers
const burgers = {
    catupiry: {
        nome: "SMASH CATUPIRY & BACON",
        imagem: "assets/smash catupiri.jpeg",
        ingredientes: [
            "Carne smash 80g",
            "Queijo catupiry",
            "Bacon crocante",
            "Maionese de alho",
            "Pão brioche"
        ]
    },
    calabresa: {
        nome: "SMASH CALABRESA",
        imagem: "assets/smash calabresa.jpeg",
        ingredientes: [
            "Carne smash 80g",
            "Queijo muçarela",
            "Calabresa fatiada fininha e tostada",
            "Maionese de alho",
            "Pão brioche"
        ]
    },
    duplo: {
        nome: "SMASH DUPLO CALABRESA",
        imagem: "assets/smash duplo calabresa.jpeg",
        ingredientes: [
            "2x Carnes smash 80g",
            "Queijo cheddar",
            "Calabresa fatiada fininha e tostada",
            "Maionese especial",
            "Pão brioche"
        ]
    }
};

// Elementos do DOM
const modal = document.getElementById('burgerModal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalIngredients = modal.querySelector('.modal-ingredients');
const closeModal = modal.querySelector('.close-modal');
const verMaisBtns = document.querySelectorAll('.btn-ver-mais');

// Funções
function abrirModal(burger) {
    const burgerData = burgers[burger];
    
    modalImage.src = burgerData.imagem;
    modalImage.alt = burgerData.nome;
    modalTitle.textContent = burgerData.nome;
    
    modalIngredients.innerHTML = burgerData.ingredientes
        .map(ingrediente => `<li>${ingrediente}</li>`)
        .join('');
    
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function fecharModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Event Listeners
verMaisBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const burger = btn.closest('.burger-card').dataset.burger;
        abrirModal(burger);
    });
});

closeModal.addEventListener('click', fecharModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        fecharModal();
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gerenciamento do Formulário
document.getElementById('contactForm').addEventListener('submit', function(e) {
  const submitButton = document.getElementById('submitButton');
  const spinner = submitButton.querySelector('.loading-spinner');
  const buttonText = submitButton.querySelector('span');
  
  // Mostra loading
  submitButton.disabled = true;
  spinner.style.display = 'inline-block';
  buttonText.textContent = 'Enviando...';
}); 