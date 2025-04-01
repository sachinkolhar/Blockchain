const { expect } = require("chai");

describe("VotingSystem", function () {
    let VotingSystem, votingSystem, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const candidateNames = ["Alice", "Bob", "Charlie"];
        VotingSystem = await ethers.getContractFactory("VotingSystem");
        votingSystem = await VotingSystem.deploy(candidateNames);
        await votingSystem.waitForDeployment();
    });

    it("Should deploy with correct candidates", async function () {
        const candidate = await votingSystem.candidates(0); // Fix applied
        expect(candidate.name).to.equal("Alice");
    });

    it("Should allow voting", async function () {
        await votingSystem.connect(addr1).vote(1);
        const candidate = await votingSystem.candidates(1);
        expect(candidate.voteCount).to.equal(1);
    });

    it("Should prevent double voting", async function () {
        await votingSystem.connect(addr1).vote(1);
        await expect(votingSystem.connect(addr1).vote(1)).to.be.revertedWith("You have already voted");
    });

    it("Should return the correct winner", async function () {
        await votingSystem.connect(addr1).vote(0);
        await votingSystem.connect(addr2).vote(0);
        expect(await votingSystem.getWinner()).to.equal("Alice");
    });
});
