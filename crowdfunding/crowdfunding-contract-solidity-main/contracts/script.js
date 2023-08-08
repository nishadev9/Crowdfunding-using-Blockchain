// Import web3.js or ethers.js library here

// Contract ABI - Replace with your own
const contractABI = [...]; 

// Contract address - Replace with your own
const contractAddress = "0x..."; 

// Connect to the Ethereum network
// Replace with your own provider and network information
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// DOM elements
const targetFundsElement = document.getElementById("targetFunds");
const deadlineElement = document.getElementById("deadline");
const currentFundsElement = document.getElementById("currentFunds");
const fundForm = document.getElementById("fundForm");
const fundAmountInput = document.getElementById("fundAmount");
const withdrawOwnerBtn = document.getElementById("withdrawOwnerBtn");
const withdrawFunderBtn = document.getElementById("withdrawFunderBtn");

// Load contract data on page load
window.onload = async function() {
    const targetFunds = await contract.targetFunds();
    const deadline = await contract.deadline();
    targetFundsElement.textContent = ethers.utils.formatEther(targetFunds);
    deadlineElement.textContent = new Date(deadline * 1000).toLocaleString();
    updateCurrentFunds();
};

// Update current funds
async function updateCurrentFunds() {
    const currentFunds = await contract.balanceOf();
    currentFundsElement.textContent = ethers.utils.formatEther(currentFunds);
}

// Fund the contract
fundForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    const fundAmount = ethers.utils.parseEther(fundAmountInput.value);
    await contract.fund({ value: fundAmount });
    updateCurrentFunds();
    fundAmountInput.value = "";
});

// Withdraw owner funds
withdrawOwnerBtn.addEventListener("click", async function() {
    await contract.withdrawOwner();
    updateCurrentFunds();
});

// Withdraw funder funds
withdrawFunderBtn.addEventListener("click", async function() {
    await contract.withdrawFunder();
    updateCurrentFunds();
});
