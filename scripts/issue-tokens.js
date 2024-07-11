const DeploymentModule = require("../ignition/modules/Deploy");

async function issueRewards(){
	const { decentralBankContract } = await hre.ignition.deploy(DeploymentModule);
	await decentralBankContract.issueTokens();
	console.log('Tokens have been issued successfully');
}

// Converting issueRewards into an async callback function
function issueRewardsWithCallback(callback) {
    issueRewards()
        .then(() => callback(null))
        .catch(err => callback(err));
}

// Example usage
issueRewardsWithCallback((err) => {
    if (err) {
        console.error('Error issuing tokens:', err);
    } else {
        console.log('Callback: Tokens have been issued successfully');
    }
});