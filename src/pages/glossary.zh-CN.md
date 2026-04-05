# Aiken & Cardano 词汇表

## Ada (艾达币)

**定义：** Cardano 的原生协议货币。所有交易价值中的主要资产。不可分割的单位是 Lovelace (1 Ada = 1,000,000 Lovelace)。

**上下文：** 每个 UTxO 必须包含最小数量的 Ada。Ada 用于支付交易手续费和质押委托。

**相关：** Lovelace, 价值 (value), 资产 (asset), 质押 (stake)

## Address (地址)

**定义：** 由标头 (类型 + 网络)、支付凭证 (支出条件) 和可选的委托凭证 (质押控制) 组成的结构化标识符。以 bech32 或 base16 编码。

**上下文：** Cardano 特有。决定了谁可以支出 UTxO 以及如何委托质押。

**相关：** 支付凭证 (payment credentials), 委托凭证 (delegation credentials), 脚本哈希 (script hash), 验证密钥哈希 (verification key hash)

## `aiken build`

**定义：** 编译 Aiken 项目并生成 Plutus 蓝图 (`plutus.json`) 的 CLI 命令。默认会移除跟踪信息 (traces)。

**上下文：** 主要的构建命令。使用 `--trace-level verbose` 在正式版本中保留跟踪信息。

**相关：** aiken check, Plutus 蓝图 (Plutus blueprint), 跟踪级别 (trace level)

## `aiken check`

**定义：** 对项目进行类型检查并运行所有测试的 CLI 命令。默认会保留跟踪信息 (traces)。

**上下文：** 主要的开发命令。显示每个测试的内存/CPU 执行单位。

**相关：** aiken build, 测试 (test), 跟踪 (trace)

## `aiken docs`

**定义：** 从类型、类型注释和文档注释 (`///`) 生成 HTML 文档的 CLI 命令。

**上下文：** 库作者应使用此命令来产出 API 文档。

**相关：** 文档注释 (documentation comment), 模块 (module), pub

## `aiken.toml`

**定义：** Aiken 项目根目录下的项目配置文件。包含元数据 (名称、版本、许可)、依赖项、存储库信息、工作区配置和特定环境的配置值。

**上下文：** 由 `aiken packages` 管理依赖项。LSP 的根目录判断依据。

**相关：** 项目结构 (project structure), 依赖项 (dependencies), 配置 (config), 工作区 (workspace)

## `aikup`

**定义：** 一个用于下载和管理 Aiken 编译器版本的跨平台工具。推荐的安装方式。

**上下文：** 单独运行 `aikup` 会安装最新版本。支持版本固定。

**相关：** 安装 (installation), aiken

## Alonzo era (Alonzo 时代)

**定义：** 为 Cardano 引入 Plutus 智能合约 (V1) 的时代，实现了链上脚本执行。

**相关：** Plutus Core, 脚本 (script), 智能合约 (smart contract)

## Alternative patterns (替代模式)

**定义：** 在模式匹配中使用管道符号 `|` 以相同的逻辑处理多个模式。这些模式必须引入具有相同类型的相同标识符。

**上下文：** 减少相似分支间的代码重复。

**示例：**
```aiken
when user is {
  LoggedInAsAdmin { username } | LoggedIn { username } -> username
  Guest -> "Guest"
}
```

**相关：** 模式匹配 (pattern matching), when/is

## `and` / `or`

**定义：** 用于组合布尔表达式的块状关键字，具有清晰的视觉分组。`and { ... }` 要求所有表达式均为 True；`or { ... }` 要求至少有一个为 True。

**上下文：** 布尔组合语法。比 `&&`/`||` 链更具可读性，特别是在有 4 个或更多条件时。

**示例：**
```aiken
or {
  and {
    condition_1,
    condition_2,
  },
  condition_3,
}
```

**相关：** Bool, &&, ||, 验证器 (validator)

## Anonymous function (匿名函数)

**定义：** 使用 `fn(args) { body }` 语法定义的未命名函数。通过 `let` 赋值给变量。不可递归。

**上下文：** 用于一次性的转换，特别是与 `list.map`、`list.filter` 等配合使用。

**示例：**
```aiken
let add = fn(x, y) { x + y }
add(1, 2)  // 3
```

**相关：** 一等函数 (first-class function), 函数捕获 (function capturing), lambda

## Babbage era (Babbage 时代)

**定义：** 引入 Plutus V2 的时代，包含引用输入 (reference inputs)、内联 Datum (inline datums) 和引用脚本 (reference scripts)。

**相关：** Plutus V2, 内联 Datum (inline datum), 引用输入 (reference input)

## `<-` (Backpassing / 回传语法)

**定义**：用于以回调 (callback) 作为最后一个参数的函数的语法。通过将回调结果赋值给绑定，允许以扁平、线性的风格编写基于回调的代码。

**上下文**：高级函数语法。传递匿名回调函数的语法糖。在编写 Fuzzer 时特别有用。

**示例**：

```aiken
fn cubed(n) {
  let total <- apply_function_twice(n)
  total * n
}
// 等同于：apply_function_twice(n, fn(total) { total * n })
```

**相关**：管道运算符 (pipe operator), 匿名函数 (anonymous function), 函数捕获 (function capturing)

## Base16 / Hex encoding (十六进制编码)

**定义：** 二进制数据的十六进制表示法。每个字节由两个十六进制字符组成。广泛用于哈希、策略 ID (policy IDs) 和地址。

**上下文：** Aiken 支持使用 `#"..."` 语法的十六进制编码 ByteArray 字面量。

**示例：**
```aiken
#"666f6f" == "foo"
```

**相关：** ByteArray, bech32, 哈希摘要 (hash digest)

## Bech32

**定义：** 一种具有自定义前缀和错误检测功能的人类可读编码格式，适用于短小的二进制数据。在 Cardano 中广泛使用，特别是以 `addr...` 或 `addr_test...` 开头的地址。

**上下文：** 显示哈希、密钥、地址和各种短小 (<64 字节) 二进制数据的标准方式。命令行工具可在 `input-output-hk/bech32` 获得。

**相关：** 地址 (address), base16, 编码 (encoding)

## `bench`

**定义：** 用于定义基准测试 (benchmarks) 的关键字，衡量随着输入规模增加时的执行成本 (内存和 CPU)。通过 `via` 关键字使用 `Sampler` 函数。

**上下文：** 基准测试关键字。使用 `aiken bench` 运行。构建在 Fuzzer 框架之上。

**示例：**
```aiken
bench bytearray_length(bytes: ByteArray via sample_bytearray) {
  bytearray.length(bytes)
}
```

**相关：** Sampler, Fuzzer, 测试 (test), aiken bench

## Blake2b

**定义：** 整个 Cardano 中使用的主要哈希算法。具有不同输出大小：用于一般摘要的 Blake2b_256 (32 字节) 和用于凭证及策略 ID 的 Blake2b_224 (28 字节)。

**上下文：** 了解哈希大小有助于类型注释，例如 `Hash<Blake2b_224, VerificationKey>`。

**相关：** 哈希摘要 (hash digest), 密码学 (cryptography), 凭证 (credential)

## Block (块 - 语法)

**定义：** 用花括号 `{ }` 括起来的表达式序列，求值结果为其最后一个表达式的值。用于将操作分组并引入局部绑定。

**上下文：** 函数体、`when/is` 分支和 `if/else` 都是代码块。

**示例：**
```aiken
let celsius = { fahrenheit - 32 } * 5 / 9
```

**相关：** 表达式 (expression), let, 作用域 (scope)

## Block (区块 - 数据)

**定义：** 将多个交易批处理在一起的容器。包含标头 (生产者信息、时间戳、哈希) 和主体 (有序的交易序列)。区块通过引用前一个区块的标头哈希形成链。

**上下文：** 在 Cardano 上平均每 20 秒产生一个区块。区块生产者由 Ouroboros 共识协议选出。

**相关：** 交易 (transaction), 链 (chain), 哈希摘要 (hash digest), 插槽 (slot), 纪元 (epoch)

## Bool (布尔值)

**定义：** 具有两个值 `True` 和 `False` 的布林类型。支持运算符 `==`、`&&` (AND)、`||` (OR)、`!` (NOT) 以及 `?` (若为假则追踪)。

**上下文：** 基本类型。所有验证器最终都会产出布尔值。`&&` 和 `||` 是短路运算的 (右结合)。

