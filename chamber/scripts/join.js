const joinForm = document.getElementById('joinForm');
const timestampInput = document.getElementById('timestamp');
joinForm?.addEventListener('submit', () => {
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }
});

const openButtons = document.querySelectorAll('.learn-more');
const closeButtons = document.querySelectorAll('.close-modal');

openButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = document.getElementById(button.dataset.modal);
        if (modal && typeof modal.showModal === 'function') {
            modal.showModal();
        }
    });
});

closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal && typeof modal.close === 'function') {
            modal.close();
        }
    });
});

document.querySelectorAll('.membership-modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
});

const applicationSummary = document.getElementById('applicationSummary');
if (applicationSummary) {
    const params = new URLSearchParams(window.location.search);

    const fields = {
        fname: 'show-fname',
        lname: 'show-lname',
        email: 'show-email',
        phone: 'show-phone',
        organization: 'show-organization',
        orgtitle: 'show-orgtitle',
        description: 'show-description',
        membership: 'show-membership',
        timestamp: 'show-timestamp'
    };

    Object.entries(fields).forEach(([param, elementId]) => {
        const element = document.getElementById(elementId);
        if (!element) {
            return;
        }

        const value = params.get(param);
        if (!value) {
            element.textContent = 'Not provided';
            return;
        }

        if (param === 'timestamp') {
            const date = new Date(value);
            element.textContent = Number.isNaN(date.getTime())
                ? value
                : date.toLocaleString();
            return;
        }

        element.textContent = value;
    });
}