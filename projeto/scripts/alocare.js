const serviceData = [
    {
        name: "Apoio Administrativo",
        category: "administrativo",
        description: "Apoio em organização de documentos, atendimento, rotinas de escritório e tarefas administrativas.",
        duration: "Por período",
        icon: "AD"
    },
    {
        name: "Manutenção",
        category: "manutencao",
        description: "Profissionais para manutenção preventiva, pequenos reparos e apoio operacional.",
        duration: "Por demanda",
        icon: "MN"
    },
    {
        name: "Eventos",
        category: "eventos",
        description: "Apoio para recepção, organização, montagem, atendimento e operação de eventos.",
        duration: "Data definida",
        icon: "EV"
    },
    {
        name: "Limpeza",
        category: "limpeza",
        description: "Serviços de limpeza e organização para ambientes residenciais, comerciais e eventos.",
        duration: "Por período",
        icon: "LP"
    }
];

const currentYear = document.querySelector("#current-year");
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector("#site-nav");

function setCurrentYear() {
    if (currentYear) {
        currentYear.textContent = `${new Date().getFullYear()}`;
    }
}

function toggleMenu() {
    if (!menuButton || !siteNav) {
        return;
    }

    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", `${isOpen}`);
    menuButton.setAttribute("aria-label", `${isOpen ? "Fechar menu" : "Abrir menu"}`);
}

function renderServices(list) {
    const serviceList = document.querySelector("#service-list");
    const emptyMessage = document.querySelector("#service-empty");

    if (!serviceList || !emptyMessage) {
        return;
    }

    if (list.length === 0) {
        serviceList.innerHTML = "";
        emptyMessage.hidden = false;
        return;
    }

    emptyMessage.hidden = true;
    serviceList.innerHTML = list.map((service) => `
        <article class="service-card">
            <span class="service-icon" aria-hidden="true">${service.icon}</span>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-meta">
                <span>${service.duration}</span>
            </div>
            <button class="button button-secondary service-select" type="button" data-service="${service.name}">Solicitar</button>
        </article>
    `).join("");
}

function filterServices() {
    const searchInput = document.querySelector("#service-search");
    const categorySelect = document.querySelector("#service-category");

    if (!searchInput || !categorySelect) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    const filtered = serviceData.filter((service) => {
        const matchesSearch = `${service.name} ${service.description}`.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "todos" || service.category === category;
        return matchesSearch && matchesCategory;
    });

    renderServices(filtered);
}

function chooseService(event) {
    const button = event.target.closest(".service-select");

    if (!button) {
        return;
    }

    const requestService = document.querySelector("#request-service");

    if (requestService) {
        requestService.value = button.dataset.service;
        requestService.scrollIntoView({ behavior: "smooth", block: "center" });
        requestService.focus();
    }
}

function saveRequest(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const message = document.querySelector("#form-message");
    const data = new FormData(form);

    const request = {
        name: `${data.get("name")}`,
        email: `${data.get("email")}`,
        service: `${data.get("service")}`,
        period: `${data.get("period")}`,
        details: `${data.get("details")}`
    };

    if (request.details.trim().length < 15) {
        message.textContent = `Descreva sua necessidade com pelo menos 15 caracteres.`;
        message.className = "form-message error";
        return;
    }

    localStorage.setItem("alocareRequest", JSON.stringify(request));

    message.textContent = `Solicitação de ${request.service} registrada neste dispositivo. Obrigada, ${request.name}!`;
    message.className = "form-message success";
    form.reset();

    displaySavedRequest();
}

function displaySavedRequest() {
    const savedBox = document.querySelector("#saved-request");

    if (!savedBox) {
        return;
    }

    const savedRequest = localStorage.getItem("alocareRequest");

    if (!savedRequest) {
        savedBox.hidden = true;
        return;
    }

    const request = JSON.parse(savedRequest);
    savedBox.hidden = false;
    savedBox.innerHTML = `
        <strong>Última solicitação salva</strong>
        <p>${request.service} · ${request.period}</p>
        <p>Solicitante: ${request.name}</p>
    `;
}

function saveProfessional(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const message = document.querySelector("#professional-message");
    const status = document.querySelector("#professional-status");
    const data = new FormData(form);

    const professional = {
        name: `${data.get("professional-name")}`,
        email: `${data.get("professional-email")}`,
        area: `${data.get("professional-area")}`,
        city: `${data.get("professional-city")}`,
        skills: `${data.get("professional-skills")}`
    };

    if (professional.skills.trim().length < 10) {
        message.textContent = `Informe pelo menos 10 caracteres nas suas habilidades.`;
        message.className = "form-message error";
        return;
    }

    localStorage.setItem("alocareProfessional", JSON.stringify(professional));
    message.textContent = `Perfil de ${professional.name} salvo neste dispositivo.`;
    message.className = "form-message success";

    status.hidden = false;
    status.innerHTML = `
        <strong>Perfil salvo</strong>
        <p>${professional.area} · ${professional.city}</p>
        <p>${professional.skills}</p>
    `;

    form.reset();
}

function loadProfessional() {
    const status = document.querySelector("#professional-status");
    const savedProfessional = localStorage.getItem("alocareProfessional");

    if (!status || !savedProfessional) {
        return;
    }

    const professional = JSON.parse(savedProfessional);
    status.hidden = false;
    status.innerHTML = `
        <strong>Perfil encontrado neste dispositivo</strong>
        <p>${professional.name} · ${professional.area}</p>
        <p>${professional.city}</p>
    `;
}

setCurrentYear();

if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
}

const serviceSearch = document.querySelector("#service-search");
const serviceCategory = document.querySelector("#service-category");
const serviceList = document.querySelector("#service-list");

if (serviceSearch && serviceCategory && serviceList) {
    renderServices(serviceData);
    serviceSearch.addEventListener("input", filterServices);
    serviceCategory.addEventListener("change", filterServices);
    serviceList.addEventListener("click", chooseService);
}

const requestForm = document.querySelector("#request-form");

if (requestForm) {
    requestForm.addEventListener("submit", saveRequest);
    displaySavedRequest();
}

const professionalForm = document.querySelector("#professional-form");

if (professionalForm) {
    professionalForm.addEventListener("submit", saveProfessional);
    loadProfessional();
}