**示例：**
```aiken
let is_valid: Bool = True
let result = is_valid && (amount > 0)
```

**相关：** and/or, 断言 (predicate), 验证器 (validator), ? 运算符

## Byron address (Byron 地址)

**定义：** 一种已弃用的旧版地址格式，源自 Shelley 时代之前 (例如 `Ae2tdPwUPEYz6...`)。包含 Plutus 脚本的交易禁止使用此类地址。

**上下文：** 您可能在旧系统中遇到它们，但不应在新的开发中使用它们。

**相关：** Shelley 地址 (Shelley address), 地址 (address), 时代 (era)

## Byron era (Byron 时代)

**定义：** 最初的 Cardano 时代，使用旧版地址格式，不支持智能合约。Byron 地址现已弃用且禁止在 Plutus 交易中使用。

**相关：** Byron 地址 (Byron address), Shelley 时代 (Shelley era)

## ByteArray (字节数组)

**定义：** 字节序列。Aiken 支持三种字面量标记：字节数组 (`#[10, 255]`)、UTF-8 字符串 (`"foo"`) 和十六进制编码字符串 (`#"666f6f"`)。

**上下文：** 用于标识符、哈希、策略 ID 和链上数据的核心类型。注意：没有 `@` 前缀的双引号字符串是 ByteArray，而非文本字符串。

**示例：**
```aiken
let hash: ByteArray = #"abcd1234"
let name: ByteArray = "Hello"
let bytes: ByteArray = #[0xff, 0x42]
```

**相关：** 字符串 (String), 哈希摘要 (hash digest), 十六进制编码 (hex encoding)

## CBOR

**定义：** 简洁二进制对象表示 (Concise Binary Object Representation) —— 一种广泛应用于 Cardano 序列化的结构化二进制格式。可以将其视为二进制版的 JSON。

**上下文：** 交易、Datum、Redeemer 和脚本在链上均以 CBOR 编码。

**相关：** CDDL, CBOR 诊断 (CBOR diagnostic), 序列化 (serialisation), Data

## CBOR diagnostic (CBOR 诊断)

