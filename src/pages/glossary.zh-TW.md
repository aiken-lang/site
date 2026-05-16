# Aiken & Cardano 詞彙表

## Ada (艾達幣)

**定義：** Cardano 的原生協議貨幣。所有交易價值中的主要資產。不可分割的單位是 Lovelace（1 Ada = 1,000,000 Lovelace）。

**上下文：** 每個 UTxO 必須包含最小數量的 Ada。Ada 用於支付交易手續費和權益委託。

**相關：** Lovelace, 價值 (value), 資產 (asset), 權益 (stake)

## Address (地址)

**定義：** 由標頭（類型 + 網絡）、支付憑證（支出條件）和可選的委託憑證（質押控制）組成的結構化標識符。以 bech32 或 base16 編碼。

**上下文：** Cardano 特有。決定了誰可以支出 UTxO 以及如何委託權益。

**相關：** 支付憑證 (payment credentials), 委託憑證 (delegation credentials), 腳本哈希 (script hash), 驗證金鑰哈希 (verification key hash)

## `aiken build`

**定義：** 編譯 Aiken 專案並生成 Plutus 藍圖 (`plutus.json`) 的 CLI 指令。預設會移除跟蹤資訊 (traces)。

**上下文：** 主要的建構指令。使用 `--trace-level verbose` 在正式版本中保留跟蹤資訊。

**相關：** aiken check, Plutus 藍圖 (Plutus blueprint), 跟蹤級別 (trace level)

## `aiken check`

**定義：** 對專案進行類型檢查並執行所有測試的 CLI 指令。預設會保留跟蹤資訊 (traces)。

**上下文：** 主要的開發指令。顯示每個測試的記憶體/CPU 執行單位。

**相關：** aiken build, 測試 (test), 跟蹤 (trace)

## `aiken docs`

**定義：** 從型別、類型註釋和文件註釋 (`///`) 生成 HTML 文件的 CLI 指令。

**上下文：** 函式庫作者應使用此指令來產出 API 文件。

**相關：** 文件註釋 (documentation comment), 模組 (module), pub

## `aiken.toml`

**定義：** Aiken 專案根目錄下的專案配置檔案。包含元數據（名稱、版本、授權）、依賴項目、儲存庫資訊、工作區配置和特定環境的配置值。

**上下文：** 由 `aiken packages` 管理依賴項。LSP 的根目錄判斷依據。

**相關：** 專案結構 (project structure), 依賴項目 (dependencies), 配置 (config), 工作區 (workspace)

## `aikup`

**定義：** 一個用於下載和管理 Aiken 編譯器版本的跨平台工具。推薦的安裝方式。

**上下文：** 單獨執行 `aikup` 會安裝最新版本。支援版本固定。

**相關：** 安裝 (installation), aiken

## Alonzo era (Alonzo 時代)

**定義：** 為 Cardano 引入 Plutus 智慧合約 (V1) 的時代，實現了鏈上腳本執行。

**相關：** Plutus Core, 腳本 (script), 智慧合約 (smart contract)

## Alternative patterns (替代模式)

**定義：** 在模式匹配中使用管道符號 `|` 以相同的邏輯處理多個模式。這些模式必須引入具有相同類型的相同標識符。

**上下文：** 減少相似分支間的程式碼重複。

**範例：**
```aiken
when user is {
  LoggedInAsAdmin { username } | LoggedIn { username } -> username
  Guest -> "Guest"
}
```

**相關：** 模式匹配 (pattern matching), when/is

## `and` / `or`

**定義：** 用於組合布林表達式的塊狀關鍵字，具有清晰的視覺分組。`and { ... }` 要求所有表達式均為 True；`or { ... }` 要求至少有一個為 True。

**上下文：** 布林組合語法。比 `&&`/`||` 鏈更具可讀性，特別是在有 4 個或更多條件時。

**範例：**
```aiken
or {
  and {
    condition_1,
    condition_2,
  },
  condition_3,
}
```

**相關：** Bool, &&, ||, 驗證器 (validator)

## Anonymous function (匿名函式)

**定義：** 使用 `fn(args) { body }` 語法定義的未命名函式。透過 `let` 賦值給變數。不可遞迴。

**上下文：** 用於一次性的轉換，特別是與 `list.map`、`list.filter` 等配合使用。

**範例：**
```aiken
let add = fn(x, y) { x + y }
add(1, 2)  // 3
```

**相關：** 一等函式 (first-class function), 函式捕獲 (function capturing), lambda

## Babbage era (Babbage 時代)

**定義：** 引入 Plutus V2 的時代，包含引用輸入 (reference inputs)、內聯 Datum (inline datums) 和引用腳本 (reference scripts)。

**相關：** Plutus V2, 內聯 Datum (inline datum), 引用輸入 (reference input)

## `<-` (Backpassing / 回傳語法)

**定義**：用於以回呼 (callback) 作為最後一個參數的函式的語法。透過將回呼結果賦值給綁定，允許以扁平、線性的風格編寫基於回呼的程式碼。

**上下文**：進階函式語法。傳遞匿名回呼函式的語法糖。在編寫 Fuzzer 時特別有用。

**範例**：

```aiken
fn cubed(n) {
  let total <- apply_function_twice(n)
  total * n
}
// 等同於：apply_function_twice(n, fn(total) { total * n })
```

**相關**：管道運算符 (pipe operator), 匿名函式 (anonymous function), 函式捕獲 (function capturing)

## Base16 / Hex encoding (十六進位編碼)

**定義：** 二進位資料的十六進位表示法。每個位元組由兩個十六進位字元組成。廣泛用於哈希、策略 ID (policy IDs) 和地址。

**上下文：** Aiken 支援使用 `#"..."` 語法的十六進位編碼 ByteArray 字面量。

**範例：**
```aiken
#"666f6f" == "foo"
```

**相關：** ByteArray, bech32, 哈希摘要 (hash digest)

## Bech32

**定義：** 一種具有自定義前綴和錯誤檢測功能的人類可讀編碼格式，適用於短小的二進位資料。在 Cardano 中廣泛使用，特別是以 `addr...` 或 `addr_test...` 開頭的地址。

**上下文：** 顯示哈希、金鑰、地址和各種短小（<64 位元組）二進位資料的標準方式。命令列工具可在 `input-output-hk/bech32` 取得。

**相關：** 地址 (address), base16, 編碼 (encoding)

## `bench`

**定義：** 用於定義基準測試 (benchmarks) 的關鍵字，衡量隨著輸入規模增加時的執行成本（記憶體和 CPU）。透過 `via` 關鍵字使用 `Sampler` 函式。

**上下文：** 基準測試關鍵字。使用 `aiken bench` 執行。建構在 Fuzzer 框架之上。

**範例：**
```aiken
bench bytearray_length(bytes: ByteArray via sample_bytearray) {
  bytearray.length(bytes)
}
```

**相關：** Sampler, Fuzzer, 測試 (test), aiken bench

## Blake2b

**定義：** 整個 Cardano 中使用的主要哈希演算法。具有不同輸出大小：用於一般摘要的 Blake2b_256 (32 位元組) 和用於憑證及策略 ID 的 Blake2b_224 (28 位元組)。

**上下文：** 了解哈希大小有助於型別註釋，例如 `Hash<Blake2b_224, VerificationKey>`。

**相關：** 哈希摘要 (hash digest), 密碼學 (cryptography), 憑證 (credential)

## Block (塊 - 語法)

**定義：** 用花括號 `{ }` 括起來的表達式序列，求值結果為其最後一個表達式的值。用於將操作分組並引入區域編譯。

**上下文：** 函式體、`when/is` 分支和 `if/else` 都是代碼塊。

**範例：**
```aiken
let celsius = { fahrenheit - 32 } * 5 / 9
```

**相關：**表達式 (expression), let, 作用域 (scope)

## Block (區塊 - 資料)

**定義：** 將多個交易批次處理在一起的容器。包含標頭（生產者資訊、時間戳記、哈希）和主體（有序的交易序列）。區塊透過引用前一個區塊的標頭哈希形成鏈。

**上下文：** 在 Cardano 上平均每 20 秒產生一個區塊。區塊生產者由 Ouroboros 共識協議選出。

**相關：** 交易 (transaction), 鏈 (chain), 哈希摘要 (hash digest), 插槽 (slot), 紀元 (epoch)

## Bool (布林值)

