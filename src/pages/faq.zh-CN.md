# Aiken 语言 — 常见问题解答 <span id="aiken-language--frequently-asked-questions" />

---

## Q1：什么是 Aiken？ <span id="q1-what-is-aiken" />

**回答：** Aiken 是一种现代化的纯函数式编程语言，专门为在 Cardano 区块链上编写智能合约（验证器）而设计。它会编译为非类型化 Plutus Core (UPLC)，这是 Cardano 虚拟机执行的低阶解释代码。尽管有时会被误认为是 Rust，但 Aiken 是一门独立的语言——只是它的编译器恰好是用 Rust 编写的。

**重点：**
- 用途：Cardano 的智能合约（验证器）
- 范式：纯函数式，静态类型并具备类型推导
- 语法：受 Rust 启发，但并非 Rust
- 编译目标：非类型化 Plutus Core (UPLC)
- 非：通用编程语言；非 Haskell；非 PlutusTx

**示例：**
```aiken
validator hello_world {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _own_ref: OutputReference, self: Transaction) {
    todo @"validator logic goes here"
  }
}
```

**相关：** [安装](#q3-how-do-i-install-aiken) | [第一个验证器](#q10-how-do-i-write-my-first-validator)

---

## Q2：Aiken 与 Plutus (PlutusTx) 有何不同？ <span id="q2-how-is-aiken-different-from-plutus-plutustx" />

**回答：** Aiken 和 PlutusTx 都会编译为非类型化 Plutus Core (UPLC)，但它们的方法有显著差异。PlutusTx 是一个嵌入式 Haskell 框架，使用 GHC 插件将 Haskell 的中间表示转换为 UPLC。相比之下，Aiken 是一门独立的语言，拥有自己的编译器、语法和工具链——是专门为 Cardano 智能合约使用场景从零构建的。

**重点：**
- Aiken 是具有专用编译器的独立语言；PlutusTx 是 Haskell 框架/插件
- Aiken 采用受 Rust 启发的语法；PlutusTx 使用 Haskell 语法
- Aiken 开箱即用，包含集成测试、基准测试和语言服务器
- Aiken 追求简洁——目前没有高阶类型 (higher-kinded types) 或类型类 (typeclasses)
- 两者都编译为相同的 UPLC 目标，因此在链上它们的能力是等效的
- Cardano 并**不**在链上运行 Haskell——无论原始语言为何，它运行的都是 UPLC

**相关：** [生态系统概览](#q35-what-other-languages-can-i-use-for-cardano-smart-contracts)

---

## Q3：如何安装 Aiken？ <span id="q3-how-do-i-install-aiken" />

**回答：** 安装 Aiken 的推荐方式是通过 `aikup`，这是一个用于下载和管理多个 Aiken 版本的跨平台工具。一旦安装了 `aikup`，只需运行 `aikup` 即可安装最新版本。您也可以通过提供版本号来安装特定版本。

**重点：**
- `aikup` 是主要的安装方式
- 支持 npm、Homebrew 和直接 URL 安装
- 适用于 Linux、macOS 和 Windows

**示例：**
```bash
# Via npm
npm install -g @aiken-lang/aikup

# Via Homebrew
brew install aiken-lang/tap/aikup

# Via URL (Linux & macOS)
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh

# Via URL (Windows)
powershell -c "irm https://windows.aiken-lang.org | iex"

# 然后安装 Aiken
aikup
```

**相关：** [编辑器设置](#q4-which-editors-support-aiken) | [创建项目](#q5-how-do-i-create-a-new-aiken-project)

---

## Q4：哪些编辑器支持 Aiken？ <span id="q4-which-editors-support-aiken" />

**回答：** Aiken 拥有编辑器插件，为所有主流编辑器提供语法高亮和缩进规则。它还内置了语言服务器协议 (LSP) 实现，以提供代码补全和诊断等高级功能。

**重点：**
- **Zed：** `aiken-lang/zed-aiken`
- **VSCode：** `aiken-lang/vscode-aiken`
- **Vim/Neovim：** `aiken-lang/editor-integration-nvim`
- **Emacs：** `aiken-lang/aiken-mode`
- **JetBrains：** `MedusaLabs-cardano/intellij_aiken`
- LSP 命令： `aiken lsp`（在 CLI 帮助中隐藏）
- 根目录模式： `aiken.toml`
- 文件类型： `.ak`

**相关：** [安装](#q3-how-do-i-install-aiken) | [自动补全](#q3-how-do-i-install-aiken)

---

## Q5：如何创建一个新的 Aiken 项目？ <span id="q5-how-do-i-create-a-new-aiken-project" />

**回答：** 使用 `aiken new` 命令后接 `{organisation}/{repository}` 名称。这会创建一个包含标准文件夹结构、配置文件和占位符验证器的项目骨架。

**重点：**
- 命令： `aiken new foo/bar`
- 创建 `aiken.toml`、`lib/`、`validators/` 和 `README.md`
- 标准库会自动作为依赖项加入
- 库代码放在 `lib/`；验证器放在 `validators/`

**示例：**
```bash
aiken new aiken-lang/hello-world
cd hello-world
```

生成的结构：
```
.
├── README.md
├── aiken.toml
├── lib
│   └── hello-world
└── validators
```

**相关：** [项目结构](#q6-what-is-the-project-structure-of-an-aiken-project) | [编译](#q7-how-do-i-compile-an-aiken-project)

---

## Q6：Aiken 项目的结构是什么？ <span id="q6-what-is-the-project-structure-of-an-aiken-project" />

**回答：** Aiken 项目将源码分为两类：库代码（位于 `lib/`）和应用程序代码，即链上验证器（位于 `validators/`）。项目根目录包含一个 `aiken.toml` 配置文件。编译后，会生成一个 Plutus 蓝图（`plutus.json`），其中包含编译后的验证器代码和哈希摘要。

**重点：**
- `lib/` — 可重复使用的库模块
- `validators/` — 链上验证器源码文件 (`.ak`)
- `env/` — 可根据条件包含的环境特定代码  
- `aiken.toml` — 项目元数据、依赖项与配置
- `plutus.json` — 构建后生成的 Plutus 蓝图 (CIP-0057)
- `build/` — 构建产物与已获取的依赖项

**示例 (`aiken.toml`):**
```toml
name = "foo/bar"
version = "1.0.0"
licence = "Apache-2.0"
description = "A next-level DeFi platform"

[[dependencies]]
source = "github"
name = "aiken-lang/stdlib"
version = "main"
```

**相关内容：** [创建项目](#q5-how-do-i-create-a-new-aiken-project) | [编译](#q7-how-do-i-compile-an-aiken-project)

---

## Q7：如何编译 Aiken 项目？ <span id="q7-how-do-i-compile-an-aiken-project" />

**回答：** 使用 `aiken build` 来编译您的项目，这会生成 Plutus 蓝图 (`plutus.json`)。使用 `aiken check` 进行类型检查并运行测试，而不产生完整构建。对于库项目，`aiken docs` 会根据类型、注解与说明生成 HTML 文档。

**重点：**
- `aiken build` — 完整编译，生成 `plutus.json`
- `aiken check` — 仅进行类型检查与运行测试
- `aiken bench` — 仅进行类型检查与运行基准测试
- `aiken docs` — 生成 HTML 文档
- `aiken blueprint` — 生成地址、套用参数、转换格式
- 追踪 (Traces) 默认会在 `aiken build` 时移除（使用 `--trace-level verbose` 来保留它们）
- 追踪默认会在 `aiken check` 时保留

**相关内容：** [测试](#q17-how-do-i-test-validators-in-aiken) | [疑难解答](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q8：什么是 eUTxO 模型？ <span id="q8-what-is-the-eutxo-model" />

**回答：** 扩展未花费交易输出 (Extended Unspent Transaction Output, eUTxO) 模型是 Cardano 的交易模型。在此模型中，交易会消耗现有的 UTxO（输入）并产生新的 UTxO（输出）。每个输出都有一个价值（资产）与一個地址（花费条件）。“扩展”部分增加了数据 (Datums) 与赎回者 (Redeemers)，在保持完全确定性的同时实现了具备状态的智能合约逻辑。

**重点：**
- UTxO（未花费交易输出）具有价值与地址
- 输入参考先前的输出；已花费的输出会被销毁
- 交易是原子的：要么全部成功，要么全部失败
- eUTxO 扩展增加了数据（附加于输出的状态/配置）与赎回者（在花费时提供的用户参数）
- 脚本（验证器）类似于确定性谓词 — 从概念上讲，它们会返回 True 或 False
- 初始状态来自创世配置

**相关内容：** [数据与赎回者](#q9-what-are-datums-and-redeemers) | [地址](#q12-how-do-cardano-addresses-work)

---

## Q9：什么是数据 (Datums) 与赎回者 (Redeemers)？ <span id="q9-what-are-datums-and-redeemers" />

**回答：** Datum 和 Redeemer 是 eUTxO 模型中实现智能合约逻辑的两个关键数据组件。Datum 是在创建输出时附加的数据负载——可以将其视为合约的状态或配置。Redeemer 是在尝试花费输出时在交易中提供的数据——可以将其视为用户的参数或操作。它们与脚本（验证器）一起构成了一个参数化的谓词函数。

**关键点：**
- **Datum** = 函数参数；在创建输出时设置；附加到 UTxO 上
- **Redeemer** = 函数参数；在花费输出时提供
- **脚本/验证器 (Script/Validator)（验证器）** = 函数本身；定义验证逻辑
- 只有 `spend` 目的的脚本可以访问 datum
- 在花费处理程序中，datum 始终是 `Option<T>`，因为你无法阻止某人在没有 datum 的情况下发送资产
- 它们共同使脚本完全确定性——执行仅取决于交易上下文

**示例：**
```aiken
pub type Datum {
  owner: VerificationKeyHash,
}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_world {
  spend(datum: Option<Datum>, redeemer: Redeemer, _own_ref: OutputReference, self: Transaction) {
    expect Some(Datum { owner }) = datum
    let must_say_hello = redeemer.msg == "Hello, World!"
    let must_be_signed = list.has(self.extra_signatories, owner)
    must_say_hello && must_be_signed
  }
}
```

**相关：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [验证器](#q10-how-do-i-write-my-first-validator)

---

## Q10：如何编写我的第一个验证器？ <span id="q10-how-do-i-write-my-first-validator" />

**回答：** 验证器使用 `validator` 关键字定义，并包含一个或多个对应于脚本目的（mint、spend、withdraw、publish、vote、propose）的处理函数。每个处理程序都是一个谓词，必须返回 True 才能授权该操作。“Hello, World!” 教程介绍了如何创建一个基本的 spend 验证器。

**关键点：**
- 使用 `validator` 关键字并命名
- 定义对应于 Cardano 脚本用途的处理程序
- 处理程序返回 `Bool` —— `True` 表示授权，`False`（或 `fail`）表示拒绝
- `spend` 处理程序接收 4 个参数：可选的 datum、redeemer、输出引用和交易
- 其他处理程序接收 3 个参数：redeemer、目标（取决于目的）和交易
- 后备 `else` 处理程序用于捕捉未处理的用途

**示例：**
```aiken
use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  owner: VerificationKeyHash,
}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_world {
  spend(datum: Option<Datum>, redeemer: Redeemer, _own_ref: OutputReference, self: Transaction) {
    expect Some(Datum { owner }) = datum
    let must_say_hello = redeemer.msg == "Hello, World!"
    let must_be_signed = list.has(self.extra_signatories, owner)
    must_say_hello && must_be_signed
  }
  else(_ctx) {
    fail
  }
}
```

**相关：** [Datums 与 Redeemers](#q9-what-are-datums-and-redeemers) | [测试](#q17-how-do-i-test-validators-in-aiken)

---

## Q11：Aiken 中的六种验证器目的分别是什么？ <span id="q11-what-are-the-six-validator-purposes-in-aiken" />

**回答：** Aiken 支持所有六种 Cardano 脚本用途，每一种都控制不同类型的链上操作。每个目的决定了传递给处理程序的目标参数类型。

**关键点：**
- **`mint`** — 控制用户定义资产的铸造/销毁。目标：`PolicyId`
- **`spend`** — 控制交易输出的花费。目标：`OutputReference`。唯一可以访问 datum 的用途。
- **`withdraw`** — 控制质押奖励的提取。目标：`Credential`
- **`publish`** — 控制委托凭证的发布。目标：`Certificate`
- **`vote`** — 验证来自脚本委托代表的治理投票。目标：`Voter`
- **`propose`** — 宪法护轨；验证治理提案。目标：`ProposalProcedure`。整个账本中只能存在一个此类脚本。

**示例：**
```aiken
validator my_script {
  mint(redeemer: MyRedeemer, policy_id: PolicyId, self: Transaction) { todo }
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, utxo: OutputReference, self: Transaction) { todo }
  withdraw(redeemer: MyRedeemer, account: Credential, self: Transaction) { todo }
  publish(redeemer: MyRedeemer, certificate: Certificate, self: Transaction) { todo }
  vote(redeemer: MyRedeemer, voter: Voter, self: Transaction) { todo }
  propose(redeemer: MyRedeemer, proposal: ProposalProcedure, self: Transaction) { todo }
}
```

**相关：** [验证器](#q10-how-do-i-write-my-first-validator) | [参数](#q13-how-do-validator-parameters-work)

---

## Q12：Cardano 地址是如何运作的？<span id="q12-how-do-cardano-addresses-work" />

**答案：** Cardano 地址由 2 或 3 个部分组成：标头（描述地址类型和网络）、支付凭证（支出条件）以及可选的委托凭证（质押控制）。凭证可以是验证密钥哈希（用于基于签名的支出）或脚本哈希（用于基于脚本的验证）。

**重点：**
- **标头** — 定义地址类型和网络判别式（主网与测试网）
- **支付凭证** — 控制支出；可以是验证密钥哈希或脚本哈希
- **委托凭证** — 可选；控制质押委托和奖励提取
- 脚本地址使用脚本哈希作为支付凭证，从而实现任意验证逻辑
- 地址通常以 bech32 或 base16（十六进制）格式编码
- Byron（旧版）地址已被弃用，且在 Plutus 脚本交易中被禁止使用

**相关：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [脚本与数据 (Scripts & Datums)](#q9-what-are-datums-and-redeemers)

---

## Q13：验证器参数是如何运作的？<span id="q13-how-do-validator-parameters-work" />

**答案：** 验证器可以接收参数，这些参数是嵌入在编译后验证器代码中的配置值。一旦提供，参数即成为链上脚本的一部分，并会影响其哈希值和地址。在计算任何地址之前，必须先提供参数。

**关键点：**
- 定义在验证器名称后的括号内
- 验证器内的所有处理程序皆可访问
- 必须是可序列化（非不透明）的数据类型
- 常见用途：使用 UTxO 参考来参数化一次性铸造策略
- 参数是通过使用 `aiken blueprint` 命令组套用的

**示例：**
```aiken
use aiken/collection/list
use cardano/assets.{PolicyId}
use cardano/transaction.{Transaction, OutputReference}

validator my_script(utxo_ref: OutputReference) {
  mint(redeemer: Data, policy_id: PolicyId, self: Transaction) {
    expect list.any(
      self.inputs,
      fn(input) { input.output_reference == utxo_ref }
    )
    todo @"rest of the logic goes here"
  }
}
```

**相关：** [验证器](#q10-how-do-i-write-my-first-validator) | [一次性铸造](#q26-what-is-a-one-shot-minting-policy)

---

## Q14：Aiken 的原始类型有哪些？<span id="q14-what-are-aikens-primitive-types" />

**答案：** Aiken 有 6 种可以写成字面值的原始类型：`Bool`，`Int`，`ByteArray`，`String`，`Data`，以及 `Void`。它还提供了内置的复合类型：`List`，`Tuple`，`Pair`，以及 `Option`。

**重点：**
- **Bool** — `True` 或 `False`。支持 `&&`，`||`，`!`，`==`，`?` 运算符
- **Int** — 任意大小整数（无溢出）。支持 `_` 分隔符、二进制 (`0b`)、八进制 (`0o`)、十六进制 (`0x`)
- **ByteArray** — 字节数组。三种表示法：字节数组 (`#[10, 255]`)、UTF-8 字符串 (`"foo"`)、十六进制字符串 (`#"666f6f"`)
- **String** — 以 `@` 为前缀的 UTF-8 文本 (例如 `@"Hello"`)。仅用于追踪/除错
- **Data** — 代表任何可序列化值的封装类型；一种通配类型
- **Void** — 代表无值的零元构造子
- **Option\<a\>** — `Some(a)` 或 `None`；内置于选用值
- **List\<a\>** — 有序的同质集合
- **Pair\<a, b\>** — 双元素配对，序列化为 CBOR 对应项目

**示例：**
```aiken
const my_int: Int = 1_000_000
const my_bool: Bool = True
const my_bytes: ByteArray = "Hello"
const my_hex: ByteArray = #"666f6f"
const my_string: String = @"Hello, Aiken!"
const my_list: List<Int> = [1, 2, 3]
const my_tuple: (Int, ByteArray) = (1, "one")
```

**相关：** [自定义类型](#q15-how-do-i-define-custom-types) | [变量与常量](#q16-how-do-variables-and-constants-work)

---

## Q15：如何定义自定义类型？ <span id="q15-how-do-i-define-custom-types" />

**回答：** Aiken 中的自定义类型使用 `type` 关键字定义。它们可以是记录（具有命名字段）、枚举（多个构造子）或泛型代数数据类型。自定义类型是构建 Datum、Redeemer 和内部逻辑数据的主要方式。

**重点：**
- 记录具有命名字段 and 单一构造子
- 枚举具有多个构造子（带有或不带有字段）
- 支持带有类型参数的泛型
- 类型可以使用 `type Alias = ExistingType` 进行别名设定
- 所有自定义类型皆可序列化为 `Data` 且可进行模式匹配
- `pub` 使类型在模块外部可用
- 字段可以使用展开语法更新：`MyType { ..record, field: new_value }`

**示例：**
```aiken
// Record type
type RGB {
  red: Int,
  green: Int,
  blue: Int,
}

// Enum type
pub type Action {
  Minting
  Burning
}

// Generic type
pub type Option<a> {
  None
  Some(a)
}

// Type alias
type CartesianCoordinates = (Int, Int)

// Updating fields
fn set_red_255(rgb: RGB) {
  RGB { ..rgb, red: 255 }
}
```

**相关：** [原始类型](#q14-what-are-aikens-primitive-types) | [模式匹配](#q20-how-does-pattern-matching-work-in-aiken)

---

## Q16：变量与常量如何运作？ <span id="q16-how-do-variables-and-constants-work" />

**回答：** Aiken 使用 `let` 绑定变量，并使用 `const` 定义模块层级常量。所有值皆为不可变的 — 没有可变状态。新的绑定可以遮蔽之前的绑定。常量会在编译时期完全求值并由编译器内联（inline）。

**重点：**
- `let` — 局部变量绑定；不可变；可遮蔽之前的绑定
- `const` — 模块层级常量；在编译时期内联；可参考其他（之前定義的）常量
- 无顶层 `let` 绑定 — 使用 `const` 用于模块层级的值
- 常量可以包含几乎任何 Aiken 表达式
- 类型注解是选用的，但建议用于文档说明

**示例：**
```aiken
// Constants
const start_year = 2101
const summer = "Summer"
const seasons = [summer, "Autumn", "Winter", "Spring"]

// Variables
let x = 1
let y = x
let x = 2  // shadows previous x
// y + x == 3
```

**相关：** [函数](#q19-how-do-functions-work-in-aiken) | [原始类型](#q14-what-are-aikens-primitive-types)

---

## Q17：如何在 Aiken 中测试验证器？<span id="q17-how-do-i-test-validators-in-aiken" />

**回答：** Aiken 对单元测试和基于属性的测试提供了一流的支持，并直接内置于语言之中。测试是使用 `test` 关键字，会与 `aiken check`，并在与链上代码相同的虚拟机上执行。测试也会显示内存与 CPU 执行单元，使其可用于基准测试。

**重点：**
- 单元测试：不带参数且返回 `Bool`；使用 `test` 关键字
- 基于属性的测试：通过 fuzzer 引数接收参数使用 `via` 关键字
- 使用以下命令执行测试：`aiken check`
- 测试会收集追踪信息以供除错
- 测试失败时的自动差异比对功能可显示出错原因
- 使用 `fail` 关键字测试预期失败的路径
- 过滤测试，仅包含预期失败的路径 `-m` 标记：`aiken check -m "module_name"`
- 测试与生产环境验证器运行在相同的虚拟机上

**示例：**
```aiken
// Unit test
test simple_addition() {
  let result = 2 + 3
  result == 5
}

// Property-based test
use aiken/fuzz

test prop_commutative((a, b) via fuzz.both(fuzz.int(), fuzz.int())) {
  a + b == b + a
}

// Expected failure test
test must_fail() fail {
  expect Some(result) = math.sqrt(-42)
  result == -1
}
```

**相关内容：** [基于属性的测试](#q18-what-is-property-based-testing-in-aiken) | [疑难解答](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q18：Aiken 中的基于属性的测试是什么？<span id="q18-what-is-property-based-testing-in-aiken" />

**回答：** 基于属性的测试是 Aiken 中的一项一等功能，它会生成随机测试输入来检查通用属性，而非特定的案例。它包含集成式的缩减（shrinking）功能，能自动将反例简化为更小的失败输入。模糊测试器（Fuzzers）是通过使用 `via` 关键字引入的，且 `aiken/fuzz` 库提供了可组合的模糊测试（fuzzer）原语。

**关键点：**
- 使用 `via` 关键字将 `Fuzzer<a>` 附加到测试参数
- 自动缩减功能可找出最小的反例
- `aiken/fuzz` 库提供原语：`fuzz.int()`，`fuzz.bool()`，`fuzz.list()`，`fuzz.bytearray()` 等。
- Fuzzers 可组合：`fuzz.list(fuzz.int())` 产生随机整数列表
- 使用 `fuzz.label()` 进行标记，显示测试路径的分布
- `fail once` — 属性预期在所有执行中至少失败一次
- 默认值：每个属性 100 个随机样本

**示例：**
```aiken
use aiken/fuzz

test prop_is_non_negative(n: Int via fuzz.int()) {
  n >= 0
}

test prop_list(xs: List<Int> via fuzz.list(fuzz.int())) {
  todo
}

// Custom fuzzer
fn my_fuzzer() -> Fuzzer<List<Int>> {
  fuzz.list(fuzz.int())
}

test prop_custom(xs via my_fuzzer()) {
  todo
}
```

**相关：** [测试](#q17-how-do-i-test-validators-in-aiken) | [基准测试](#q25-how-do-benchmarks-work-in-aiken)

---

## Q19：Aiken 中的函数是如何运作的？ <span id="q19-how-do-functions-work-in-aiken" />

**回答：** Aiken 中的函数使用 `fn` 关键字定义，属于一等公民（first-class values），并隐式返回其最后一个表达式（没有 `return` 关键字）。它们支持标签参数、类型推断、匿名定义、部分应用（函数捕获）以及用于链式调用的管道运算符。

**重点：**
- 具名函数：`fn name(args) -> ReturnType { body }`
- 默认为私有；使用 `pub` 来导出
- 匿名函数：`let add = fn(x, y) { x + y }`
- 标签参数：可以按名称以任何顺序调用
- 函数捕获：`add(1, _)` 创建一个新函数
- 管道运算符：`x |> f |> g` 链接函数调用
- 返回语法（Backpassing）：`let result <- callback_fn(x)` 用于回调繁重的代码
- 没有递归匿名函数 — 请使用顶层定义来进行递归

**示例：**
```aiken
fn add(x: Int, y: Int) -> Int {
  x + y
}

pub fn public_function(x: Int) -> Int {
  x * 2
}

// Pipe operator
fn transform(x) {
  x
  |> add(_, 3)
  |> add(_, 6)
}

// Function capturing
fn run() {
  let add_one = add(1, _)
  add_one(2) // 3
}
```

**相关：** [变量与常量](#q16-how-do-variables-and-constants-work) | [控制流程](#q20-how-does-pattern-matching-work-in-aiken)

---

## Q20：Aiken 中的模式匹配是如何运作的？ <span id="q20-how-does-pattern-matching-work-in-aiken" />

**回答：** Aiken 使用 `when/is` 表达式进行模式匹配，类似于 Rust 中的 `match` 或 Haskell 中的 `case`。模式匹配是穷举的（exhaustive）——编译器会检查所有情况是否都被涵盖。您可以直接在模式中解构自定义类型、列表、元组等。

**重点：**
- `when value is { pattern -> result }` 用于多情况匹配
- 模式可以解构列表：`[]`、`[x]`、`[x, y, ..]`
- 模式可以通过构造子解构自定义类型
- 通配符 `_` 匹配任何内容
- 必须是穷举的 — 编译器强制要求涵盖所有情况
- `expect` 用于非穷举匹配（如果模式不匹配则失败）

**示例：**
```aiken
fn describe_list(list: List<Int>) -> String {
  when list is {
    [] -> @"The list is empty"
    [x] -> @"The list has one element"
    [x, y, ..] -> @"The list has multiple elements"
  }
}

fn unwrap_option(opt: Option<Int>) -> Int {
  when opt is {
    Some(a) -> a
    None -> fail @"Expected Some but got None"
  }
}
```

**相关：** [自定义类型](#q15-how-do-i-define-custom-types) | [错误处理](#q21-how-do-i-handle-errors-in-aiken)

---

## Q21：我该如何在 Aiken 中处理错误？ <span id="q21-how-do-i-deal-with-errors-in-aiken" />

**回答：** Aiken 提供了几种错误处理机制：`fail` 用于立即停止执行，`todo` 作为编译时会发出警告的占位符，`expect` 用于非穷尽模式匹配，若模式不匹配则会中止，以及用于追踪错误（trace-if-false）除错的 `?` 运算符。由于验证器是谓词（predicates），“错误”通常意味着验证器返回 `False` 或中止。

**重点：**
- `fail` — 立即中止执行（无编译警告）。可包含信息：`fail @"reason"`
- `todo` — 类似 `fail`，但会产生编译警告以作提醒。请在开发期间使用
- `expect` — 若模式不匹配则中止的模式匹配。例如：`expect Some(x) = optional_value`
- `expect` 搭配 `Bool` — 若 `expect sum >= 0` 条件为假则会中止
- `?` 运算符 — 追踪错误；附加于布尔表达式以进行除错：`must_be_signed?`
- 使用 `if/is` 进行软转型（Soft casting） — 非中止的类型检查：`if value is SomeType { ... } else { ... }`

**示例：**
```aiken
// expect halts if pattern doesn't match
expect Some(datum) = optional_datum

// fail with message
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> fail @"Expected a value but got None"
  }
}

// todo as placeholder
fn favourite_number() -> Int {
  todo @"Implement this later"
}

// ? operator for debugging
must_say_hello? && must_be_signed?
```

**相关：** [疑难解答](#q24-how-do-i-debug-and-troubleshoot-validators) | [测试失败](#q17-how-do-i-test-validators-in-aiken)

---

## Q22：模块与导入是如何运作的？<span id="q22-how-do-modules-and-imports-work" />

**回答：** Aiken 程序被组织成模块——即具有各自命名空间的函数与类型集合。模块对应于 `.ak` 文件，并可使用 `pub` 来导出类型与值。导入使用 `use` 关键字，支持限定（qualified）与非限定（unqualified）导入。

**重点：**
- 每个 `.ak` 文件都是一个模块；命名空间由文件路径衍生
- `pub` 导出函数与类型
- 限定导入：`use aiken/collection/list` 然后调用 `list.at(...)`
- 非限定导入：`use aiken/collection/list.{at}` 然后调用 `at(...)`
- 自定义导入名称：`use aiken/collection/list as my_list`
- 不透明类型（Opaque types）：`pub opaque type` 隐藏内部表示
- 模块文档：`////`（四斜线）位于文件顶部
- 验证器仅能导入至测试模块

**示例：**
```aiken
// Qualified import
use aiken/collection/list

fn use_imports() {
  let numbers = [1, 2, 3, 4, 5]
  list.at(numbers, 2) // 3
}

// Unqualified import
use aiken/collection/list.{at}

fn use_unqualified() {
  at([1, 2, 3], 2) // 3
}
```

**相关内容：** [项目结构](#q6-what-is-the-project-structure-of-an-aiken-project) | [标准库](#q23-what-is-the-aiken-standard-library)

---

## Q23：什么是 Aiken 标准库？<span id="q23-what-is-the-aiken-standard-library" />

**回答：** Aiken 提供两个基础套件：**prelude** 和 **标准库 (stdlib)**。Prelude 会自动包含在所有项目中，提供必要的类型与函数。Stdlib 则是一个独立的依赖项，为常见的智能合约操作提供了丰富的数据结构、工具以及经过充分测试的代码。

**重点：**
- **Prelude** (`aiken-lang/prelude`) — 默认可用；包含核心类型，例如 `Option`，`Bool`，`Ordering`，`Void`，`Data`，`Never`，以及 `Fuzzer`
- **标准库** (`aiken-lang/stdlib`) — 作为依赖项添加；包含用于列表、字典、数学、加密、交易类型、资产、地址等的模块
- 标准库 (stdlib) 是编写优质 Aiken 代码的绝佳参考
- `aiken new` 会自动将 stdlib 加入为依赖项
- 两者皆会发布 HTML 文档

**相关内容：** [模块与导入](#q22-how-do-modules-and-imports-work) | [建立项目](#q5-how-do-i-create-a-new-aiken-project)

---

## Q24：我该如何对验证器进行除错与故障排除？<span id="q24-how-do-i-debug-and-troubleshoot-validators" />

**回答：** Aiken 提供了三种主要的除错工具：`trace` 用于记录信息的关键字，`expect` 用于自动断言日志记录的追踪，以及 `?` (trace-if-false) 运算符，用于追踪哪些布林条件失败。此外，CBOR 诊断标记法有助于检查运行时刻的值。

**重点：**
- **`trace`** — 可变参数关键字；用于追踪任何可序列化的值：`trace @"label": value1, value2`
- **`?` 运算符** — 后缀；仅在表达式求值为 `False` 时追踪该表达式：`must_be_signed?`
- **`expect` 追踪** — 自动生成的追踪位于 `expect` 使用时的失败，当使用 `--trace-level verbose` 时
- **CBOR 诊断** — `cbor.diagnostic(value)` 产生任何可序列化值的人类可读表示形式
- **追踪层级 (Trace levels)**：`silent`（无追踪），`compact`（仅限标签），`verbose`（完整追踪）
- `aiken build` 默认会移除追踪；`aiken check` 默认会保留它们
- 追踪会改变验证器哈希值 — 因此生产环境的验证器应将其移除
- `aiken tx simulate` 也会获取追踪

**示例：**
```aiken
// Manual trace
trace @"redeemer": string.from_bytearray(redeemer.msg)

// Trace-if-false operator
must_say_hello? && must_be_signed?

// CBOR diagnostic
use aiken/cbor
test my_datum_check() {
  let datum = MyDatum { foo: 42, bar: "Hello" }
  cbor.diagnostic(datum) == @"121([42, h'48656c6c6f'])"
}
```

**相关内容：** [错误处理](#q21-how-do-i-handle-errors-in-aiken) | [测试](#q17-how-do-i-test-validators-in-aiken)

---

## Q25：Aiken 中的基准测试 如何运作？ <span id="q25-how-do-benchmarks-work-in-aiken" />

**回答：** Aiken 使用 `bench` 关键字内置了基准测试功能。基准测试会使用 `Sampler` 函数来测量随着输入大小增加时的执行成本（内存与 CPU 单位）。`Sampler` 是一个接收大小参数并返回 `Fuzzer` 的函数，让您可以定义输入如何增长。

**重点：**
- 使用 `bench` 关键字，并通过 `Sampler` 参数，使用 `via` 关键字
- 一个 `Sampler<a>` = `fn(Int) -> Fuzzer<a>`
- 大小从 0 线性增长至 `--max-size`（默认位 30）
- 使用 `aiken bench` 执行；会输出终端机图表或 JSON (`aiken bench > benchmarks.json`)
- 过滤基准测试：`aiken bench -m "my_module"`
- 建立在 `aiken/fuzz` 套件之上

**示例：**
```aiken
use aiken/fuzz
use aiken/primitive/bytearray

fn sample_bytearray(size: Int) -> Fuzzer<ByteArray> {
  fuzz.bytearray_between(size * 128, size * 128)
}

bench bytearray_length(bytes: ByteArray via sample_bytearray) {
  bytearray.length(bytes)
}
```

**相关内容：** [测试](#q17-how-do-i-test-validators-in-aiken) | [基于属性的测试](#q18-what-is-property-based-testing-in-aiken)

---

## Q26：什么是单一性铸造策略？ <span id="q26-what-is-a-one-shot-minting-policy" />

**回答：** 单一性铸造策略是一种设计模式，确保铸造验证器只能执行一次。它的运作方式是使用特定的 `OutputReference` 来参数化验证器，然后验证对应的 UTxO 是否在交易中被消耗。由于 UTxO 在定义上只能被花费一次，这保证了该策略最多只会验证一次 — 非常适合用于建立独一无二的 NFT。

**重点：**
- 使用 `OutputReference`（交易 ID + 输出索引）进行参数化
- 检查被引用的 UTxO 是否在交易的输入中
- 强制要求精确铸造 1 个代币
- `OutputReference` 是唯一的（交易哈希值 + 索引），确保仅执行一次
- 常见于 NFT 建立

**示例：**
```aiken
use aiken/collection/dict
use aiken/collection/list
use cardano/transaction.{OutputReference, Transaction}
use cardano/assets.{PolicyId}

pub type Action {
  Minting
  Burning
}

validator one_shot(utxo_ref: OutputReference) {
  mint(redeemer: Action, policy_id: PolicyId, self: Transaction) {
    expect [Pair(_asset_name, quantity)] = self.mint
      |> assets.tokens(policy_id)
      |> dict.to_pairs()

    let is_output_consumed =
      list.any(inputs, fn(input) { input.output_reference == utxo_ref })

    when redeemer is {
      Minting -> is_output_consumed? && (quantity == 1)?
      Burning -> (quantity == -1)?
    }
  }
}
```

**相关内容：** [验证器参数](#q13-how-do-validator-parameters-work) | [设计模式](#q27-what-is-the-double-satisfaction-problem)

---

## Q27：什么是双重满足问题？ <span id="q27-what-is-the-double-satisfaction-problem" />

**回答：** 双重满足是 eUTxO 模型中的一种漏洞，即单一输出付款可以在同一笔交易中满足多个验证器的执行。当验证器检查“至少有 X 金额支付给地址 Y”而未确保每个输入都有唯一对应的输出时，就会发生这种情况。攻击者可以支付一次，并以相同或更低的价格解锁多个 UTxO。

**重点：**
- 当多个 UTxO 被锁定在相似的支出条件下时发生
- 验证器代码会针对每个被花费的输入独立执行
- 若缺乏唯一性，单一付款输出即可满足所有验证器的执行
- **解决方案：标记输出 (Tagged Outputs)** — 使用从输入派生出的唯一值来标记每个输出使用 `OutputReference`
- 使用 `if/is`（软转型）而非 `expect` 来检查输出数据（datum）以避免拒绝不相关的输出

**示例（易受攻击）：**
```aiken
// BAD: This validator can be satisfied multiple times with one payment
let user_outputs = list.filter(self.outputs, fn(output) { output.address == beneficiary })
let value_paid = list.foldl(user_outputs, assets.zero, fn(output, total) { merge(output.value, total) })
(lovelace_of(value_paid) >= datum.price)?
```

**修复：** 使用输入的 `OutputReference` 作为内联数据（inline datum）来标记输出，确保每个输入都映射到唯一的输出。

**相关：** [单一性铸造](#q26-what-is-a-one-shot-minting-policy) | [状态线程代币](#q28-what-are-state-thread-tokens)

---

## Q28：什么是状态线程代币 (STT)？ <span id="q28-what-are-state-thread-tokens-stt" />

**回答：** 状态线程代币是一种用于在交易间维护可变状态的设计模式。一个 NFT（通过单一性铸造策略建立）被附加到一个携带代表当前状态数据（datum）的 UTxO 上。每个使用 STT 的交易都必须将其转发到一个具有更新数据的新输出，确保状态得以延续且无法被伪造。

**关键点：**
- 使用唯一的 NFT 来识别“状态载体”UTxO
- NFT 通常通过单一性策略铸造以保证唯一性
- 多重验证器（multivalidator）同时处理铸造（初始化）和花费（状态转换）
- 每个交易必须将 NFT 转发到具有更新数据的输出
- 铸造处理器的策略 ID 等于花费处理器的脚本哈希（同一验证器）
- 计数器、注册表和其他有状态合约的常见模式

**相关：** [单一性铸造](#q26-what-is-a-one-shot-minting-policy) | [双重满足](#q27-what-is-the-double-satisfaction-problem)

---

## Q29：什么是转发验证？ <span id="q29-what-is-forwarding-validation" />

**回答：** 转发验证是一种优化模式，简单的花费验证器将其实际的验证逻辑委托（“转发”）给提款脚本。轻量级的花费脚本无需为每个输入执行一次复杂逻辑，只需检查交易中是否存在特定的提款。提款脚本随后仅为所有输入执行一次，从而大幅降低执行成本。

**关键点：**
- 利用了提取 0 lovelace 总是有效的特性
- 花费验证器检查交易中是否存在特定的提款
- 提款脚本包含实际的验证逻辑且仅执行一次
- 减少了多次执行相同逻辑（每个输入一次）的开销
- 被许多 dApp 用于生产环境以优化执行预算
- 无论用途为何，验证器皆可访问整个交易上下文

**相关：** [状态线程代币](#q28-what-are-state-thread-tokens) | [验证器用途](#q11-what-are-the-six-validator-purposes-in-aiken)

---

## Q30：`and`/`or` 语法是如何运作的？ <span id="q30-how-does-the-andor-syntax-work" />

**回答：** Aiken 提供了 `and` 和 `or` 关键字，作为 `&&` 和 `||` 链的更具可读性的替代方案。它们使用以逗号分隔布林表达式的区块语法，使得分组和优先级一目了然——这在验证器结合多个条件时特别有用。

**关键点：**
- `and { expr1, expr2, expr3 }` — 全部必须为 `True` （相当于 `&&` 链）
- `or { expr1, expr2, expr3 }` — 至少必须有一个 `True` （相当于 `||` 链）
- 可以嵌套：`or { and { a, b }, c, d }`
- 在 4 个或更多条件时最为有效
- `&&` 以及 `||` 仍然可以用作短路运算符

**示例：**
```aiken
// Using and/or keywords
fn my_validation_logic() -> Bool {
  or {
    and {
      should_satisfy_condition_1,
      should_satisfy_condition_2,
    },
    should_satisfy_condition_3,
    should_satisfy_condition_4,
  }
}

// Equivalent with operators
fn same_logic() -> Bool {
  (should_satisfy_condition_1 && should_satisfy_condition_2)
    || should_satisfy_condition_3
    || should_satisfy_condition_4
}
```
**相关：** [控制流程](#q20-how-does-pattern-matching-work-in-aiken) | [验证器](#q10-how-do-i-write-my-first-validator)

---

## Q31：什么是 Plutus 蓝图 (`plutus.json`)？<span id="q31-what-is-the-plutus-blueprint-plutusjson" />

**回答：** Plutus 蓝图是一个符合 CIP-0057 标准的 JSON 文件，由 `aiken build` 产生，描述您链上合约二进制接口的文件。它包含已编译的验证器代码、用于地址生成的哈希摘要，以及 Datum 和 Redeemer 的结构定义——所有这些皆源自您的 Aiken 类型定义与文件注解。

**重点：**
- 产生于 `plutus.json` 在项目根目录中执行 `aiken build`
- 包含每个验证器 (validator) 的已编译 UPLC 代码
- 包含用于计算链上地址的哈希摘要 (hash digests)
- Datum 与 Redeemer 的结构定义（从类型自动生成）
- 用于工具间互通性的框架无关格式
- 使用 `aiken blueprint` 用于生成地址、应用参数以及转换格式的命令组

**相关内容：** [编译](#q7-how-do-i-compile-an-aiken-project) | [验证器参数](#q13-how-do-validator-parameters-work)

---

## Q32：Cardano 中的有效性区间是如何运作的？<span id="q32-how-do-validity-intervals-work-in-cardano" />

**答案：** 有效性区间为 Cardano 的确定性智能合约引入了时间概念。交易可以指定一个可选的下限（在此之后有效）和上限（在此之前有效），这些限制会在第一阶段 (phase-1) 验证期间进行检查。由于区间是在脚本执行前进行验证的，验证器可以安全地假设交易发生在指定的时间窗口内。

**关键点：**
- 在第一阶段（结构）验证期间，即脚本运行前进行检查
- 脚本可以读取该区间并将其作为可信的时间参考
- 将截止日期存储为 datum；检查交易的下限是否超过该日期
- 区间最小可达一秒
- 区块平均每 20 秒产生一次
- 非常狭窄的区间会增加错过区块的风险
- 这保留了确定性——区间是预先商定的，而不是在执行时查询的

**相关内容：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [疑难解答](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q33：Aiken 中的条件性配置是什么？<span id="q33-what-is-conditional-configuration-in-aiken" />

**回答：** Aiken 通过环境支持条件性模块与设定值。这让您无需更改代码即可在不同设定（例如：主网与测试网）之间进行切换。设定定义于 `aiken.toml` 在 `[config]` 字段之下，并通过特殊的 `config`模块存取。

**重点：**
- 在 `aiken.toml` 中定义配置，在 `[config.default]`，`[config.mainnet]` 等之下。
- 通过 Aiken 代码中的 `use config` 模块存取
- 在构建时选择环境：`aiken build --env mainnet`
- 支持整数、布林值、字符串、列表、元组以及十六进制编码的字节数组
- 条件性模块可以根据环境替换整个 `.ak` 文件
- 环境模块遵循 `{module}.{env}.ak` 模式

**示例 (`aiken.toml`)：**
```toml
[config.default]
price = 1000000
is_mainnet = true
network = "mainnet"

[config.default.owner]
bytes = "0000111122223333"
encoding = "hex"
```

```aiken
use config

fn main() {
  if config.is_mainnet {
    config.price * 2
  } else {
    config.price
  }
}
```
**相关内容：** [项目结构](#q6-what-is-the-project-structure-of-an-aiken-project) | [编译](#q7-how-do-i-compile-an-aiken-project)

---

## Q34：什么是无类型 Plutus Core (UPLC)？<span id="q34-what-is-untyped-plutus-core-uplc" />

**回答：** 无类型 Plutus Core (UPLC) 是由 Cardano 虚拟机实际执行的底层语言。所有的智能合约语言（Aiken、PlutusTx、Helios 等）最终都会编译为 UPLC。它是一种基于 lambda 演算的极简语言，包含 7 种原始类型和一组内置函数。Aiken 提供了用于检查、评估、格式化和转换 UPLC 程序的工具。

**关键点：**
- 7 种原始类型：unit、bool、integer、bytestring、string、pair、list
- 在链上以二进制格式编码；提供人类可读的文本形式以便于除错
- Aiken CLI 工具：`aiken uplc eval`，`aiken uplc fmt`，`aiken uplc flat`/`aiken uplc unflat`
- 变量/函数在编译后会被替换为精简的索引
- 所有类型都会被抹除，但会隐式执行强制检查——类型不匹配会导致运行时刻错误
- Aiken 拥有一个以 Rust 编写且功能完整的 UPLC 虚拟机

**相关内容：** [Aiken 与 Plutus 的比较](#q2-how-is-aiken-different-from-plutus-plutustx) | [CBOR 诊断](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q35：我还可以使用哪些其他语言来编写 Cardano 智能合约？<span id="q35-what-other-languages-can-i-use-for-cardano-smart-contracts" />

**答案：** 有多种语言可编译为 UPLC 以用于 Cardano 智能合约，范围涵盖独立语言到嵌入式 DSL。Aiken 的主要替代方案包括 OpShin（Python）、Helios（JavaScript 风格的新语言）、Plutarch（Haskell eDSL）、plu-ts（TypeScript eDSL）以及 Scalus（Scala）。

**重点：**
- **Aiken** — 新语言；受 Rust 启发的语法；以 Rust 编写的独立编译器；纯函数式且具备静态类型
- **OpShin** — 使用受限的 Python3 编写；使用标准 Python 工具链；实现了自身的类型系统
- **Helios** — 新语言；编译器为单一 JavaScript 文件；纯函数式且具备有限的类型推导
- **Plutarch** — Haskell eDSL；可完整存取 Haskell 的类型系统（类型类、HKT）；不使用 Template Haskell
- **plu-ts** — TypeScript eDSL；在 JS 运行时刻实现自身的类型检查
- **Scalus** — 基于 Scala；可在 JVM 和 JavaScript 上执行；包含 UPLC 工具与宏
- 所有语言皆编译为相同的 UPLC 目标 — 请根据您偏好的生态系统与需求进行选择

**链外 SDK（用于构建交易）：**
| 语言 | SDK |
|----------|-----|
| JavaScript/TypeScript | Lucid, Mesh.js |
| Python | PyCardano |
| Rust | Pallas |
| Haskell | Cardano API |
| Java/Scala | Bloxbean |
| C# | CardanoSharp |

**相关内容：** [什么是 Aiken](#q1-what-is-aiken) | [Aiken 与 Plutus 的比较](#q2-how-is-aiken-different-from-plutus-plutustx)

---