**定义：** [RFC 8949](https://www.rfc-editor.org/rfc/rfc8949) 中定义的一种人类可读、类 JSON 的 CBOR 数据表示法。用于通过 `cbor.diagnostic()` 调试运行时的值。自定义类型使用标签表示 (121 代表第一个构造函数，122 代表第二个，依此类推)。

**上下文：** 调试工具。自定义类型的字段在标签值内以列表元素的形式出现。

**示例：**
```aiken
cbor.diagnostic(Some(42)) == @"121([_ 42])"
cbor.diagnostic(None)     == @"122([])"
```

**相关：** CBOR, 追踪 (trace), 故障排除 (troubleshooting), 构造函数 (constructor), 标签 (tag)

## CDDL

**定义：** 一种专门为 CBOR 定义的数据描述语言。Cardano 账本使用 CDDL 权威地定义其数据结构，规范数据序列化。

**上下文：** 相关文档位于 `cardano-ledger/eras/...`。开发人员通过阅读 CDDL 来了解 Ledger 类型。

**相关：** CBOR, 序列化 (serialisation), eUTxO

## Certificate (凭证 - 质押)

**定义：** 包含在交易中的一组链上操作指令，用于注销质押凭证、委托权力和注册质押池。

**上下文：** 脚本可以用于保护委托决定 (例如 `publish` 脚本目的)。

**相关：** 委托 (delegation), DRep, 验证器 (validator)

## CIP (Cardano 改进提案)

**定义：** 用于协调协议开发、标准和生态系统互操作性的正式变更提案。类似于 Python 的 PEP 或 Rust 的 RFC。

**相关：** CIP-0057, CIP-0105, 治理 (governance)

## Collateral (抵押品)

**定义：** 一组由交易提供的现有 UTxO，如果脚本执行失败 (Phase-2)，这些 UTxO 将被销毁。用于补偿节点在验证失败脚本时所付出的内存和 CPU 成本。

**上下文：** 由于节点在验证脚本之前会先在本地运行它们，因此只有当用户向链上提交已知会失败的交易时，才会真正销毁抵押品。抵押品必须只包含 Ada。

**相关：** Phase-1 验证 (phase-1 validation), Phase-2 验证 (phase-2 validation), Lovelace, 确定性 (deterministic)

## Compilation (编译)

**定义：** 将 Aiken 源代码转换为适用于链上执行的 Untyped Plutus Core (UPLC) 二进制代码的过程。

**上下文：** 发生在构建、测试和检查命令期间。代码在编译过程中会进行全面优化。

**相关：** aiken build, UPLC, 编译期 (compile-time)

## Compile-time (编译期)

**定义：** 发生在由编译器将代码转换为 UPLC 的阶段。Aiken 具有强大的静态类型系统，许多错误在部署到链上之前就会被捕获。

**相关：** aiken build, 类型 (type), 编译器 (compiler)

## Config module (配置模块)

**定义：** 一个根据当前运行环境动态变化的模块，其值可以由环境中的 `aiken.toml` 定义。用于跨网络 (例如主网 vs 测试网) 管理配置。

**上下文：** 通过使用特定环境的后缀来定义对应的可选模块 (环境变量) 的配置值。

**相关：** 环境 (environment), aiken.toml

## `const`

**定义：** 关键字，用于定义可以在模块顶层访问的模块级常量。所有常量都是不可变的。

**上下文：** 用于定义数值、字节数组（哈希、策略等）和标志。

**示例：**
```aiken
pub const my_policy_id = #"abcd1234"
const debug_mode = True
```

**相关：** let, 模块 (module), pub, 影子 (shadowing)

## Constitution (宪法)

**定义：** Conway 时代引入的指导方针文件，定义了在链上决策过程中哪些提案是符合规定的。护栏脚本 (propose 目的) 的存在是为了自动执行这些方针。

**上下文：** 治理。宪法委员会可以将违背宪法的提案标记为无效。

**相关：** 治理 (governance), 提案 (propose)

## Constructor (构造函数)

**定义：** 自定义类型的命名符号，可选带有一组字段。它用于创建该类型的实例以及在模式匹配中解构。

**上下文：** 在模式匹配中，只有通过正确构造函数的分支才能匹配。

**示例：**
```aiken
type Dog {
  Labrador { name: ByteArray }
  Poodle
}
let d = Labrador { name: @"Bob" }
```

**相关：** 类型 (type), 记录 (record), 枚举 (enum), 模式匹配 (pattern matching)

## Conway era (Conway 时代)

**定义：** 引入链上治理机制的时代，涉及作为代表投票、处理提案、分配权力。在该时代，验证器可以有 `vote` 和 `propose` 脚本目的。

**相关：** 治理 (governance), 提案 (propose), 投票 (vote)

## Credential (凭证)

**定义：** 支付或授权的身份证明。通常是 28 字节的哈希摘要：验证密钥哈希 (VkH) 代表钱包地址；脚本哈希代表脚本地址。

**上下文：** 用于定义谁拥有地址的控制权。

**相关：** 地址 (address), 验证密钥 (verification key), 脚本哈希 (script hash)

## Custom type (自定义类型)

**定义：** 使用 `type` 关键字定义的非原始类型。包括记录 (具有命名字段的单构造函数型别)、枚举 (具有多构造函数型别) 以及泛型代数数据类型。

**上下文：** 用于构建业务逻辑的核心型别语法。所有自定义类型映射到 Plutus Core 中的 `Data` 原子结构。

**示例：**
```aiken
type Action {
  Minting
  Burning(policy: ByteArray)
}
```

**相关：** 记录 (record), 枚举 (enum), Data

## Data (数据)

**定义：** 任何 Aiken 自定义类型在序列化后的底层型别。在内部，它由 5 种原子结构组成：整数、字节数组、列表、映射和带标签的构造函数 (用于自定义类型字段)。

**上下文：** 实质上是 Aiken 的「通用型」。对于跨系统的低层级互操作非常有用。作为处理器的边界类型。

**相关：** 序列化 (serialisation), CBOR, 自定义类型 (custom type), Datum

## Datum (数据载荷)

**定义：** 附加在交易输出上的数据片段。它代表了脚本的内部状态 (例如游戏当前状态、待领取余额信息等)。在输出中可以使用 Datum 哈希或直接作为「内联 Datum」包含进来。

**上下文：** Cardano 特有。支出验证器可以访问此数据以进行验证。这是脚本跨交易保持状态的方式。

**相关：** eUTxO, 验证器 (validator), 输出 (output), 内联 Datum (inline datum)

## Delegation (委托)

**定义：** 过程：Ada 控制者授权质押池负责区块生产，并换取一定的奖励分成。委托并不改变 Ada 的控制权。

**相关：** 质押池 (stake pool), 奖励 (reward), 地址 (address), 委托凭证 (delegation credentials)

## Delegation credentials (委托凭证)

**定义：** 地址中控制质押权限的部分。可以是哈希摘要或脚本哈希，以对应质押凭证的操作权利。

**上下文：** 脚本化委托允许为委托行为编写自定义规则 (例如只允许委托给特定的池子)。

**相关：** 地址 (address), 凭证 (credential), 质押 (stake)

## Dependencies (依赖项)

**定义：** 项目运行所需的外部库，在 `aiken.toml` 中配置。由 `aiken packages` 管理。

**相关：** aiken.toml, 标准库 (stdlib), 模块 (module)

## Dependency management (依赖管理)

**定义：** 在 `aiken.toml` 中定义库的使用，并在需要时通过 `aiken packages upgrade` 更新项目引用的库。

**相关：** aiken.toml, 依赖项 (dependencies)

## Deserialisation (反序列化)

**定义：** 将二进制数据 (CBOR) 转换回结构化值的过程。对于要在验证器内部使用的外部数据是必要的。

**相关：** 序列化 (serialisation), CBOR, Data

## Destructuring (解构)

**定义：** 从复原型别中提取特定值。在 `let` 绑定中使用或在模式匹配的分支中使用。

**示例：**
```aiken
let Dog { name, .. } = dog
```

**相关：** 模式匹配 (pattern matching), 展开运算符 (spread operator), 记录 (record)

## Deterministic / Determinism (确定性)

**定义：** 性质：即给定相同的输入，同一段代码始终产生相同的结果。在 Cardano 上，脚本执行是确定性的 —— 相对于其他的链，在离线完成验证后结果在正式提交时不会改变。

**上下文：** 这也是 Cardano 智能合约的一个核心优势 —— 验证器结果在交易提交前离线即可确定。

**相关：** 验证器 (validator), Phase-1 验证 (phase-1 validation), Collateral (抵押品)

## DRep (委任代表)

**定义：** Conway 时代引入的角色，代表质押者参与治理投票。您可以将自己的质押委托给特定的 DRep。

**相关：** 治理 (governance), 委托 (delegation), 投票 (vote)

## Double satisfaction (双重满足)

**定义：** 一种常见的智能合约安全漏洞，发生在验证器未检查具体支出目标的情况下，攻击者通过在单笔交易中满足两个验证器的条件，而只支付一笔款项来实现恶意获利。

**上下文：** 安全。防御策略包括使用标签化的输出 (tagged outputs) 或基于 OutputReference 进行验证。

**相关：** 安全 (security), 标记输出 (tagged outputs), 漏洞 (vulnerability)

## `else`

**定义：** `validator` 关键字中定义后备处理程式的分支。如果有目的没有明确定义，将执行此分支。它接收完整的 `ScriptContext`。

**上下文：** 验证器关键字。当验证器不需要处理所有六种目的时使用。

**示例：**
```aiken
validator my_script {
  mint(redeemer: Data, policy_id: PolicyId, self: Transaction) { todo }
  else(_ctx: ScriptContext) {
    fail @"unsupported purpose"
  }
}
```

**相关：** 验证器 (validator), 处理程式 (handler), 目的 (purpose), ScriptContext

## Enum (枚举)

**定义：** 具有多个构造函数的自定义型别，每个构造函数代表一个不同的变体。构造函数可以有字段（如代数数据类型）或无字段。

**上下文：** 用于 Redeemer 操作、状态机以及任何具有不同案例的情况。

**示例：**
```aiken
pub type Action {
  Minting
  Burning
}
```

**相关：** 构造函数 (constructor), 模式匹配 (pattern matching), 代数数据类型 (algebraic data type)

## Environment (环境)

**定义：** 一个命名的构建配置（例如 `default`, `mainnet`, `testnet`），在构建时通过 `--env` 选择。驱动条件式模块选择和配置值解析。

**上下文：** `aiken build --env mainnet` 选择特定于主网的模块和配置值。

**相关：** 配置模块 (config module), 条件式模块 (conditional module), aiken.toml

## Epoch (纪元)

**定义：** Cardano 中的固定时间段（目前为 5 天），在此期间质押委托处于活动状态。奖励在纪元边界处计算和分配。

**上下文：** 质押快照、质押池表现和奖励分配均以纪元周期运作。

**相关：** 插槽 (slot), 质押池 (stake pool), 奖励 (reward), 委托 (delegation)

## eUTxO (扩展 UTxO)

**定义：** Cardano 对 UTxO 模型的扩展，增加了 Datum（附加在输出上的状态）和 Redeemer（支出时的用户参数），从而在保留确定性的同时实现智能合约逻辑。

**上下文：** 「扩展」部分是使智能合约在 Cardano 上成为可能的关键。脚本充当参数化的断言 (predicates)。

**相关：** UTxO, datum, redeemer, 脚本 (script), 确定性 (deterministic)

## `expect`

**定义：** 用于非穷举模式匹配的关键字，如果模式不匹配则停止（失败）。也用于布尔断言 —— `expect condition` 若为假则停止。

**上下文：** 错误处理关键字。在验证器中解包 `Option` Datum 时至关重要。在 verbose 模式下生成自动追踪。

**示例：**
```aiken
expect Some(datum) = optional_datum
expect sum >= 0
```

**相关：** fail, 模式匹配 (pattern matching), 追踪 (trace), Option

## Expression (表达式)

**定义：** 任何求值为值的代码片段。在 Aiken 中，一切都是表达式 —— 没有语句 (statements)。`if/else`、`when/is` 和代码块都返回一个值。

**上下文：** 核心函数式编程 (FP) 原则。函数返回最后一个表达式的值；没有 `return` 关键字。

**相关：** 代码块 (block), 函数式编程 (functional programming), 纯函数 (pure function)

## `fail` (关键字)

**定义：** 立即停止验证器执行的关键字，导致验证器拒绝该交易。可以包含选用消息。不会产出编译警告（与 `todo` 不同）。

**上下文：** 错误处理关键字。用于代码路径应始终拒绝的情况。

**示例：**
```aiken
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> fail @"Expected a value but got None"
  }
}
```

**相关：** expect, todo, 验证器 (validator), 断言 (predicate)

## `fail` (注释)

**定义：** 测试和基于属性的测试的修饰注释，预期该测试始终失败。

**上下文：** 在编写负面测试场景时非常方便，用于测试那些失败且不返回结果的函数。Aiken 不支持异常 (exceptions) 及其捕获机制。

**相关：** fail, 基于属性的测试 (property-based test), 测试 (test)

## `fail once` (失败一次)

**定义：** 基于属性的测试的测试修饰符，预期属性至少失败一次。在第一次求值失败时成功；如果所有 100 次求值都通过，则失败。

**上下文：** 测试非属性 (non-properties) —— 验证某些输入是否导致失败。

**相关：** fail, 基于属性的测试 (property-based test), 测试 (test)

## Finality (最终性)

**定义：** 交易在区块链上变得不可更改且永久的点。与延迟 (latency) 不同（第一次出现在区块中的时间）。取决于敌对质押的比例。

**上下文：** 对于敏感交易建议等待约 100-150 个区块（30-50 分钟）；对于小额支付则等待几个区块。

**相关：** 延迟 (latency), 区块 (block), Ouroboros, 结算 (settment)

## First-class function (一等函数)

**定义：** 可以赋值给变量、作为参数传递以及从其他函数返回的函数 —— 就像对待任何其他值一样。

**上下文：** Aiken 函数是一等公民，但有一个例外：它们不能作为数据类型定义的一部分。

**示例：**
```aiken
fn twice(f: fn(t) -> t, x: t) -> t {
  f(f(x))
}
```

**相关：** 匿名函数 (anonymous function), 函数捕获 (function capturing), 高阶函数 (higher-order function)

## `fn`

**定义：** Aiken 中用于定义命名或匿名函数的关键字。函数是一等值，会隐式返回最后一个表达式的结果。

**上下文：** 核心语言关键字。Aiken 中所有的逻辑都通过函数表达。函数默认为私有。

**示例：**
```aiken
fn add(x: Int, y: Int) -> Int {
  x + y
}
```

**相关：** pub, let, 验证器 (validator), 匿名函数 (anonymous function)

## Forwarding validation (转发验证)

**定义：** 一种模式，其中简单的支出 (spending) 验证器将逻辑委托给每笔交易执行一次的提现 (withdrawal) 脚本。通过避免在多个输入中冗余执行来降低成本。

**上下文：** 利用了提取 0 Lovelace 是有效的这一事实。在生产环境的 dApp 中用于预算优化。

**相关：** 提现 (withdrawal), 支出 (spend), 优化 (optimization), 验证器 (validator)

## Function capturing (函数捕获)

**定义：** 创建新函数的简写，通过使用 `_` 作为缺失参数的占位符来部分应用现有函数。

**上下文：** 通常与管道运算符 (pipe operator) 一起使用以创建转换流程。

**示例：**
```aiken
fn add(x, y) { x + y }
let add_one = add(1, _)
add_one(2)  // 3
```

**相关：** 管道运算符 (pipe operator), 匿名函数 (anonymous function), 部分应用 (partial application)

## Fuzzer

**定义：** 用于构建伪随机值生成器的接口类型。在基于属性的测试中用于生成测试输入。使用来自 `aiken/fuzz` 的原语组合而成。

**上下文：** 测试类型。定义为 `Fuzzer<a>`，并在测试参数中通过 `via` 关键字引入。

**示例：**
```aiken
use aiken/fuzz

test prop_positive(n via fuzz.int()) {
  n * n >= 0
}
```

**相关：** 基于属性的测试 (property-based test), PRNG, Sampler, via, 收缩 (shrinking)

## G1Element / G2Element / MillerLoopResult

**定义：** 特定于 BLS12-381 密码学原语的型别。用作配对密码学内置函数的操作数和返回值。

**上下文：** 高级密码学。在 CIP-0381 中定义。用于零知识证明和高级签名方案。

**相关：** 密码学 (cryptography), 内置 (builtin), CIP-0381

## Generic type (泛型)

**定义：** 由一个或多个类型变量参数化的型别，使其能与任何具体类型配合使用。在尖括号中使用小写类型参数表示。

**上下文：** 在标准库 (List\<a\>, Option\<a\> 等) 和可重用的数据结构中广泛使用。

**示例：**
```aiken
type Box<inner_type> {
  inner: inner_type,
}
let int_box: Box<Int> = Box(42)
```

**相关：** 类型 (type), Option, List, 类型参数 (type parameter)

## Genesis configuration (创世配置)

**定义：** 区块链的初始状态，定义了起始的 UTxO 集合。提供了所有后续交易流向的「第一批输出」。

**上下文：** 解决了输入需要先前输出的先有鸡还是先有蛋的问题。

**相关：** UTxO, 区块链 (blockchain), 初始状态 (initial state)

## Governance (治理)

**定义：** Conway 时代引入的链上决策机制。包括由委派代表对提案进行投票，受 `vote`（投票）和 `propose`（提案）脚本目的控制。

**上下文：** 宪法护栏脚本 (propose 目的) 可以程序化地拒绝提案。

**相关：** 投票 (vote), 提案 (propose), Conway 时代 (Conway era), 宪法 (constitution), DRep

## Hash digest (哈希摘要)

**定义：** 由加密哈希函数产出的固定大小输出。用作区块、交易、脚本和密钥的防篡改标识符。Cardano 主要使用 Blake2b。

**上下文：** 交易 ID、策略 ID、凭证哈希均为哈希摘要。大多数事物为 32 字节；凭证为 28 字节。

**相关：** Blake2b, 策略 ID (policy ID), 地址 (address), 密码学 (cryptography)

## `if/else`

**定义：** 求值布尔条件并返回两个分支之一的条件表达式。与命令式语言不同，Aiken 中的 `if` 这是一个返回值的表达式。

**上下文：** 控制流关键字。每个分支必须返回相同型别的值。

**示例：**
```aiken
fn abs(x: Int) -> Int {
  if x < 0 { -x } else { x }
}
```

**相关：** when/is, Bool, 表达式 (expression)

## Immutable / Immutability (不可变性)

**定义：** 一旦创建值就无法更改的属性。Aiken 中的所有值都是不可变的。新值是通过转换而非变异来创建的。

**上下文：** 核心函数式编程 (FP) 原则。在列表前添加元素会创建一个新列表，而不改变原有的列表。

**相关：** let, 函数式编程 (functional programming), 纯函数 (pure function)

## Inlining (内联)

**定义：** 编译器优化，将生成代码中的标识符引用替换为其具体值。Aiken 中的所有 `const` 值都会被内联。

**上下文：** 使常量在运行时成本为零 —— 它们被字面量值替换。有时也作为短波函数的优化启发式方法。

**相关：** const, 编译期 (compile-time), 优化 (optimization)

## Input (输入)

**定义：** 对先前 UTxO 的引用，由创建它的交易哈希以及输放在该交易中的位置标识。支出输入会销毁所引用的 UTxO。

**上下文：** 输入使得每个 UTxO 只能被支出一次。交易 ID + 输出索引的组合是唯一的。

**相关：** UTxO, 输出 (output), OutputReference, 交易 (transaction)

## Int (整数)

**定义：** 任意大小的整数型别，没有下溢或上溢问题。支持十进制、二进制 (`0b`)、八进制 (`0o`) 和十六进制 (`0x`) 字面量，加上 `_` 分隔符。

**上下文：** Aiken 中唯一的数字型别。涵盖所有数字需求，包括 Lovelace 价值。

**示例：**
```aiken
let amount = 1_000_000
let flags = 0b00001111
let hex_val = 0xFF
```

**相关：** ByteArray, 算术运算符 (arithmetic operators)

## Labeled arguments (命名参数)

**定义：** 可以通过标签而非位置传递的函数参数。通过在函数签名中给出参数名称来定义。

**上下文：** 提高具有多个参数的函数的可读性。标签可以在函数主体中被覆盖。

**示例：**
```aiken
fn replace(self: String, pattern: String, replacement: String) { ... }
replace(pattern: @",", replacement: @" ", self: @"A,B,C")
```

**相关：** fn, 具名参数 (named arguments)

## Labelling (标记)

**定义：** 基于属性的测试中的一种机制，用于追踪随机测试期间探索了哪些路径。使用 `fuzz.label()` 标记执行；分布情况会显示在测试报告中。

**上下文：** 用于验证 Fuzzer 的正确性并确保充足的路径覆盖范围。

**相关：** 基于属性的测试 (property-based testing), Fuzzer, fuzz.label

## Language Server Protocol (LSP)

**定义：** 一种用于编辑器智能功能（补全、诊断、跳转到定义）的协议。Aiken 的 CLI 包含一个内置的 LSP 服务器，通过 `aiken lsp` 调用。

**上下文：** 使用根模式 `aiken.toml` 和文件类型 `.ak` 进行配置。

**相关：** 编辑器集成 (editor integration), aikup, 自动补全 (auto-completion)

## Language tag / Discriminator byte (语言标签)

**定义：** 在哈希之前添加到脚本的起始字节，用以区分脚本语言。原生 (Native) = `0x00`, Plutus V1 = `0x01`, V2 = `0x02`, V3 = `0x03`。

**上下文：** 解释了为什么对原始脚本进行哈希产生的结果与实际的策略 ID 不同。

**相关：** 策略 ID (policy ID), 脚本哈希 (script hash), 哈希摘要 (hash digest)

## `let`

**定义：** 用于声明局部变量绑定的关键字。分配给 let 绑定的值是不可变的，但新的绑定可以遮蔽 (shadow) 先前的绑定。

**上下文：** 核心语言关键字。不能在模块的顶层使用 —— 模块级别的值请使用 `const`。

**示例：**
```aiken
let x = 1
let y = x
let x = 2  // 遮蔽了先前的 x
// y + x == 3
```

**相关：** const, 遮蔽 (shadowing), 不可变 (immutable)

## List (列表)

**定义：** 所有元素必须为相同型别的有序值集合。以链表形式实现。在前面添加元素 (`[x, ..rest]`) 很快；在末端追加则很慢。

**上下文：** Aiken 中最常见的数据结构之一。用于交易输入、输出、签署者等。

**示例：**
```aiken
let numbers: List<Int> = [1, 2, 3, 4]
let extended = [0, ..numbers]  // [0, 1, 2, 3, 4]
```

**相关：** Pair, Pairs, 模式匹配 (pattern matching), 链表 (linked list)

## Lovelace

**定义：** Ada 的最小不可分割单位。1 Ada = 1,000,000 Lovelace。以 Ada Lovelace 命名。

**上下文：** 链上价值始终以 Lovelace 表示，而非 Ada。

**相关：** Ada, 价值 (value), Int

## Minting policy (铸造策略)

**定义：** 控制用户定义资产的创建 (minting) 和销毁 (burning) 的脚本。策略的哈希成为这些资产的 PolicyId（策略 ID）。

**上下文：** Cardano 特有。具有 `mint` 处理器程序的验证器。单次铸造策略可确保唯一性。

**相关：** PolicyId, mint, burn, NFT, 单次铸造 (one-shot minting)

## Multivalidator (多重验证器)

**定义：** Aiken 中的单个 `validator` 代码块，包含多种目的（例如同时包含 `mint` 和 `spend`）的处理器程序。所有处理器程序共享相同的脚本哈希。

**上下文：** 当铸造和支出逻辑需要引用相同的脚本哈希时（例如状态线程代币 STT）非常有用。

**相关：** 验证器 (validator), 处理器程序 (handler), 目的 (purpose), 脚本哈希 (script hash)

## Native script (原生脚本)

**定义：** Plutus 之前的一种极简脚本语言，具有 6 个构造函数：密钥、全部符合 (all-of)、任一符合 (any-of)、m 中符合 n 个 (n-of-m)、之后、之前。目前仍然存在且可用多重签名地址。

**上下文：** 也称为「第一阶段脚本 (phase-1 scripts)」。比 Plutus 脚本简单但表达力较低。

**相关：** 多重签名 (multisig), 脚本 (script), 第一阶段验证 (phase-1 validation)

## Never

**定义：** 具有同名单个构造函数的型别。在序列化中与 `None` 相同。用于只能是 `None` 的 `Option` 值。

**上下文：** 由于历史账本错误需要向后兼容而存在。

**示例：**
```aiken
let some: Data = None
let never: Data = Never
some == never  // True
```

**相关：** Option, None, 向后兼容 (backward compatibility)

## NFT (非同质化代币)

**定义：** 独特且不可分割的代币 —— 在给定策略下，存在恰好 1 单位且具有唯一资产名称。使用单次铸造策略创建以保证唯一性。

**上下文：** 通过使铸造策略不可重复（消耗特定的 UTxO）来强制执行。

**相关：** 铸造策略 (minting policy), 单次铸造 (one-shot minting), PolicyId, 资产 (asset)

## One-shot minting policy (单次铸造策略)

**定义：** 一种使用 `OutputReference` 作为参数的铸造策略，要求消耗对应的 UTxO。由于 UTxO 只能被支出一次，这保证了该策略最多验证通过一次。

**上下文：** 在 Cardano 上创建 NFT 和独特代币的标准模式。

**相关：** 铸造策略 (minting policy), OutputReference, NFT, 验证器参数 (validator parameters)

## `opaque` (不透明)

**定义：** `pub type` 的修饰符，导出型别但对外部模块隐藏其内部的构造函数和字段。外部代码可以使用该类型，但不能直接构造或解构它。

**上下文：** 模块封装关键字。用于通过控制型别访问来强制执行不变量。使得该类型不可序列化。

**示例：**
```aiken
pub opaque type Counter {
  inner: Int,
}
```

**相关：** 类型 (type), pub, 模块 (module), 封装 (encapsulation)

## Option (选项)

**定义：** 具有两个构造函数的泛型型别：`Some(a)` 表示存在值，`None` 表示缺失值。内置于 prelude 中；无需导入。

**上下文：** 可能不产出结果的函数的核心模式。支出处理器程序始终接收 `Option<Datum>`。

**示例：**
```aiken
fn get_head(xs: List<a>) -> Option<a> {
  when xs is {
    [] -> None
    [head, ..] -> Some(head)
  }
}
```

**相关：** None, Some, Never, expect, when/is

## Ordering (排序)

**定义：** 具有三个构造函数的型别：`Less` (小于)、`Equal` (等于)、`Greater` (大于)。用于比较两个相同型别的值。标准库为各种型别提供了 `compare` 函数。

**上下文：** 用于比较操作的公用型别。

**相关：** bytearray.compare, 相等性 (equality)

## Ouroboros

**定义：** Cardano 使用的权益证明 (PoS) 共识算法系列。目前的变体是 Ouroboros Praos。决定了区块生产和结算最终性。

**上下文：** 定义了权益委托与区块生产概率之间的关系。

**相关：** 权益池 (stake pool), 纪元 (epoch), 插槽 (slot), 最终性 (finality), Ada

## Output (输出)

**定义：** 交易中的一个对象，描述了价值（资产数量）、地址（支出条件），以及选用的 Datum（数据负载）和脚本引用。一旦交易确认，输出就成为 UTxO。

**上下文：** 新的输出由交易创建。它们像新贴上去的便利贴一样「出现」。

**相关：** UTxO, 输入 (input), 地址 (address), 价值 (value), datum

## OutputReference (输出引用)

**定义：** UTxO 的唯一标识符，由交易 ID（哈希）和输出索引（位置）组成。用作 `spend`（支出）处理器程序的目标类型。

**上下文：** 保证唯一性 —— 对于单次铸造策略至关重要。型别：`OutputReference { transaction_id: ByteArray, output_index: Int }`。

**相关：** 输入 (input), UTxO, 单次铸造 (one-shot minting), spend

## Pair (键值对)

**定义：** 用于两个可能不同型别值的一种特定型别：`Pair<a, b>`。与 2-tuple 不同，因为 `List<Pair<a, b>>` 会序列化为 CBOR 映射 (Map)（而非数组的数组）。元素可通过 `.1st` 和 `.2nd` 访问。

**上下文：** 在 Cardano 账本型别内部使用。仅当您特别需要 CBOR 映射序列化时才使用 Pair；否则请优先选用 2-tuple。

**示例：**
```aiken
let foo = Pair(14, "aiken")
foo.1st == 14
```

**相关：** 元组 (Tuple), Pairs, CBOR, 序列化 (serialisation)

## Pairs (键值对列表)

**定义：** `List<Pair<a, b>>` 的型别别名 —— 一种关联列表 (associative list)。序列化为 CBOR 映射 (Map)。

**上下文：** 在脚本上下文中很常见。标准库提供了一个专门的模块，包含用于关联列表的辅助函数。

**相关：** Pair, List, dict, CBOR 映射 (CBOR map)

## Pattern matching (模式匹配)

**定义：** 一种检查值的形状并提取其组件的机制。使用 `when/is` 进行多分支匹配，并使用 `expect` 进行单模式断言。

**上下文：** Aiken 的核心用法。编译器强制执行穷举性验证 —— 每一种可能的模式都必须被处理。

**相关：** when/is, expect, 解构 (destructuring), 通配符 (wildcard), 构造函数 (constructor)

## Payment credentials (支付凭证)

**定义：** 地址中定义支出条件的部分。有两种形式：验证金钥哈希（需要签名）或脚本哈希（验证器不得报错）。

**上下文：** 脚本地址使用脚本哈希，从而实现任意的验证逻辑。

**相关：** 地址 (address), 验证金钥 (verification key), 脚本哈希 (script hash), 凭证 (credential)

## Phase-1 validation (第一阶段验证)

**定义：** 在脚本执行前由账本执行的结构性检查。包括验证输入引用、最小手续费、有效间隔以及所需的签名。

**上下文：** 如果第一阶段失败，则不会执行任何脚本，也不会收取手续费。第二阶段即为脚本执行。

**相关：** 第二阶段验证 (phase-2 validation), 有效间隔 (validity interval), 交易 (transaction)

## Phase-2 validation (第二阶段验证)

**定义：** 链上脚本（验证器）的执行。在第一阶段通过后发生。交易中的所有脚本都不得报错，该交易才有效。

**上下文：** 如果第二阶段失败，则会消耗抵押品 (collateral)，但不会发生任何状态更改。

**相关：** 第一阶段验证 (phase-1 validation), 验证器 (validator), 脚本 (script), 抵押品 (collateral)

## `|>` (管道运算符 / Pipe operator)

**定义：** 通过将左侧表达式的结果作为第一个参数传递给右侧函数来链结函数调用的运算符。提高了顺序转换的可读性。

**上下文：** 函数式编程惯用法。在 Aiken 中广泛用于数据转换流程。鼓励定义函数时将主要参数放在首位（类似于 `self` 引用）。

**示例：**
```aiken
fn transform(x) {
  x
  |> add(_, 3)
  |> multiply(_, 2)
}
```

**相关：** 函数捕获 (function capturing), 回传语法 (backpassing), 函数式编程 (functional programming)

## Plutus blueprint (Plutus 蓝图)

**定义：** 由 `aiken build` 生成的符合 CIP-0057 的 JSON 文件 (`plutus.json`)。包含编译后的 UPLC 代码、用于地址计算的哈希摘要，以及 Datum/Redeemer 的结构定义。

**上下文：** 与框架无关的互操作格式。从 Aiken 类型定义自动生成。

**相关：** aiken build, UPLC, CIP-0057, 验证器 (validator), 哈希摘要 (hash digest)

## Plutus Core

**定义：** Cardano 链上智能合约语言的正式名称。在坊间，「Plutus」可能指 Plutus Core（虚拟机器语言）、PlutusTx（Haskell 框架）或广义的 Plutus 平台。

**上下文：** Aiken 是多种编译为（无型别）Plutus Core 的语言之一。

**相关：** UPLC, PlutusTx, 虚拟机 (virtual machine), Aiken

## PlutusTx

**定义：** 一个使用 GHC 编译器插件将 Haskell 代码转换为 UPLC 的 Haskell 框架。经常与广义的「Plutus」混淆。现在也称为「Plinth」。

**上下文：** 使用 Haskell 工具链 (GHC)，但在运行时并非真正的 Haskell —— 它会编译为 UPLC。

**相关：** Plutus Core, UPLC, Aiken, Haskell

## PolicyId (策略 ID)

**定义：** 铸造策略脚本的哈希摘要。标识一组特定的用户定义资产。用作 `mint`（铸造）处理器程序的目标类型。

**上下文：** 与脚本哈希相同，因为铸造策略本质上就是脚本。长度为 28 字节。

**相关：** 铸造 (mint), 脚本哈希 (script hash), 资产 (asset), 代币 (token), NFT

## Predicate (断言)

**定义：** 返回布尔值（True 或 False）的函数。验证器就是断言 —— 它们决定了一项交易操作是否被允许。

**上下文：** Cardano 智能合约的核心概念。所有验证器处理器程序都是断言。

**相关：** 验证器 (validator), Bool, 确定性 (deterministic)

## Prelude

**定义：** 无需导入即可自动在所有 Aiken 项目中使用的内置模块。包含核心类型（`Bool`, `Option`, `Ordering`, `Void`, `Data`, `Never`）和基本构造函数。

**上下文：** 发布于 `aiken-lang/prelude` 并附有 HTML 文档。

**相关：** stdlib, 模块 (module), 内置 (built-in)

## PRNG (伪随机数生成器)

**定义：** 伪随机数生成器。基于属性的测试框架内部使用的一种不透明类型，用于产出随机测试值。

**上下文：** 内部型别，但在 prelude 中可选。用户通常通过 `Fuzzer` 接口间接与其交互。

**相关：** Fuzzer, 基于属性的测试 (property-based test), aiken/fuzz

## Property-based testing (基于属性的测试)

**定义：** 一种测试方法，通过生成随机输入来检查一般属性，而非特定案例。Aiken 的整合框架包含自动收缩功能，以寻找最小的反例。

**上下文：** Aiken 中的一等公民。通过 `via` 关键字使用 `Fuzzer`。

**相关：** Fuzzer, 收缩 (shrinking), 测试 (test), via, aiken/fuzz

## `pub`

**定义：** 关键字，使得函数、型别或常量在其定义模块之外可以被公开存取。若无 `pub`，定义默认为私有的。

**上下文：** 模块系统关键字。对于您希望导出供其他模块使用的任何定义都是必需的。

**示例：**
```aiken
pub fn public_function(x: Int) -> Int {
  x * 2
}

pub type Action {
  Minting
  Burning
}
```

**相关：** fn, 模块 (module), use, 型别 (type)

## Pure function (纯函数)

**定义：** 输出仅取决于输入且没有副作用的函数。Aiken 中的所有函数，特别是验证器，均为纯函数。对于验证器而言：给定相同的交易，它们始终产出相同的结果。

**上下文：** 核心函数式编程 (FP) 概念。确保了智能合约的确定性执行。

**相关：** 确定性 (deterministic), 断言 (predicate), 验证器 (validator), 表达式 (expression)

## Receipt pattern (收据模式)

**定义：** 一种铸造模式，创建一个唯一的代币，其资产名称源自第一个输入的 `OutputReference`（通过其 CBOR 序列化的 `blake2b_256`）。确保每笔交易产生一个收据。

**上下文：** 作为单次铸造的另一种选择，用于实现每笔交易的唯一性，而非全局唯一性。

**相关：** 单次铸造 (one-shot minting), blake2b, cbor.serialise

## Record (记录)

**定义：** 具有单个构造函数和命名字段的自定义型别。字段使用点运算符存取。

**上下文：** 用于结构化 Datum 型别、配置以及任何具有命名字段的型别化资料。

**示例：**
```aiken
type Dog {
  name: ByteArray,
  cuteness: Int,
  age: Int,
}
let d = Dog { name: "Bob", cuteness: 100, age: 3 }
d.name  // "Bob"
```

**相关：** 构造函数 (constructor), 解构 (destructuring), 型别 (type), 自定义型别 (custom type)

## Recursion (递归)

**定义：** 函数调用自身，通过将问题分解为更小的子问题来解决。Aiken 中主要的循环机制，因为没有 `for`/`while` 循环。

**上下文：** 对于迭代列表、树状结构及任何重复演算都至关重要。匿名函数不可递归。

**示例：**
```aiken
fn factorial(n: Int) -> Int {
  if n <= 1 { 1 } else { n * factorial(n - 1) }
}
```

**相关：** list, 函数式编程 (functional programming), 尾递归 (tail recursion)

## Redeemer

**定义：** 在交易中为任何脚本执行提供的一段资料。作为用户向验证器提供的参数或操作指令。与 Datum 不同，Redeemer 是在支出时而非创建时提供的。

**上下文：** Cardano 特有。每个处理器程序都会收到一个 Redeemer。每个处理器程序都可以定义其专属的 Redeemer 型别。

**示例：**
```aiken
pub type SpendAction {
  Claim
  Cancel
}
```

**相关：** datum, 脚本 (script), eUTxO, 验证器 (validator), 处理器程序 (handler)

## Sampler

**定义：** 用于基准测试的函数类型 `fn(Int) -> Fuzzer<a>`。接受一个大小参数并返回一个 Fuzzer，允许输入复杂度随着每次基准测试迭代而增长。

**上下文：** 基准测试类型。在 `bench` 定义中通过 `via` 引入。

**相关：** Fuzzer, bench, via

## Script (脚本)

**定义：** 将验证逻辑定义为断言函数的链上代码。必须返回 True 才能允许守卫的操作之执行。也称为「验证器 (validator)」。

**上下文：** 脚本作为交易中的见证人 (witnesses)，与任何所需的 Datum 和 Redeemer 一起提供。脚本是完全确定性的。

**相关：** 验证器 (validator), 断言 (predicate), 见证人 (witness), 目的 (purpose), Plutus Core

## Script purpose (脚本目的)

**定义：** 脚本被执行的原因。Cardano 有六种目的：`mint`（铸造）、`spend`（支出）、`withdraw`（提现）、`publish`（发布）、`vote`（投票）、`propose`（提案）。与交易和 Redeemer 一起传递给脚本。

**上下文：** 仅 `spend` 会收到 Datum。每种目的都有不同的目标型别。

**相关：** 处理器程序 (handler), 验证器 (validator), mint, spend, withdraw, publish, vote, propose

## ScriptContext (脚本上下文)

**定义：** 提供给验证器的完整执行上下文，包含交易、脚本目的以及特定于目的的资料。在 Aiken 中，处理器程序会自动对其进行解构。

**上下文：** 后备处理器程序 `else` 接收原始的 ScriptContext。标准处理器程序则接收预先提取的组件。

**相关：** Transaction, 目的 (purpose), 处理器程序 (handler), 验证器 (validator)

## Serialisation (序列化)

**定义：** 将结构化值转换为二进制（如 CBOR）表示法的过程，以便链上存储或网络传输。其反向过程为反序列化 (deserialisation)。也称为「封送 (marshalling)」。

**上下文：** 在验证器边界，Aiken 型别均为 `Data`，其序列化为 CBOR。同一逻辑值可能存在多种有效的序列化形式。

**相关：** CBOR, Data, 反序列化 (deserialisation), 蓝图 (blueprint)

## Shadowing (影子)

**定义：** 重新使用已声明的标识符（例如通过 `let` 或函数参数引入）来代表一个新值，使得原有值在当前作用域中无法存取（被遮蔽）。原有值本身并未改变。

**上下文：** 在函数式编程中很常见。与变异 (mutation) 不同 —— 原有的绑定仍然存在，只是无法再通过名称触及。

**相关：** let, 不可变 (immutable)

## Shelley era (Shelley 时代)

**定义：** 引入当前地址格式、质押委托和去中心化区块生产的时代。

**相关：** 地址 (address), 委托 (delegation), 质押池 (stake pool), Byron 时代 (Byron era)

## Shrinking (收缩)

**定义：** 在基于属性的测试期间，自动简化所发现反例的过程，以找出仍会导致失败的最小输入。整合在 Aiken 的框架中 —— 无需手动定义收缩规则。

**上下文：** 例如，如果 `[-2, 441, 7863]` 失败，框架可能会将其收缩为 `[-1]`。

**相关：** 基于属性的测试 (property-based testing), Fuzzer, 反例 (counterexample)

## Slot (插槽)

**定义：** Cardano 共识协议中最小的时间单位。每个插槽为 1 秒，可能包含也可能不包含区块。

**上下文：** 区块生产是概率性的 —— 并非每个插槽都会产生区块（区块之间平均约 20 秒）。

**相关：** 区块 (block), 纪元 (epoch), 有效间隔 (validity interval)

## Spread operator (`..` / 展开运算符)

**定义：** 用于模式中，表示忽略剩余的字段或列表元素。在列表模式中可以命名以捕获尾部元素。

**上下文：** 当您只需要记录中的一部分字段或列表的头部时非常有用。

**示例：**
```aiken
let Dog { name, .. } = dog
let [head, ..tail] = my_list
```

**相关：** 解构 (destructuring), 通配符 (wildcard), 列表 (list)

## Stake pool (质押池)

**定义：** Cardano 上参与区块生产的注册实体，通过 Ouroboros 共识协议运行。委托人将其质押分配给权益池，以换取奖励分成。

**上下文：** 质押委托受地址中的委托凭证控制。

**相关：** 委托凭证 (delegation credentials), 质押 (stake), 奖励 (reward), 纪元 (epoch)

## Standard library (stdlib / 标准库)

**定义：** 由 Aiken 社区维护的实用函数和数据结构库 (`aiken-lang/stdlib`)。涵盖列表、字典、数学、加密、交易型别、资产、地址等。

**上下文：** 由 `aiken new` 自动添加。是编写良好的 Aiken 代码极佳的参考。

**相关：** prelude, aiken/fuzz, 依赖项目 (dependency), aiken.toml

## State Thread Token (STT / 状态线程代币)

**定义：** 一种用于跨交易追踪可变状态的 NFT。该代币始终被转发到具有更新后 Datum 的新输出，从而建立一条状态变更的「线程」。

**上下文：** 用于计数器、注册表和任何链上状态机的常见模式。

**相关：** NFT, 单次铸造 (one-shot minting), datum, 多重验证器 (multivalidator)

## String (字符串)

**定义：** UTF-8 文本类型，带有 `@` 前缀。专门用于追踪 (tracing) 和除错 —— 不用于链上资料或验证器界面。

**上下文：** 使用场景狭窄。带有一组有限的原语。对于链上资料，请始终改用 ByteArray。

**示例：**
```aiken
let greeting: String = @"Hello, Aiken!"
trace @"Debug message"
```
```aiken
test simple_addition() {
  let result = 2 + 3
  result == 5
}
```

**相关：** 基于属性的测试 (property-based test), fuzzer, bench (基准测试), aiken check

## `todo`

**定义：** 像 `fail` 同样停止执行，但额外会产出一个编译警告。在开发过程中用作未完成逻辑的占位元。

**上下文：** 开发关键字。提醒您尚有不完整的代码路径。同时在错误消息中提供占位元的预期型别，因此可用于除错复杂型别。

**示例：**
```aiken
fn favourite_number() -> Int {
  todo @"Implement this later"
}
```

**相关：** fail, expect

## `trace` (追踪)

**定义：** 在验证器执行期间用于记录除错消息的关键字。可接受变长参数 —— 接受一个标签和任意数量的可序列化值。追踪消息由虚拟机器收集，并在测试或模拟期间显示。

**上下文：** 除错关键字。在 `aiken build` 时预设移除；在 `aiken check` 时预设保留。

**示例：**
```aiken
fn is_even(n: Int) -> Bool {
  trace @"checking": n
  n % 2 == 0
}
```

**相关：** ? 运算符, 故障排除 (troubleshooting), CBOR 诊断 (CBOR diagnostic), 追踪级别 (trace level)

## Trace level (追踪级别)

**定义：** 控制追踪输出的构建/检查选项：`silent`（无追踪）、`compact`（仅标签）或 `verbose`（包含值的完整追踪）。

**上下文：** 追踪会增加代码大小并改变验证器哈希。正式生产版本请使用 `silent`。

**相关：** trace, ? 运算符, aiken build, aiken check

## `?` (若为假则追踪运算符)

**定义：** 附加在任何布尔表达式后的后置运算符，仅当表达式评估为 `False` 时才产出追踪。对于除错条件的与 (conjunctions) / 或 (disjunctions) 非常有用。

**上下文：** 除错运算符。受 `--trace-level` 选项影响。

**示例：**
```aiken
must_say_hello? && must_be_signed?
// 如果 must_be_signed 为 False，追踪显示："must_be_signed ? False"
```

**相关：** trace, 验证器 (validator), and/or

## Transaction (交易)

**定义：** 更改区块链状态的基本原语。包含输入（对现有 UTxO 的引用）、输出（要创建的新 UTxO）以及其他字段，如铸造、凭证、提现和有效间隔。必须是原子性的 —— 成败一举。

**上下文：** 每个验证器处理程序程序的最后一个参数都是 `Transaction`。提供完整的执行上下文。

**相关：** UTxO, 输入 (input), 输出 (output), 验证器 (validator), 区块 (block)

## Tuple (元组)

**定义：** 值的固定大小分组，每个元素可以具有不同型别。使用序数语法（`.1st`, `.2nd`, `.3rd`, `.4th`）访问元素。不建议超过 3 个元素 —— 此时应改用记录 (records)。

**上下文：** 快速的匿名数据分组。序列化为 CBOR 数组。

**示例：**
```aiken
let point: (Int, Int) = (14, 42)
let x = point.1st  // 14
```

**相关：** Pair, 记录 (record), 自定义型别 (custom type)

## `type` (型别)

**定义：** 用于定义自定义型别数据的关键字，包括记录、枚举以及泛型代数数据类型。也用于型别别名。

**上下文：** 核心语言关键字。自定义型别是结构化 Datum、Redeemer 和合约状态的主要方式。

**示例：**
```aiken
type RGB {
  red: Int,
  green: Int,
  blue: Int,
}

pub type Action {
  Minting
  Burning
}

type Point = (Int, Int)
```

**相关：** 构造函数 (constructor), 记录 (record), 枚举 (enum), 泛型 (generic), 别名 (alias)

## Type alias (型别别名)

**定义：** 现有型别表达式的新名称。不会创建新类型 —— 仅作为简写。

**上下文：** 提高复杂型别组合的可读性。

**示例：**
```aiken
type CartesianCoordinates = (Int, Int)
type VerificationKeyHash = Hash<Blake2b_224, VerificationKey>
```

**相关：** 型别 (type), 泛型 (generic)

## Type annotation (型别注释)

**定义：** 对值或函数型别的显式声明。虽然由于类型推断而是选用的，但注释可作为文档并尽早发现错误。

**上下文：** 函数签名和公共 API 的最佳实践。

**示例：**
```aiken
fn add(x: Int, y: Int) -> Int { x + y }
const name: ByteArray = "Aiken"
```

**相关：** 类型推论 (type inference), fn, const

## Type inference (类型推论)

**定义：** 编译器自动确定类型而无需显式注释的能力。Aiken 可以推断所有类型，使得注释成为选用（但为了文档化仍建议使用）。

**上下文：** Aiken 具有完整的类型推论。带注释与不带注释的代码同样安全。

**示例：**
```aiken
fn add_inferred(a, b) { a + b }  // 编译器推论为 Int -> Int -> Int
```

**相关：** 型别注释 (type annotation), 静态型别 (static typing), 泛型 (generic)

## Untyped Plutus Core (UPLC / 无型别 Plutus Core)

**定义：** 基于 λ 演算的低阶语言，是 Cardano 虚拟机器实际执行的语言。所有智能合约语言均编译为 UPLC。具有 7 种原语型别和内置函数。

**上下文：** Aiken 编译为 UPLC。了解 UPLC 有助于故障排除和优化。

**相关：** Plutus Core, 虚拟机器 (virtual machine), 编译 (compile), aiken build

## `use`

**定义：** 将模块、型别和函数导入当前作用域的关键字。支持限定导入 (qualified)、非限定导入 (unqualified) 和别名导入 (aliased)。

**上下文：** 模块系统关键字。用于文件顶端，将外部定义引入作用域。

**示例：**
```aiken
use aiken/collection/list
use aiken/collection/list.{at}
use aiken/collection/list as my_list
```

**相关：** 模块 (module), pub, 导入 (import)

## UTxO (未支出交易输出)

**定义：** 先前交易中尚未被消耗（支出）的输出。UTxO 是 Cardano 状态的基本单位 —— 区块链状态即为所有现存 UTxO 的集合。

**上下文：** 将 UTxO 想象成墙上的便利贴。每一张都有价值和地址。支出一个 UTxO 会将其销毁并建立新的。每个 UTxO 只能被支出一次。

**相关：** eUTxO, 输入 (input), 输出 (output), 交易 (transaction), 地址 (address)

## `validator` (验证器)

**定义：** 在定义一个命名代码块的关键字，其中包含一个或多个对应于 Cardano 脚本目的的处理器程序函数。验证器是链上智能合约逻辑的进入点。

**上下文：** 智能合约的核心 Aiken 关键字。验证器就是断言 —— 它们返回 True（允许）或 False/失败（拒绝）。

**示例：**
```aiken
validator hello_world {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _ref: OutputReference, self: Transaction) {
    todo @"logic here"
  }
  else(_) { fail }
}
```

**相关：** 处理器程序 (handler), 目的 (purpose), datum, redeemer, Transaction

## Validity interval (有效间隔)

**定义：** 交易中选用的时间窗口（下限和/或上限），在第一阶段验证期间检查。脚本可以假定交易在该间隔内，从而实作与时间相关的逻辑而不会破坏确定性。

**上下文：** 为确定性脚本引入时间概念。间隔可以窄至一秒。

**相关：** 第一阶段验证 (phase-1 validation), 确定性 (deterministic), 插槽 (slot), POSIXTime

## Value (价值)

**定义：** UTxO 中持有的资产数量。包括 Ada 以及选用的用户定义代币，每一种都由 PolicyId 和资产名称标识。

**上下文：** 交易必须平衡 —— 总输入价值必须等于总输出价值（加上手续费）。

**相关：** Ada, 资产 (asset), PolicyId, 输出 (output)

## `via`

**定义：** 在基于属性的测试和基准测试中使用的关键字，用以引入 `Fuzzer` 或 `Sampler` 来生成随机测试输入。

**上下文：** 测试注释关键字。直接将生成器与测试参数关联起来。

**示例：**
```aiken
test prop_commutative((a, b) via fuzz.both(fuzz.int(), fuzz.int())) {
  a + b == b + a
}
```

**相关：** Fuzzer, Sampler, 基于属性的测试 (property-based test), 基准测试 (bench)

## Virtual machine (虚拟机)

**定义：** 在链上解释 UPLC 代码的执行环境。在主 Cardano 节点中以 Haskell 实作，在 Aiken 中则以 Rust 实作。

**上下文：** 两种实作方式执行相同的 UPLC 程序之结果皆相同。Aiken 的测试在同在一个虚拟机上运行。

**相关：** UPLC, Plutus Core, 确定性 (deterministic)

## Void (空型别)

**定义：** 代表零参数构造函数（无值）的型别。`Void` 既是型别也是构造函数。等同于零元素元组。

**上下文：** 由于 Aiken 中一切都是型别化表达式，因此较少直接需要。偶尔用作返回类型。

**相关：** Never, Option, 表达式 (expression)

## `when/is`

**定义：** 模式匹配表达式，检查值并根据其形状执行不同分支。必须是穷举性的 —— 所有的构造函数都必须被处理。

**上下文：** 核心控制流关键字。Aiken 中分支逻辑的主要机制。

**示例：**
```aiken
fn describe(opt: Option<Int>) -> String {
  when opt is {
    Some(value) -> @"Has a value"
    None -> @"Empty"
  }
}
```

**相关：** 模式匹配 (pattern matching), 通配符 (wildcard), 解构 (destructuring), 构造函数 (constructor)

## Wildcard (通配符)

**定义：** 以 `_`（或任何以 `_` 开头的标识符）表示的模式，匹配任何值而不将其绑定到名称。在不需要某个值时用于模式匹配。

**上下文：** 谨慎使用 —— 优先选择明确的模式，因为通配符会隐藏未来可能新增的构造函数。

**示例：**
```aiken
when user is {
  LoggedIn { username } -> username
  _ -> "Guest"  // 捕获所有其余情况
}
```

**相关：** 模式匹配 (pattern matching), when/is, 展开运算符 (spread operator)

## Withdrawal (提现)

**定义：** 一个交易字段，用于将累积的权益奖励从奖励账户转移到 UTxO。将账户余额设为零，并将价值作为虚拟输入加入。

**上下文：** 可以受脚本控制（withdraw 目的）。提取 0 Lovelace 是有效的 —— 转发验证模式即利用了这一点。

**相关：** 奖励 (reward), 质押 (stake), withdraw 目的, 转发验证 (forwarding validation)

## Witness (见证人)

**定义：** 与交易一起提供的证明，用以满足支出或验证条件。包括数字签名、脚本、Datum 和 Redeemer。

**上下文：** 从脚本地址支出时，整个脚本必须作为见证人提供。

**相关：** 签名 (signature), 脚本 (script), datum, redeemer, 交易 (transaction)

## Workspace (工作区)

**定义：** 通过 `aiken.toml` 中的 `members` 字段支持单一储存库 (monorep)。允许在单个根目录下创建多个 Aiken 子项目，并支持通配符 (glob)。

**上下文：** 早期功能，有一些限制：不支持本地路径依赖、依赖项提取冗余、LSP 支持有限。

**相关：** aiken.toml, 项目结构 (project structure)
**相关：** ByteArray, 追踪 (trace), UTF-8

## Tagged outputs (标记输出)

**定义：** 标有唯一标识符（通常是输入的 `OutputReference` 作为内联 Datum）的输出，用以防止双重满足。每个验证器执行只能「声称」带有其专属标记的输出。

**上下文：** 双重满足漏洞的解决方案。

**相关：** 双重满足 (double satisfaction), OutputReference, 内联 Datum (inline datum)

## `test` (测试)

**定义：** 用于定义单元测试的关键字。测试是具名函数，没有参数且返回 Bool 或 Void。它们在与链上合约相同的虚拟机器上执行。

**上下文：** 测试关键字。使用 `aiken check` 执行。测试还通过报告内存/CPU 执行单位来兼任基准测试。

**示例：**
```aiken
test simple_addition() {
  let result = 2 + 3
  result == 5
}
```
