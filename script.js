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
const modal = document.querySelector('.modal');
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('.modal-title');
const modalIngredients = modal.querySelector('.modal-ingredients');
const closeModalBtn = modal.querySelector('.close-modal');
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

closeModalBtn.addEventListener('click', fecharModal);

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
const phoneInput = document.querySelector('input[type="tel"]');
const emailInput = document.querySelector('input[type="email"]');
const form = document.getElementById('contactForm');

// Regex para validação de email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
    return emailRegex.test(email);
}

function handleEmailValidation(event) {
    const email = event.target.value;
    const isValid = validateEmail(email);
    
    if (!isValid && email !== '') {
        event.target.setCustomValidity('Por favor, insira um email válido');
        event.target.classList.add('invalid');
    } else {
        event.target.setCustomValidity('');
        event.target.classList.remove('invalid');
    }
}

// Event listeners para validação de email
emailInput.addEventListener('input', handleEmailValidation);
emailInput.addEventListener('blur', handleEmailValidation);

function maskPhone(event) {
    let value = event.target.value;
    
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    }
    
    // Atualiza o valor do campo
    event.target.value = value;
}

// Adiciona os event listeners para o campo de telefone
phoneInput.addEventListener('input', maskPhone);
phoneInput.addEventListener('keyup', maskPhone);

form.addEventListener('submit', function(e) {
    const submitButton = document.getElementById('submitButton');
    const spinner = submitButton.querySelector('.loading-spinner');
    const buttonText = submitButton.querySelector('span');
    
    // Validação adicional do email antes do envio
    const email = emailInput.value;
    if (!validateEmail(email)) {
        e.preventDefault();
        emailInput.setCustomValidity('Por favor, insira um email válido');
        emailInput.reportValidity();
        return;
    }
    
    // Mostra loading
    submitButton.disabled = true;
    spinner.style.display = 'inline-block';
    buttonText.textContent = 'Enviando...';
});

