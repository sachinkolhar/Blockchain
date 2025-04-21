Great! Let's build a **fully functional decentralized application (DApp)** step by step.

---

## 🧠 DApp Idea: **"Student Dashboard"**

A DApp where students can:

- Register their name and course
    
- View registered students
    
- Interact using MetaMask
    

---

## 🔧 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
    
- **Backend (Smart Contract)**: Solidity
    
- **Development Framework**: Hardhat
    
- **Wallet**: MetaMask (for Ethereum interactions)
    

---

## 📁 Final Folder Structure

```
student-dapp/
├── contracts/
│   └── StudentDashboard.sol
├── scripts/
│   └── deploy.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── hardhat.config.js
├── package.json
```

---

## 🔨 STEP-BY-STEP INSTRUCTIONS

---

### ✅ STEP 1: Set up Hardhat

Open terminal and run:

```bash
mkdir student-dapp && cd student-dapp
npm init -y
npm install --save-dev hardhat
npx hardhat
```

Choose: **Create a basic sample project** → Install dependencies

---
touch contracts/StudentDashboard.sol
### 📄 STEP 2: Write the Smart Contract

Create file: `contracts/StudentDashboard.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentDashboard {
    struct Student {
        string name;
        string course;
    }

    mapping(address => Student) public students;

    function registerStudent(string memory _name, string memory _course) public {
        students[msg.sender] = Student(_name, _course);
    }

    function getStudent(address _addr) public view returns (string memory, string memory) {
        Student memory s = students[_addr];
        return (s.name, s.course);
    }
}
```

---

### 🚀 STEP 3: Deploy Script

Create file: `scripts/deploy.js`

```javascript
const hre = require("hardhat");

async function main() {
    const Contract = await hre.ethers.getContractFactory("StudentDashboard");
    const contract = await Contract.deploy();

    await contract.deployed();

    console.log(`StudentDashboard deployed to: ${contract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

---

### ⚙️ STEP 4: Compile and Deploy

```bash
npx hardhat compile
npx hardhat node
```

Open another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract address shown.

---

### 🌐 STEP 5: Frontend Setup

Create folder: `frontend/`

#### 📄 `frontend/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Student Dashboard</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>🎓 Student Dashboard</h1>
  <button id="connectButton">🔌 Connect Wallet</button>
  <button id="disconnectButton">❌ Disconnect</button>
  <br><br>
  <input type="text" id="name" placeholder="Enter Name" />
  <input type="text" id="course" placeholder="Enter Course" />
  <button id="registerButton">Register</button>

  <h3>Your Registration:</h3>
  <div id="studentInfo"></div>

  <script src="https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.umd.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

#### 🎨 `frontend/style.css`

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f0f0f0;
  padding: 20px;
}

input {
  margin: 10px;
  padding: 8px;
}
```

#### 📜 `frontend/app.js`

```javascript
let provider;
let signer;
let contract;

const contractAddress = "PASTE_YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "string", "name": "_course", "type": "string" }
    ],
    "name": "registerStudent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_addr", "type": "address" }
    ],
    "name": "getStudent",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" },
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

document.getElementById("connectButton").onclick = async function () {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    alert("Wallet connected!");
  } else {
    alert("Please install MetaMask!");
  }
};

document.getElementById("disconnectButton").onclick = function () {
  provider = null;
  signer = null;
  contract = null;
  alert("Wallet disconnected (page reset recommended)");
};

document.getElementById("registerButton").onclick = async function () {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const tx = await contract.registerStudent(name, course);
  await tx.wait();
  alert("Student Registered!");
  showStudent();
};

async function showStudent() {
  const address = await signer.getAddress();
  const data = await contract.getStudent(address);
  document.getElementById("studentInfo").innerText = `👤 Name: ${data[0]} | 📚 Course: ${data[1]}`;
}
```

---

## 🧪 STEP 6: Run Everything

### 1. Run Hardhat node:

```bash
npx hardhat node
```

### 2. Deploy contract:

(open new terminal)

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Serve frontend:

Use VS Code Live Server or simple Python server:

```bash
cd frontend
python -m http.server 5500
```

Open browser: `http://localhost:5500`

---

## 🔌 STEP 7: Connect MetaMask

1. Open MetaMask → Add Network manually:
    
    - **Name**: Hardhat Localhost
        
    - **RPC URL**: `http://127.0.0.1:8545`
        
    - **Chain ID**: `31337`
        
    - **Currency**: ETH
        
2. Import one of the accounts from terminal using the **private key**
    
3. Click `🔌 Connect Wallet` on the webpage
    
4. Fill Name + Course → click "Register"
    

---

## ❌ STEP 8: Disconnect MetaMask

- Use `Disconnect` button (resets app-side connection)
    
- OR in MetaMask:
    
    - Click three dots → `Connected sites` → Remove current site
        

---

Would you like me to zip the whole folder and share the files too?



# Terminal 1
@sachinkolhar ➜ /workspaces/Blockchain (main) $ mkdir student-dapp
@sachinkolhar ➜ /workspaces/Blockchain (main) $ cd student-dapp
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npm init -y
Wrote to /workspaces/Blockchain/student-dapp/package.json:

