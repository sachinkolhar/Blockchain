
> [!NOTE] codespace
> [Codespaces](https://github.com/codespaces?repository_id=943809761)

# Question 

Task: Full Hardhat Workflow Assignment Objective Students will:
· Set up a Hardhat project 
· Deploy a Solidity contract ·   
Debug using console.log() · 
Write and run Hardhat tests · 
Push the project to GitHub


You are given a Solidity smart contract named VotingSystem that implements a basic voting mechanism on the Ethereum blockchain. The contract allows an admin (the contract deployer) to initialize a list of candidates. Any Ethereum address can cast a vote for one of the candidates. However, a voter can vote only once, and each vote is counted in real-time. The contract also provides functionality to determine the winning candidate based on the highest number of votes

Variables and function you have to create
# VotingSystem
### **Creating `interact.js` for VotingSystem**

The `interact.js` script will allow you to interact with the deployed **VotingSystem** contract. You can use this script to **vote for a candidate** and **view the vote count**.

---

### **1️⃣ Create `scripts/interact.js`**

Inside the `scripts/` folder, create a new file called **`interact.js`**, then add the following code:

```javascript
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Replace with the actual deployed contract address
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

    // Attach to the deployed contract
    const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await VotingSystem.attach(contractAddress);

    // Fetch initial vote count for candidate Alice (index 0)
    let candidate = await voting.candidates(0);
    console.log(`Before Voting - ${candidate.name} has ${candidate.voteCount} votes`);

    // Cast a vote for Alice (index 0)
    console.log("Voting for Alice...");
    let tx = await voting.vote(0);
    await tx.wait(); // Wait for the transaction to be mined

    // Fetch updated vote count
    candidate = await voting.candidates(0);
    console.log(`After Voting - ${candidate.name} has ${candidate.voteCount} votes`);
}

// Run the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
```

---

### **2️⃣ Running the `interact.js` Script**

After deploying your contract, replace `"YOUR_DEPLOYED_CONTRACT_ADDRESS"` with your actual contract address from the deployment script.

Then, **run the script** with:

```bash
npx hardhat run scripts/interact.js --network localhost
```

---

### **3️⃣ Expected Output (Example)**

```
Before Voting - Alice has 0 votes
Voting for Alice...
After Voting - Alice has 1 votes
```

---

### **4️⃣ Explanation of the Code**

- **Attach to deployed contract** using `VotingSystem.attach(contractAddress)`.
    
- **Fetch vote count** before voting.
    
- **Vote for Alice** (candidate index `0`).
    
- **Wait for transaction confirmation** using `tx.wait()`.
    
- **Fetch and print updated vote count**.
    

This script will **simulate a user voting** in the system. 🎉 Let me know if you need any modifications! 🚀


Since you've already **deployed and tested** your contract, you **don't** need to start over. Just follow these steps to **add and run `interact.js`** properly.

---

### **Steps to Add and Run `interact.js`**

#### ✅ **Step 1: Make Sure Hardhat Node is Running**

Before interacting with the contract, ensure your **Hardhat local blockchain is running** in a separate terminal.

**In a new terminal window, run:**

```bash
npx hardhat node
```

This will start a local Hardhat blockchain.

---

#### ✅ **Step 2: Deploy the Contract Again (if needed)**

If your contract was **deployed in a previous session**, you might need to **re-deploy** it because Hardhat resets its blockchain every time you restart the node.

Run this in **another terminal** to deploy:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

👉 **Copy the contract address** shown in the terminal after deployment.

---

#### ✅ **Step 3: Create and Update `interact.js`**

1. Inside the `scripts/` folder, **create** a new file:
    
    ```bash
    touch scripts/interact.js
    ```
    
2. Open the file and **paste this script** (replace `YOUR_DEPLOYED_CONTRACT_ADDRESS` with the actual address from Step 2):
    
    ```javascript
    const hre = require("hardhat");
    
    async function main() {
        const [deployer] = await hre.ethers.getSigners();
    
        // Replace with the deployed contract address
        const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
    
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
    ```
    

---

#### ✅ **Step 4: Run `interact.js`**

Once `interact.js` is ready, **run the script** in the same terminal where Hardhat node is running:

```bash
npx hardhat run scripts/interact.js --network localhost
```

---

### **💡 Can You Use the Same Terminal?**

- **If Hardhat node (`npx hardhat node`) is already running**, open a **new terminal** to run deployment and interaction scripts.
    
- If you use the **same terminal**, you'll have to **restart the node** every time, which is not ideal.
    

---

### **🔹 Recap**

✅ Run **Hardhat node** → `npx hardhat node` (Keep it running in a separate terminal)  
✅ Deploy contract → `npx hardhat run scripts/deploy.js --network localhost`  
✅ Add `interact.js` and update contract address  
✅ Run **interaction script** → `npx hardhat run scripts/interact.js --network localhost`

Now you can **interact with your VotingSystem contract** smoothly! 🚀

## Delete hardhat project



PS D:\RVU\Sem_4\minors in fintech\advanced blockchain\my-hardhat-project> `cd ..`
PS D:\RVU\Sem_4\minors in fintech\advanced blockchain> `Remove-Item -Recurse -Force my-hardhat-project`
# Terminal 1

@sachinkolhar ➜ /workspaces/Blockchain (main) $ `mkdir VotingSystem && cd VotingSystem`
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npm init -y`
Wrote to /workspaces/Blockchain/VotingSystem/package.json:

{
  "name": "votingsystem",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}



@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npm install --save-dev hardhat`
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported
npm warn deprecated ethereumjs-abi@0.6.8: This library has been deprecated and usage is discouraged.

added 247 packages, and audited 248 packages in 45s

55 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.22.19

✔ What do you want to do? · Create a JavaScript project
✔ Hardhat project root: · /workspaces/Blockchain/VotingSystem
✔ Do you want to add a .gitignore? (Y/n) · `y`
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · `y`


npm install --save-dev "@nomicfoundation/hardhat-toolbox@^5.0.0"
npm warn deprecated lodash.isequal@4.5.0: This package is deprecated. Use require('node:util').isDeepStrictEqual instead.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@5.0.15: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported

added 327 packages, and audited 575 packages in 19s

99 packages are looking for funding
  run `npm fund` for details

13 low severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.

Project created

See the README.md file for some example tasks you can run

Give Hardhat a star on Github if you're enjoying it!

     https://github.com/NomicFoundation/hardhat


DEPRECATION WARNING

 Initializing a project with npx hardhat is deprecated and will be removed in the future.
 Please use npx hardhat init instead.


@sachinkolhar ➜ /workspaces/Blockch
@sachinkolhar ➜ /workspaces/Blockch
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `touch contracts/VotingSystem.sol`
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npx hardhat compile`
Downloading compiler 0.8.28
Compiled 2 Solidity files successfully (evm target: paris).
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `mkdir scripts`
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `touch scripts/deploy.js`
@sachinkolhar ➜ /workspaces/Blockchain/Votin
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ 


# Terminal 2

@sachinkolhar ➜ /workspaces/Blockchain (main) $ `pwd`
/workspaces/Blockchain
@sachinkolhar ➜ /workspaces/Blockchain (main) $ `cd VotingSystem`
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npx hardhat node`
Started HTTP and WebSocket JSON-RPC server at http://0.0.0.0:8545/

Accounts

========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.


Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6

Account #4: 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000 ETH)
Private Key: 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a

Account #5: 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000 ETH)
Private Key: 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba

Account #6: 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000 ETH)
Private Key: 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e

Account #7: 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000 ETH)
Private Key: 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356

Account #8: 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000 ETH)
Private Key: 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97

Account #9: 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000 ETH)
Private Key: 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Account #10: 0xBcd4042DE499D14e55001CcbB24a551F3b954096 (10000 ETH)
Private Key: 0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897

Account #11: 0x71bE63f3384f5fb98995898A86B02Fb2426c5788 (10000 ETH)
Private Key: 0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82

Account #12: 0xFABB0ac9d68B0B445fB7357272Ff202C5651694a (10000 ETH)
Private Key: 0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1

Account #13: 0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec (10000 ETH)
Private Key: 0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd

Account #14: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097 (10000 ETH)
Private Key: 0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa

Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61

Account #16: 0x2546BcD3c84621e976D8185a91A922aE77ECEc30 (10000 ETH)
Private Key: 0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0

Account #17: 0xbDA5747bFD65F08deb54cb465eB87D40e51B197E (10000 ETH)
Private Key: 0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd

Account #18: 0xdD2FD4581271e230360230F9337D5c0430Bf44C0 (10000 ETH)
Private Key: 0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0

Account #19: 0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

eth_accounts
hardhat_metadata (20)
eth_blockNumber
eth_getBlockByNumber
eth_feeHistory
eth_maxPriorityFeePerGas
eth_sendTransaction
  Contract deployment: VotingSystem
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x27faad0208a3625c044b3415de303b83cfbffaa95349416b6f6f5e1d75a77f25
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            803591 of 30000000
  Block #1:            0xaab20dab00765e6633067b29ad3f514e8f010976637378ede41ff86a34353fcd

eth_getTransactionByHash
eth_getTransactionReceipt
eth_blockNumber


# Terminal 3

@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $` pwd`
/workspaces/Blockchain/VotingSystem
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npx hardhat run scripts/deploy.js --network localhost`
VotingSystem `deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3`
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `touch test/VotingSystem.js`

@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npx hardhat test`


  Lock
    Deployment
      ✔ Should set the right unlockTime (620ms)
      ✔ Should set the right owner
      ✔ Should receive and store the funds to lock
      ✔ Should fail if the unlockTime is not in the future
    Withdrawals
      Validations
        ✔ Should revert with the right error if called too soon
        ✔ Should revert with the right error if called from another account
        ✔ Shouldn't fail if the unlockTime has arrived and the owner calls it
      Events
        ✔ Should emit an event on withdrawals
      Transfers
        ✔ Should transfer the funds to the owner

  VotingSystem
    ✔ Should deploy with correct candidates
    ✔ Should allow voting
    ✔ Should prevent double voting
    ✔ Should return the correct winner


  13 passing (749ms)

@sachinkolhar ➜ /workspaces/Blockchain/Votin
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ 

@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `touch scripts/interact.js`

@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ `npx hardhat run scripts/interact.js --network localhost`
Before Voting - Alice has 0 votes
Voting for Alice...
After Voting - Alice has 1 votes
@sachinkolhar ➜ /workspaces/Blockchain/VotingSystem (main) $ 