**定義：** 具有兩個值 `True` 和 `False` 的布林類型。支援運算符 `==`、`&&` (AND)、`||` (OR)、`!` (NOT) 以及 `?`（若為假則追蹤）。

**上下文：** 基本型別。所有驗證器最終都會產出布林值。`&&` 和 `||` 是短路運算的（右結合）。

**範例：**
```aiken
let is_valid: Bool = True
let result = is_valid && (amount > 0)
```

**相關：** and/or, 斷言 (predicate), 驗證器 (validator), ? 運算符

## Byron address (Byron 地址)

**定義：** 一種已棄用的舊版地址格式，源自 Shelley 時代之前（例如 `Ae2tdPwUPEYz6...`）。包含 Plutus 腳本的交易禁止使用此類地址。

**上下文：** 您可能在舊系統中遇到它們，但不應在新的開發中使用它們。

**相關：** Shelley 地址 (Shelley address), 地址 (address), 時代 (era)

## Byron era (Byron 時代)

**定義：** 最初的 Cardano 時代，使用舊版地址格式，不支援智慧合約。Byron 地址現已棄用且禁止在 Plutus 交易中使用。

**相關：** Byron 地址 (Byron address), Shelley 時代 (Shelley era)

## ByteArray (位元組陣列)

**定義：** 位元組序列。Aiken 支援三種字面量標記：位元組陣列 (`#[10, 255]`)、UTF-8 字串 (`"foo"`) 和十六進位編碼字串 (`#"666f6f"`)。

**上下文：** 用於標識符、哈希、策略 ID 和鏈上資料的核心型別。注意：沒有 `@` 前綴的雙引號字串是 ByteArray，而非文字字串。

**範例：**
```aiken
let hash: ByteArray = #"abcd1234"
let name: ByteArray = "Hello"
let bytes: ByteArray = #[0xff, 0x42]
```

**相關：** 字串 (String), 哈希摘要 (hash digest), 十六進位編碼 (hex encoding)

## CBOR

**定義：** 簡潔二進制物件標記 (Concise Binary Object Representation) —— 一種廣泛應用於 Cardano 序列化的結構化二進位格式。可以將其視為二進位版的 JSON。

**上下文：** 交易、Datum、Redeemer 和腳本在鏈上均以 CBOR 編碼。

**相關：** CDDL, CBOR 診斷 (CBOR diagnostic), 序列化 (serialisation), Data

## CBOR diagnostic (CBOR 診斷)

