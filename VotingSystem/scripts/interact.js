const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Replace with the deployed contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await VotingSystem.attach(contractAddress);

    // Fetch initial vote count for candidate Alice (index 0)
    let candidate = await voting.candidates(0);
    console.log(`Before Voting - ${candidate.name} has ${candidate.voteCount} votes`);

    // Vote for Alice (index 0)
    console.log("Voting for Alice...");
    let tx = await voting.vote(0);
    await tx.wait();

    // Fetch updated vote count
    candidate = await voting.candidates(0);
    console.log(`After Voting - ${candidate.name} has ${candidate.voteCount} votes`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
