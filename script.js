// DOM Elements
const donationTab = document.querySelector('.donation-tab');
const historyTab = document.querySelector('.history-tab');
const donationSection = document.querySelector('.donation-section');
const historySection = document.querySelector('.history-section');
const historyContainer = document.getElementById('history-container');
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

// Function to format date
function formatDate() {
    const now = new Date();
    const options = { 
        timeZone: 'Asia/Dhaka',
        year: 'numeric', 
        month: 'short', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
    };
    return now.toLocaleString('en-US', options) + ' GMT +0600 (Bangladesh Standard Time)';
}

// Function to add a donation to history
function addToHistory(amount, cause) {
    const historyItem = document.createElement('div');
    historyItem.className = 'card my-4 bg-base-100 shadow-xl';
    historyItem.innerHTML = `
        <div class="card-body">
            <h2 class="card-title">${amount} Taka is Donated for ${cause}</h2>
            <p>Date : ${formatDate()}</p>
        </div>
    `;
    historyContainer.prepend(historyItem);
}

// Tab switching functionality
donationTab.addEventListener('click', function(e) {
  e.preventDefault();
  donationTab.classList.add('tab-active');
  historyTab.classList.remove('tab-active');
  donationSection.classList.remove('hidden');
  historySection.classList.add('hidden');
});

historyTab.addEventListener('click', function(e) {
  e.preventDefault();
  historyTab.classList.add('tab-active');
  donationTab.classList.remove('tab-active');
  historySection.classList.remove('hidden');
  donationSection.classList.add('hidden');
});

// Initialize the donation tab as active by default
document.addEventListener('DOMContentLoaded', function() {
  donationTab.classList.add('tab-active');
});