**定義：** [RFC 8949](https://www.rfc-editor.org/rfc/rfc8949) 中定義的一種人類可讀、類 JSON 的 CBOR 資料表示法。用於透過 `cbor.diagnostic()` 除錯運行時的值。自定義類型使用標籤表示（121 代表第一個構造函數，122 代表第二個，依此類推）。

**上下文：** 除錯工具。自定義型別的欄位在標籤值內以列表元素的形式出現。

**範例：**
```aiken
cbor.diagnostic(Some(42)) == @"121([_ 42])"
cbor.diagnostic(None)     == @"122([])"
```

**相關：** CBOR, 追蹤 (trace), 故障排除 (troubleshooting), 構造函數 (constructor), 標籤 (tag)

## CDDL

**定義：** 簡潔數據定義語言 (Concise Data Definition Language) —— 一種用於描述 CBOR 資料結構的規範元語言。Cardano 帳本為所有鏈上物件維護 CDDL 規範。

**上下文：** 交易、區塊和其他結構如何序列化的事實來源。

**相關：** CBOR, 序列化 (serialisation), 規範 (specification)

## Certificate (憑證)

**定義：** 透過交易發佈的與憑證相關的文件：權益註冊、委託給權益池、權益池註冊等。發佈受 `publish` 腳本目的 (purpose) 控制。

**上下文：** `publish` 處理程式的目標類型。

**相關：** publish, 委託 (delegation), 權益池 (stake pool)

## Compile-time (編譯時期)

**定義：** Aiken 編譯器在程式執行前執行的操作。常量在編譯時求值並內聯。類型檢查也在編譯時進行。

**上下文：** Aiken 的靜態型別系統在編譯時捕獲類型錯誤，而非運行時。

**相關：** const, 類型推斷 (type inference), 靜態型別 (static typing), 內聯 (inlining)

## Conditional module (條件式模組)

**定義：** 一個可以根據建構環境切換的 Aiken 模組。檔案遵循 `{module}.{env}.ak` 命名模式，並透過 `--env` 選擇。

**上下文：** 用於處理主網/測試網之間的差異，而無需更改程式碼。

**相關：** 環境 (environment), 配置 (config), aiken build

## Config module (配置模組)

**定義：** 從 `aiken.toml` 中的 `[config]` 區塊生成的一個虛擬模組。提供源自 TOML 配置值的型別化常量，可透過 `use config` 存取。

**上下文：** 支援整數、布林值、字串、列表、元組和十六進位編碼的位元組陣列。

**範例：**
```toml
[config.default]
price = 1000000

[config.default.owner]
bytes = "0000111122223333"
encoding = "hex"
```
```aiken
use config
fn main() { config.price }
```

**相關：** aiken.toml, 條件式模組 (conditional module), 環境 (environment)

## `const` (常量)

**定義：** 用於定義模組級常量的關鍵字。常量在編譯時會被完整求值，並由編譯器在使用處進行內聯。

**上下文：** 模組級關鍵字。可以容納幾乎任何 Aiken 表達式。常量不能引用在其之後定義的其他常量。

**範例：**
```aiken
const start_year = 2101
const seasons = ["Summer", "Autumn", "Winter", "Spring"]
```

**相關：** let, 編譯時期 (compile-time), 內聯 (inlining)

## Constructor (構造函數)

**定義：** 一個用於建立自定義類型值的命名函式。類型可以有一個構造函數（記錄）或多個構造函數（枚舉/ADT）。構造函數同時用於建立值和模式匹配。

**上下文：** 構造函數定義了類型的可能形狀。在 CBOR 中，第一個構造函數標籤從 121 開始。

**範例：**
```aiken
type User {
  LoggedIn { username: ByteArray }
  Guest
}
let user = LoggedIn { username: "alice" }
```

**相關：** 類型 (type), 模式匹配 (pattern matching), 枚舉 (enum), 記錄 (record), CBOR 標籤 (CBOR tag)

## Conway era (Conway 時代)

**定義：** 當前時代，引入了鏈上治理 (Voltaire)、Plutus V3 以及新的腳本目的（投票 `vote`、提議 `propose`）。

**相關：** 治理 (governance), vote, propose, Plutus V3, 憲法 (constitution)

## Data

**定義：** 一種不透明的複合型別，可以表示任何可能的用戶定義序列化型別。作為多態操作的萬用字元類型。任何自定義類型都可以轉換為 `Data`，而 `expect` 可以從 `Data` 向下轉型。

**上下文：** 對於驗證器邊界至關重要，因為 Datum 和 Redeemer 型別是通用的。有些內置函式僅適用於 `Data`。

**範例：**
```aiken
const anything: Data = 42
const also_data: Data = [True, False]

fn downcast(data: Data) -> RGB {
  expect d: RGB = data
  d
}
```

**相關：** expect, 序列化 (serialisation), CBOR, 自定義型別 (custom type)

## Datum

**定義：** 建立 UTxO 時附加在其上的資料負載。表示合約的狀態或配置。在執行期間提供給 `spend`（支出）驗證器。

**上下文：** Cardano 特有。在將價值鎖定於腳本地址時設置。僅支出目的腳本會收到 Datum。在 Aiken 處理程式中始終為 `Option<T>`，因為您無法強迫發送者務必包含 Datum。

**範例：**
```aiken
pub type VestingDatum {
  beneficiary: VerificationKeyHash,
  deadline: Int,
}
```

**相關：** redeemer, 腳本 (script), eUTxO, spend, Option

## Delegation credentials (委託憑證)

**定義：** 地址中的可選部分，控制權益委託和獎勵提取。與支付憑證類似，可以是驗證金鑰哈希或腳本哈希。

**上下文：** 控制哪個權益池接收委託，以及如何提取獎勵。

**相關：** 地址 (address), 權益 (stake), 提取 (withdrawal), 憑證 (credential), 權益池 (stake pool)

## Destructuring (解構)

**定義：** 透過在賦值左側鏡像值的構造語法來提取欄位。適用於記錄、元組、列表和自定義型別。

**上下文：** 存取內部值的語法便利性，無需使用點點運算符 (dot notation)。

**範例：**
```aiken
let Dog { name, cuteness, age } = dog
let (x, y) = point
let [head, ..tail] = list
```

**相關：** 模式匹配 (pattern matching), 記錄 (record), 展開運算符 (spread operator)

## Deterministic (確定性)

**定義：** 求值結果完全由其輸入決定的運算，沒有隨機性或外部狀態。Cardano 智慧合約是確定性的 —— 給定相同的交易，執行始終產生相同的結果。

**上下文：** 允許在將交易提交到網絡之前進行鏈下交易評估。

**相關：** 純函式 (pure function), 斷言 (predicate), eUTxO, 有效間隔 (validity interval)

## Documentation comment (文件註釋)

**定義：** 以 `///`（三斜槓）開頭的註釋，放置在定義之前以生成 HTML 文件。支援 Markdown、MathJax 和 Github 風格的警告標籤（如 `[!NOTE] ...`）。模組級別文件使用 `////`（四斜槓）。

**上下文：** 由 `aiken docs` 處理以生成 API 文件。

**範例：**
```aiken
/// 超時時間，以 **秒** 為單位。
const timeout: Int = 60
```

**相關：** aiken docs, 模組 (module), pub

## Double satisfaction (雙重滿足)

**定義：** 一種漏洞，即一個輸出支付在同一筆交易中滿足了多個驗證器的執行。當驗證器檢查支付但未確保輸入輸出唯一性時會發生。

**上下文：** 透過使用輸入的 OutputReference 作為內聯 Datum 對輸出進行標記來解決。

**相關：** 標記輸出 (tagged outputs), 驗證器 (validator), 安全性 (security)

## `else` (後備處理程式)

**定義：** `validator` 塊中的特殊處理程式，作為未處理腳本目的的通吃機制。接受單個 `ScriptContext` 參數。未明確定義時預設為 `fail`。

**上下文：** 驗證器關鍵字。當驗證器不需要處理所有六種目的時使用。

**範例：**
```aiken
validator my_script {
  mint(redeemer: Data, policy_id: PolicyId, self: Transaction) { todo }
  else(_ctx: ScriptContext) {
    fail @"unsupported purpose"
  }
}
```

**相關：** 驗證器 (validator), 處理程式 (handler), 目的 (purpose), ScriptContext

## Enum (枚舉)

**定義：** 具有多個構造函數的自定義型別，每個構造函數代表一個不同的變體。構造函數可以有欄位（如代數數據類型）或無欄位。

**上下文：** 用於 Redeemer 操作、狀態機以及任何具有不同案例的情況。

**範例：**
```aiken
pub type Action {
  Minting
  Burning
}
```

**相關：** 構造函數 (constructor), 模式匹配 (pattern matching), 代數數據類型 (algebraic data type)

## Environment (環境)

**定義：** 一個命名的建構配置（例如 `default`, `mainnet`, `testnet`），在建構時透過 `--env` 選擇。驅動條件式模組選擇和配置值解析。

**上下文：** `aiken build --env mainnet` 選擇特定於主網的模組和配置值。

**相關：** 配置模組 (config module), 條件式模組 (conditional module), aiken.toml

## Epoch (紀元)

**定義：** Cardano 中的固定時間段（目前為 5 天），在此期間權益委託處於活動狀態。獎勵在紀元邊界處計算和分配。

**上下文：** 權益快照、權益池表現和獎勵分配均以紀元週期運作。

**相關：** 插槽 (slot), 權益池 (stake pool), 獎勵 (reward), 委託 (delegation)

## eUTxO (擴展 UTxO)

**定義：** Cardano 對 UTxO 模型的擴展，增加了 Datum（附加在輸出上的狀態）和 Redeemer（支出時的用戶參數），從而在保留確定性的同時實現智慧合約邏輯。

**上下文：** 「擴展」部分是使智慧合約在 Cardano 上成為可能的關鍵。腳本充當參數化的斷言 (predicates)。

**相關：** UTxO, datum, redeemer, 腳本 (script), 確定性 (deterministic)

## `expect`

**定義：** 用於非窮舉模式匹配的關鍵字，如果模式不匹配則停止（失敗）。也用於布林斷言 —— `expect condition` 若為假則停止。

**上下文：** 錯誤處理關鍵字。在驗證器中解包 `Option` Datum 時至關重要。在 verbose 模式下生成自動追蹤。

**範例：**
```aiken
expect Some(datum) = optional_datum
expect sum >= 0
```

**相關：** fail, 模式匹配 (pattern matching), 追蹤 (trace), Option

## Expression (表達式)

**定義：** 任何求值為值的程式碼片段。在 Aiken 中，一切都是表達式 —— 沒有陳述式 (statements)。`if/else`、`when/is` 和代碼塊都返回一個值。

**上下文：** 核心函式式程式設計 (FP) 原則。函式返回最後一個表達式的值；沒有 `return` 關鍵字。

**相關：** 代碼塊 (block), 函式式程式設計 (functional programming), 純函式 (pure function)

## `fail` (關鍵字)

**定義：** 立即停止驗證器執行的關鍵字，導致驗證器拒絕該交易。可以包含選用訊息。不會產出編譯警告（與 `todo` 不同）。

**上下文：** 錯誤處理關鍵字。用於程式碼路徑應始終拒絕的情況。

**範例：**
```aiken
fn expect_some_value(opt: Option<a>) -> a {
  when opt is {
    Some(a) -> a
    None -> fail @"Expected a value but got None"
  }
}
```

**相關：** expect, todo, 驗證器 (validator), 斷言 (predicate)

## `fail` (註釋)

**定義：** 測試和基於屬性的測試的修飾註釋，預期該測試始終失敗。

**上下文：** 在編寫負面測試場景時非常方便，用於測試那些失敗且不返回結果的函式。Aiken 不支援異常 (exceptions) 及其捕獲機制。

**相關：** fail, 基於屬性的測試 (property-based test), 測試 (test)

## `fail once` (失敗一次)

**定義：** 基於屬性的測試的測試修飾符，預期屬性至少失敗一次。在第一次求值失敗時成功；如果所有 100 次求值都通過，則失敗。

**上下文：** 測試非屬性 (non-properties) —— 驗證某些輸入是否導致失敗。

**相關：** fail, 基於屬性的測試 (property-based test), 測試 (test)

## Finality (最終性)

**定義：** 交易在區塊鏈上變得不可更改且永久的點。與延遲 (latency) 不同（第一次出現在區塊中的時間）。取決於敵對權益的比例。

**上下文：** 對於敏感交易建議等待約 100-150 個區塊（30-50 分鐘）；對於小額支付則等待幾個區塊。

**相關：** 延遲 (latency), 區塊 (block), Ouroboros, 結算 (settment)

## First-class function (一等函式)

**定義：** 可以賦值給變數、作為參數傳遞以及從其他函式返回的函式 —— 像對待任何其他值一樣。

**上下文：** Aiken 函式是一等公民，但有一個例外：它們不能作為數據類型定義的一部分。

**範例：**
```aiken
fn twice(f: fn(t) -> t, x: t) -> t {
  f(f(x))
}
```

**相關：** 匿名函式 (anonymous function), 函式捕獲 (function capturing), 高階函式 (higher-order function)

## `fn`

**定義：** Aiken 中用於定義命名或匿名函式的關鍵字。函式是一等值，會隱式返回最後一個表達式的結果。

**上下文：** 核心語言關鍵字。Aiken 中所有的邏輯都透過函式表達。函式預設為私有。

**範例：**
```aiken
fn add(x: Int, y: Int) -> Int {
  x + y
}
```

**相關：** pub, let, 驗證器 (validator), 匿名函式 (anonymous function)

## Forwarding validation (轉發驗證)

**定義：** 一種模式，其中簡單的支出 (spending) 驗證器將邏輯委託給每筆交易執行一次的提款 (withdrawal) 腳本。透過避免在多個輸入中冗餘執行來降低成本。

**上下文：** 利用了提取 0 Lovelace 是有效的這一事實。在生產環境的 dApp 中用於預算優化。

**相關：** 提款 (withdrawal), 支出 (spend), 優化 (optimization), 驗證器 (validator)

## Function capturing (函式捕獲)

**定義：** 建立新函式的簡寫，透過使用 `_` 作為缺失參數的預留位置來部分應用現有函式。

**上下文：** 通常與管道運算符 (pipe operator) 一起使用以建立轉換流程。

**範例：**
```aiken
fn add(x, y) { x + y }
let add_one = add(1, _)
add_one(2)  // 3
```

**相關：** 管道運算符 (pipe operator), 匿名函式 (anonymous function), 部分應用 (partial application)

## Fuzzer

**定義：** 用於構建偽隨機值生成器的介面類型。在基於屬性的測試中用於生成測試輸入。使用來自 `aiken/fuzz` 的原語組合而成。

**上下文：** 測試類型。定義為 `Fuzzer<a>`，並在測試參數中透過 `via` 關鍵字引入。

**範例：**
```aiken
use aiken/fuzz

test prop_positive(n via fuzz.int()) {
  n * n >= 0
}
```

**相關：** 基於屬性的測試 (property-based test), PRNG, Sampler, via, 收縮 (shrinking)

## G1Element / G2Element / MillerLoopResult

**定義：** 特定於 BLS12-381 密碼學原語的型別。用作配對密碼學內置函式的操作數和返回值。

**上下文：** 進階密碼學。在 CIP-0381 中定義。用於零知識證明和進階簽章方案。

**相關：** 密碼學 (cryptography), 內置 (builtin), CIP-0381

## Generic type (泛型)

**定義：** 由一個或多個類型變數參數化的型別，使其能與任何具體類型配合使用。在尖括號中使用小寫類型參數表示。

**上下文：** 在標準函式庫 (List\<a\>, Option\<a\> 等) 和可重用的數據結構中廣泛使用。

**範例：**
```aiken
type Box<inner_type> {
  inner: inner_type,
}
let int_box: Box<Int> = Box(42)
```

**相關：** 類型 (type), Option, List, 類型參數 (type parameter)

## Genesis configuration (創世配置)

**定義：** 區塊鏈的初始狀態，定義了起始的 UTxO 集合。提供了所有後續交易流向的「第一批輸出」。

**上下文：** 解決了輸入需要先前輸出的先有雞還是先有蛋的問題。

**相關：** UTxO, 區塊鏈 (blockchain), 初始狀態 (initial state)

## Governance (治理)

**定義：** Conway 時代引入的鏈上決策機制。包括由委託代表對提案進行投票，受 `vote`（投票）和 `propose`（提案）腳本目的控制。

**上下文：** 憲法護欄腳本 (propose 目的) 可以程式化地拒絕提案。

**相關：** 投票 (vote), 提案 (propose), Conway 時代 (Conway era), 憲法 (constitution), DRep

## Hash digest (哈希摘要)

**定義：** 由加密哈希函式產出的固定大小輸出。用作區塊、交易、腳本和金鑰的防篡改標識符。Cardano 主要使用 Blake2b。

**上下文：** 交易 ID、策略 ID、憑證哈希均為哈希摘要。大多數事物為 32 位元組；憑證為 28 位元組。

**相關：** Blake2b, 策略 ID (policy ID), 地址 (address), 密碼學 (cryptography)

## `if/else`

**定義：** 求值布林條件並返回兩個分支之一的條件表達式。與命令式語言不同，Aiken 中的 `if` 是一個返回值的表達式。

**上下文：** 控制流關鍵字。每個分支必須返回相同型別的值。

**範例：**
```aiken
fn abs(x: Int) -> Int {
  if x < 0 { -x } else { x }
}
```

**相關：** when/is, Bool, 表達式 (expression)

## Immutable / Immutability (不可變性)

**定義：** 一旦建立值就無法更改的屬性。Aiken 中的所有值都是不可變的。新值是透過轉換而非變異來建立的。

**上下文：** 核心函式式程式設計 (FP) 原則。在列表前添加元素會建立一個新列表，而不改變原有的列表。

**相關：** let, 函式式程式設計 (functional programming), 純函式 (pure function)

## Inlining (內聯)

**定義：** 編譯器優化，將生成程式碼中的標識符引用替換為其具體值。Aiken 中的所有 `const` 值都會被內聯。

**上下文：** 使常量在運行時成本為零 —— 它們被字面量值替換。有時也作為短波函式的優化啟發式方法。

**相關：** const, 編譯時期 (compile-time), 優化 (optimization)

## Input (輸入)

**定義：** 對先前 UTxO 的引用，由建立它的交易哈希以及輸放在該交易中的位置標識。支出輸入會銷毀所引用的 UTxO。

**上下文：** 輸入使得每個 UTxO 只能被支出一次。交易 ID + 輸出索引的組合是唯一的。

**相關：** UTxO, 輸出 (output), OutputReference, 交易 (transaction)

## Int (整數)

**定義：** 任意大小的整數型別，沒有下溢或上溢問題。支援十進位、二進位 (`0b`)、八進位 (`0o`) 和十六進位 (`0x`) 字面量，加上 `_` 分隔符。

**上下文：** Aiken 中唯一的數字型別。涵蓋所有數字需求，包括 Lovelace 價值。

**範例：**
```aiken
let amount = 1_000_000
let flags = 0b00001111
let hex_val = 0xFF
```

**相關：** ByteArray, 算術運算符 (arithmetic operators)

## Labeled arguments (具名參數)

**定義：** 可以透過標籤而非位置傳遞的函式參數。透過在函式簽名中給出參數名稱來定義。

**上下文：** 提高具有多個參數的函式的可讀性。標籤可以在函式主體中被覆蓋。

**範例：**
```aiken
fn replace(self: String, pattern: String, replacement: String) { ... }
replace(pattern: @",", replacement: @" ", self: @"A,B,C")
```

**相關：** fn, 命名參數 (named arguments)

## Labelling (標記)

**定義：** 基於屬性的測試中的一種機制，用於追蹤隨機測試期間探索了哪些路徑。使用 `fuzz.label()` 標記執行；分佈情況會顯示在測試報告中。

**上下文：** 用於驗證 Fuzzer 的正確性並確保充足的路徑覆蓋範圍。

**相關：** 基於屬性的測試 (property-based testing), Fuzzer, fuzz.label

## Language Server Protocol (LSP)

**定義：** 一種用於編輯器智慧功能（補全、診斷、跳轉到定義）的協議。Aiken 的 CLI 包含一個內置的 LSP 伺服器，透過 `aiken lsp` 調用。

**上下文：** 使用根模式 `aiken.toml` 和檔案類型 `.ak` 進行配置。

**相關：** 編輯器整合 (editor integration), aikup, 自動補全 (auto-completion)

## Language tag / Discriminator byte (語言標籤)

**定義：** 在哈希之前添加到腳本的起始位元組，用以區分腳本語言。原生 (Native) = `0x00`, Plutus V1 = `0x01`, V2 = `0x02`, V3 = `0x03`。

**上下文：** 解釋了為什麼對原始腳本進行哈希產生的結果與實際的策略 ID 不同。

**相關：** 策略 ID (policy ID), 腳本哈希 (script hash), 哈希摘要 (hash digest)

## `let`

**定義：** 用於聲明區域變數綁定的關鍵字。分配給 let 綁定的值是不可變的，但新的綁定可以遮蔽 (shadow) 先前的綁定。

**上下文：** 核心語言關鍵字。不能在模組的頂層使用 —— 模組級別的值請使用 `const`。

**範例：**
```aiken
let x = 1
let y = x
let x = 2  // 遮蔽了先前的 x
// y + x == 3
```

**相關：** const, 遮蔽 (shadowing), 不可變 (immutable)

## List (列表)

**定義：** 所有元素必須為相同型別的有序值集合。以鏈表形式實現。在前面添加元素 (`[x, ..rest]`) 很快；在末端追加則很慢。

**上下文：** Aiken 中最常見的數據結構之一。用於交易輸入、輸出、簽署者等。

**範例：**
```aiken
let numbers: List<Int> = [1, 2, 3, 4]
let extended = [0, ..numbers]  // [0, 1, 2, 3, 4]
```

**相關：** Pair, Pairs, 模式匹配 (pattern matching), 鏈表 (linked list)

## Lovelace

**定義：** Ada 的最小不可分割單位。1 Ada = 1,000,000 Lovelace。以 Ada Lovelace 命名。

**上下文：** 鏈上價值始終以 Lovelace 表示，而非 Ada。

**相關：** Ada, 價值 (value), Int

## Minting policy (鑄造策略)

**定義：** 控制用戶定義資產的建立 (minting) 和銷毀 (burning) 的腳本。策略的哈希成為這些資產的 PolicyId（策略 ID）。

**上下文：** Cardano 特特有。具有 `mint` 處理程式的驗證器。單次鑄造策略可確保唯一性。

**相關：** PolicyId, mint, burn, NFT, 單次鑄造 (one-shot minting)

## Multivalidator (多重驗證器)

**定義：** Aiken 中的單個 `validator` 代碼塊，包含多種目的（例如同時包含 `mint` 和 `spend`）的處理程式。所有處理程式共享相同的腳本哈希。

**上下文：** 當鑄造和支出邏輯需要引用相同的腳本哈希時（例如狀態執行緒代幣 STT）非常有用。

**相關：** 驗證器 (validator), 處理程式 (handler), 目的 (purpose), 腳本哈希 (script hash)

## Native script (原生腳本)

**定義：** Plutus 之前的一種極簡腳本語言，具有 6 個構造函數：金鑰、全部符合 (all-of)、任一符合 (any-of)、m 中符合 n 個 (n-of-m)、之後、之前。目前仍然存在且可用於多重簽名地址。

**上下文：** 也稱為「第一階段腳本 (phase-1 scripts)」。比 Plutus 腳本簡單但表達力較低。

**相關：** 多重簽章 (multisig), 腳本 (script), 第一階段驗證 (phase-1 validation)

## Never

**定義：** 具有同名單個構造函數的型別。在序列化中與 `None` 相同。用於只能是 `None` 的 `Option` 值。

**上下文：** 由於歷史帳本錯誤需要向後相容而存在。

**範例：**
```aiken
let some: Data = None
let never: Data = Never
some == never  // True
```

**相關：** Option, None, 向後相容 (backward compatibility)

## NFT (非同質化代幣)

**定義：** 獨特且不可分割的代幣 —— 在給定策略下，存在恰好 1 單位且具有唯一資產名稱。使用單次鑄造策略建立以保證唯一性。

**上下文：** 透過使鑄造策略不可重複（消耗特定的 UTxO）來強制執行。

**相關：** 鑄造策略 (minting policy), 單次鑄造 (one-shot minting), PolicyId, 資產 (asset)

## One-shot minting policy (單次鑄造策略)

**定義：** 一種使用 `OutputReference` 作為參數的鑄造策略，要求消耗對應的 UTxO。由於 UTxO 只能被支出一次，這保證了該策略最多驗證通過一次。

**上下文：** 在 Cardano 上建立 NFT 和獨特代幣的標準模式。

**相關：** 鑄造策略 (minting policy), OutputReference, NFT, 驗證器參數 (validator parameters)

## `opaque` (不透明)

**定義：** `pub type` 的修飾符，導出型別但對外部模組隱藏其內部的構造函數和欄位。外部程式碼可以使用該類型，但不能直接構造或解構它。

**上下文：** 模組封裝關鍵字。用於透過控制型別訪問來強制執行不變量。使得該類型不可序列化。

**範例：**
```aiken
pub opaque type Counter {
  inner: Int,
}
```

**相關：** 類型 (type), pub, 模組 (module), 封裝 (encapsulation)

## Option (選項)

**定義：** 具有兩個構造函數的泛型型別：`Some(a)` 表示存在值，`None` 表示缺失值。內置於 prelude 中；無需導入。

**上下文：** 可能不產出結果的函式的核心模式。支出處理程式始終接收 `Option<Datum>`。

**範例：**
```aiken
fn get_head(xs: List<a>) -> Option<a> {
  when xs is {
    [] -> None
    [head, ..] -> Some(head)
  }
}
```

**相關：** None, Some, Never, expect, when/is

## Ordering (排序)

**定義：** 具有三個構造函數的型別：`Less` (小於)、`Equal` (等於)、`Greater` (大於)。用於比較兩個相同型別的值。標準函式庫為各種型別提供了 `compare` 函式。

**上下文：** 用於比較操作的公用型別。

**相關：** bytearray.compare, 相等性 (equality)

## Ouroboros

**定義：** Cardano 使用的權益證明 (PoS) 共識演算法系列。目前的變元是 Ouroboros Praos。決定了區塊生產和結算最終性。

**上下文：** 定義了權益委託與區塊生產概率之間的關係。

**相關：** 權益池 (stake pool), 紀元 (epoch), 插槽 (slot), 最終性 (finality), Ada

## Output (輸出)

**定義：** 交易中的一個物件，描述了價值（資產數量）、地址（支出條件），以及選用的 Datum（數據負載）和腳本引用。一旦交易確認，輸出就成為 UTxO。

**上下文：** 新的輸出由交易建立。它們像新貼上去的便利貼一樣「出現」。

**相關：** UTxO, 輸入 (input), 地址 (address), 價值 (value), datum

## OutputReference (輸出引用)

**定義：** UTxO 的唯一標識符，由交易 ID（哈希）和輸出索引（位置）組成。用作 `spend`（支出）處理程式的目標類型。

**上下文：** 保證唯一性 —— 對於單次鑄造策略至關重要。型別：`OutputReference { transaction_id: ByteArray, output_index: Int }`。

**相關：** 輸入 (input), UTxO, 單次鑄造 (one-shot minting), spend

## Pair (鍵值對)

**定義：** 用於兩個可能不同型別值的一種特定型別：`Pair<a, b>`。與 2-tuple 不同，因為 `List<Pair<a, b>>` 會序列化為 CBOR 映射 (Map)（而非陣列的陣列）。元素可透過 `.1st` 和 `.2nd` 存取。

**上下文：** 在 Cardano 帳本型別內部使用。僅當您特別需要 CBOR 映射序列化時才使用 Pair；否則請優先選用 2-tuple。

**範例：**
```aiken
let foo = Pair(14, "aiken")
foo.1st == 14
```

**相關：** 元組 (Tuple), Pairs, CBOR, 序列化 (serialisation)

## Pairs (鍵值對列表)

**定義：** `List<Pair<a, b>>` 的型別別名 —— 一種關聯列表 (associative list)。序列化為 CBOR 映射 (Map)。

**上下文：** 在腳本上下文中很常見。標準函式庫提供了一個專門的模組，包含用於關聯列表的輔助函式。

**相關：** Pair, List, dict, CBOR 映射 (CBOR map)

## Pattern matching (模式匹配)

**定義：** 一種檢查值的形狀並提取其組件的機制。使用 `when/is` 進行多分支匹配，並使用 `expect` 進行單模式斷言。

**上下文：** Aiken 的核心用法。編譯器強制執行窮舉性驗證 —— 每一種可能的模式都必須被處理。

**相關：** when/is, expect, 解構 (destructuring), 萬用字元 (wildcard), 構造函數 (constructor)

## Payment credentials (支付憑證)

**定義：** 地址中定義支出條件的部分。有兩種形式：驗證金鑰哈希（需要簽章）或腳本哈希（驗證器不得報錯）。

**上下文：** 腳本地址使用腳本哈希，從而實現任意的驗證邏輯。

**相關：** 地址 (address), 驗證金鑰 (verification key), 腳本哈希 (script hash), 憑證 (credential)

## Phase-1 validation (第一階段驗證)

**定義：** 在腳本執行前由帳本執行的結構性檢查。包括驗證輸入引用、最小手續費、有效間隔以及所需的簽章。

**上下文：** 如果第一階段失敗，則不會執行任何腳本，也不會收取手續費。第二階段即為腳本執行。

**相關：** 第二階段驗證 (phase-2 validation), 有效間隔 (validity interval), 交易 (transaction)

## Phase-2 validation (第二階段驗證)

**定義：** 鏈上腳本（驗證器）的執行。在第一階段通過後發生。交易中的所有腳本都不得報錯，該交易才有效。

**上下文：** 如果第二階段失敗，則會消耗抵押品 (collateral)，但不會發生任何狀態更改。

**相關：** 第一階段驗證 (phase-1 validation), 驗證器 (validator), 腳本 (script), 抵押品 (collateral)

## `|>` (管道運算符 / Pipe operator)

**定義：** 透過將左側表達式的結果作為第一個參數傳遞給右側函式來鏈接函式調用的運算符。提高了順序轉換的可讀性。

**上下文：** 函式式程式設計慣用法。在 Aiken 中廣泛用於數據轉換流程。鼓勵定義函式時將主要參數放在首位（類似於 `self` 引用）。

**範例：**
```aiken
fn transform(x) {
  x
  |> add(_, 3)
  |> multiply(_, 2)
}
```

**相關：** 函式捕獲 (function capturing), 回傳語法 (backpassing), 函式式程式設計 (functional programming)

## Plutus blueprint (Plutus 藍圖)

**定義：** 由 `aiken build` 生成的符合 CIP-0057 的 JSON 檔案 (`plutus.json`)。包含編譯後的 UPLC 程式碼、用於地址計算的哈希摘要，以及 Datum/Redeemer 的結構定義。

**上下文：** 與框架無關的互操作格式。從 Aiken 類型定義自動生成。

**相關：** aiken build, UPLC, CIP-0057, 驗證器 (validator), 哈希摘要 (hash digest)

## Plutus Core

**定義：** Cardano 鏈上智慧合約語言的正式名稱。在坊間，「Plutus」可能指 Plutus Core（虛擬機語言）、PlutusTx（Haskell 框架）或廣義的 Plutus 平台。

**上下文：** Aiken 是多種編譯為（無類型）Plutus Core 的語言之一。

**相關：** UPLC, PlutusTx, 虛擬機 (virtual machine), Aiken

## PlutusTx

**定義：** 一個使用 GHC 編譯器插件將 Haskell 程式碼轉換為 UPLC 的 Haskell 框架。經常與廣義的「Plutus」混淆。現在也稱為「Plinth」。

**上下文：** 使用 Haskell 工具鏈 (GHC)，但在運行時並非真正的 Haskell —— 它會編譯為 UPLC。

**相關：** Plutus Core, UPLC, Aiken, Haskell

## PolicyId (策略 ID)

**定義：** 鑄造策略腳本的哈希摘要。標識一組特定的用戶定義資產。用作 `mint`（鑄造）處理程式的目標類型。

**上下文：** 與腳本哈希相同，因為鑄造策略本質上就是腳本。長度為 28 位元組。

**相關：** 鑄造 (mint), 腳本哈希 (script hash), 資產 (asset), 代幣 (token), NFT

## Predicate (斷言)

**定義：** 回傳布林值（True 或 False）的函式。驗證器就是斷言 —— 它們決定了一項交易操作是否被允許。

**上下文：** Cardano 智慧合約的核心概念。所有驗證器處理程式都是斷言。

**相關：** 驗證器 (validator), Bool, 確定性 (deterministic)

## Prelude

**定義：** 無需導入即可自動在所有 Aiken 專案中使用的內置模組。包含核心類型（`Bool`, `Option`, `Ordering`, `Void`, `Data`, `Never`）和基本構造函數。

**上下文：** 發佈於 `aiken-lang/prelude` 並附有 HTML 文件。

**相關：** stdlib, 模組 (module), 內置 (built-in)

## PRNG (偽隨機數生成器)

**定義：** 偽隨機數生成器。基於屬性的測試框架內部使用的一種不透明類型，用於產出隨機測試值。

**上下文：** 內部型別，但在 prelude 中可選用。用戶通常透過 `Fuzzer` 介面間接與其交互。

**相關：** Fuzzer, 基於屬性的測試 (property-based test), aiken/fuzz

## Property-based testing (基於屬性的測試)

**定義：** 一種測試方法，透過生成隨機輸入來檢查一般屬性，而非特定案例。Aiken 的整合框架包含自動收縮功能，以尋找最小的反例。

**上下文：** Aiken 中的一等公民。透過 `via` 關鍵字使用 `Fuzzer`。

**相關：** Fuzzer, 收縮 (shrinking), 測試 (test), via, aiken/fuzz

## `pub`

**定義：** 關鍵字，使得函式、型別或常量在其定義模組之外可以被公開存取。若無 `pub`，定義預設為私有的。

**上下文：** 模組系統關鍵字。對於您希望導出供其他模組使用的任何定義都是必需的。

**範例：**
```aiken
pub fn public_function(x: Int) -> Int {
  x * 2
}

pub type Action {
  Minting
  Burning
}
```

**相關：** fn, 模組 (module), use, 型別 (type)

## Pure function (純函式)

**定義：** 輸出僅取決於輸入且沒有副作用的函式。Aiken 中的所有函式，特別是驗證器，均為純函式。對於驗證器而言：給定相同的交易，它們始終產出相同的結果。

**上下文：** 核心函式式程式設計 (FP) 概念。確保了智慧合約的確定性執行。

**相關：** 確定性 (deterministic), 斷言 (predicate), 驗證器 (validator), 表達式 (expression)

## Receipt pattern (收據模式)

**定義：** 一種鑄造模式，建立一個唯一的代幣，其資產名稱源自第一個輸入的 `OutputReference`（透過其 CBOR 序列化的 `blake2b_256`）。確保每筆交易產生一個收據。

**上下文：** 作為單次鑄造的另一種選擇，用於實現每筆交易的唯一性，而非全局唯一性。

**相關：** 單次鑄造 (one-shot minting), blake2b, cbor.serialise

## Record (記錄)

**定義：** 具有單個構造函數和命名欄位的自定義型別。欄位使用點點運算符存取。

**上下文：** 用於結構化 Datum 型別、配置以及任何具有命名欄位的型別化資料。

**範例：**
```aiken
type Dog {
  name: ByteArray,
  cuteness: Int,
  age: Int,
}
let d = Dog { name: "Bob", cuteness: 100, age: 3 }
d.name  // "Bob"
```

**相關：** 構造函數 (constructor), 解構 (destructuring), 型別 (type), 自定義型別 (custom type)

## Recursion (遞迴)

**定義：** 函式調用自身，透過將問題分解為更小的子問題來解決。Aiken 中主要的循環機制，因為沒有 `for`/`while` 循環。

**上下文：** 對於迭代列表、樹狀結構及任何重複運算都至關重要。匿名函式不可遞迴。

**範例：**
```aiken
fn factorial(n: Int) -> Int {
  if n <= 1 { 1 } else { n * factorial(n - 1) }
}
```

**相關：** list, 函式式程式設計 (functional programming), 尾遞迴 (tail recursion)

## Redeemer

**定義：** 在交易中為任何腳本執行提供的一段資料。作為用戶向驗證器提供的參數或操作指令。與 Datum 不同，Redeemer 是在支出時而非建立時提供的。

**上下文：** Cardano 特有。每個處理程式都會收到一個 Redeemer。每個處理程式都可以定義其專屬的 Redeemer 型別。

**範例：**
```aiken
pub type SpendAction {
  Claim
  Cancel
}
```

**相關：** datum, 腳本 (script), eUTxO, 驗證器 (validator), 處理程式 (handler)

## Sampler

**定義：** 用於基準測試的函式類型 `fn(Int) -> Fuzzer<a>`。接受一個大小參數並返回一個 Fuzzer，允許輸入複雜度隨著每次基準測試迭代而增長。

**上下文：** 基準測試類型。在 `bench` 定義中透過 `via` 引入。

**相關：** Fuzzer, bench, via

## Script (腳本)

**定義：** 將驗證邏輯定義為斷言函式的鏈上程式碼。必須返回 True 才能允許守衛的操作之執行。也稱為「驗證器 (validator)」。

**上下文：** 腳本作為交易中的見證人 (witnesses)，與任何所需的 Datum 和 Redeemer 一起提供。腳本是完全確定性的。

**相關：** 驗證器 (validator), 斷言 (predicate), 見證人 (witness), 目的 (purpose), Plutus Core

## Script purpose (腳本目的)

**定義：** 腳本被執行的原因。Cardano 有六種目的：`mint`（鑄造）、`spend`（支出）、`withdraw`（提款）、`publish`（發佈）、`vote`（投票）、`propose`（提案）。與交易和 Redeemer 一起傳遞給腳本。

**上下文：** 僅 `spend` 會收到 Datum。每種目的都有不同的目標型別。

**相關：** 處理程式 (handler), 驗證器 (validator), mint, spend, withdraw, publish, vote, propose

## ScriptContext (腳本上下文)

**定義：** 提供給驗證器的完整執行上下文，包含交易、腳本目的以及特定於目的的資料。在 Aiken 中，處理程式會自動對其進行解構。

**上下文：** 後備處理程式 `else` 接收原始的 ScriptContext。標準處理程式則接收預先提取的組件。

**相關：** Transaction, 目的 (purpose), 處理程式 (handler), 驗證器 (validator)

## Serialisation (序列化)

**定義：** 將結構化值轉換為二進位（如 CBOR）表示法的過程，以便鏈上儲存或網絡傳輸。其反向過程為反序列化 (deserialisation)。也稱為「封送 (marshalling)」。

**上下文：** 在驗證器邊界，Aiken 型別均為 `Data`，其序列化為 CBOR。同一邏輯值可能存在多種有效的序列化形式。

**相關：** CBOR, Data, 反序列化 (deserialisation), 藍圖 (blueprint)

## Shadowing (遮蔽)

**定義：** 重新使用已聲明的標識符（例如透過 `let` 或函式參數引入）來代表一個新值，使得原有值在當前作用域中無法存取（被遮蔽）。原有值本身並未改變。

**上下文：** 在函式式程式設計中很常見。與變異 (mutation) 不同 —— 原有的綁定仍然存在，只是無法再透過名稱觸及。

**相關：** let, 不可變 (immutable)

## Shelley era (Shelley 時代)

**定義：** 引入當前地址格式、權益委託和去中心化區塊生產的時代。

**相關：** 地址 (address), 委託 (delegation), 權益池 (stake pool), Byron 時代 (Byron era)

## Shrinking (收縮)

**定義：** 在基於屬性的測試期間，自動簡化所發現反例的過程，以找出仍會導致失敗的最小輸入。整合在 Aiken 的框架中 —— 無需手動定義收縮規則。

**上下文：** 例如，如果 `[-2, 441, 7863]` 失敗，框架可能會將其收縮為 `[-1]`。

**相關：** 基於屬性的測試 (property-based testing), Fuzzer, 反例 (counterexample)

## Slot (插槽)

**定義：** Cardano 共識協議中最小的時間單位。每個插槽為 1 秒，可能包含也可能不包含區塊。

**上下文：** 區塊生產是概率性的 —— 並非每個插槽都會產生區塊（區塊之間平均約 20 秒）。

**相關：** 區塊 (block), 紀元 (epoch), 有效間隔 (validity interval)

## Spread operator (`..` / 展開運算符)

**定義：** 用於模式中，表示忽略剩餘的欄位或列表元素。在列表模式中可以命名以捕獲尾部元素。

**上下文：** 當您只需要記錄中的一部分欄位或列表的頭部時非常有用。

**範例：**
```aiken
let Dog { name, .. } = dog
let [head, ..tail] = my_list
```

**相關：** 解構 (destructuring), 萬用字元 (wildcard), 列表 (list)

## Stake pool (權益池)

**定義：** Cardano 上參與區塊生產的註冊實體，透過 Ouroboros 共識協議運行。委託人將其權益分配給權益池，以換取獎勵分成。

**上下文：** 權益委託受地址中的委託憑證控制。

**相關：** 委託憑證 (delegation credentials), 權益 (stake), 獎勵 (reward), 紀元 (epoch)

## Standard library (stdlib / 標準函式庫)

**定義：** 由 Aiken 社群維護的實用函式和數據結構庫 (`aiken-lang/stdlib`)。涵蓋列表、字典、數學、加密、交易型別、資產、地址等。

**上下文：** 由 `aiken new` 自動添加。是編寫良好的 Aiken 程式碼極佳的參考。

**相關：** prelude, aiken/fuzz, 依賴項目 (dependency), aiken.toml

## State Thread Token (STT / 狀態執行緒代幣)

**定義：** 一種用於跨交易追蹤可變狀態的 NFT。該代幣始終被轉發到具有更新後 Datum 的新輸出，從而建立一條狀態變更的「執行緒」。

**上下文：** 用於計數器、註冊表和任何鏈上狀態機的常見模式。

**相關：** NFT, 單次鑄造 (one-shot minting), datum, 多重驗證器 (multivalidator)

## String (字串)

**定義：** UTF-8 文字類型，帶有 `@` 前綴。專門用於追蹤 (tracing) 和除錯 —— 不用於鏈上資料或驗證器介面。

**上下文：** 使用場景狹窄。帶有一組有限的原語。對於鏈上資料，請始終改用 ByteArray。

**範例：**
```aiken
let greeting: String = @"Hello, Aiken!"
trace @"Debug message"
```

**相關：** ByteArray, 追蹤 (trace), UTF-8

## Tagged outputs (標記輸出)

**定義：** 標有唯一標識符（通常是輸入的 `OutputReference` 作為內聯 Datum）的輸出，用以防止雙重滿足。每個驗證器執行只能「聲索」帶有其专属標記的輸出。

**上下文：** 雙重滿足漏洞的解決方案。

**相關：** 雙重滿足 (double satisfaction), OutputReference, 內聯 Datum (inline datum)

## `test` (測試)

**定義：** 用於定義單元測試的關鍵字。測試是具名函式，沒有參數且返回 Bool 或 Void。它們在與鏈上合約相同的虛擬機上執行。

**上下文：** 測試關鍵字。使用 `aiken check` 執行。測試還透過報告記憶體/CPU 執行單位來兼任基準測試。

**範例：**
```aiken
test simple_addition() {
  let result = 2 + 3
  result == 5
}
```

**相關：** 基於屬性的測試 (property-based test), fuzzer, bench (基準測試), aiken check

## `todo`

**定義：** 像 `fail` 一樣停止執行，但額外會產出一個編譯警告。在開發過程中用作未完成邏輯的預留位置。

**上下文：** 開發關鍵字。提醒您尚有不完整的程式碼路徑。同時在錯誤訊息中提供預留位置的預期型別，因此可用於除錯複雜型別。

**範例：**
```aiken
fn favourite_number() -> Int {
  todo @"Implement this later"
}
```

**相關：** fail, expect

## `trace` (追蹤)

**定義：** 在驗證器執行期間用於記錄除錯訊息的關鍵字。可接受變長參數 —— 接受一個標籤和任意數量的可序列化值。追蹤訊息由虛擬機收集，並在測試或模擬期間顯示。

**上下文：** 除錯關鍵字。在 `aiken build` 時預設移除；在 `aiken check` 時預設保留。

**範例：**
```aiken
fn is_even(n: Int) -> Bool {
  trace @"checking": n
  n % 2 == 0
}
```

**相關：** ? 運算符, 故障排除 (troubleshooting), CBOR 診斷 (CBOR diagnostic), 追蹤級別 (trace level)

## Trace level (追蹤級別)

**定義：** 控制追蹤輸出的建構/檢查選項：`silent`（無追蹤）、`compact`（僅標籤）或 `verbose`（包含值的完整追蹤）。

**上下文：** 追蹤會增加程式碼大小並改變驗證器哈希。正式生產版本請使用 `silent`。

**相關：** trace, ? 運算符, aiken build, aiken check

## `?` (若為假則追蹤運算符)

**定義：** 附加在任何布林表達式後的後置運算符，僅當表達式評估為 `False` 時才生成追蹤。對於除錯條件的與 (conjunctions) / 或 (disjunctions) 非常有用。

**上下文：** 除錯運算符。受 `--trace-level` 選項影響。

**範例：**
```aiken
must_say_hello? && must_be_signed?
// 如果 must_be_signed 為 False，追蹤顯示："must_be_signed ? False"
```

**相關：** trace, 驗證器 (validator), and/or

## Transaction (交易)

**定義：** 更改區塊鏈狀態的基本原語。包含輸入（對現有 UTxO 的引用）、輸出（要建立的新 UTxO）以及其他欄位，如鑄造、憑證、提款和有效間隔。必須是原子性的 —— 成敗一舉。

**上下文：** 每個驗證器處理程式的最後一個參數都是 `Transaction`。提供完整的執行上下文。

**相關：** UTxO, 輸入 (input), 輸出 (output), 驗證器 (validator), 區塊 (block)

## Tuple (元組)

**定義：** 值的固定大小分組，每個元素可以具有不同型別。使用序數語法（`.1st`, `.2nd`, `.3rd`, `.4th`）存取元素。不建議超過 3 個元素 —— 此時應改用記錄 (records)。

**上下文：** 快速的匿名資料分組。序列化為 CBOR 陣列。

**範例：**
```aiken
let point: (Int, Int) = (14, 42)
let x = point.1st  // 14
```

**相關：** Pair, 記錄 (record), 自定義型別 (custom type)

## `type` (型別)

**定義：** 用於定義自定義數據類型的關鍵字，包括記錄、枚舉以及泛型代數數據類型。也用於型別別名。

**上下文：** 核心語言關鍵字。自定義型別是結構化 Datum、Redeemer 和合約狀態的主要方式。

**範例：**
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

**相關：** 構造函數 (constructor), 記錄 (record), 枚舉 (enum), 泛型 (generic), 別名 (alias)

## Type alias (型別別名)

**定義：** 現有型別表達式的新名稱。不會建立新類型 —— 僅作為簡寫。

**上下文：** 提高複雜型別組合的可讀性。

**範例：**
```aiken
type CartesianCoordinates = (Int, Int)
type VerificationKeyHash = Hash<Blake2b_224, VerificationKey>
```

**相關：** 型別 (type), 泛型 (generic)

## Type annotation (型別註釋)

**定義：** 對值或函式型別的顯式聲明。雖然由於類型推斷而是選用的，但註釋可作為文件並儘早發現錯誤。

**上下文：** 函式簽名和公共 API 的最佳實踐。

**範例：**
```aiken
fn add(x: Int, y: Int) -> Int { x + y }
const name: ByteArray = "Aiken"
```

**相關：** 類型推斷 (type inference), fn, const

## Type inference (類型推斷)

**定義：** 編譯器自動確定類型而無需顯式註釋的能力。Aiken 可以推斷所有類型，使得註釋成為選用（但為了文件化仍建議使用）。

**上下文：** Aiken 具有完整的類型推斷。帶註釋與不帶註釋的程式碼同樣安全。

**範例：**
```aiken
fn add_inferred(a, b) { a + b }  // 編譯器推斷為 Int -> Int -> Int
```

**相關：** 型別註釋 (type annotation), 靜態型別 (static typing), 泛型 (generic)

## Untyped Plutus Core (UPLC / 無型別 Plutus Core)

**定義：** 基於 λ 演算的低階語言，是 Cardano 虛擬機實際執行的語言。所有智慧合約語言均編譯為 UPLC。具有 7 種原語型別和內置函式。

**上下文：** Aiken 編譯為 UPLC。了解 UPLC 有助於故障排除和優化。

**相關：** Plutus Core, 虛擬機 (virtual machine), 編譯 (compile), aiken build

## `use`

**定義：** 將模組、型別和函式導入當前作用域的關鍵字。支援限定導入 (qualified)、非限定導入 (unqualified) 和別名導入 (aliased)。

**上下文：** 模組系統關鍵字。用於檔案頂端，將外部定義引入作用域。

**範例：**
```aiken
use aiken/collection/list
use aiken/collection/list.{at}
use aiken/collection/list as my_list
```

**相關：** 模組 (module), pub, 導入 (import)

## UTxO (未支出交易輸出)

**定義：** 先前交易中尚未被消耗（支出）的輸出。UTxO 是 Cardano 狀態的基本單位 —— 區塊鏈狀態即為所有現存 UTxO 的集合。

**上下文：** 將 UTxO 想像成牆上的便利貼。每一張都有價值和地址。支出一個 UTxO 會將其銷毀並建立新的。每個 UTxO 只能被支出一次。

**相關：** eUTxO, 輸入 (input), 輸出 (output), 交易 (transaction), 地址 (address)

## `validator` (驗證器)

**定義：** 在定義一個命名代碼塊的關鍵字，其中包含一個或多個對應於 Cardano 腳本目的的處理程式函式。驗證器是鏈上智慧合約邏輯的進入點。

**上下文：** 智慧合約的核心 Aiken 關鍵字。驗證器就是斷言 —— 它們返回 True（允許）或 False/失敗（拒絕）。

**範例：**
```aiken
validator hello_world {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _ref: OutputReference, self: Transaction) {
    todo @"logic here"
  }
  else(_) { fail }
}
```

**相關：** 處理程式 (handler), 目的 (purpose), datum, redeemer, Transaction

## Validity interval (有效間隔)

**定義：** 交易中選用的時間窗口（下限和/或上限），在第一階段驗證期間檢查。腳本可以假定交易在該間隔內，從而實作與時間相關的邏輯而不會破壞確定性。

**上下文：** 為確定性腳本引入時間概念。間隔可以窄至一秒。

**相關：** 第一階段驗證 (phase-1 validation), 確定性 (deterministic), 插槽 (slot), POSIXTime

## Value (價值)

**定義：** UTxO 中持有的資產數量。包括 Ada 以及選用的用戶定義代幣，每一種都由 PolicyId 和資產名稱標識。

**上下文：** 交易必須平衡 —— 總輸入價值必須等於總輸出價值（加上手續費）。

**相關：** Ada, 資產 (asset), PolicyId, 輸出 (output)

## `via`

**定義：** 在基於屬性的測試和基準測試中使用的關鍵字，用以引入 `Fuzzer` 或 `Sampler` 來生成隨機測試輸入。

**上下文：** 測試註釋關鍵字。直接將生成器與測試參數關聯起來。

**範例：**
```aiken
test prop_commutative((a, b) via fuzz.both(fuzz.int(), fuzz.int())) {
  a + b == b + a
}
```

**相關：** Fuzzer, Sampler, 基於屬性的測試 (property-based test), 基準測試 (bench)

## Virtual machine (虛擬機)

**定義：** 在鏈上解釋 UPLC 程式碼的執行環境。在主 Cardano 節點中以 Haskell 實作，在 Aiken 中則以 Rust 實作。

**上下文：** 兩種實作方式執行相同的 UPLC 程式之結果皆相同。Aiken 的測試在同一個虛擬機上運行。

**相關：** UPLC, Plutus Core, 確定性 (deterministic)

## Void (空型別)

**定義：** 代表零參數構造函數（無值）的型別。`Void` 既是型別也是構造函數。等同於零元素元組。

**上下文：** 由於 Aiken 中一切都是型別化表達式，因此較少直接需要。偶爾用作返回類型。

**相關：** Never, Option, 表達式 (expression)

## `when/is`

**定義：** 模式匹配表達式，檢查值並根據其形狀執行不同分支。必須是窮舉性的 —— 所有的構造函數都必須被處理。

**上下文：** 核心控制流關鍵字。Aiken 中分支邏輯的主要機制。

**範例：**
```aiken
fn describe(opt: Option<Int>) -> String {
  when opt is {
    Some(value) -> @"Has a value"
    None -> @"Empty"
  }
}
```

**相關：** 模式匹配 (pattern matching), 萬用字元 (wildcard), 解構 (destructuring), 構造函數 (constructor)

## Wildcard (萬用字元)

**定義：** 以 `_`（或任何以 `_` 開頭的標識符）表示的模式，匹配任何值而不將其綁定到名稱。在不需要某個值時用於模式匹配。

**上下文：** 謹慎使用 —— 優先選擇明確的模式，因為萬用字元會隱藏未來可能新增的構造函數。

**範例：**
```aiken
when user is {
  LoggedIn { username } -> username
  _ -> "Guest"  // 捕獲所有其餘情況
}
```

**相關：** 模式匹配 (pattern matching), when/is, 展開運算符 (spread operator)

## Withdrawal (提款)

**定義：** 一個交易欄位，用於將累積的權益獎勵從獎勵帳戶轉移到 UTxO。將帳戶餘額設為零，並將價值作為虛擬輸入加入。

**上下文：** 可以受腳本控制（withdraw 目的）。提取 0 Lovelace 是有效的 —— 轉發驗證模式即利用了這一點。

**相關：** 獎勵 (reward), 權益 (stake), withdraw 目的, 轉發驗證 (forwarding validation)

## Witness (見證人)

**定義：** 與交易一起提供的證明，用以滿足支出或驗證條件。包括數位簽章、腳本、Datum 和 Redeemer。

**上下文：** 從腳本地址支出時，整個腳本必須作為見證人提供。

**相關：** 簽章 (signature), 腳本 (script), datum, redeemer, 交易 (transaction)

## Workspace (工作區)

**定義：** 透過 `aiken.toml` 中的 `members` 欄位支援單一儲存庫 (monorep)。允許在單個根目錄下建立多個 Aiken 子專案，並支援萬用字元 (glob)。

**上下文：** 早期功能，有一些限制：不支援本地路徑依賴、依賴項提取冗餘、LSP 支援有限。

**相關：** aiken.toml, 專案結構 (project structure)