{
  "name": "student-dapp",
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



@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npm install --save-dev hardhat
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated glob@8.1.0: Glob versions prior to v9 are no longer supported

added 220 packages, and audited 221 packages in 2m

63 packages are looking for funding
  run `npm fund` for details

3 low severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npx hardhat
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

Welcome to Hardhat v2.23.0

✔ What do you want to do? · Create a JavaScript project
✔ Hardhat project root: · /workspaces/Blockchain/student-dapp
✔ Do you want to add a .gitignore? (Y/n) · y
✔ Do you want to install this sample project's dependencies with npm (@nomicfoundation/hardhat-toolbox)? (Y/n) · y


npm install --save-dev "@nomicfoundation/hardhat-toolbox@^5.0.0"
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@5.0.15: Glob versions prior to v9 are no longer supported
npm warn deprecated glob@7.1.7: Glob versions prior to v9 are no longer supported
npm warn deprecated lodash.isequal@4.5.0: This package is deprecated. Use require('node:util').isDeepStrictEqual instead.

added 345 packages, and audited 566 packages in 48s

102 packages are looking for funding
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


@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ touch contracts/StudentDashboard.sol
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npx hardhat compile
Downloading compiler 0.8.28
Compiled 2 Solidity files successfully (evm target: paris).
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ mkdir scripts
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ touch scripts/deploy.js
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ 
# Terminal 2

@sachinkolhar ➜ /workspaces/Blockchain (main) $ <font color="#ffff00">pwd</font>
/workspaces/Blockchain
@sachinkolhar ➜ /workspaces/Blockchain (main) $ <font color="#ffff00">cd student-dapp</font>
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ <font color="#ffff00">npx hardhat node</font>
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
  Contract deployment: StudentDashboard
  Contract address:    0x5fbdb2315678afecb367f032d93f642f64180aa3
  Transaction:         0x5143c9a59dd147be32ca2269b7843fc050d8f528784955edd01e3b099617c30f
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            617186 of 30000000
  Block #1:            0xcbe16bdee51db20dc2ae6dd86579c7d40166c805dc98121460e824debc76c987

eth_getTransactionByHash
eth_accounts
hardhat_metadata (20)
eth_blockNumber
eth_getBlockByNumber
eth_feeHistory
eth_sendTransaction
  Contract deployment: StudentDashboard
  Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
  Transaction:         0x5cc31b803ce48f21110e4827a4d21f0f82dee2f2f97bcd6d6838c1bc00a57900
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            617186 of 30000000
  Block #2:            0xb2d906710ca9b0d185e78538af4488293dd79d7632745d0d409f2b9f42e5eb96

eth_getTransactionByHash
eth_accounts
hardhat_metadata (20)
eth_blockNumber
eth_getBlockByNumber
eth_feeHistory
eth_sendTransaction
  Contract deployment: StudentDashboard
  Contract address:    0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
  Transaction:         0xf6e4c37652040a19e54a049ed2c0b274e92011dc9fbe4895c49d0709f2187ce7
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            617186 of 30000000
  Block #3:            0xd95340d0ccb3b4d653ad690890c11a841be35fa8d8b8cea4578a858a711e2a9b

eth_getTransactionByHash
eth_getTransactionReceipt
eth_blockNumber

# Terminal 3
@sachinkolhar ➜ /workspaces/Blockchain (main) $ pwd
/workspaces/Blockchain
@sachinkolhar ➜ /workspaces/Blockchain (main) $ cd student-dapp
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npx hardhat run scripts/deploy.js --network localhost
TypeError: contract.deployed is not a function
    at main (/workspaces/Blockchain/student-dapp/scripts/deploy.js:7:20)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ npx hardhat run scripts/deploy.js --network localhost
Starting deployment...
Contract factory created...
Contract deployment transaction sent...
Deployment failed: TypeError: Cannot read properties of undefined (reading 'wait')
    at main (/workspaces/Blockchain/student-dapp/scripts/deploy.js:15:55)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ <font color="#ffff00">npx hardhat run scripts/deploy.js --network localhost</font>
Starting deployment...
Contract factory created...
Awaiting deployment...
Contract deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /wo    rkspaces/Blockchain        /student-dapp (main
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ 
# Terminal 4

@sachinkolhar ➜ /workspaces/Blockchain (main) $ cd student-dapp
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ mkdir frontend
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ touch frontend/index.html
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ touch frontend/style.css
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ touch frontend/app.js
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp (main) $ cd frontend
@sachinkolhar ➜ /workspaces/Blockchain/student-dapp/frontend (main) $ python -m http.server 5500
Serving HTTP on 0.0.0.0 port 5500 (http://0.0.0.0:5500/) ...
127.0.0.1 - - [19/Apr/2025 06:10:59] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [19/Apr/2025 06:10:59] "GET /style.css HTTP/1.1" 200 -
127.0.0.1 - - [19/Apr/2025 06:10:59] "GET /app.js HTTP/1.1" 200 -
127.0.0.1 - - [19/Apr/2025 06:10:59] code 404, message File not found
127.0.0.1 - - [19/Apr/2025 06:10:59] "GET /favicon.ico HTTP/1.1" 404 -


# 2nd time run

```
# 1. Start Hardhat node
npx hardhat node

# 2. Deploy contract in another terminal
npx hardhat run scripts/deploy.js --network localhost

# 3. Update contract address in frontend (if not automated)

# 4. Serve frontend
cd frontend
python -m http.server 5500

# 5. Open in browser
http://127.0.0.1:5500

# 6. Connect MetaMask (Hardhat Localhost network, import account if needed)

```