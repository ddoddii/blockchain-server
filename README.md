# Nest Server for storing latest Blockchain data

## Table of Contents

1. [👋 About](#👋-about)
2. [✨ How To Run](#✨-how-to-run)
3. [🚀 Action Plan](#🚀-action-plan)
4. [📚 Project Stack](#📚-project-stack)
5. [📦 Database Schema](#📦-database-schema)
6. [💭 시행착오](#💭-시행착오)
7. [🌱 회고](#🌱-회고)
8. [🔎 참고한 자료](#🔎-참고한-자료)

## 👋 About

-   Ethers.js 라이브러리를 활용하여 Block Hash / Block Number / Block Name 을 바탕으로 블럭 정보 조회합니다.
    -   Ethers.js 라이브러리는 이더리움 블록체인 및 그 생태계와 상호 작용하기 위한 완전하고 컴팩트한 라이브러리입니다.
-   블럭 내에 포함된 Transaction 들의 receipt 정보, Logs 들을 조회할 수 있습니다.
-   블럭 구조에 대한 이해를 돕기 위해 아래의 사진을 첨부합니다.

<img width="600" alt="image" src="https://github.com/ddoddii/ddoddii.github.io/assets/95014836/ad3d4a95-eac7-468b-b47d-f148ba83ee6b">

## ✨ How To Run

1. `.env` 파일 생성 후 본인의 Infura API Key (`INFURA_API`) 저장
2. `docker build -t <이미지 이름> .`
3. `docker run -d -p 3333:3333 <이미지 이름>`

## 🚀 Action Plan

<details>
<summary>Day 1</summary>

<!-- summary 아래 한칸 공백 두어야함 -->

-   [x] 블럭체인 용어 정리
-   [x] Nest Js 튜토리얼
-   [x] Ether.js 공식문서 읽어보기
-   [x] 데이터베이스 스키마 설계

</details>

<details>
<summary>Day 2</summary>

<!-- summary 아래 한칸 공백 두어야함 -->

-   [x] 최신 블록체인 정보 데이터베이스 저장
-   [x] API Endpoint 설계
-   [x] OpenAPI Swagger 문서
-   [x] Dockerizing
-   [x] readme / 회고 작성
-   [ ] test code 작성
-   [ ] AWS 배포
-   [ ] Github Actions 를 활용한 CI/CD 자동화
-   [ ] 슬랙 봇 만들기

</details>

## 📚 Project Stack

-   Nest.js
-   Ethers.js
-   Typescript
-   Docker
-   PostgreSQL

#### Coding Convention

-   [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## 📦 Database Schema

#### 저장해야 하는 정보

-   필요한 블록체인 데이터 구조는 ethers.js의 **Block(with transaction hashes), TransactionReceipt, Log**

<details>
<summary>Block Data</summary>

| Name               | Data Type                                                                                           | Explanation                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| block.hash         | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32>>            | The hash of this block.                                                                                                                                                                                                                                                                                                                                                                            |
| block.parentHash   | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32>>            | The hash of the previous block.                                                                                                                                                                                                                                                                                                                                                                    |
| block.number       | number                                                                                              | The height (number) of this block.                                                                                                                                                                                                                                                                                                                                                                 |
| block.timestamp    | number                                                                                              | The timestamp of this block.                                                                                                                                                                                                                                                                                                                                                                       |
| block.nonce        | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString) >                | The nonce used as part of the proof-of-work to mine this block.                                                                                                                                                                                                                                                                                                                                    |
| block.difficulty   | number                                                                                              | The difficulty target required to be met by the miner of the block.<br><br>Recently the difficulty frequently exceeds the size that a JavaScript number can safely store (53-bits), so in that case this property may be null. It is recommended to use the `_difficulty` property below, which will always return a value, but as a [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/). |
| block.\_difficulty | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                                        | The difficulty target required to be met by the miner of the block, as a [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/).<br><br>Recently the difficulty frequently exceeds the size that a JavaScript number can safely store (53-bits), so this property was added to safely encode the value for applications that require it.                                                     |
| block.gasLimit     | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                                        | The maximum amount of gas that this block was permitted to use. This is a value that can be voted up or voted down by miners and is used to automatically adjust the bandwidth requirements of the network.                                                                                                                                                                                        |
| block.gasUsed      | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                                        | The total amount of gas used by all transactions in this block.                                                                                                                                                                                                                                                                                                                                    |
| block.miner        | string                                                                                              | The coinbase address of this block, which indicates the address the miner that mined this block would like the subsidy reward to go to.                                                                                                                                                                                                                                                            |
| block.extraData    | string                                                                                              | This is extra data a miner may choose to include when mining a block.                                                                                                                                                                                                                                                                                                                              |
| block.transactions | Array< string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > > > | A list of the transactions hashes for each transaction this block includes.                                                                                                                                                                                                                                                                                                                        |
|                    |                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                    |

</details>

<details>
<summary>Transaction Receipt Data</summary>

| Name                      | Data Type                                                                                  | Explanation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| receipt.to                | string< [Address](https://docs.ethers.org/v5/api/utils/address/#address) >                 | The address this transaction is to. This is `null` if the transaction was an **init transaction**, used to deploy a contract.                                                                                                                                                                                                                                                                                                                                                                                                      |
| receipt.from              | string< [Address](https://docs.ethers.org/v5/api/utils/address/#address) >                 | The address this transaction is from.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| receipt.contractAddress   | string< [Address](https://docs.ethers.org/v5/api/utils/address/#address) >                 | If this transaction has a `null` to address, it is an **init transaction** used to deploy a contract, in which case this is the address created by that contract.<br><br>To compute a contract address, the [getContractAddress](https://docs.ethers.org/v5/api/utils/address/#utils-getContractAddress) utility function can also be used with a [TransactionResponse](https://docs.ethers.org/v5/api/providers/types/#providers-TransactionResponse) object, which requires the transaction nonce and the address of the sender. |
| receipt.transactionIndex  | number                                                                                     | The index of this transaction in the list of transactions included in the block this transaction was mined in.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| receipt.type              | number                                                                                     | The [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) type of this transaction. If the transaction is a legacy transaction without an envelope, it will have the type `0`.                                                                                                                                                                                                                                                                                                                                                       |
| receipt.root              | string                                                                                     | The intermediate state root of a receipt.<br><br>Only transactions included in blocks **before** the [Byzantium Hard Fork](https://eips.ethereum.org/EIPS/eip-609) have this property, as it was replaced by the `status` property.                                                                                                                                                                                                                                                                                                |
| receipt.gasUsed           | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                               | The amount of gas actually used by this transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| receipt.effectiveGasPrice | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                               | The effective gas price the transaction was charged at.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| receipt.logsBloom         | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString) >       | A [bloom-filter](https://en.wikipedia.org/wiki/Bloom_filter), which includes all the addresses and topics included in any log in this transaction.                                                                                                                                                                                                                                                                                                                                                                                 |
| receipt.blockHash         | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > > | The block hash of the block that this transaction was included in.                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| receipt.transactionHash   | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > > | The transaction hash of this transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| receipt.logs              | Array< [Log](https://docs.ethers.org/v5/api/providers/types/#providers-Log) >              | All the logs emitted by this transaction.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| receipt.blockNumber       | number                                                                                     | The block height (number) of the block that this transaction was included in.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| receipt.confirmations     | number                                                                                     | The number of blocks that have been mined since this transaction, including the actual block it was mined in.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| receipt.cumulativeGasUsed | [BigNumber](https://docs.ethers.org/v5/api/utils/bignumber/)                               | For the block this transaction was included in, this is the sum of the gas used by each transaction in the ordered list of transactions up to (and including) this transaction.                                                                                                                                                                                                                                                                                                                                                    |
| receipt.byzantium         | boolean                                                                                    | This is true if the block is in a [post-Byzantium Hard Fork](https://eips.ethereum.org/EIPS/eip-609) block.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| receipt.status            | number                                                                                     | The status of a transaction is 1 is successful or 0 if it was reverted. Only transactions included in blocks [post-Byzantium Hard Fork](https://eips.ethereum.org/EIPS/eip-609) have this property.                                                                                                                                                                                                                                                                                                                                |

-   An **Address** is a [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString) of 20 bytes (40 nibbles), with optional mixed case.
-   An **Ethereum address** is a 42-character hexadecimal address derived from the last 20 bytes of the public key controlling the account with 0x appended in front.  e.g., 0x71C7656EC7ab88b098defB751B7401B5f6d8976F.
-   TransactionType only goes up to 0x7f. For the forseable future, 0x7f is plenty and it leaves open a number of options for extending the range such as using the high bit as a continuation bit. This also prevents us from colliding with legacy transaction types, which always start with a byte `>= 0xc0`.

</details>

<details>
<summary>Log Data</summary>

| Name                 | Data Type                                                                                           | Explanation                                                                                                                                                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| log.blockNumber      | number                                                                                              | The block height (number) of the block including the transaction of this log.                                                                                                                                                                                                            |
| log.blockHash        | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > >          | The block hash of the block including the transaction of this log.                                                                                                                                                                                                                       |
| log.removed          | boolean                                                                                             | During a re-org, if a transaction is orphaned, this will be set to true to indicate the Log entry has been removed; it will likely be emitted again in the near future when another block is mined with the transaction that triggered this log, but keep in mind the values may change. |
| log.address          | string< [Address](https://docs.ethers.org/v5/api/utils/address/#address) >                          | The address of the contract that generated this log.                                                                                                                                                                                                                                     |
| log.data             | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString) >                | The data included in this log.                                                                                                                                                                                                                                                           |
| log.topics           | Array< string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > > > | The list of topics (indexed properties) for this log.                                                                                                                                                                                                                                    |
| log.transactionHash  | string< [DataHexString](https://docs.ethers.org/v5/api/utils/bytes/#DataHexString)< 32 > >          | The transaction hash of the transaction of this log.                                                                                                                                                                                                                                     |
| log.transactionIndex |  number                                                                                             | The index of the transaction in the block of the transaction of this log.                                                                                                                                                                                                                |
| log.logIndex         |  number                                                                                             | The index of this log across all logs in the entire **block**.                                                                                                                                                                                                                           |

</details>

-   block - transaction : one - many
-   transaction - log : one - many
    -   Each transaction on the blockchain can generate zero or more logs. These logs are emitted by smart contracts during the execution of a transaction and are included in the transaction receipt. Logs are used to record events and other information, such as state changes or important occurrences during the execution of a smart contract.

#### ERD Table

<img width="600" alt="image" src="https://github.com/ddoddii/mesher-server/assets/95014836/b2bcdd89-ce93-491a-9824-6c724b2dd27d">

## 💭 시행착오와 고민

#### 1. 어떠한 데이터베이스를 선택할 것인가 ?

전통적인 관계형 데이터베이스를 사용할지, 비관계형 데이터베이스를 사용하여 데이터를 저장할 지 고민했습니다. 사실 본 프로젝트에서는 테이블간의 join 이 많이 없고, key-value 값으로 저장하는 NoSQL 의 강점도 분명히 있었습니다. 하지만 RDBMS 는 데이터 무결성을 보장하고, 데이터가 중복되지 않음을 보장하는 반면 NoSQL 은 데이터 중복을 계속 업데이트 해야 합니다. 유일한 값인 해시 값으로 조회를 많이 하는 현재 상황에서, 중복 없이 Block / Transaction Receipt / Log 를 저장하는 RDBMS 가 더 강점이 있다고 생각했습다.

그렇다면 RDBMS 중에서도 어떤 데이터베이스를 선택할지 고민이었습다. 우선 후보는 MySQL 과 PostgreSQL 이었습다. 블럭 정보를 저장할 때 쓰기 연산이 굉장히 많이 사용됩니다. 이때 쓰기 작업에 더 강점을 가진 것이 PostgreSQL 입니다. 또 , PostgreSQL 는 객체 관계형 데이터베이스 관리 시스템(ORDBMS) 으로, 관계형 데이터베이스 시스템과 객체 지향 데이터베이스 시스템의 특징을 결합한 DBMS 입니다. 이때 데이터는 객체로 저장되어 객체 간의 관계를 중심으로 작동합니다. 또한 개발하는 본인이 스스로 데이터형과 메서드를 자유롭게 설정할 수 있습니다. 단순 읽기 성능에는 MySQL 이 우위에 있지만, 위의 이유들을 종합적으로 고려하여 결국 **PostgreSQL** 로 결정하였습니다.

#### 2. transactionReceipt 를 transactionHash 로 별도로 조회해서 transactionReceipt 정보를 별도로 저장하면 안되나 ?

Block 과 Transaction Receipt 의 관계를 파악하고, TransactionReceipt Table 의 FK 로 blockHash (Block 의 PK 인 Hash) 로 설정했습니다.

처음 생각할 때는, transactionReceipt 를 transactionHash 로 별도로 조회해서 transactionReceipt 정보를 별도로 저장할 것이라고 생각했습니다. 하지만, `provider.getTransactionReceipt(transactionHash)` 를 하고 이 transaction Receipt 정보를 데이터베이스에 저장하자, blockHash 에서 `type 'string' is not assignable to type 'never'.ts(2322)` 오류가 계속 났습니다. 생각해보니, 없는 값을 가져와서 FK 로 저장할 수 는 노릇이었습다.

따라서, block 을 조회해서 저장할 때, 연쇄적으로 여기에 포함된 transactionReceipt, transactionReceipt 에 포함된 log 정보들을 저장하는 것으로 로직을 수정했습니다.

#### 3. Log의 Index 를 어떤 것을 설정할까 ?

Log 는 위의 block, transaction receipt과 다르게 해시 값이 없었습니다. index 는 전체에서 유일한 값이 아니라, 블럭 내에서 로그들끼리 식별할 수 있는 인덱스였습니다. 따라서 index 는 Log Table 내 유일한 값이 아니어서 단독 인덱스를 설정할 수 는 없었습니다. 그래서 유일한 값을 가질 것 같은 data를 인덱스로 할까 생각했지만, data 값이 유일하다는 보장도 없고, 길이도 너무 길었습니다. 따라서 [blockHash, Index] 두개의 칼럼을 multi-column index 로 지정했습니다.

## 🌱 회고

#### 시간만 조금 더 있었다면 ...

본 프로젝트는 48시간이라는 시간 제한이 있는 프로젝트입니다. 또한, 블록체인에 대한 사전 정보가 부족한 상태에서 시작하다보니 첫날에는 블럭체인 도메인에 대한 이해를 하는데 많은 시간을 사용했습니다.

또한, Nest JS로 백엔드를 만드는 경험도 처음이었습니다. 따라서 첫날에 Freecodecamp의 Nest JS 튜토리얼을 빠른 속도로 완강하였습니다. 그나마 다행인 것은 MVC 구조, 데코레이터, Provider, Modules 등 Spring 과 비슷한 구석이 많았다는 점입니다. 따라서 언어가 손에 익지 않았음에도 필요한 모든 Rest API 도 만들고 나름의 구조도 깔끔하게 유지할 수 있었습니다.

그 후 Dockerfile 을 작성하여 프로젝트를 도커라이징까지 완료하였습니다. 로컬에서는 Volume 을 연결해서 docker container 가 중지되었다가 재시작되어도 데이터가 날라가지 않도록 설정했는데, 빌드한 이미지를 기반으로 컨테이너를 실행시킬 때는 Volume 을 연결하지 못했습니다...

Docker Compose 를 이용해 dev DB, test DB 까지 분리했지만 시간의 부족으로 테스트 코드는 작성하지 못하였습니다.

또한, 원래 계획으로는 AWS EC2 를 사용하여 배포도 하고, Github actions 를 활용하여 CI/CD 도 적용할 계획이었으나 시간 부족으로 실행하지 못했습니다.

하루만 더 주어진다면, 슬랙 봇도 만들고, Docker와 관련된 여러 설정들을 세팅해서 더 완성된 결과물을 만들었을 수 있을텐데 아쉽습니다.

#### 그럼에도 48시간 동안 내가 할 수 있는 최선을 하지 않았나

그럼에도 저는 제가 48시간 동안 내가 할 수 있는 최선을 했습니다. 첫날에도 새벽 4시에 자고, 현재 마지막 문서를 작성하고 있는 시각은 어느덧 새벽 3시를 향해가네요.

NestJs, Prisma, EthersJs 공식문서가 자세하게 잘 나와있던 덕분에 빠르게 학습할 수 있었습니다. 또 블럭체인이라는 새로운 분야에 대해 공부하며 재미있었습니다. 특히 [‘웹3-블록체인-토큰-메타버스-VR·AR’ 완벽한 위계정리 (김지현 SK 부사장)](https://www.youtube.com/watch?v=ZUzIHjTs2dA&pp=ygUM67iU65-t7LK07J24 '‘웹3-블록체인-토큰-메타버스-VR·AR’ 완벽한 위계정리 (김지현 SK 부사장)') 영상을 보며 앞으로 어떤 형태의 web 이 생길지, 블럭체인이 새로운 형태의 web 에 어떻게 기술적 근간이 될 수 있는지 새로운 시각을 배울 수 있었습니다.

새로운 것을 공부하는 것은 세상을 보는 해상도를 높이는 것이라고 생각합니다. 이런 좋은 경험을 할 수 있게 해준 [@Mesher](https://mesher.io/) 에게도 감사한 말씀을 전합니다.

## 🔎 참고한 자료

-   [But how does bitcoin actually work?](https://www.youtube.com/watch?v=bBC-nXj3Ng4&pp=ygUSV2hhdCBpcyBibG9ja2NoYWlu 'But how does bitcoin actually work?')
-   [‘웹3-블록체인-토큰-메타버스-VR·AR’ 완벽한 위계정리 (김지현 SK 부사장)](https://www.youtube.com/watch?v=ZUzIHjTs2dA&pp=ygUM67iU65-t7LK07J24 '‘웹3-블록체인-토큰-메타버스-VR·AR’ 완벽한 위계정리 (김지현 SK 부사장)')
-   [블록체인의 정의와 기술 “비전공자도 이해하는 기본적 이해”](https://medium.com/@kimjunyong/%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8%EC%9D%98-%EC%A0%95%EC%9D%98%EC%99%80-%EA%B8%B0%EC%88%A0-%EB%B9%84%EC%A0%84%EA%B3%B5%EC%9E%90%EB%8F%84-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-%EA%B8%B0%EB%B3%B8%EC%A0%81-%EC%9D%B4%ED%95%B4-6706ebb43009)
-   https://info.etherscan.com/what-is-an-ethereum-address/
-   [Master Ethers.js for Blockchain Step-by-Step Full Course](https://www.youtube.com/watch?v=yk7nVp5HTCk)
-   [ethers documentation](https://docs.ethers.org/v5/)
-   https://github.com/dappuniversity/ethers_examples
-   [NestJS documentation](https://docs.nestjs.com/)
-   [NestJS course](https://youtu.be/GHTA143_b-s?si=CJ3z57p2clBWUt7X)
-   https://www.prisma.io/docs
-   [Spring 개발자의 NestJs 적응하기](https://medium.com/zigbang/spring-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-nestjs-%EC%A0%81%EC%9D%91%ED%95%98%EA%B8%B0-a816fa0f38a9)
