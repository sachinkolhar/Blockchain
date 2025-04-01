const hre = require("hardhat");

async function main() {
    const candidateNames = ["Alice", "Bob", "Charlie"];
    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const votingSystem = await VotingSystem.deploy(candidateNames);

    await votingSystem.waitForDeployment();

    console.log("VotingSystem deployed to:", await votingSystem.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
