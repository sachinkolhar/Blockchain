# **Hardhat Test Script**  

A test script in Hardhat is written using **Mocha** (a JavaScript test framework) and **Chai** (an assertion library). The purpose of the script is to automate the testing of a **Solidity smart contract**.

---
# Generic Template for Any Contract

 the general structure of the test script remains the same for all smart contracts. However, you need to modify it based on:

1. **Contract Name** – Change `"SimpleStorage"` to match your contract.
2. **Functions** – Update function calls (`setValue()`, `getValue()`) to match your contract's functions.
3. **Parameters & Assertions** – Modify the test values and expected outcomes based on your contract logic.



```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("<Your Contract Name> Contract", function () {
    let Contract, contract;  // Declare Variables for Reuse

    beforeEach(async function () {
        Contract = await ethers.getContractFactory("<YourContract>");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it("Should perform <some function> correctly", async function () {
        const tx = await contract.<functionName>(<arguments>); 
        await tx.wait();

        const result = await contract.<getterFunction>();
        expect(result).to.equal(<expectedValue>);
    });
});
```

## **🔹 Structure of a Test Script**
Let's break down a test script for a simple contract that stores and retrieves a value.

### **1️⃣ Import Required Libraries**
```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");
```
- **`require("chai")`** → Chai is used for writing test assertions (e.g., checking if values match).  
- **`require("hardhat")`** → Hardhat is used to deploy and interact with the smart contract.

---

### **2️⃣ Describe the Test Suite**
```javascript
describe("SimpleStorage Contract", function () {
```
- **`describe()`** → This function groups related tests under a name (e.g., "SimpleStorage Contract").  
- Inside `describe()`, we define multiple tests using `it()`.

---

### **3️⃣ Declare Variables for Reuse**
```javascript
    let Storage, storage;
```
- `Storage` → Will hold the contract factory (blueprint to deploy the contract).  
- `storage` → Will hold the deployed contract instance.

---

### **4️⃣ Deploy Contract Before Each Test**
```javascript
    beforeEach(async function () {
        Storage = await ethers.getContractFactory("SimpleStorage");
        storage = await Storage.deploy();
        await storage.deployed();
    });
```
- **`beforeEach()`** → Runs before every test case (ensures a fresh contract instance).
- **`getContractFactory()`** → Gets the contract so it can be deployed.
- **`deploy()`** → Deploys the contract on the Hardhat network.
- **`await storage.deployed()`** → Waits until the deployment is complete.

---

### **5️⃣ Writing a Test Case**
```javascript
    it("Should store a value correctly", async function () {
        const value = 42;
        const tx = await storage.setValue(value);
        await tx.wait();

        const storedValue = await storage.getValue();
        expect(storedValue).to.equal(value);
    });
```
- **`it()`** → Defines a test case (this one checks if the contract stores a value correctly).
- **`storage.setValue(value)`** → Calls the smart contract function to set a value.
- **`tx.wait()`** → Waits for the transaction to be confirmed.
- **`storage.getValue()`** → Calls the function to retrieve the stored value.
- **`expect(storedValue).to.equal(value)`** → Checks if the stored value is correct.

---

## **🔹 Running the Test**
To execute the test script, run:
```bash
npx hardhat test
```
✅ If all test cases pass, you’ll see **green checkmarks** in the terminal. If any test fails, you’ll get an error message.

---

## **🔹 Adding Multiple Test Cases**
If your contract has multiple functions, write multiple `it()` blocks:
```javascript
    it("Should emit an event when value is set", async function () {
        const value = 100;
        await expect(storage.setValue(value))
            .to.emit(storage, "ValueChanged")
            .withArgs(value);
    });

    it("Should retrieve the initial value as 0", async function () {
        const storedValue = await storage.getValue();
        expect(storedValue).to.equal(0);
    });
```
---

### **🛠 Key Takeaways**
✔ **Use `describe()`** to group tests.  
✔ **Deploy contract in `beforeEach()`** to ensure a fresh state.  
✔ **Use `it()`** to write individual test cases.  
✔ **Use `expect()`** from Chai to compare expected vs actual results.  
✔ **Run `npx hardhat test`** to execute tests.
