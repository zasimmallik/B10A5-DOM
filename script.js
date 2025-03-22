// DOM Elements
const donateButtons = document.querySelectorAll('.donate-btn');
const donationInputs = document.querySelectorAll('.donation-input');
const balanceElement = document.querySelector('.balance');
const currentDonations = document.querySelectorAll('.current-donation');
const successModal = document.getElementById('success-modal');
const closeModalBtn = document.getElementById('close-modal');

// Initial balance
let balance = parseInt(balanceElement.textContent);

// Function to validate donation amount
function validateDonation(amount, inputElement) {
    if (!amount || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid donation amount');
        inputElement.value = '';
        return false;
    }

    if (amount > balance) {
        alert('Insufficient balance for this donation');
        inputElement.value = '';
        return false;
    }

    return true;
}

// Donation functionality
donateButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const inputElement = donationInputs[index];
        const amount = parseInt(inputElement.value);
        
        if (!validateDonation(amount, inputElement)) {
            return;
        }

        // Update balance
        balance -= amount;
        balanceElement.textContent = balance;

        // Update current donation
        const currentDonation = currentDonations[index];
        let donationAmount = parseInt(currentDonation.getAttribute('data-donation'));
        donationAmount += amount;
        currentDonation.setAttribute('data-donation', donationAmount);
        currentDonation.textContent = donationAmount + ' BDT';

        // Show success modal
        successModal.classList.remove('hidden');

        // Clear input field
        inputElement.value = '';
    });
});

// Close modal button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', function() {
        successModal.classList.add('hidden');
    });
}

// Close modal when clicking outside of it
successModal.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.classList.add('hidden');
    }
});