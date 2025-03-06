# Mapping
- Mapping in Solidity acts like a hash table or dictionary in any other language.
- These are used to store the data in the form of key-value pairs
- Mappings are mostly used to associate the unique Ethereum address with the
associated value type.
- key can be any of the built-in data types but reference types are not allowed while
the value can be of any type.

```c
mapping(key => value) <access specifier> <name>;
```

# PROGRAM

```c
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Mapping {
mapping(uint =>string) public roll_no;
function setter(uint keys, string memory value) public
{

roll_no[keys] = value;

}
```
<img width="334" alt="Pasted image 20241111221047" src="https://github.com/user-attachments/assets/4b5fd86f-ddee-48bb-9fc1-8c1dcd940425" />

