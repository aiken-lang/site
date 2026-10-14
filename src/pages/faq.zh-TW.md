# Aiken 語言 — 常見問題解答 <span id="aiken-language--frequently-asked-questions" />

---

## Q1：什麼是 Aiken？ <span id="q1-what-is-aiken" />

**回答：** Aiken 是一種現代化的純函數式程式語言，專為在 Cardano 區塊鏈上編寫智能合約（驗證器）而設計。它會編譯為非類型化 Plutus Core (UPLC)，這是 Cardano 虛擬機執行的低階直譯代碼。儘管有時會被誤認為是 Rust，但 Aiken 是一門獨立的語言——只是它的編譯器恰好是用 Rust 編寫的。

**重點：**
- 用途：Cardano 的智能合約（驗證器）
- 範式：純函數式，靜態類型並具備類型推斷
- 語法：受 Rust 啟發，但並非 Rust
- 編譯目標：非類型化 Plutus Core (UPLC)
- 非：通用程式語言；非 Haskell；非 PlutusTx

**範例：**
```aiken
validator hello_world {
  spend(datum: Option<MyDatum>, redeemer: MyRedeemer, _own_ref: OutputReference, self: Transaction) {
    todo @"validator logic goes here"
  }
}
```

**相關：** [安裝](#q3-how-do-i-install-aiken) | [第一個驗證器](#q10-how-do-i-write-my-first-validator)

---

## Q2：Aiken 與 Plutus (PlutusTx) 有何不同？ <span id="q2-how-is-aiken-different-from-plutus-plutustx" />

**回答：** Aiken 和 PlutusTx 都會編譯為 non-類型化 Plutus Core (UPLC)，但它們的方法有顯著差異。PlutusTx 是一個嵌入式 Haskell 框架，使用 GHC 插件將 Haskell 的中間表示轉換為 UPLC。相比之下，Aiken 是一門獨立的語言，擁有自己的編譯器、語法和工具鏈——是專為 Cardano 智能合約使用場景從零構建的。

**重點：**
- Aiken 是具有專用編譯器的獨立語言；PlutusTx 是 Haskell 框架/插件
- Aiken 採用受 Rust 啟發的語法；PlutusTx 使用 Haskell 語法
- Aiken 開箱即用，包含整合測試、基準測試和語言伺服器
- Aiken 追求簡潔——目前沒有高階類型 (higher-kinded types) 或類型類別 (typeclasses)
- 兩者都編譯為相同的 UPLC 目標，因此在鏈上它們的能力是等效的
- Cardano 並**不**在鏈上運行 Haskell——無論原始語言為何，它運行的都是 UPLC

**相關：** [生態系統概覽](#q35-what-other-languages-can-i-use-for-cardano-smart-contracts)

---

## Q3：如何安裝 Aiken？ <span id="q3-how-do-i-install-aiken" />

**回答：** 安裝 Aiken 的推薦方式是透過 `aikup`，這是一個用於下載和管理多個 Aiken 版本的跨平台工具。一旦安裝了 `aikup`，只需執行 `aikup` 即可安裝最新版本。您也可以透過提供版本號來安裝特定版本。

**重點：**
- `aikup` 是主要的安裝方式
- 支援 npm、Homebrew 和直接 URL 安裝
- 適用於 Linux、macOS 和 Windows

**範例：**
```bash
# Via npm
npm install -g @aiken-lang/aikup

# Via Homebrew
brew install aiken-lang/tap/aikup

# Via URL (Linux & macOS)
curl --proto '=https' --tlsv1.2 -LsSf https://install.aiken-lang.org | sh

# Via URL (Windows)
powershell -c "irm https://windows.aiken-lang.org | iex"

# 然後安裝 Aiken
aikup
```

**相關：** [編輯器設定](#q4-which-editors-support-aiken) | [建立專案](#q5-how-do-i-create-a-new-aiken-project)

---

## Q4：哪些編輯器支援 Aiken？ <span id="q4-which-editors-support-aiken" />

**回答：** Aiken 擁有編輯器插件，為所有主流編輯器提供語法高亮和縮排規則。它還內建了語言伺服器協定 (LSP) 實作，以提供程式碼補全和診斷等進階功能。

**重點：**
- **Zed：** `aiken-lang/zed-aiken`
- **VSCode：** `aiken-lang/vscode-aiken`
- **Vim/Neovim：** `aiken-lang/editor-integration-nvim`
- **Emacs：** `aiken-lang/aiken-mode`
- **JetBrains：** `MedusaLabs-cardano/intellij_aiken`
- LSP 指令： `aiken lsp`（在 CLI 說明中隱藏）
- 根目錄模式： `aiken.toml`
- 檔案類型： `.ak`

**相關：** [安裝](#q3-how-do-i-install-aiken) | [自動補全](#q3-how-do-i-install-aiken)

---

## Q5：如何建立一個新的 Aiken 專案？ <span id="q5-how-do-i-create-a-new-aiken-project" />

**回答：** 使用 `aiken new` 指令後接 `{organisation}/{repository}` 名稱。這會建立一個包含標準資料夾結構、設定檔和佔位符驗證器的專案骨架。

**重點：**
- 指令： `aiken new foo/bar`
- 建立 `aiken.toml`、`lib/`、`validators/` 和 `README.md`
- 標準函式庫會自動作為依賴項加入
- 函式庫程式碼放在 `lib/`；驗證器放在 `validators/`

**範例：**
```bash
aiken new aiken-lang/hello-world
cd hello-world
```

產生的結構：
```
.
├── README.md
├── aiken.toml
├── lib
│   └── hello-world
└── validators
```

**相關：** [專案結構](#q6-what-is-the-project-structure-of-an-aiken-project) | [編譯](#q7-how-do-i-compile-an-aiken-project)

---

## Q6：Aiken 專案的結構是什麼？ <span id="q6-what-is-the-project-structure-of-an-aiken-project" />

**回答：** Aiken 專案將原始碼分為兩類：函式庫程式碼（位於 `lib/`）和應用程式碼，即鏈上驗證器（位於 `validators/`）。專案根目錄包含一個 `aiken.toml` 設定檔。編譯後，會產生一個 Plutus 藍圖（`plutus.json`），其中包含編譯後的驗證器程式碼和雜湊摘要。

**重點：**
- `lib/` — 可重複使用的函式庫模組
- `validators/` — 鏈上驗證器原始碼檔案 (`.ak`)
- `env/` — 可根據條件包含的環境特定程式碼  
- `aiken.toml` — 專案元數據、依賴項與配置
- `plutus.json` — 建置後產生的 Plutus 藍圖 (CIP-0057)
- `build/` — 建置產物與已獲取的依賴項

**範例 (`aiken.toml`):**
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

**相關內容：** [建立專案](#q5-how-do-i-create-a-new-aiken-project) | [編譯](#q7-how-do-i-compile-an-aiken-project)

---

## Q7：如何編譯 Aiken 專案？ <span id="q7-how-do-i-compile-an-aiken-project" />

**回答：** 使用 `aiken build` 來編譯您的專案，這會產生 Plutus 藍圖 (`plutus.json`)。使用 `aiken check` 進行型別檢查並執行測試，而不產生完整建置。對於函式庫專案，`aiken docs` 會根據型別、註解與說明產生 HTML 文件。

**重點：**
- `aiken build` — 完整編譯，產生 `plutus.json`
- `aiken check` — 僅進行型別檢查與執行測試
- `aiken bench` — 僅進行型別檢查與執行基準測試
- `aiken docs` — 產生 HTML 文件
- `aiken blueprint` — 產生地址、套用參數、轉換格式
- 追蹤 (Traces) 預設會在 `aiken build` 時移除（使用 `--trace-level verbose` 來保留它們）
- 追蹤預設會在 `aiken check` 時保留

**相關內容：** [測試](#q17-how-do-i-test-validators-in-aiken) | [疑難排解](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q8：什麼是 eUTxO 模型？ <span id="q8-what-is-the-eutxo-model" />

**回答：** 擴展未花費交易輸出 (Extended Unspent Transaction Output, eUTxO) 模型是 Cardano 的交易模型。在此模型中，交易會消耗現有的 UTxO（輸入）並產生新的 UTxO（輸出）。每個輸出都有一個價值（資產）與一個地址（花費條件）。「擴展」部分增加了數據 (Datums) 與贖回者 (Redeemers)，在保持完全確定性的同時實現了具備狀態的智慧合約邏輯。

**重點：**
- UTxO（未花費交易輸出）具有價值與地址
- 輸入參考先前的輸出；已花費的輸出會被銷毀
- 交易是原子的：要麼全部成功，要麼全部失敗
- eUTxO 擴展增加了數據（附加於輸出的狀態/配置）與贖回者（在花費時提供的使用者參數）
- 腳本（驗證器）類似於確定性謂詞 — 從概念上講，它們會回傳 True 或 False
- 初始狀態來自創世配置

**相關內容：** [數據與贖回者](#q9-what-are-datums-and-redeemers) | [地址](#q12-how-do-cardano-addresses-work)

---

## Q9：什麼是數據 (Datums) 與贖回者 (Redeemers)？ <span id="q9-what-are-datums-and-redeemers" />

**回答：** Datum 和 Redeemer 是 eUTxO 模型中實現智能合約邏輯的兩個關鍵數據組件。Datum 是在創建輸出時附加的數據負載——可以將其視為合約的狀態或配置。Redeemer 是在嘗試花費輸出時於交易中提供的數據——可以將其視為用戶的參數或操作。它們與腳本（驗證器）一起構成了一個參數化的謂詞函數。

**關鍵點：**
- **Datum** = 函數參數；在創建輸出時設置；附加到 UTxO 上
- **Redeemer** = 函數參數；在花費輸出時提供
- **腳本/驗證器 (Script/Validator)（驗證器）** = 函數本身；定義驗證邏輯
- 只有 `spend` 目的的腳本可以訪問 datum
- 在花費處理程序中，datum 始終是 `Option<T>`，因為你無法阻止某人在沒有 datum 的情況下發送資產
- 它們共同使腳本完全確定性——執行僅取決於交易上下文

**範例：**
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

**相關：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [驗證器](#q10-how-do-i-write-my-first-validator)

---

## Q10：如何編寫我的第一個驗證器？ <span id="q10-how-do-i-write-my-first-validator" />

**回答：** 驗證器使用 `validator` 關鍵字定義，並包含一個或多個對應於腳本目的（mint、spend、withdraw、publish、vote、propose）的處理函數。每個處理程序都是一個謂詞，必須返回 True 才能授權該操作。「Hello, World!」教學介紹了如何建立一個基本的 spend 驗證器。

**關鍵點：**
- 使用 `validator` 關鍵字並命名
- 定義對應於 Cardano 腳本用途的處理程序
- 處理程序返回 `Bool` —— `True` 表示授權，`False`（或 `fail`）表示拒絕
- `spend` 處理程序接收 4 個參數：可選的 datum、redeemer、輸出引用和交易
- 其他處理程序接收 3 個參數：redeemer、目標（取決於目的）和交易
- 後備 `else` 處理程序用於捕捉未處理的用途

**範例：**
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

**相關：** [Datums 與 Redeemers](#q9-what-are-datums-and-redeemers) | [測試](#q17-how-do-i-test-validators-in-aiken)

---

## Q11：Aiken 中的六種驗證器目的分別是什麼？ <span id="q11-what-are-the-six-validator-purposes-in-aiken" />

**回答：** Aiken 支持所有六種 Cardano 腳本用途，每一種都控制不同類型的鏈上操作。每個目的決定了傳遞給處理程序的目標參數類型。

**關鍵點：**
- **`mint`** — 控制用戶定義資產的鑄造/銷毀。目標：`PolicyId`
- **`spend`** — 控制交易輸出的花費。目標：`OutputReference`。唯一可以訪問 datum 的用途。
- **`withdraw`** — 控制質押獎勵的提取。目標：`Credential`
- **`publish`** — 控制委託憑證的發佈。目標：`Certificate`
- **`vote`** — 驗證來自腳本委託代表的治理投票。目標：`Voter`
- **`propose`** — 憲法護軌；驗證治理提案。目標：`ProposalProcedure`。整個帳本中只能存在一個此類腳本。

**範例：**
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

**相關：** [驗證器](#q10-how-do-i-write-my-first-validator) | [參數](#q13-how-do-validator-parameters-work)

---

## Q12：Cardano 地址是如何運作的？<span id="q12-how-do-cardano-addresses-work" />

**答案：** Cardano 地址由 2 或 3 個部分組成：標頭（描述地址類型和網路）、支付憑證（支出條件）以及可選的委託憑證（質押控制）。憑證可以是驗證密鑰雜湊（用於基於簽名的支出）或腳本雜湊（用於基於腳本的驗證）。

**重點：**
- **標頭** — 定義地址類型和網路判別式（主網與測試網）
- **支付憑證** — 控制支出；可以是驗證密鑰雜湊或腳本雜湊
- **委託憑證** — 可選；控制質押委託和獎勵提取
- 腳本地址使用腳本雜湊作為支付憑證，從而實現任意驗證邏輯
- 地址通常以 bech32 或 base16（十六進制）格式編碼
- Byron（舊版）地址已被棄用，且在 Plutus 腳本交易中被禁止使用

**相關：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [腳本與數據 (Scripts & Datums)](#q9-what-are-datums-and-redeemers)

---

## Q13：驗證器參數是如何運作的？<span id="q13-how-do-validator-parameters-work" />

**答案：** 驗證器可以接收參數，這些參數是嵌入在編譯後驗證器代碼中的配置值。一旦提供，參數即成為鏈上腳本的一部分，並會影響其雜湊值和地址。在計算任何地址之前，必須先提供參數。

**關鍵點：**
- 定義在驗證器名稱後的括號內
- 驗證器內的所有處理程序皆可存取
- 必須是可序列化（非不透明）的數據類型
- 常見用途：使用 UTxO 參考來參數化一次性鑄造策略
- 參數是透過使用 `aiken blueprint` 指令群組套用的

**範例：**
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

**相關：** [驗證器](#q10-how-do-i-write-my-first-validator) | [一次性鑄造](#q26-what-is-a-one-shot-minting-policy)

---

## Q14：Aiken 的原始型別有哪些？<span id="q14-what-are-aikens-primitive-types" />

**答案：** Aiken 有 6 種可以寫成字面值的原始型別：`Bool`，`Int`，`ByteArray`，`String`，`Data`，以及 `Void`。它還提供了內建的複合型別：`List`，`Tuple`，`Pair`，以及 `Option`。

**重點：**
- **Bool** — `True` 或 `False`。支援 `&&`，`||`，`!`，`==`，`?` 運算子
- **Int** — 任意大小整數（無溢位）。支援 `_` 分隔符、二進位 (`0b`)、八進位 (`0o`)、十六進位 (`0x`)
- **ByteArray** — 位元組陣列。三種表示法：位元組陣列 (`#[10, 255]`)、UTF-8 字串 (`"foo"`)、十六進位字串 (`#"666f6f"`)
- **String** — 以 `@` 為前綴的 UTF-8 文字 (例如 `@"Hello"`)。僅用於追蹤/除錯
- **Data** — 代表任何可序列化值的封裝型別；一種萬用型別
- **Void** — 代表無值的零元建構子
- **Option\<a\>** — `Some(a)` 或 `None`；內建於選用值
- **List\<a\>** — 有序的同質集合
- **Pair\<a, b\>** — 雙元素配對，序列化為 CBOR 對應項目

**範例：**
```aiken
const my_int: Int = 1_000_000
const my_bool: Bool = True
const my_bytes: ByteArray = "Hello"
const my_hex: ByteArray = #"666f6f"
const my_string: String = @"Hello, Aiken!"
const my_list: List<Int> = [1, 2, 3]
const my_tuple: (Int, ByteArray) = (1, "one")
```

**相關：** [自訂型別](#q15-how-do-i-define-custom-types) | [變數與常數](#q16-how-do-variables-and-constants-work)

---

## Q15：如何定義自訂型別？ <span id="q15-how-do-i-define-custom-types" />

**回答：** Aiken 中的自訂型別使用 `type` 關鍵字定義。它們可以是記錄（具有命名欄位）、列舉（多個建構子）或泛型代數資料型別。自訂型別是建構 Datum、Redeemer 和內部邏輯資料的主要方式。

**重點：**
- 記錄具有命名欄位 and 單一建構子
- 列舉具有多個建構子（帶有或不帶有欄位）
- 支援帶有型別參數的泛型
- 型別可以使用 `type Alias = ExistingType` 進行別名設定
- 所有自訂型別皆可序列化為 `Data` 且可進行模式比對
- `pub` 使型別在模組外部可用
- 欄位可以使用展開語法更新：`MyType { ..record, field: new_value }`

**範例：**
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

**相關：** [原始型別](#q14-what-are-aikens-primitive-types) | [模式比對](#q20-how-does-pattern-matching-work-in-aiken)

---

## Q16：變數與常數如何運作？ <span id="q16-how-do-variables-and-constants-work" />

**回答：** Aiken 使用 `let` 綁定變數，並使用 `const` 定義模組層級常數。所有值皆為不可變的 — 沒有可變狀態。新的綁定可以遮蔽先前的綁定。常數會在編譯時期完全求值並由編譯器直連。

**重點：**
- `let` — 區域變數綁定；不可變；可遮蔽先前的綁定
- `const` — 模組層級常數；在編譯時期直連；可參考其他（先前定義的）常數
- 無頂層 `let` 綁定 — 使用 `const` 用於模組層級的值
- 常數可以包含幾乎任何 Aiken 表達式
- 型別註解是選用的，但建議用於文件說明

**範例：**
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

**相關：** [函式](#q19-how-do-functions-work-in-aiken) | [原始型別](#q14-what-are-aikens-primitive-types)

---

## Q17：如何在 Aiken 中測試驗證器？<span id="q17-how-do-i-test-validators-in-aiken" />

**回答：** Aiken 對單元測試和基於屬性的測試提供了一流的支援，並直接內建於語言之中。測試是使用 `test` 關鍵字，會與 `aiken check`，並在與鏈上程式碼相同的虛擬機上執行。測試也會顯示記憶體與 CPU 執行單元，使其可用於基準測試。

**重點：**
- 單元測試：不帶參數且回傳 `Bool`；使用 `test` 關鍵字
- 基於屬性的測試：透過 fuzzer 引數接收參數使用 `via` 關鍵字
- 使用以下指令執行測試：`aiken check`
- 測試會收集追蹤資訊以供除錯
- 測試失敗時的自動差異比對功能可顯示出錯原因
- 使用 `fail` 關鍵字測試預期失敗的路徑
- 過濾測試，僅包含預期失敗的路徑 `-m` 標記：`aiken check -m "module_name"`
- 測試與生產環境驗證器運行於相同的虛擬機上

**範例：**
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

**相關內容：** [基於屬性的測試](#q18-what-is-property-based-testing-in-aiken) | [疑難排解](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q18：Aiken 中的基於屬性的測試是什麼？<span id="q18-what-is-property-based-testing-in-aiken" />

**回答：** 基於屬性的測試是 Aiken 中的一項一等功能，它會生成隨機測試輸入來檢查通用屬性，而非特定的案例。它包含整合式的縮減（shrinking）功能，能自動將反例簡化為更小的失敗輸入。模糊測試器（Fuzzers）是透過使用 `via` 關鍵字引入的，且 `aiken/fuzz` 函式庫提供了可組合的模糊測試（fuzzer）原語。

**關鍵點：**
- 使用 `via` 關鍵字將 `Fuzzer<a>` 附加到測試參數
- 自動縮減功能可找出最小的反例
- `aiken/fuzz` 函式庫提供原語：`fuzz.int()`，`fuzz.bool()`，`fuzz.list()`，`fuzz.bytearray()` 等。
- Fuzzers 可組合：`fuzz.list(fuzz.int())` 產生隨機整數列表
- 使用 `fuzz.label()` 進行標記，顯示測試路徑的分佈
- `fail once` — 屬性預期在所有執行中至少失敗一次
- 預設值：每個屬性 100 個隨機樣本

**範例：**
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

**相關：** [測試](#q17-how-do-i-test-validators-in-aiken) | [基準測試](#q25-how-do-benchmarks-work-in-aiken)

---

## Q19：Aiken 中的函式是如何運作的？ <span id="q19-how-do-functions-work-in-aiken" />

**回答：** Aiken 中的函式使用 `fn` 關鍵字定義，屬於一等公民（first-class values），並隱式返回其最後一個表達式（沒有 `return` 關鍵字）。它們支援標籤參數、型別推斷、匿名定義、部分應用（函式捕獲）以及用於鏈式呼叫的管道運算子。

**重點：**
- 具名函式：`fn name(args) -> ReturnType { body }`
- 預設為私有；使用 `pub` 來匯出
- 匿名函式：`let add = fn(x, y) { x + y }`
- 標籤參數：可以按名稱以任何順序呼叫
- 函式捕獲：`add(1, _)` 建立一個新函式
- 管道運算子：`x |> f |> g` 鏈接函式呼叫
- 回傳語法（Backpassing）：`let result <- callback_fn(x)` 用於回呼繁重的程式碼
- 沒有遞迴匿名函式 — 請使用頂層定義來進行遞迴

**範例：**
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

**相關：** [變數與常數](#q16-how-do-variables-and-constants-work) | [控制流程](#q20-how-does-pattern-matching-work-in-aiken)

---

## Q20：Aiken 中的模式匹配是如何運作的？ <span id="q20-how-does-pattern-matching-work-in-aiken" />

**回答：** Aiken 使用 `when/is` 表達式進行模式匹配，類似於 Rust 中的 `match` 或 Haskell 中的 `case`。模式匹配是窮舉的（exhaustive）——編譯器會檢查所有情況是否都被涵蓋。您可以直接在模式中解構自定義型別、列表、元組等。

**重點：**
- `when value is { pattern -> result }` 用於多情況匹配
- 模式可以解構列表：`[]`、`[x]`、`[x, y, ..]`
- 模式可以透過建構子解構自定義型別
- 通配符 `_` 匹配任何內容
- 必須是窮舉的 — 編譯器強制要求涵蓋所有情況
- `expect` 用於非窮舉匹配（如果模式不匹配則失敗）

**範例：**
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

**相關：** [自定義型別](#q15-how-do-i-define-custom-types) | [錯誤處理](#q21-how-do-i-handle-errors-in-aiken)

---

## Q21：我該如何在 Aiken 中處理錯誤？ <span id="q21-how-do-i-deal-with-errors-in-aiken" />

**回答：** Aiken 提供了幾種錯誤處理機制：`fail` 用於立即停止執行，`todo` 作為編譯時會發出警告的佔位符，`expect` 用於非窮盡模式匹配，若模式不匹配則會中止，以及用於追蹤錯誤（trace-if-false）除錯的 `?` 運算子。由於驗證器是謂詞（predicates），「錯誤」通常意味著驗證器返回 `False` 或中止。

**重點：**
- `fail` — 立即中止執行（無編譯警告）。可包含訊息：`fail @"reason"`
- `todo` — 類似 `fail`，但會產生編譯警告以作提醒。請在開發期間使用
- `expect` — 若模式不匹配則中止的模式匹配。例如：`expect Some(x) = optional_value`
- `expect` 搭配 `Bool` — 若 `expect sum >= 0` 條件為假則會中止
- `?` 運算子 — 追蹤錯誤；附加於布林表達式以進行除錯：`must_be_signed?`
- 使用 `if/is` 進行軟轉型（Soft casting） — 非中止的型別檢查：`if value is SomeType { ... } else { ... }`

**範例：**
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

**相關：** [疑難排解](#q24-how-do-i-debug-and-troubleshoot-validators) | [測試失敗](#q17-how-do-i-test-validators-in-aiken)

---

## Q22：模組與匯入是如何運作的？<span id="q22-how-do-modules-and-imports-work" />

**回答：** Aiken 程式被組織成模組——即具有各自命名空間的函式與型別集合。模組對應於 `.ak` 檔案，並可使用 `pub` 來匯出型別與值。匯入使用 `use` 關鍵字，支援限定（qualified）與非限定（unqualified）匯入。

**重點：**
- 每個 `.ak` 檔案都是一個模組；命名空間由檔案路徑衍生
- `pub` 匯出函式與型別
- 限定匯入：`use aiken/collection/list` 然後呼叫 `list.at(...)`
- 非限定匯入：`use aiken/collection/list.{at}` 然後呼叫 `at(...)`
- 自訂匯入名稱：`use aiken/collection/list as my_list`
- 不透明型別（Opaque types）：`pub opaque type` 隱藏內部表示
- 模組文件：`////`（四斜線）位於檔案頂部
- 驗證器僅能匯入至測試模組

**範例：**
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

**相關內容：** [專案結構](#q6-what-is-the-project-structure-of-an-aiken-project) | [標準函式庫](#q23-what-is-the-aiken-standard-library)

---

## Q23：什麼是 Aiken 標準函式庫？<span id="q23-what-is-the-aiken-standard-library" />

**回答：** Aiken 提供兩個基礎套件：**prelude** 和 **標準函式庫 (stdlib)**。Prelude 會自動包含在所有專案中，提供必要的型別與函式。Stdlib 則是一個獨立的依賴項，為常見的智慧合約操作提供了豐富的資料結構、工具以及經過充分測試的程式碼。

**重點：**
- **Prelude** (`aiken-lang/prelude`) — 預設可用；包含核心型別，例如 `Option`，`Bool`，`Ordering`，`Void`，`Data`，`Never`，以及 `Fuzzer`
- **標準函式庫** (`aiken-lang/stdlib`) — 作為依賴項添加；包含用於列表、字典、數學、加密、交易型別、資產、地址等的模組
- 標準函式庫 (stdlib) 是編寫優質 Aiken 程式碼的絕佳參考
- `aiken new` 會自動將 stdlib 加入為依賴項
- 兩者皆會發佈 HTML 文件

**相關內容：** [模組與匯入](#q22-how-do-modules-and-imports-work) | [建立專案](#q5-how-do-i-create-a-new-aiken-project)

---

## Q24：我該如何對驗證器進行除錯與故障排除？<span id="q24-how-do-i-debug-and-troubleshoot-validators" />

**回答：** Aiken 提供了三種主要的除錯工具：`trace` 用於記錄訊息的關鍵字，`expect` 用於自動斷言日誌記錄的追蹤，以及 `?` (trace-if-false) 運算子，用於追蹤哪些布林條件失敗。此外，CBOR 診斷標記法有助於檢查執行時期的值。

**重點：**
- **`trace`** — 可變參數關鍵字；用於追蹤任何可序列化的值：`trace @"label": value1, value2`
- **`?` 運算子** — 後綴；僅在表達式求值為 `False` 時追蹤該表達式：`must_be_signed?`
- **`expect` 追蹤** — 自動生成的追蹤位於 `expect` 使用時的失敗，當使用 `--trace-level verbose` 時
- **CBOR 診斷** — `cbor.diagnostic(value)` 產主任何可序列化值的人類可讀表示形式
- **追蹤層級 (Trace levels)**：`silent`（無追蹤），`compact`（僅限標籤），`verbose`（完整追蹤）
- `aiken build` 預設會移除追蹤；`aiken check` 預設會保留它們
- 追蹤會改變驗證器雜湊值 — 因此生產環境的驗證器應將其移除
- `aiken tx simulate` 也會擷取追蹤

**範例：**
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

**相關內容：** [錯誤處理](#q21-how-do-i-handle-errors-in-aiken) | [測試](#q17-how-do-i-test-validators-in-aiken)

---

## Q25：Aiken 中的基準測試 如何運作？ <span id="q25-how-do-benchmarks-work-in-aiken" />

**回答：** Aiken 使用 `bench` 關鍵字內建了基準測試功能。基準測試會使用 `Sampler` 函式來測量隨著輸入大小增加時的執行成本（記憶體與 CPU 單位）。`Sampler` 是一個接收大小參數並回傳 `Fuzzer` 的函式，讓您可以定義輸入如何增長。

**重點：**
- 使用 `bench` 關鍵字，並透過 `Sampler` 參數，使用 `via` 關鍵字
- 一個 `Sampler<a>` = `fn(Int) -> Fuzzer<a>`
- 大小從 0 線性增長至 `--max-size`（預設為 30）
- 使用 `aiken bench` 執行；會輸出終端機圖表或 JSON (`aiken bench > benchmarks.json`)
- 過濾基準測試：`aiken bench -m "my_module"`
- 建立在 `aiken/fuzz` 套件之上

**範例：**
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

**相關內容：** [測試](#q17-how-do-i-test-validators-in-aiken) | [基於屬性的測試](#q18-what-is-property-based-testing-in-aiken)

---

## Q26：什麼是一次性鑄造策略？ <span id="q26-what-is-a-one-shot-minting-policy" />

**回答：** 一次性鑄造策略是一種設計模式，確保鑄造驗證器只能執行一次。它的運作方式是使用特定的 `OutputReference` 來參數化驗證器，然後驗證對應的 UTxO 是否在交易中被消耗。由於 UTxO 在定義上只能被花費一次，這保證了該策略最多只會驗證一次 — 非常適合用於建立獨一無二的 NFT。

**重點：**
- 使用 `OutputReference`（交易 ID + 輸出索引）進行參數化
- 檢查被引用的 UTxO 是否在交易的輸入中
- 強制要求精確鑄造 1 個代幣
- `OutputReference` 是唯一的（交易雜湊值 + 索引），確保僅執行一次
- 常見於 NFT 建立

**範例：**
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

**相關內容：** [驗證器參數](#q13-how-do-validator-parameters-work) | [設計模式](#q27-what-is-the-double-satisfaction-problem)

---

## Q27：什麼是雙重滿足問題？ <span id="q27-what-is-the-double-satisfaction-problem" />

**回答：** 雙重滿足是 eUTxO 模型中的一種漏洞，即單一輸出付款可以在同一筆交易中滿足多個驗證器的執行。當驗證器檢查「至少有 X 金額支付給地址 Y」而未確保每個輸入都有唯一對應的輸出時，就會發生這種情況。攻擊者可以支付一次，並以相同或更低的價格解鎖多個 UTxO。

**重點：**
- 當多個 UTxO 被鎖定在相似的支出條件下時發生
- 驗證器程式碼會針對每個被花費的輸入獨立執行
- 若缺乏唯一性，單一付款輸出即可滿足所有驗證器的執行
- **解決方案：標記輸出 (Tagged Outputs)** — 使用從輸入派生出的唯一值來標記每個輸出使用 `OutputReference`
- 使用 `if/is`（軟轉型）而非 `expect` 來檢查輸出數據（datum）以避免拒絕不相關的輸出

**範例（易受攻擊）：**
```aiken
// BAD: This validator can be satisfied multiple times with one payment
let user_outputs = list.filter(self.outputs, fn(output) { output.address == beneficiary })
let value_paid = list.foldl(user_outputs, assets.zero, fn(output, total) { merge(output.value, total) })
(lovelace_of(value_paid) >= datum.price)?
```

**修復：** 使用輸入的 `OutputReference` 作為內聯數據（inline datum）來標記輸出，確保每個輸入都映射到唯一的輸出。

**相關：** [一次性鑄造](#q26-what-is-a-one-shot-minting-policy) | [狀態線程代幣](#q28-what-are-state-thread-tokens)

---

## Q28：什麼是狀態線程代幣 (STT)？ <span id="q28-what-are-state-thread-tokens-stt" />

**回答：** 狀態線程代幣是一種用於在交易間維護可變狀態的設計模式。一個 NFT（透過一次性鑄造策略建立）被附加到一個攜帶代表當前狀態數據（datum）的 UTxO 上。每個使用 STT 的交易都必須將其轉發到一個具有更新數據的新輸出，確保狀態得以延續且無法被偽造。

**關鍵點：**
- 使用唯一的 NFT 來識別「狀態載體」UTxO
- NFT 通常透過一次性策略鑄造以保證唯一性
- 多重驗證器（multivalidator）同時處理鑄造（初始化）和花費（狀態轉換）
- 每個交易必須將 NFT 轉發到具有更新數據的輸出
- 鑄造處理器的策略 ID 等於花費處理器的腳本雜湊（同一驗證器）
- 計數器、註冊表和其他有狀態合約的常見模式

**相關：** [一次性鑄造](#q26-what-is-a-one-shot-minting-policy) | [雙重滿足](#q27-what-is-the-double-satisfaction-problem)

---

## Q29：什麼是轉發驗證？ <span id="q29-what-is-forwarding-validation" />

**回答：** 轉發驗證是一種優化模式，簡單的花費驗證器將其實際的驗證邏輯委託（「轉發」）給提款腳本。輕量級的花費腳本無需為每個輸入執行一次複雜邏輯，只需檢查交易中是否存在特定的提款。提款腳本隨後僅為所有輸入執行一次，從而大幅降低執行成本。

**關鍵點：**
- 利用了提取 0 lovelace 總是有效的特性
- 花費驗證器檢查交易中是否存在特定的提款
- 提款腳本包含實際的驗證邏輯且僅執行一次
- 減少了多次執行相同邏輯（每個輸入一次）的開銷
- 被許多 dApp 用於生產環境以優化執行預算
- 無論用途為何，驗證器皆可存取整個交易上下文

**相關：** [狀態線程代幣](#q28-what-are-state-thread-tokens) | [驗證器用途](#q11-what-are-the-six-validator-purposes-in-aiken)

---

## Q30：`and`/`or` 語法是如何運作的？ <span id="q30-how-does-the-andor-syntax-work" />

**回答：** Aiken 提供了 `and` 和 `or` 關鍵字，作為 `&&` 和 `||` 鏈的更具可讀性的替代方案。它們使用以逗號分隔布林表達式的區塊語法，使得分組和優先級一目了然——這在驗證器結合多個條件時特別有用。

**關鍵點：**
- `and { expr1, expr2, expr3 }` — 全部必須為 `True` （相當於 `&&` 鏈）
- `or { expr1, expr2, expr3 }` — 至少必須有一個 `True` （相當於 `||` 鏈）
- 可以嵌套：`or { and { a, b }, c, d }`
- 在 4 個或更多條件時最為有效
- `&&` 以及 `||` 仍然可以用作短路運算子

**範例：**
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
**相關：** [控制流程](#q20-how-does-pattern-matching-work-in-aiken) | [驗證器](#q10-how-do-i-write-my-first-validator)

---

## Q31：什麼是 Plutus 藍圖 (`plutus.json`)？<span id="q31-what-is-the-plutus-blueprint-plutusjson" />

**回答：** Plutus 藍圖是一個符合 CIP-0057 標準的 JSON 檔案，由 `aiken build` 產生，描述您鏈上合約二進位介面的檔案。它包含已編譯的驗證器程式碼、用於地址生成的雜湊摘要，以及 Datum 和 Redeemer 的結構定義——所有這些皆源自您的 Aiken 型別定義與文件註解。

**重點：**
- 產生於 `plutus.json` 在專案根目錄中執行 `aiken build`
- 包含每個驗證器 (validator) 的已編譯 UPLC 程式碼
- 包含用於計算鏈上地址的雜湊摘要 (hash digests)
- Datum 與 Redeemer 的結構定義（從型別自動生成）
- 用於工具間互通性的框架無關格式
- 使用 `aiken blueprint` 用於生成地址、應用參數以及轉換格式的指令組

**相關內容：** [編譯](#q7-how-do-i-compile-an-aiken-project) | [驗證器參數](#q13-how-do-validator-parameters-work)

---

## Q32：Cardano 中的有效性區間是如何運作的？<span id="q32-how-do-validity-intervals-work-in-cardano" />

**答案：** 有效性區間為 Cardano 的確定性智能合約引入了時間概念。交易可以指定一個可選的下限（在此之後有效）和上限（在此之前有效），這些限制會在第一階段 (phase-1) 驗證期間進行檢查。由於區間是在腳本執行前進行驗證的，驗證器可以安全地假設交易發生在指定的時間窗口內。

**關鍵點：**
- 在第一階段（結構）驗證期間，即腳本運行前進行檢查
- 腳本可以讀取該區間並將其作為可信的時間參考
- 將截止日期存儲為 datum；檢查交易的下限是否超過該日期
- 區間最小可達一秒
- 區塊平均每 20 秒產生一次
- 非常狹窄的區間會增加錯過區塊的風險
- 這保留了確定性——區間是預先商定的，而不是在執行時查詢的

**相關內容：** [eUTxO 模型](#q8-what-is-the-eutxo-model) | [疑難排解](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q33：Aiken 中的條件性配置是什麼？<span id="q33-what-is-conditional-configuration-in-aiken" />

**回答：** Aiken 透過環境支援條件性模組與設定值。這讓您無需更改程式碼即可在不同設定（例如：主網與測試網）之間進行切換。設定定義於 `aiken.toml` 在 `[config]` 區段之下，並透過特殊的 `config`模組存取。

**重點：**
- 在 `aiken.toml` 中定義配置，在 `[config.default]`，`[config.mainnet]` 等之下。
- 透過 Aiken 程式碼中的 `use config` 模組存取
- 在建置時選擇環境：`aiken build --env mainnet`
- 支援整數、布林值、字串、列表、元組以及十六進位編碼的位元組陣列
- 條件性模組可以根據環境替換整個 `.ak` 檔案
- 環境模組遵循 `{module}.{env}.ak` 模式

**範例 (`aiken.toml`)：**
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
**相關內容：** [專案結構](#q6-what-is-the-project-structure-of-an-aiken-project) | [編譯](#q7-how-do-i-compile-an-aiken-project)

---

## Q34：什麼是無類型 Plutus Core (UPLC)？<span id="q34-what-is-untyped-plutus-core-uplc" />

**回答：** 無類型 Plutus Core (UPLC) 是由 Cardano 虛擬機實際執行的底層語言。所有的智能合約語言（Aiken、PlutusTx、Helios 等）最終都會編譯為 UPLC。它是一種基於 lambda 演算的極簡語言，包含 7 種原始型別和一組內建函式。Aiken 提供了用於檢查、評估、格式化和轉換 UPLC 程式的工具。

**關鍵點：**
- 7 種原始型別：unit、bool、integer、bytestring、string、pair、list
- 在鏈上以二進位格式編碼；提供人類可讀的文本形式以便於除錯
- Aiken CLI 工具：`aiken uplc eval`，`aiken uplc fmt`，`aiken uplc flat`/`aiken uplc unflat`
- 變數/函式在編譯後會被替換為精簡的索引
- 所有型別都會被抹除，但會隱式執行強制檢查——型別不匹配會導致執行階段錯誤
- Aiken 擁有一個以 Rust 編寫且功能完整的 UPLC 虛擬機

**相關內容：** [Aiken 與 Plutus 的比較](#q2-how-is-aiken-different-from-plutus-plutustx) | [CBOR 診斷](#q24-how-do-i-debug-and-troubleshoot-validators)

---

## Q35：我還可以使用哪些其他語言來編寫 Cardano 智慧合約？<span id="q35-what-other-languages-can-i-use-for-cardano-smart-contracts" />

**答案：** 有多種語言可編譯為 UPLC 以用於 Cardano 智能合約，範圍涵蓋獨立語言到嵌入式 DSL。Aiken 的主要替代方案包括 OpShin（Python）、Helios（JavaScript 風格的新語言）、Plutarch（Haskell eDSL）、plu-ts（TypeScript eDSL）以及 Scalus（Scala）。

**重點：**
- **Aiken** — 新語言；受 Rust 啟發的語法；以 Rust 編寫的獨立編譯器；純函數式且具備靜態型別
- **OpShin** — 使用受限的 Python3 編寫；使用標準 Python 工具鏈；實作了自身的型別系統
- **Helios** — 新語言；編譯器為單一 JavaScript 檔案；純函數式且具備有限的型別推論
- **Plutarch** — Haskell eDSL；可完整存取 Haskell 的型別系統（型別類別、HKT）；不使用 Template Haskell
- **plu-ts** — TypeScript eDSL；在 JS 執行時期實作自身的型別檢查
- **Scalus** — 基於 Scala；可在 JVM 和 JavaScript 上執行；包含 UPLC 工具與巨集
- 所有語言皆編譯為相同的 UPLC 目標 — 請根據您偏好的生態系統與需求進行選擇

**鏈外 SDK（用於建構交易）：**
| 語言 | SDK |
|----------|-----|
| JavaScript/TypeScript | Lucid, Mesh.js |
| Python | PyCardano |
| Rust | Pallas |
| Haskell | Cardano API |
| Java/Scala | Bloxbean |
| C# | CardanoSharp |

**相關內容：** [什麼是 Aiken](#q1-what-is-aiken) | [Aiken 與 Plutus 的比較](#q2-how-is-aiken-different-from-plutus-plutustx)

---
