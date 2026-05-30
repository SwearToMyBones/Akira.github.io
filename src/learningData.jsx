import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react'; 

// ==========================================
// 1. CodeBlock 组件
// ==========================================
const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="relative group my-4 rounded-md border border-gray-700 bg-[#121212] overflow-hidden">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-mono border transition-all
            ${isCopied 
              ? 'border-green-500/50 text-green-400 bg-green-900/20' 
              : 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
        >
          {isCopied ? <Check size={14} /> : <Copy size={14} />}
          <span>{isCopied ? 'COPIED' : 'COPY'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm text-gray-300 leading-relaxed custom-scrollbar">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ==========================================
// 2. 笔记数据 (已添加目录结构)
// ==========================================
export const wikiData = [
  {
    category: "开发工具",
    items: [
      {
        id: "git-basic",
        title: "Git 基础配置",
        content: (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-end-yellow mb-4 font-mono">Git Config</h1>
            <p className="text-gray-300 font-mono text-sm leading-relaxed opacity-80">
              首次安装 Git 后，你需要配置用户名和邮箱，这会作为 commit 的标识。
            </p>
            <CodeBlock code={`git config --global user.name "Your Name"
git config --global user.email "email@example.com"`} />

            <h2 className="text-xl font-bold text-white mt-8 mb-4 font-mono">常用操作流</h2>
            <div className="pl-2 border-l-2 border-gray-700 space-y-6">
              <div>
                <span className="text-end-yellow font-mono text-xs block mb-1">// 1. 初始化仓库</span>
                <CodeBlock code={`git init`} />
              </div>
              <div>
                <span className="text-end-yellow font-mono text-xs block mb-1">// 2. 添加文件到暂存区</span>
                <CodeBlock code={`git add .`} />
              </div>
              <div>
                <span className="text-end-yellow font-mono text-xs block mb-1">// 3. 提交更改</span>
                <CodeBlock code={`git commit -m "feat: 完成了首页开发"`} />
              </div>
            </div>
          </div>
        )
      },
      {
        id: "vscode-tips",
        title: "VS Code 技巧",
        content: (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-end-yellow font-mono">VS Code 快捷键</h1>
            <p className="text-gray-300 font-mono text-sm leading-relaxed opacity-80">
              一些能提高效率的常用快捷键配置 (Shortcuts)。
            </p>
            <CodeBlock code={`Ctrl + P : 快速搜索文件
Ctrl + Shift + F : 全局搜索
Alt + Click : 多光标编辑`} />
          </div>
        )
      }
    ]
  },
  {
    category: "React 学习",
    items: [
      {
        id: "hooks-intro",
        title: "Hooks 简介",
        content: (
          <div>
            <h1 className="text-2xl font-bold text-end-yellow font-mono">Hooks 规则</h1>
            <p className="mt-4 mb-4 text-gray-300 font-mono text-sm leading-relaxed opacity-80">
              只在顶层调用 Hook，不要在循环 (Loops)、条件 (Conditions) 或嵌套函数中调用 Hook。
            </p>
            <CodeBlock code={`import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`} />
          </div>
        )
      }
    ]
  },
  {
    category: "数据结构",
    items: [
      {
        id: "ds-intro",
        title: "栈",
        // 👇 这里定义目录 (TOC)
        toc: [
            { id: "stack-def", label: "定义" },
            { id: "stack-code", label: "JS 实现" }
        ],
        content: (
          <div className="space-y-4">
            {/* 👇 id 对应 toc 里的 id */}
            <div id="stack-def" className="scroll-mt-6">
                <h1 className="text-2xl font-bold text-end-yellow font-mono">栈 (Stack)</h1>
                <p className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 mt-2">
                栈是一种后进先出（LIFO, Last In First Out）的数据结构。
                </p>
            </div>
            
            <div id="stack-code" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white mt-8 font-mono">JS 实现示例</h3>
                <CodeBlock code={`class Stack {
  constructor() {
    this.items = [];
  }
  // ...
  pop() {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  }
}`} />
            </div>
          </div>
        )
      },
      {
        id: "ds-queue",
        title: "队列",
        content: (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-end-yellow font-mono">队列 (Queue)</h1>
            <p className="text-gray-300 font-mono text-sm leading-relaxed opacity-80">
              队列是一种先进先出（FIFO, First In First Out）的数据结构。
            </p>
            <CodeBlock code={`const queue = [];
queue.push(1);
const first = queue.shift(); // 1`} />
          </div>
        )
      },
      {
        id: "ds-sort",
        title: "排序算法",
        // 👇 为你的 C++ 排序算法添加目录
        toc: [
            { id: "sort-intro", label: "算法简介" },
            { id: "sort-stable", label: "稳定性" },
            { id: "sort-bubble", label: "冒泡排序" },
            { id: "sort-selection", label: "选择排序" },
            { id: "sort-insertion", label: "插入排序" },
            { id: "sort-quick", label: "快速排序" }
        ],
        content: (
          <div className="space-y-8">
            <div id="sort-intro" className="scroll-mt-6">
                <h1 className="text-2xl font-bold text-end-yellow font-mono">C++ 实现常见的排序算法</h1>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                对于任意一个算法，其时间复杂度和空间复杂度都是越小越好的。
                </p>
            </div>

            <div id="sort-stable" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">排序的稳定性</h3>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                对于序列中的相同元素，如果排序之后它们的相对位置没有发生改变，则称该排序算法为「稳定排序」，反之则为「不稳定排序」。
                </p>
            </div>

          <div id="sort-bubble" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">1.冒泡排序（Bubble Sort）</h3>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                重复遍历数组，每次比较相邻元素，若顺序错误则交换，直到没有交换发生（数组有序）。
                </p>

          <CodeBlock code={`// 冒泡排序
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    // 标记是否发生交换，优化版本（无交换则提前退出）
    bool swapped;
    for (int i = 0; i < n - 1; ++i) {
        swapped = false;
        // 每轮结束后，最后i个元素已排序，无需再比较
        for (int j = 0; j < n - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                // 交换相邻元素
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        // 本轮无交换，说明数组已有序，直接退出
        if (!swapped) break;
    }
}`} />

            <div id="sort-selection" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">2.选择排序（Selection Sort）</h3>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                核心思路：每次从未排序部分找到最小（大）元素，放到已排序部分的末尾。
                </p>
                <CodeBlock code={`// 选择排序
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; ++i) {
        // 找到未排序部分的最小元素下标
        int minIndex = i;
        for (int j = i + 1; j < n; ++j) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        // 将最小元素交换到已排序部分的末尾
        swap(arr[i], arr[minIndex]);
    }
}`} />
            </div>

            <div id="sort-insertion" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">3. 插入排序（Insertion Sort）</h3>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                核心思路：将数组分为已排序和未排序两部分，逐个将未排序元素插入到已排序部分的正确位置。
                </p>
                <CodeBlock code={`// 插入排序
void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; ++i) {
        // 待插入的元素
        int key = arr[i];
        // 已排序部分的末尾下标
        int j = i - 1;
        // 找到插入位置（比key大的元素后移）
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        // 插入元素
        arr[j + 1] = key;
    }
}`} />
            </div>

            <div id="sort-quick" className="scroll-mt-6">
                <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">4. 快速排序（Quick Sort）</h3>
                <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                核心思路：分治法，选一个基准元素，将数组分为 “小于基准” 和 “大于基准” 两部分，递归排序两部分。
                </p>
                <CodeBlock code={`// 快速排序的分区函数（返回基准元素的正确下标）
int partition(vector<int>& arr, int low, int high) {
    // 选最右侧元素作为基准
    int pivot = arr[high];
    // 小于基准区域的末尾下标
    int i = low - 1;
    for (int j = low; j < high; ++j) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    // 将基准元素放到正确位置
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

// 快速排序（递归）
void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        // 获取基准元素下标
        int pi = partition(arr, low, high);
        // 递归排序左半部分
        quickSort(arr, low, pi - 1);
        // 递归排序右半部分
        quickSort(arr, pi + 1, high);
    }
}

// 快速排序的封装函数（简化调用）
void quickSort(vector<int>& arr) {
    if (arr.empty()) return;
    quickSort(arr, 0, arr.size() - 1);
}`} />
            </div>

            </div>
            
            {/* 底部留白，方便滚动查看效果 */}
            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "ds-stackframe",
        title: "栈帧",
        toc: [
          { id: "sf-intro", label: "什么是栈帧" },
          { id: "sf-structure", label: "栈帧结构" },
          { id: "sf-lifecycle", label: "生命周期" },
          { id: "sf-overflow", label: "栈溢出" }
        ],
        content: (
          <div className="space-y-8">
            <div id="sf-intro" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">栈帧 (Stack Frame)</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                栈帧是函数调用时在程序调用栈上分配的一块内存区域。每调用一个函数，系统就为其创建一个独立的栈帧；
                函数返回时，对应的栈帧被销毁。理解栈帧是理解递归、局部变量生命周期、缓冲区溢出等概念的基础。
              </p>
            </div>

            <div id="sf-structure" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">栈帧的结构</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                一个典型的栈帧包含以下部分（从高地址到低地址排列）：
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-1 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">函数参数</span> — 调用者压入栈中的实参</li>
                <li><span className="text-end-yellow">返回地址</span> — 函数执行完毕后返回到调用者的地址</li>
                <li><span className="text-end-yellow">旧的 EBP/RBP</span> — 调用者的帧指针，用于恢复上一个栈帧</li>
                <li><span className="text-end-yellow">局部变量</span> — 函数内部定义的自动变量</li>
                <li><span className="text-end-yellow">被保存的寄存器</span> — 函数可能使用的寄存器被压栈暂存</li>
              </ul>
              <CodeBlock code={`// 高地址 (栈底)
// +--------------------+
// | 参数 N             |  ← 调用者压入
// | ...                |
// | 参数 1             |
// +--------------------+
// | 返回地址           |  ← call 指令自动压入
// +--------------------+
// | 旧的帧指针 (EBP)   |  ← 函数的 prologue 保存
// +--------------------+  ← 当前帧指针 (EBP/RBP)
// | 局部变量 1         |
// | 局部变量 2         |  ← sub esp, N 开辟空间
// | ...                |
// +--------------------+  ← 栈顶指针 (ESP/RSP)
// 低地址 (栈顶)`} />
            </div>

            <div id="sf-lifecycle" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">栈帧的生命周期</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                以一个简单的递归函数为例，观察栈帧的创建与销毁过程：
              </p>
              <CodeBlock code={`// 递归函数：每次调用创建新的栈帧
int factorial(int n) {
    if (n <= 1) return 1;           // 基准条件：不再递归
    return n * factorial(n - 1);    // 递归调用，继续压栈
}

// 调用 factorial(3) 时的栈帧变化:
//
// Step 1: main() 调用 factorial(3)
//   [main][factorial(3)]
//
// Step 2: factorial(3) 调用 factorial(2)
//   [main][factorial(3)][factorial(2)]
//
// Step 3: factorial(2) 调用 factorial(1)
//   [main][factorial(3)][factorial(2)][factorial(1)]
//
// Step 4: factorial(1) 返回 1，栈帧弹出
//   [main][factorial(3)][factorial(2)]
//
// Step 5: factorial(2) 返回 2，栈帧弹出
//   [main][factorial(3)]
//
// Step 6: factorial(3) 返回 6，栈帧弹出
//   [main]

// 每次递归调用都会在栈上分配新的栈帧，
// 局部变量 n 在每个栈帧中独立存在。`} />
            </div>

            <div id="sf-overflow" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">栈溢出 (Stack Overflow)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                当递归过深或局部变量过大，导致栈空间耗尽时，就会发生栈溢出。每次函数调用都会在栈上分配新的栈帧，
                如果递归没有正确终止，栈帧将无限增长，最终超出操作系统分配的栈大小上限。
              </p>
              <CodeBlock code={`// 错误示例：无止尽的递归导致栈溢出
void infiniteRecursion() {
    int arr[1000];                  // 每次调用都在栈上分配 4KB
    infiniteRecursion();            // 无终止条件，无限压栈
}
// 运行结果：Stack Overflow / Segmentation Fault

// 解决思路：
// 1. 确保递归有正确的终止条件
// 2. 深度递归改为迭代实现
// 3. 大对象从栈分配改为堆分配 (new/malloc)
// 4. 考虑尾递归优化（编译器层面的优化）`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "ds-array-list",
        title: "数组与链表",
        toc: [
          { id: "al-array", label: "数组" },
          { id: "al-linkedlist", label: "链表" },
          { id: "al-compare", label: "对比总结" }
        ],
        content: (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold text-end-yellow font-mono">数组与链表</h1>
            <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
              数组和链表是两种最基础的数据结构，几乎所有的复杂数据结构都是由二者组合演化而来的。
              理解它们的底层内存模型和性能差异，是写出高性能代码的关键。
            </p>

            <div id="al-array" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">数组 (Array)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                数组将元素连续地存储在内存中，每个元素大小相同，因此可以通过 <code className="text-end-yellow">base + index * size</code> 实现 O(1) 的随机访问。
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-1 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">O(1)</span> 按下标随机访问</li>
                <li><span className="text-end-yellow">O(n)</span> —— 在中间插入/删除（需移动后续元素）</li>
                <li>内存连续，对 CPU 缓存友好（空间局部性）</li>
                <li>大小固定（静态数组）或需要动态扩容（动态数组）</li>
              </ul>
              <CodeBlock code={`// 数组内存布局示意
// 地址:  0x1000  0x1004  0x1008  0x100C
//        +-------+-------+-------+-------+
//        | arr[0]| arr[1]| arr[2]| arr[3]|
//        +-------+-------+-------+-------+
// 每个元素紧挨着存储，连续排列
// arr[i] 的地址 = 基地址 + i * sizeof(element)

// C++ 数组操作示例
int arr[5] = {10, 20, 30, 40, 50};
int val = arr[2];                 // O(1) 随机访问 → 30
arr[2] = 99;                      // O(1) 随机修改

// 插入（中间位置）: O(n)
// 在下标 2 处插入 25
for (int i = 4; i > 2; i--)
    arr[i] = arr[i - 1];          // 元素逐个后移
arr[2] = 25;
// 结果: {10, 20, 25, 30, 40}`} />
            </div>

            <div id="al-linkedlist" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">链表 (Linked List)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                链表通过指针将零散分布的节点串联起来，每个节点存储数据以及指向下一个（和前一个）节点的指针。
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-1 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">O(n)</span> —— 随机访问（必须从头遍历）</li>
                <li><span className="text-end-yellow">O(1)</span> 在已知节点后的插入/删除（只需修改指针）</li>
                <li>节点内存分散，对 CPU 缓存不友好</li>
                <li>动态大小、无扩容开销，但指针本身有额外内存开销</li>
              </ul>
              <CodeBlock code={`// 链表内存布局示意（内存分散）
// +-------+     +-------+     +-------+
// | 10| *----> | 20| *----> | 30| *----> nullptr
// +-------+     +-------+     +-------+
// 每个节点可以在内存的任意位置，通过指针串联

// C++ 链表定义与操作
struct Node {
    int data;
    Node* next;
    Node(int v) : data(v), next(nullptr) {}
};

// 遍历（随机访问）: O(n)
Node* find(Node* head, int target) {
    Node* cur = head;
    while (cur) {
        if (cur->data == target) return cur;
        cur = cur->next;
    }
    return nullptr;
}

// 插入（在已知节点后）: O(1)
void insertAfter(Node* node, int val) {
    Node* newnode = new Node(val);
    newnode->next = node->next;
    node->next = newnode;
}`} />
            </div>

            <div id="al-compare" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">对比总结</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">操作</th>
                      <th className="py-2 px-4">数组</th>
                      <th className="py-2 pl-4">链表</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">随机访问</td>
                      <td className="py-2 px-4 text-green-400">O(1)</td>
                      <td className="py-2 pl-4 text-red-400">O(n)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">头部插入/删除</td>
                      <td className="py-2 px-4 text-red-400">O(n)</td>
                      <td className="py-2 pl-4 text-green-400">O(1)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">尾部插入/删除</td>
                      <td className="py-2 px-4 text-green-400">O(1)*</td>
                      <td className="py-2 pl-4 text-green-400">O(1)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">中间插入/删除</td>
                      <td className="py-2 px-4 text-red-400">O(n)</td>
                      <td className="py-2 pl-4 text-green-400">O(1)**</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">缓存友好度</td>
                      <td className="py-2 px-4 text-green-400">高</td>
                      <td className="py-2 pl-4 text-red-400">低</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">内存开销</td>
                      <td className="py-2 px-4 text-green-400">无额外开销</td>
                      <td className="py-2 pl-4 text-yellow-400">每节点存储指针</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 font-mono text-xs leading-relaxed mt-2">
                * 动态数组（如 vector）尾部插入均摊为 O(1)，但需要偶尔扩容。
                ** 前提是已定位到插入位置。
              </p>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-4">
                实际开发中，<span className="text-end-yellow">数组通常是默认选择</span>，因为现代 CPU 的缓存机制使得连续内存访问极快。
                链表仅在频繁在中间位置插入/删除且不需要随机访问的场景中考虑使用。
              </p>
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "ds-data-layout",
        title: "数据布局优化",
        toc: [
          { id: "dl-intro", label: "为什么布局重要" },
          { id: "dl-aos-soa", label: "AoS vs SoA" },
          { id: "dl-cache", label: "缓存行对齐" },
          { id: "dl-dod", label: "数据导向设计" }
        ],
        content: (
          <div className="space-y-8">
            <div id="dl-intro" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">数据布局优化</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                同样的数据，不同的内存排列方式，可能导致数倍的性能差异。这就引出了
                <span className="text-end-yellow"> AoS (Array of Structures)</span> 和
                <span className="text-end-yellow"> SoA (Structure of Arrays)</span> 两种布局策略的对比。
              </p>
            </div>

            <div id="dl-aos-soa" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">AoS vs SoA — 两种内存布局</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                AoS 将每个对象的全部字段连续存储；SoA 则将同一字段的所有值收集在一起连续存储。
              </p>
              <CodeBlock code={`// === AoS: Array of Structures ===
// 一个对象的所有字段放在一起
struct Particle_AoS {
    float x, y, z;        // 坐标
    float vx, vy, vz;     // 速度
    float mass;           // 质量
};
Particle_AoS particles[1'000'000];

// 内存布局:
// [x y z vx vy vz mass][x y z vx vy vz mass]...
// 每个粒子的全部数据连续存放


// === SoA: Structure of Arrays ===
// 相同字段集中存放
struct Particles_SoA {
    float x[1'000'000];
    float y[1'000'000];
    float z[1'000'000];
    float vx[1'000'000];
    float vy[1'000'000];
    float vz[1'000'000];
    float mass[1'000'000];
};

// 内存布局:
// [x0 x1 x2 ...][y0 y1 y2 ...][z0 z1 z2 ...]...
// 每个字段的所有值连续存放`} />
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-4">
                这两种布局在访问模式不同时有天壤之别：
              </p>
              <CodeBlock code={`// 场景 1：只更新 x 坐标 → SoA 胜出
// SoA: 连续读取 particles.x[] 数组，缓存命中率高
for (int i = 0; i < n; i++)
    x[i] += vx[i] * dt;

// AoS: 每读一个 x，也加载了不需要的 y,z,vy,vz,mass
// 浪费了 6/7 的缓存行空间
for (int i = 0; i < n; i++)
    particles[i].x += particles[i].vx * dt;


// 场景 2：访问单个粒子的全部属性 → AoS 胜出
// AoS: 一个粒子的 x,y,z 在同一个缓存行内
Particle_AoS p = particles[i];
render(p.x, p.y, p.z);

// SoA: 需要分别从 3 个不同的数组读取
render(x[i], y[i], z[i]);`} />
            </div>

            <div id="dl-cache" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">缓存行与伪共享</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                CPU 以缓存行（通常 64 字节）为单位加载数据。一次内存访问会将整个缓存行带入 L1/L2 缓存。
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-2 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">缓存命中</span>：需要的数据已在缓存中，访问只需几个 CPU 周期</li>
                <li><span className="text-end-yellow">缓存未命中</span>：需要从主存加载，可能花费 100-300 个周期</li>
                <li><span className="text-end-yellow">伪共享 (False Sharing)</span>：两个核心修改不同变量，但这些变量在同一个缓存行中，
                导致缓存行在两个核心之间反复跳跃，性能急剧下降</li>
              </ul>
              <CodeBlock code={`// 伪共享示例与修复
// 问题代码：多线程分别更新数组中相邻元素
struct Counter {
    int value;  // 4 bytes
    // 8 个 Counter 挤在同一个 64-byte 缓存行内
};
Counter counters[8];  // 每个线程更新一个
// → 缓存行在不同核心间反复 ping-pong

// 修复：填充到缓存行边界
struct alignas(64) PaddedCounter {
    int value;
    char padding[60];  // 确保每个对象独占一个缓存行
};
PaddedCounter counters[8];
// → 每个线程拥有独立的缓存行，无伪共享`} />
            </div>

            <div id="dl-dod" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">数据导向设计 (Data-Oriented Design)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                与面向对象设计（OOD）关注实体和继承不同，数据导向设计（DOD）首先关注数据的访问模式，然后围绕它设计代码结构。
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 border border-gray-700 rounded p-4">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">面向对象 OOD</h4>
                  <p className="text-gray-400 font-mono text-xs leading-relaxed">
                    先想 "有什么对象"(Entity → Component → Behavior)，将相关数据和函数封装成类，强调继承和多态。
                  </p>
                  <p className="text-red-400 font-mono text-xs mt-2">常见问题：数据分散、虚函数开销、缓存不友好。</p>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded p-4">
                  <h4 className="text-end-yellow font-mono text-sm font-bold mb-2">数据导向 DOD</h4>
                  <p className="text-gray-400 font-mono text-xs leading-relaxed">
                    先想 "如何访问数据"(Hot Path → Sequential Access → Batch Transform)，将相同操作的字段聚合成连续数组。
                  </p>
                  <p className="text-green-400 font-mono text-xs mt-2">优势：缓存命中率高、易于 SIMD 向量化、易并行化。</p>
                </div>
              </div>
              <CodeBlock code={`// DOD 实践：ECS (Entity-Component-System)
// 游戏引擎常用模式，将数据与逻辑分离
struct PositionComponent { float x, y, z; };
struct VelocityComponent { float vx, vy, vz; };

// 所有实体的 Position 连续存储（SoA）
PositionComponent positions[MAX_ENTITIES];
VelocityComponent velocities[MAX_ENTITIES];

// System 遍历连续数组，对缓存极度友好
void MovementSystem(float dt) {
    for (int i = 0; i < entityCount; i++) {
        positions[i].x += velocities[i].vx * dt;
        positions[i].y += velocities[i].vy * dt;
        positions[i].z += velocities[i].vz * dt;
    }
    // 编译器可以轻松向量化（SIMD）此循环
}`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      }
    ]
  },
  {
    category: "C++",
    items: [
      {
        id: "cpp-virtual",
        title: "虚函数",
        toc: [
          { id: "vf-intro", label: "运行时多态" },
          { id: "vf-vtable", label: "虚函数表" },
          { id: "vf-pure", label: "纯虚函数" },
          { id: "vf-ctor", label: "构造函数" },
          { id: "vf-dtor", label: "虚析构函数" },
          { id: "vf-summary", label: "总结对比" }
        ],
        content: (
          <div className="space-y-8">
            <div id="vf-intro" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">虚函数与运行时多态</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                虚函数是 C++ 实现<span className="text-end-yellow">运行时多态</span>的核心机制。通过基类指针或引用调用虚函数时，
                实际执行的是<span className="text-end-yellow">对象真实类型</span>对应的函数版本，而非指针/引用静态类型的版本。
                这一机制称为<span className="text-end-yellow">动态绑定 (Dynamic Dispatch)</span>。
              </p>
              <CodeBlock code={`class Animal {
public:
    virtual void speak() { cout << "Animal sound" << endl; }
    void run()           { cout << "Animal runs" << endl; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }  // 重写虚函数
    void run()            { cout << "Dog runs" << endl; }  // 隐藏基类函数
};

Animal* a = new Dog();
a->speak();  // "Woof!" — 虚函数，动态绑定 → 调用 Dog::speak
a->run();    // "Animal runs" — 非虚函数，静态绑定 → 调用 Animal::run

delete a;`} />
            </div>

            <div id="vf-vtable" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">虚函数表 (vtable) 与虚指针 (vptr)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                编译器为每个包含虚函数的类生成一张<span className="text-end-yellow">虚函数表 (vtable)</span>，
                表中存储该类所有虚函数的地址。每个对象内包含一个隐藏的<span className="text-end-yellow">虚指针 (vptr)</span>，
                指向其所属类的 vtable。调用虚函数时，通过 vptr → vtable → 函数地址 两级跳转实现。
              </p>
              <CodeBlock code={`// 编译器视角的简化模型
// Animal 的 vtable:
//   [0] → Animal::speak()
//
// Dog 的 vtable:
//   [0] → Dog::speak()       ← 覆盖了 Animal::speak 的槽位

// 每个对象内部布局:
// Animal obj:  [vptr → Animal vtable][成员变量...]
// Dog obj:     [vptr → Dog vtable][Animal部分][Dog独有成员...]

// 虚函数调用的代价:
// 1. 每个对象多一个 vptr (通常 8 字节)
// 2. 调用时多一次间接跳转 (指针跟随)
// 3. 编译器无法内联虚函数 (除非能确定运行时类型)`} />
            </div>

            <div id="vf-pure" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">纯虚函数与抽象类</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                将虚函数声明为 <code className="text-end-yellow">= 0</code> 即为<span className="text-end-yellow">纯虚函数</span>。
                包含纯虚函数的类称为<span className="text-end-yellow">抽象类</span>，不能实例化。
                子类必须实现所有纯虚函数，否则子类依然是抽象类。
              </p>
              <CodeBlock code={`// 抽象基类：定义接口契约
class Shape {
public:
    virtual double area() const = 0;     // 纯虚函数
    virtual void draw() const = 0;       // 纯虚函数
    virtual ~Shape() {}                  // 虚析构 (见下一节)
};

// Shape s;  ← 编译错误！不能实例化抽象类

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return 3.14159 * r * r; }
    void draw() const override { /* 绘制圆形 */ }
};

// 纯虚函数也可以有默认实现（罕见但有意义）
class Base {
public:
    virtual void log() const = 0;  // 声明为纯虚
};
void Base::log() const {           // 提供默认实现
    cout << "Base::log" << endl;
}
class Derived : public Base {
public:
    void log() const override {
        Base::log();               // 显式调用基类默认实现
        cout << "Derived::log" << endl;
    }
};`} />
            </div>

            <div id="vf-ctor" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">构造函数为什么不能是虚函数？</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                构造函数<span className="text-end-yellow">不能声明为 virtual</span>，原因有三：
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-2 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">对象尚未创建</span>：vptr 在构造函数执行过程中才被初始化。
                在构造完成前，对象还没有 vtable，无法进行动态分发。</li>
                <li><span className="text-end-yellow">构造顺序是自底向上的</span>：先构造基类部分，再构造派生类部分。
                在基类构造函数执行时，对象尚不是派生类类型，虚函数机制处于被抑制状态。</li>
                <li><span className="text-end-yellow">语义矛盾</span>：构造函数的职责是创建对象，而虚函数的作用是
                在已有对象上实现多态。必须先有对象，才能谈论多态。</li>
              </ul>
              <CodeBlock code={`class Base {
public:
    Base() {
        // 在构造函数中调用虚函数是危险的！
        report();  // 此时 vptr 指向 Base 的 vtable
                   // 即使这是 Derived 对象的一部分，也只会调用 Base::report
    }
    virtual void report() { cout << "Base" << endl; }
};

class Derived : public Base {
public:
    Derived() : Base() {}  // 先执行 Base()，此时 report() 调用的是 Base 版本
    void report() override { cout << "Derived" << endl; }
};

Derived d;  // 输出 "Base"，不是 "Derived"！

// 实现"虚构造"的正确做法：工厂方法 / 克隆模式
class Shape {
public:
    virtual Shape* clone() const = 0;  // 虚克隆 — "虚构造"的替代方案
    virtual ~Shape() {}
};

class Circle : public Shape {
public:
    Circle* clone() const override {
        return new Circle(*this);  // 协变返回类型
    }
};`} />
            </div>

            <div id="vf-dtor" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">虚析构函数 — 为什么基类析构必须是虚的</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                通过基类指针删除派生类对象时，如果基类析构函数不是虚函数，则只会调用基类析构，
                派生类部分不会被正确释放，导致<span className="text-red-400">资源泄漏</span>和未定义行为。
              </p>
              <CodeBlock code={`// ❌ 错误：基类析构非虚 → 资源泄漏
class Base {
public:
    ~Base() { cout << "~Base" << endl; }  // 非虚析构！
};

class Derived : public Base {
    int* data;  // 堆分配的资源
public:
    Derived() : data(new int[1000]) {}
    ~Derived() { delete[] data; cout << "~Derived" << endl; }
};

Base* p = new Derived();
delete p;
// 输出: "~Base"  只有！
// data 指向的 1000 个 int 泄漏了，而且 ~Derived() 根本没有执行


// ✅ 正确：基类析构声明为 virtual
class Base {
public:
    virtual ~Base() { cout << "~Base" << endl; }
};

// 任何设计为被继承的类，其析构函数都应声明为
// virtual（多态基类）或 protected（非多态基类，禁止基类指针删除）

// 派生类析构函数自动变为虚函数，override 关键字可提升可读性
class Derived : public Base {
public:
    ~Derived() override { cout << "~Derived" << endl; }
};`} />
            </div>

            <div id="vf-summary" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">总结对比</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">特性</th>
                      <th className="py-2 px-4">构造函数</th>
                      <th className="py-2 px-4">普通成员函数</th>
                      <th className="py-2 pl-4">析构函数</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">可以是 virtual 吗?</td>
                      <td className="py-2 px-4 text-red-400">不可以</td>
                      <td className="py-2 px-4 text-green-400">可以</td>
                      <td className="py-2 pl-4 text-green-400">应该 (作为基类)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">可以有 = 0 吗?</td>
                      <td className="py-2 px-4 text-red-400">不可以</td>
                      <td className="py-2 px-4 text-green-400">可以 (= 纯虚)</td>
                      <td className="py-2 pl-4 text-green-400">可以 (纯虚析构需提供空实现)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">调用顺序</td>
                      <td className="py-2 px-4">基类 → 派生类</td>
                      <td className="py-2 px-4">由 vptr/vtable 决定 (动态绑定)</td>
                      <td className="py-2 pl-4">派生类 → 基类 (与构造相反)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <CodeBlock code={`// 纯虚析构函数的使用
class AbstractBase {
public:
    virtual ~AbstractBase() = 0;  // 纯虚析构：使得类成为抽象类
};
AbstractBase::~AbstractBase() {}  // 必须提供空实现！
// 原因：派生类析构时会隐式调用基类析构，必须存在实现体

// 常规法则
// 1. 只要一个类被设计为多态基类 → 析构函数必须是 virtual
// 2. 永远不要对多态对象使用 static_cast 或按值传递
// 3. 构造函数中不要调用虚函数 (此时 vptr 还未完整建立)
// 4. 析构函数中调用虚函数是安全的 (此时 vptr 指向当前类的 vtable)`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "cpp-smartptr",
        title: "智能指针",
        toc: [
          { id: "sp-raii", label: "RAII 原则" },
          { id: "sp-unique", label: "unique_ptr" },
          { id: "sp-shared", label: "shared_ptr" },
          { id: "sp-weak", label: "weak_ptr" },
          { id: "sp-best", label: "最佳实践" }
        ],
        content: (
          <div className="space-y-8">
            <div id="sp-raii" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">智能指针与 RAII</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                <span className="text-end-yellow">RAII (Resource Acquisition Is Initialization)</span> 是 C++ 资源管理的核心思想：
                在构造函数中获取资源，在析构函数中释放资源。智能指针将这一原则应用于动态内存管理，
                用对象的生命周期自动管理堆内存的分配与释放，从根本上杜绝忘记 delete 导致的内存泄漏。
              </p>
              <CodeBlock code={`// 原始指针的问题
void riskyFunction() {
    int* p = new int(42);
    doSomething();       // 如果这里抛出异常...
    delete p;            // ...这行永远不会执行 → 内存泄漏！
}

// 智能指针：无论函数如何退出，都会自动释放
#include <memory>
void safeFunction() {
    auto p = std::make_unique<int>(42);
    doSomething();       // 即使抛异常，栈展开会调用 unique_ptr 的析构
}                        // p 自动 delete，无泄漏`} />
            </div>

            <div id="sp-unique" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">unique_ptr — 独占所有权</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <code className="text-end-yellow">unique_ptr</code> 对其管理的对象拥有<span className="text-end-yellow">独占所有权</span>。
                它不可复制（copy 已删除），只可移动（move），完美表达"谁创建谁负责"的语义。
              </p>
              <CodeBlock code={`#include <memory>

// 创建 — 始终优先使用 make_unique (C++14+)
auto u1 = std::make_unique<int>(100);  // 安全、高效
// std::unique_ptr<int> u2 = u1;       // ❌ 编译错误：不可拷贝！
std::unique_ptr<int> u2 = std::move(u1); // ✅ 移动：所有权转移
// 此后 u1 == nullptr，只有 u2 拥有资源

// 自定义删除器
auto fileDeleter = [](FILE* f) { if (f) fclose(f); };
std::unique_ptr<FILE, decltype(fileDeleter)>
    filePtr(fopen("data.txt", "r"), fileDeleter);

// 数组支持
auto arr = std::make_unique<int[]>(100);  // new int[100], 析构时自动 delete[]

// 应用于工厂函数 — 清晰的"调用者获得所有权"语义
std::unique_ptr<Shape> createShape(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>(5.0);
    if (type == "rect")   return std::make_unique<Rectangle>(3, 4);
    return nullptr;
}`} />
            </div>

            <div id="sp-shared" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">shared_ptr — 共享所有权</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <code className="text-end-yellow">shared_ptr</code> 使用<span className="text-end-yellow">引用计数</span>实现共享所有权。
                每个 shared_ptr 指向一个控制块（存储引用计数和删除器），当最后一个 shared_ptr 销毁时自动释放资源。
              </p>
              <CodeBlock code={`auto s1 = std::make_shared<std::vector<int>>();  // 引用计数 = 1
auto s2 = s1;                                  // 引用计数 = 2 (拷贝)
s2.reset();                                    // 引用计数 = 1
s1.reset();                                    // 引用计数 = 0 → 自动 delete


// 引用计数的内存模型
//  shared_ptr          控制块(堆)         管理的对象(堆)
// ┌───────┐        ┌──────────────┐     ┌─────────────┐
// │ ptr ──┼───────>│ ref_count: 2 │     │   vector    │
// │ ctrl ─┼──┐     │ weak_count:0 │     │   (数据)    │
// └───────┘  │     │ deleter      │     └─────────────┘
//             └────>│ allocator    │
//                   └──────────────┘

// ⚠️ 避免从原始指针直接创建多个 shared_ptr
int* raw = new int(42);
std::shared_ptr<int> a(raw);    // 控制块 A，ref = 1
std::shared_ptr<int> b(raw);    // 控制块 B，ref = 1  ← 双重释放！
// raw 会被 delete 两次，未定义行为

// ✅ 正确做法
auto c = std::make_shared<int>(42);  // 对象和控制块一次性分配，更高效
auto d = c;                          // 共享同一个控制块，安全`} />
            </div>

            <div id="sp-weak" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">weak_ptr — 打破循环引用</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <code className="text-end-yellow">weak_ptr</code> 不增加引用计数，不拥有对象。它指向 shared_ptr 管理的对象，
                可以安全地检测对象是否已被销毁。核心用途是<span className="text-end-yellow">打破 shared_ptr 的循环引用</span>。
              </p>
              <CodeBlock code={`// ❌ 循环引用 → 内存泄漏
struct Node {
    std::shared_ptr<Node> next;
    std::shared_ptr<Node> prev;  // 两个都持有对方 → 永远不会释放
};

auto a = std::make_shared<Node>();
auto b = std::make_shared<Node>();
a->next = b;  // b 的引用计数 = 2 (局部变量 b + a->next)
b->prev = a;  // a 的引用计数 = 2 (局部变量 a + b->prev)
// 离开作用域后局部变量销毁，但引用计数 = 1 (来自对方的持有)
// → a 和 b 相互持有，永远无法释放 → 内存泄漏！


// ✅ 用 weak_ptr 打破循环
struct Node {
    std::weak_ptr<Node> prev;    // 不增加引用计数
    std::shared_ptr<Node> next;  // 共享所有权
};

// 使用 weak_ptr → 先 lock() 获得 shared_ptr
std::weak_ptr<Node> w = a;
if (auto sp = w.lock()) {  // 对象还活着 → 获得临时 shared_ptr
    sp->next->doSomething();
} else {
    // 对象已销毁，安全处理
}

// weak_ptr::expired() 查询但不提升
if (!w.expired()) {
    // 注意：此检查与 lock() 之间可能发生竞争
    // 多线程环境始终用 lock() 获得临时所有权
}`} />
            </div>

            <div id="sp-best" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">最佳实践</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">场景</th>
                      <th className="py-2 pl-4">推荐</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">默认选择</td>
                      <td className="py-2 pl-4"><code className="text-green-400">unique_ptr</code> — 零开销，独占所有权</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">需要共享所有权</td>
                      <td className="py-2 pl-4"><code className="text-green-400">shared_ptr</code></td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">观察 / 打破循环 / 缓存</td>
                      <td className="py-2 pl-4"><code className="text-green-400">weak_ptr</code></td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">创建智能指针</td>
                      <td className="py-2 pl-4">始终用 <code className="text-green-400">make_unique</code> / <code className="text-green-400">make_shared</code></td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">函数参数</td>
                      <td className="py-2 pl-4">不转移所有权时传原始指针或引用</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">返回新对象</td>
                      <td className="py-2 pl-4">返回 <code className="text-green-400">unique_ptr</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "cpp-memory-issues",
        title: "内存泄漏与溢出",
        toc: [
          { id: "mi-leak", label: "内存泄漏" },
          { id: "mi-overflow", label: "内存溢出" },
          { id: "mi-tools", label: "检测工具" },
          { id: "mi-prevent", label: "防范措施" }
        ],
        content: (
          <div className="space-y-8">
            <div id="mi-leak" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">内存泄漏与内存溢出</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                内存泄漏和内存溢出是两个常被混淆但本质不同的概念。理解二者的区别，是写出健壮 C++ 程序的必要基础。
              </p>
            </div>

            <div id="mi-leak-content" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">内存泄漏 (Memory Leak)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <span className="text-end-yellow">定义</span>：程序动态分配了堆内存，但在使用完毕后未能释放，
                且丢失了指向该内存的指针，导致这块内存再也无法被回收。长时间运行的程序会因泄漏积累而耗尽可用内存。
              </p>
              <CodeBlock code={`// === 常见泄漏场景 ===

// 1. 忘记 delete / 异常导致跳过 delete
void leak1() {
    int* p = new int[1000];
    riskyOperation();      // 如果这里抛异常...
    delete[] p;            // ...这一行永远不会执行
}

// 2. 循环引用 (shared_ptr 双向持有)
struct A { std::shared_ptr<B> b; };
struct B { std::shared_ptr<A> a; };
void leak2() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->b = b;  // B 的引用计数 = 2
    b->a = a;  // A 的引用计数 = 2
}  // 局部变量销毁，但 A 和 B 各持对方 → 永不为 0

// 3. 容器存储裸指针，容器销毁时只删指针本身不删指向的对象
void leak3() {
    std::vector<int*> vec;
    vec.push_back(new int(1));
    vec.push_back(new int(2));
}  // vec 销毁，但 new 的两个 int 还在堆上泄漏

// 4. 子类析构函数未执行 (基类析构非虚)
class Base { public: ~Base() {} };           // 非虚！
class Derived : public Base { int* data; };
Base* p = new Derived();  delete p;          // ~Derived() 未调用→data 泄漏

// 5. 资源获取后未配对释放
FILE* f = fopen("data.txt", "r");
if (someCondition) return;  // 提前返回，忘记 fclose(f)
fclose(f);`} />
            </div>

            <div id="mi-overflow" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">内存溢出 (Memory Overflow)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <span className="text-end-yellow">定义</span>：程序试图访问超出其分配边界的内存，或向有限的内存区域写入过多数据。
                最常见的形式是<span className="text-end-yellow">缓冲区溢出 (Buffer Overflow)</span>，这是绝大多数安全漏洞的根源。
              </p>
              <CodeBlock code={`// === 栈溢出 (Stack Overflow) ===
// 1. 无限递归
void deepRecursion(int n) {
    int buf[1000];            // 每次调用在栈上分配 ~4KB
    deepRecursion(n + 1);     // 无终止条件，栈帧无限增长
}  // 超出栈空间上限 (通常 1-8MB) → Stack Overflow

// 2. 栈上分配过大对象
void hugeStackVar() {
    int arr[10'000'000];     // ~40MB，远超默认栈大小
}  // 程序崩溃


// === 堆溢出 / 缓冲区溢出 ===
// 3. 越界写入
char buffer[16];
strcpy(buffer, "this string is way too long for the buffer");
// 写入超过 16 字节，覆盖了相邻内存 → 未定义行为

// 4. 数组越界
int arr[10];
for (int i = 0; i <= 10; i++) {  // ≤ 而非 < ！
    arr[i] = i;                   // arr[10] 越界写入
}

// 5. new[] / delete 不配对 (虽然不是溢出，但导致堆损坏)
int* p = new int[10];
delete p;  // ❌ 应该用 delete[] → 未定义行为，可能损坏堆元数据`} />
            </div>

            <div id="mi-tools" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">检测工具</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">工具</th>
                      <th className="py-2 px-4">检测内容</th>
                      <th className="py-2 pl-4">特点</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-end-yellow">Valgrind (Memcheck)</td>
                      <td className="py-2 px-4">泄漏、越界、使用已释放内存</td>
                      <td className="py-2 pl-4">Linux，精确但慢 (10-30×)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-end-yellow">AddressSanitizer (ASan)</td>
                      <td className="py-2 px-4">越界、use-after-free、double-free</td>
                      <td className="py-2 pl-4">编译期插桩，快 (2×)，Clang/GCC/MSVC</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-end-yellow">LeakSanitizer (LSan)</td>
                      <td className="py-2 px-4">内存泄漏</td>
                      <td className="py-2 pl-4">常与 ASan 集成，轻量</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-end-yellow">CRT Debug Heap (Windows)</td>
                      <td className="py-2 px-4">泄漏</td>
                      <td className="py-2 pl-4"><code className="text-gray-400">_CrtDumpMemoryLeaks()</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <CodeBlock code={`// GCC/Clang: 编译时加入 AddressSanitizer
// g++ -fsanitize=address -g -O1 main.cpp -o main
// ./main
// ASan 会在检测到越界 / use-after-free 时打印详细报告

// MSVC: /fsanitize=address
// cl /fsanitize=address /Zi main.cpp`} />
            </div>

            <div id="mi-prevent" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">防范措施</h3>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-2 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">优先使用智能指针</span> (unique_ptr / shared_ptr)，从源头消除手动 delete</li>
                <li><span className="text-end-yellow">使用容器而非原始数组</span> — std::vector、std::array 自带边界检查 (at())</li>
                <li><span className="text-end-yellow">RAII 管理所有资源</span> — 不仅内存，文件句柄、锁、socket 都用 RAII 包装</li>
                <li><span className="text-end-yellow">基类析构函数声明为 virtual</span> — 任何被继承的类都应遵守</li>
                <li><span className="text-end-yellow">用 weak_ptr 打破 shared_ptr 循环引用</span></li>
                <li><span className="text-end-yellow">启用编译器消毒剂</span> — CI 中常开 AddressSanitizer + UndefinedBehaviorSanitizer</li>
                <li><span className="text-end-yellow">代码审查关注资源管理路径</span> — 每个 new 都要有对应的 delete，每个资源获取都要有对应的释放</li>
              </ul>
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "cpp-stack-heap",
        title: "栈与堆",
        toc: [
          { id: "sh-layout", label: "进程内存布局" },
          { id: "sh-stack", label: "栈 (Stack)" },
          { id: "sh-heap", label: "堆 (Heap)" },
          { id: "sh-compare", label: "对比总结" },
          { id: "sh-runtime", label: "运行时视角" }
        ],
        content: (
          <div className="space-y-8">
            <div id="sh-layout" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">栈与堆：从硬件到代码</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                栈和堆是程序运行时两块最核心的内存区域。理解它们在<span className="text-end-yellow">硬件层面</span>的运作方式，
                才能真正掌握变量生命周期、递归深度、内存分配开销等概念的本质。
              </p>
            </div>

            <div id="sh-layout-content" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">进程虚拟内存布局</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                操作系统为每个进程分配独立的<span className="text-end-yellow">虚拟地址空间</span>。从高地址到低地址，典型的布局如下：
              </p>
              <CodeBlock code={`高地址 0x7FFFFFFF
+--------------------------+
|     命令行参数 / 环境变量   |
+--------------------------+
|         栈 (Stack)        |  ← 向低地址增长 (↓)
|            ↓              |     ESP/RSP 栈顶指针
|     ......未使用......     |
|            ↑              |
|         堆 (Heap)         |  ← 向高地址增长 (↑)
+--------------------------+     brk/sbrk 或 mmap 管理
|     BSS 段 (未初始化全局变量)  |
+--------------------------+
|    Data 段 (已初始化全局/静态) |
+--------------------------+
|    Text 段 (代码/只读数据)    |
+--------------------------+
低地址 0x08048000

// 每个线程拥有自己独立的栈
// 一个进程中: 1 个堆, N 个栈 (N = 线程数)`} />
            </div>

            <div id="sh-stack" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">栈 (Stack) — 硬件原生支持的结构</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                栈不是由 C++ 运行时库实现的，而是<span className="text-end-yellow">CPU 硬件直接支持的</span>。
                x86/x64 架构有专门的栈指针寄存器 <code className="text-end-yellow">ESP/RSP</code> 和
                基址指针寄存器 <code className="text-end-yellow">EBP/RBP</code>，
                <code className="text-end-yellow">push</code> / <code className="text-end-yellow">pop</code> / <code className="text-end-yellow">call</code> / <code className="text-end-yellow">ret</code> 指令直接操作栈。
              </p>
              <CodeBlock code={`// ===== CPU 硬件视角 =====
// push rax  等价于:  sub rsp, 8
//                    mov [rsp], rax
// pop  rax  等价于:  mov rax, [rsp]
//                    add rsp, 8
// call func 等价于:  push rip+下一指令偏移
//                    jmp func
// ret       等价于:  pop rip

// ===== C++ 代码视角 =====
void stackExample() {
    int a = 10;      // 栈上分配 4 字节，sub esp, 4
    int b = 20;      // 再分配 4 字节，sub esp, 4
    int c = a + b;   // 仅用寄存器 + 栈操作，极快
}   // add esp, 12（或恢复 ebp），一次性回收所有局部变量

// 栈的特点：
// 1. 分配 / 释放仅需移动一个寄存器 (SP)，O(1) 时间，通常 1 个 CPU 周期
// 2. 连续内存，空间局部性极佳，L1 缓存几乎必定命中
// 3. 大小固定（线程创建时确定，Linux 默认 8MB）
// 4. 生命周期严格绑定作用域：进入函数 → 分配，退出函数 → 自动回收
// 5. 后进先出 (LIFO)：最后分配的空间最先回收`} />
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-4">
                <span className="text-end-yellow">栈上存储的内容：</span>
              </p>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-1 ml-4 mt-2 list-disc">
                <li>函数的局部变量 (int, double, struct 等)</li>
                <li>函数调用时的返回地址和帧指针</li>
                <li>函数参数 (部分通过寄存器传递，溢出部分入栈)</li>
                <li>临时对象和编译器生成的中间值</li>
              </ul>
            </div>

            <div id="sh-heap" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">堆 (Heap) — 运行时管理的动态内存</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                堆是由<span className="text-end-yellow">操作系统和 C 运行时库</span>共同管理的一大块内存区域。
                与栈不同，堆的内存分配没有硬件原生指令支持，需要调用 <code className="text-end-yellow">malloc/new</code> 通过复杂的分配器算法（如 ptmalloc、tcmalloc、jemalloc）来管理。
              </p>
              <CodeBlock code={`// ===== OS 层面 =====
// 堆的底层机制：
// 1. brk/sbrk  — 移动进程的"程序断点"，扩展堆的连续区域（小块分配）
// 2. mmap      — 映射一块新的虚拟内存区域（大块分配，通常 >128KB）

// 简化流程：
//   malloc(100) → 分配器在堆中查找 / 切割空闲块
//               → 若堆空间不足 → brk/mmap 向 OS 申请更多内存
//               → 返回指针，记录分配信息（大小、位置等）
//
//   free(ptr)   → 分配器将块标记为空闲
//               → 合并相邻空闲块（减少碎片）
//               → 大块可能通过 munmap 归还 OS

// ===== C++ 代码视角 =====
void heapExample() {
    // 每次 new 都涉及：
    int* p1 = new int(42);     // 1. malloc → 分配器查找 / 切割 / 可能的系统调用
                               // 2. 在分配的内存上构造 int(42)
    int* p2 = new int[1000];   // 独立的分配，不保证 p1 和 p2 连续

    // 使用...
    delete p1;                 // 析构 + free → 分配器回收
    delete[] p2;               // 配对使用 delete[]
}

// 堆的特点：
// 1. 分配 / 释放开销大：涉及空闲链表遍历、碎片整理、可能的系统调用
// 2. 内存可能碎片化：频繁分配 / 释放导致空闲块分散
// 3. 空间庞大：受虚拟内存上限约束 (64位下理论可达 TB 级)
// 4. 生命周期完全由程序员控制：手动 new/delete 或智能指针管理
// 5. 内存不连续：多次分配得到的地址没有顺序关系，缓存不友好`} />
            </div>

            <div id="sh-compare" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">栈 vs 堆 — 全面对比</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">维度</th>
                      <th className="py-2 px-4">栈 (Stack)</th>
                      <th className="py-2 pl-4">堆 (Heap)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">硬件支持</td>
                      <td className="py-2 px-4 text-green-400">CPU 寄存器 (RSP/RBP)</td>
                      <td className="py-2 pl-4 text-yellow-400">纯软件 (分配器算法)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">分配速度</td>
                      <td className="py-2 px-4 text-green-400">极快 (~1 CPU 周期)</td>
                      <td className="py-2 pl-4 text-yellow-400">较慢 (~数百–数千周期)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">释放方式</td>
                      <td className="py-2 px-4 text-green-400">自动 (函数返回时)</td>
                      <td className="py-2 pl-4 text-red-400">手动 delete / 智能指针</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">大小限制</td>
                      <td className="py-2 px-4 text-yellow-400">小 (1–8 MB 每线程)</td>
                      <td className="py-2 pl-4 text-green-400">大 (可达 TB 级)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">内存布局</td>
                      <td className="py-2 px-4 text-green-400">严格连续</td>
                      <td className="py-2 pl-4 text-yellow-400">可能碎片化</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">缓存命中率</td>
                      <td className="py-2 px-4 text-green-400">极高</td>
                      <td className="py-2 pl-4 text-yellow-400">取决于分配模式</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">生命周期</td>
                      <td className="py-2 px-4">作用域结束自动回收</td>
                      <td className="py-2 pl-4">程序员控制 (手动 / RAII)</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4">访问方式</td>
                      <td className="py-2 px-4">LIFO (后进先出)</td>
                      <td className="py-2 pl-4">任意顺序 (随机)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">常见问题</td>
                      <td className="py-2 px-4 text-red-400">栈溢出 (递归过深)</td>
                      <td className="py-2 pl-4 text-red-400">内存泄漏、碎片、悬空指针</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="sh-runtime" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">运行时视角 — 代码实际运行中发生了什么</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                以一个完整的示例，追踪栈和堆在程序运行时的变化过程：
              </p>
              <CodeBlock code={`// ===== 场景：构建一个简单的对象树 =====
struct Node {
    int value;
    Node* left;
    Node* right;
};

Node* createTree() {
    // root 本身在栈上 (8 字节指针)
    // new Node 得到的对象在堆上 (12+ 字节)
    Node* root = new Node{1, nullptr, nullptr};

    root->left  = new Node{2, nullptr, nullptr};
    root->right = new Node{3, nullptr, nullptr};
    return root;
}

void process(int depth) {
    int local = depth * 2;          // 栈：局部变量
    int arr[100];                   // 栈：400 字节数组

    if (depth > 0) {
        process(depth - 1);         // 递归 → 新栈帧
    }

    Node* tree = createTree();      // 返回的指针在栈，对象在堆
    // ... 使用 tree ...

    delete tree->right;             // 手动释放堆内存
    delete tree->left;
    delete tree;
}  // arr[100] 和 local 和 tree(指针) 在此自动回收

// 运行时的内存分布：
// 栈：main帧 → process(3)帧 → process(2)帧 → ... → createTree帧
//    每帧包含: 局部变量 + 数组 + 函数参数 + 返回地址
//
// 堆：Node{1} → Node{2} → Node{3}
//    三个节点可能分布在不连续的地址


// ===== 为什么不能返回栈对象的地址？ =====
int* badReturn() {
    int x = 42;
    return &x;  // ❌ 返回栈上变量的地址！
}
// x 在 badReturn 的栈帧中，函数返回后该栈帧被回收
// &x 指向的内存可能被后续函数调用覆盖 → 悬空指针

// ✅ 返回堆对象 — 生命周期由调用者控制
Node* goodReturn() {
    return new Node{42, nullptr, nullptr};  // 堆上分配，安全
}


// ===== 栈 vs 堆 的分配时机选择 =====
void allocationGuide() {
    // 小对象 + 局部使用 → 栈
    int scores[100];                    // 400B, OK
    std::array<int, 1000> buffer;       // 4KB, 仍 OK

    // 大对象 → 堆
    auto big = std::make_unique<int[]>(10'000'000);  // 40MB → 必须堆

    // 编译期大小未知 → 堆
    int n; cin >> n;
    auto dynamic = std::make_unique<int[]>(n);       // 变长 → 必须堆

    // 需要超出当前函数生命周期 → 堆
    return std::make_unique<Texture>(width, height); // 堆 + unique_ptr
}`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      }
    ]
  },
  {
    category: "Unity",
    items: [
      {
        id: "unity-objectpool",
        title: "对象池",
        toc: [
          { id: "op-problem", label: "问题与动机" },
          { id: "op-impl", label: "通用实现" },
          { id: "op-unity", label: "Unity 集成" },
          { id: "op-advanced", label: "进阶技巧" }
        ],
        content: (
          <div className="space-y-8">
            <div id="op-problem" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">对象池 (Object Pool)</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                对象池是游戏开发中最基础也最重要的性能优化模式之一。核心思想很简单：
                <span className="text-end-yellow">预先创建一批对象，用完不销毁而是回收再利用</span>，
                从而避免频繁的 Instantiate / Destroy 带来的 CPU 开销和 GC 压力。
              </p>
              <CodeBlock code={`// ❌ 常规做法：随用随建 → 性能灾难
void FireBullet(Vector3 pos, Quaternion rot) {
    GameObject bullet = Instantiate(bulletPrefab, pos, rot);
    // bullet 飞出屏幕后 Destroy → 触发 GC 清理
}

// ✅ 对象池做法：预创建 + 复用
// 以子弹为例，一帧可能生成 100+ 颗子弹
// Instantiate 耗时: ~0.1ms × 100 = 10ms/帧 → 直接卡死
// 对象池 Get:     ~0.001ms × 100 = 0.1ms → 几乎无感
//
// Destroy 的隐藏代价：
//   1. 触发所有组件的 OnDestroy()
//   2. 标记托管内存为垃圾 → 累加到阈值 → GC.Collect()
//   3. GC 触发时主线程暂停 (Stop-The-World)`} />
            </div>

            <div id="op-impl" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">通用 C# 实现</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                对象池的核心数据结构通常用 <code className="text-end-yellow">Queue</code> 或 <code className="text-end-yellow">Stack</code>，
                取出时从容器中 Dequeue/Pop，归还时 Enqueue/Push。
              </p>
              <CodeBlock code={`// 泛型对象池 — 适用于任何实现了 IPoolable 的 C# 类
public interface IPoolable {
    void OnSpawn();    // 从池中取出时调用
    void OnDespawn();  // 归还到池中时调用
}

public class ObjectPool<T> where T : class, IPoolable, new() {
    private readonly Stack<T> pool = new Stack<T>();
    private readonly int maxSize;

    public ObjectPool(int preload = 10, int maxSize = 50) {
        this.maxSize = maxSize;
        for (int i = 0; i < preload; i++) {
            pool.Push(new T());
        }
    }

    public T Get() {
        T obj = pool.Count > 0 ? pool.Pop() : new T();
        obj.OnSpawn();
        return obj;
    }

    public void Release(T obj) {
        obj.OnDespawn();
        if (pool.Count < maxSize) {
            pool.Push(obj);
        }
        // 超过 maxSize 的对象不回收，让 GC 清理
    }

    public int Count => pool.Count;
}`} />
            </div>

            <div id="op-unity" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">Unity GameObject 对象池</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                Unity 中的 GameObject 不能简单地 new，必须通过 Instantiate。对象池需要管理
                <span className="text-end-yellow">GameObject 的 active 状态</span>而非销毁/重建。
              </p>
              <CodeBlock code={`public class PooledObject : MonoBehaviour {
    public string poolKey;  // 用于区分不同类型对象
    public event Action<PooledObject> OnRelease;

    // 等价于"销毁"，但实际是回池
    public void ReturnToPool() {
        OnRelease?.Invoke(this);  // 通知管理器回收
    }
}

public class GameObjectPool {
    private readonly Queue<PooledObject> pool = new Queue<PooledObject>();
    private readonly GameObject prefab;
    private readonly Transform parent;

    public GameObjectPool(GameObject prefab, int preload, Transform parent) {
        this.prefab = prefab;
        this.parent = parent;
        for (int i = 0; i < preload; i++) {
            var obj = CreateNew();
            obj.gameObject.SetActive(false);
            pool.Enqueue(obj);
        }
    }

    private PooledObject CreateNew() {
        var go = Object.Instantiate(prefab, parent);
        var po = go.GetComponent<PooledObject>()
                 ?? go.AddComponent<PooledObject>();
        po.OnRelease += HandleRelease;
        return po;
    }

    public PooledObject Get(Vector3 pos, Quaternion rot) {
        PooledObject obj = pool.Count > 0 ? pool.Dequeue() : CreateNew();
        var t = obj.transform;
        t.SetPositionAndRotation(pos, rot);
        obj.gameObject.SetActive(true);   // 激活 = "出生"
        obj.SendMessage("OnSpawn", SendMessageOptions.DontRequireReceiver);
        return obj;
    }

    private void HandleRelease(PooledObject obj) {
        obj.gameObject.SetActive(false);   // 失活 = "死亡"
        obj.transform.SetParent(parent);   // 归位
        pool.Enqueue(obj);
    }
}

// 全局池管理器 (单例)
public class PoolManager : MonoBehaviour {
    private Dictionary<string, GameObjectPool> pools = new();

    public void RegisterPool(string key, GameObject prefab, int preload) {
        var holder = new GameObject("Pool_" + key).transform;
        holder.SetParent(transform);
        pools[key] = new GameObjectPool(prefab, preload, holder);
    }

    public PooledObject Spawn(string key, Vector3 pos, Quaternion rot)
        => pools[key].Get(pos, rot);
}`} />
            </div>

            <div id="op-advanced" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">进阶技巧</h3>
              <ul className="text-gray-300 font-mono text-sm leading-relaxed opacity-80 space-y-2 ml-4 mt-2 list-disc">
                <li><span className="text-end-yellow">预热 (Prewarm)</span>：场景加载时预实例化，避免游戏过程中突然卡顿。在 Loading 阶段完成。</li>
                <li><span className="text-end-yellow">自动扩容</span>：池空了不要报错，透明地 Instantiate 新对象。可以输出 LogWarning 帮助调优预加载量。</li>
                <li><span className="text-end-yellow">软上限 vs 硬上限</span>：软上限时仍可扩容但打日志；硬上限时拒绝生成（防止内存无限增长）。</li>
                <li><span className="text-end-yellow">定期收缩</span>：用协程定时检查，回收池中超过一定时间未使用的多余对象。</li>
                <li><span className="text-end-yellow">使用 Unity 2021+ 内置 ObjectPool</span>：<code className="text-end-yellow">UnityEngine.Pool.ObjectPool&lt;T&gt;</code>，提供 get/Release/Dispose 等完善的接口。</li>
                <li><span className="text-end-yellow">避免 OnEnable/OnDisable 的隐式调用</span>：频繁 SetActive 会触发这些回调。对简单对象可以不用 MonoBehaviour，改用纯数据 + 手动 Update。</li>
              </ul>
              <CodeBlock code={`// Unity 2021+ 内置池
using UnityEngine.Pool;

public class BulletManager : MonoBehaviour {
    public Bullet bulletPrefab;
    private ObjectPool<Bullet> bulletPool;

    void Start() {
        bulletPool = new ObjectPool<Bullet>(
            createFunc:     () => Instantiate(bulletPrefab),
            actionOnGet:    b => { b.gameObject.SetActive(true); b.Init(); },
            actionOnRelease: b => b.gameObject.SetActive(false),
            actionOnDestroy: b => Destroy(b.gameObject),
            collectionCheck: true,   // 检测重复 Release
            defaultCapacity: 30,
            maxSize: 100
        );
    }

    public void Fire(Vector3 pos) {
        Bullet b = bulletPool.Get();
        b.transform.position = pos;
        // ... 发射逻辑 ...
    }
}`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "unity-fsm",
        title: "状态机",
        toc: [
          { id: "fsm-basics", label: "有限状态机基础" },
          { id: "fsm-code", label: "代码实现 FSM" },
          { id: "fsm-animator", label: "Animator 状态机" },
          { id: "fsm-layers", label: "Layer 层级转换" }
        ],
        content: (
          <div className="space-y-8">
            <div id="fsm-basics" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">状态机 (State Machine)</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                <span className="text-end-yellow">有限状态机 (FSM)</span> 是游戏开发中最广泛使用的架构模式之一。
                它由 <span className="text-end-yellow">状态 (State)</span>、<span className="text-end-yellow">转换 (Transition)</span> 和
                <span className="text-end-yellow">条件 (Condition)</span> 三要素组成，确保角色/系统在任何时刻处于唯一确定的状态。
              </p>
              <CodeBlock code={`// FSM 的核心抽象：
//   [Idle] —(看到敌人)→ [Chase] —(进入攻击范围)→ [Attack]
//      ↑                    ↓
//      └——(敌人死亡)———————┘
//
// 每个状态有三个生命周期：
//   OnEnter  — 进入状态时执行一次（初始化）
//   OnUpdate — 每帧执行（逻辑更新 + 检测转换条件）
//   OnExit   — 离开状态时执行一次（清理）

// 转换必须有优先级：
//   战斗中 (Attack) → 受伤 (Hurt)  ← 优先级最高
//   战斗中 (Attack) → 追击 (Chase)  ← 敌人逃出攻击范围
// 当多个转换同时满足时，按检查顺序或显式优先级决定`} />
            </div>

            <div id="fsm-code" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">代码实现 FSM</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                Animator Controller 适合管理动画，但复杂游戏逻辑（AI、UI 流程、游戏全局状态）
                更适合用纯代码实现。下面是一个最简可行的 FSM 框架：
              </p>
              <CodeBlock code={`// === 基础状态基类 ===
public abstract class State {
    protected StateMachine fsm;
    public void SetContext(StateMachine m) => fsm = m;

    public virtual void Enter() { }
    public virtual void Update() { }
    public virtual void FixedUpdate() { }
    public virtual void Exit() { }
}

// === 状态机控制器 ===
public class StateMachine {
    private State currentState;
    private readonly Dictionary<Type, State> states = new();

    public void Register<T>(T state) where T : State {
        state.SetContext(this);
        states[typeof(T)] = state;
    }

    public void Change<T>() where T : State {
        currentState?.Exit();
        currentState = states[typeof(T)];
        currentState.Enter();
    }

    public void Update() => currentState?.Update();
    public void FixedUpdate() => currentState?.FixedUpdate();
}

// === 具体状态示例 ===
public class EnemyIdle : State {
    private float idleTime;
    public override void Enter() => idleTime = 0;
    public override void Update() {
        idleTime += Time.deltaTime;
        if (fsm.IsPlayerInSight()) fsm.Change<EnemyChase>();
        else if (idleTime > 3f) fsm.Change<EnemyPatrol>();
    }
}

// === 带转换条件的泛型 FSM ===
public class Transition {
    public State from, to;
    public Func<bool> condition;
    public int priority;
}

public class AdvancedFSM {
    private List<Transition> transitions = new();

    public void Update() {
        // 找到第一个满足条件且优先级最高的转换
        var valid = transitions
            .Where(t => t.from == currentState && t.condition())
            .OrderByDescending(t => t.priority);
        if (valid.Any()) ChangeState(valid.First().to);
    }
}`} />
            </div>

            <div id="fsm-animator" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">Animator 状态机 — 动画控制</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                Unity 的 Animator Controller 本质上就是一个<span className="text-end-yellow">可视化的有限状态机</span>。
                理解其内部机制对于构建复杂角色动画系统至关重要。
              </p>
              <CodeBlock code={`// Animator Controller 的核心概念：

// 1. State (状态) — 一个 AnimationClip 或 Blend Tree
//    每个状态可以有:
//      - Motion: 播放的动画片段
//      - Speed: 播放速率 (受 Parameter 控制)
//      - Write Defaults: 是否回写默认值 (Unity 2020+ 建议关闭)

// 2. Parameter (参数) — 驱动状态转换的变量
//    Float:   Speed, AimAngle, HealthPercent
//    Int:     ComboCount, WeaponID
//    Bool:    IsGrounded, IsDead, HasTarget
//    Trigger: Attack, Jump, Hit  (瞬时信号，使用后自动 Reset)

// 3. Transition (过渡) — 状态间的连线
//    Has Exit Time:    动画播放到一定百分比才允许转换
//    Exit Time:        0.9 = 动画播 90% 后才能切
//    Transition Duration: 两个动画之间的混合时间 (秒)
//    Conditions:       参数满足条件时触发转换
//    Interruption Source: 是否允许被更高优先级的转换打断

// 4. Any State — 从任意状态都可触发的特殊节点
//    典型用法：死亡 → 无论当前什么状态，IsDead=true 时立即播放死亡动画
//    ⚠️ 滥用 Any State 会导致状态机难以理解和 debug

// 5. Sub-State Machine — 状态机的嵌套
//    Locomotion (子状态机)
//      ├── Idle
//      ├── Walk
//      └── Run
//    外部通过 (Up)Base Layer 与子状态机交互`} />
            </div>

            <div id="fsm-layers" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">Layer 层级与 Avatar Mask — 动画分层混合</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                Layer 是 Animator 最强大的特性之一。每个 Layer 运行一个<span className="text-end-yellow">独立的状态机</span>，
                通过 <span className="text-end-yellow">Weight (权重)</span> 和 <span className="text-end-yellow">Avatar Mask (骨骼遮罩)</span>
                控制最终混合结果。
              </p>
              <CodeBlock code={`// === Layer 层级结构示例 ===
// Animator 的 Layers 面板：
//
// Base Layer      Weight: 1  Mask: None
//   ├── Idle ↔ Walk ↔ Run          ← 全身下半身动作
//   └── Jump (站立跳跃)
//
// Upper Body      Weight: 1  Mask: UpperBody (只影响脊椎以上的骨骼)
//   ├── Empty (空状态，不播放任何动画)
//   ├── Shoot (射击动画，只播上半身)
//   └── Reload (换弹动画)
//
// Full Body       Weight: 0~1 Mask: None
//   └── Death (死亡动画，Weight 渐变为 1 时完全覆盖其他层)

// === 关键配置 ===
// Blending: Override vs Additive
//   Override (默认): 覆盖低层动画（受 Weight 控制）
//   Additive:       在现有动画上叠加差值
//
// Sync: 让该层的状态机完全复制 Source Layer 的状态结构
//   (仅动画片段可以不同，状态和转换结构保持同步)
//
// Timing: 勾选后该层的时间由 Source Layer 驱动

// === 实际应用：用代码控制 Layer Weight ===
public class LayerController : MonoBehaviour {
    private Animator anim;

    void Aim(bool aiming) {
        // 平滑过渡到瞄准姿态 (上半身 IK)
        float target = aiming ? 1f : 0f;
        float current = anim.GetLayerWeight(1);  // Layer 1 = UpperBody
        anim.SetLayerWeight(1,
            Mathf.MoveTowards(current, target, Time.deltaTime * 5f));
    }
}`} />
              <CodeBlock code={`// === Avatar Mask 配置 ===
// 创建 Avatar Mask: Assets > Create > Avatar Mask
// 选择 Humanoid 骨骼，将不需要动画的骨骼设为红色(禁用)
// 绿色 = 该骨骼由当前 Layer 驱动
// 红色 = 该骨骼不受当前 Layer 影响 (由低层 Bone 驱动)
//
// 典型设置:
//   UpperBody Mask: Spine 及以上为绿色，腿为红色
//   → 上半身播射击动画，下半身继续走/跑，互不干扰

// === Layer 混合的最终计算公式 ===
// 对于每个骨骼:
// 最终 Transform = BaseLayer(transform)
//   + Weight[1] × (Layer1(transform) - BaseLayer(transform))
//   + Weight[2] × (Layer2(transform) - BaseLayer(transform))
//   ...
//
// 当 Weight = 0: 完全使用 Base Layer
// 当 Weight = 1: 完全使用该 Layer
// Additive 模式下使用 "+" 而非混合

// === 实际组合示例：FPS 角色 ===
// Layer 0 (Base):     Idle/Walk/Run/Jump    — 全身
// Layer 1 (UpperBody): Idle/Aim/Fire/Reload  — 仅上半身 (Mask)
// Layer 2 (FullBody):  Death/Downed           — 全身覆盖 (高优先级)
// Layer 3 (Face):      Idle/Hurt/Talk         — 仅头部 (Mask)
// → 最终效果: 角色可以同时奔跑(下身)+射击(上身)+说话(脸)`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "unity-gc",
        title: "GC 与优化",
        toc: [
          { id: "gc-principle", label: "GC 原理" },
          { id: "gc-sources", label: "常见 GC 来源" },
          { id: "gc-habits", label: "减少 GC 的习惯" },
          { id: "gc-tools", label: "检测工具" }
        ],
        content: (
          <div className="space-y-8">
            <div id="gc-principle" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">Unity 中的垃圾回收 (GC)</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                Unity 使用 <span className="text-end-yellow">Boehm-Demers-Weiser GC</span>（非分代、非精确式），
                在 IL2CPP 后端下也使用类似的保守式 GC。最致命的问题是：
                <span className="text-red-400">GC 触发时主线程完全暂停 (Stop-The-World)</span>，
                在移动端或 VR 中，一次 GC 可能消耗 2-50ms，直接导致掉帧。
              </p>
              <CodeBlock code={`// Unity GC 的工作流程：
//
// 1. 托管堆分配 → 累计到阈值
//    (小堆 1MB, 大堆 4MB, 不同平台不同)
//
// 2. 触发 GC.Collect()
//    → 遍历所有 GC Root (静态字段、栈上的引用、寄存器)
//    → 标记 (Mark): 从 Root 出发，追踪所有可达对象
//    → 清扫 (Sweep): 回收未标记对象，合并空闲块
//    → 压缩 (Compact, 可选): 移动存活对象消除碎片
//
// 3. 主线程在此期间完全卡住 (Stop-The-World)

// ⚠️ Unity GC 的关键特性：
// - 非分代: 每次 GC 都扫描全部托管堆
//   (不像 .NET Core 的 Gen0/Gen1/Gen2 分代 GC)
// - 非精确: 无法准确区分值和指针
//   栈上的整数可能被误认为指针 → 对象被"假引用"无法回收
// - 可在任何托管分配触发 (包括第三方插件)

// Unity 2021+ 引入 Incremental GC:
// GC 工作分散到多帧执行，减少单帧卡顿
// Player Settings → Use Incremental GC = true
// 但仍是权宜之计，最佳策略仍是: 尽量不产生垃圾`} />
            </div>

            <div id="gc-sources" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">常见 GC 来源</h3>
              <CodeBlock code={`// === 1. 字符串操作 (最常见!) ===
string result = "";
for (int i = 0; i < 100; i++) {
    result += i + ", ";  // 每次循环创建一个新 string!
}  // 产生 200+ 个临时 string 对象
// ✅ 用 StringBuilder
var sb = new StringBuilder();
for (int i = 0; i < 100; i++) sb.Append(i).Append(", ");


// === 2. 装箱 (Boxing) ===
int hp = 100;
object boxed = hp;           // 装箱！int → object 产生堆分配
Debug.Log("HP: " + hp);      // hp 被装箱 (string + int 拼接)
// ✅ 避免装箱
Debug.Log($"HP: {hp}");      // 插值字符串不会装箱


// === 3. foreach 在旧版 Unity (2019-) ===
List<int> nums = new List<int>();
foreach (int n in nums) { }  // 旧版 Mono 中 foreach 产生 Enumerator 堆分配
// ✅ 用 for
for (int i = 0; i < nums.Count; i++) { int n = nums[i]; }
// Unity 2020+ 已修复值类型的 foreach 分配


// === 4. LINQ / 委托 / 闭包 ===
var filtered = list.Where(x => x > 5).ToList();
// Where 创建迭代器 + Lambda 可能产生闭包 → 堆分配
// ✅ 手写循环替代 LINQ

// 5. 协程的 yield return new WaitForSeconds(1f)
// 每帧创建新的 WaitForSeconds → GC
// ✅ 缓存 yield 指令
WaitForSeconds wait1s = new WaitForSeconds(1f);
IEnumerator MyRoutine() {
    yield return wait1s;  // 复用同一个实例
}


// 6. 每帧创建数组 / 数组扩容
RaycastHit[] hits = Physics.RaycastAll(...);  // 内部分配数组
// ✅ 用 NonAlloc 版本
RaycastHit[] hits = new RaycastHit[16];  // 预分配
int count = Physics.RaycastNonAlloc(ray, hits);
for (int i = 0; i < count; i++) { /* ... */ }


// 7. GetComponent / Find / GetComponentInChildren
// 本身返回引用不分配，但链式调用或每帧调用会触发 GC 相关的内部路径
// ✅ 在 Awake/Start 中缓存引用`} />
            </div>

            <div id="gc-habits" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">减少 GC 的核心习惯</h3>
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-gray-700 text-end-yellow">
                      <th className="py-2 pr-4">坏习惯 (产生 GC)</th>
                      <th className="py-2 pl-4">好习惯 (零 GC)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">Update 里 new List / new 任何对象</td>
                      <td className="py-2 pl-4 text-green-400">在 Start 预分配，Clear() 复用</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">用 string 拼接日志、UI 文本</td>
                      <td className="py-2 pl-4 text-green-400">StringBuilder / 字符串插值 / 格式缓存</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">Debug.Log 在 Release 版本仍然执行</td>
                      <td className="py-2 pl-4 text-green-400">用 Conditional 特性或宏包裹日志</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">协程里 new WaitForSeconds(0.1f)</td>
                      <td className="py-2 pl-4 text-green-400">缓存常用 yield 对象为字段</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">RaycastAll / OverlapAll</td>
                      <td className="py-2 pl-4 text-green-400">NonAlloc 版本 + 预分配数组</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">GetComponent 每帧调用</td>
                      <td className="py-2 pl-4 text-green-400">Awake 缓存，用 [RequireComponent]</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">SendMessage / BroadcastMessage</td>
                      <td className="py-2 pl-4 text-green-400">直接引用 / C# event / UnityEvent</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">LINQ (Where/Select/ToArray)</td>
                      <td className="py-2 pl-4 text-green-400">手写 for/foreach 循环</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-2 pr-4 text-red-400">Dictionary 用 enum 做 key</td>
                      <td className="py-2 pl-4 text-green-400">enum 作 key 会装箱；改用 int 或自定义 Comparer</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-red-400">闭包捕获局部变量 (lambda)</td>
                      <td className="py-2 pl-4 text-green-400">传入参数而非捕获；或提前把 lambda 存为静态委托</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="gc-tools" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">检测与调试</h3>
              <CodeBlock code={`// 1. Unity Profiler — GC Alloc 列
//    Window > Analysis > Profiler
//    在 Hierarchy 视图查看 GC.Alloc 列，定位每帧分配最多的函数

// 2. Profiler.BeginSample — 自定义采样标记
Profiler.BeginSample("MyExpensiveOperation");
DoSomething();
Profiler.EndSample();

// 3. GC.TryStartNoGCRegion — 临时禁止 GC (关键帧使用)
// 适用于固定帧率场景，在可以预知时机的帧禁止 GC
if (GC.TryStartNoGCRegion(10 * 1024 * 1024)) {  // 预留 10MB
    // 这段代码执行期间不会触发 GC
    CriticalFrameLogic();
    GC.EndNoGCRegion();
}

// 4. 代码中监控 GC
long before = GC.GetTotalMemory(false);
// ... 执行可疑代码 ...
long after = GC.GetTotalMemory(false);
Debug.Log($"产生了 {after - before} bytes 垃圾");`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "unity-cinemachine",
        title: "Cinemachine",
        toc: [
          { id: "cm-arch", label: "核心架构" },
          { id: "cm-vcam", label: "Virtual Camera" },
          { id: "cm-brain", label: "Brain 混合" },
          { id: "cm-extensions", label: "常用扩展" }
        ],
        content: (
          <div className="space-y-8">
            <div id="cm-arch" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">Cinemachine — 程序化相机系统</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                Cinemachine 是 Unity 官方相机系统，核心理念是<span className="text-end-yellow">"你要什么画面，而不是相机怎么移动"</span>。
                开发者只需配置 Virtual Camera 的"目标画面参数"，
                Cinemachine 自动计算相机位置、旋转、FOV 来满足这些约束。
              </p>
              <CodeBlock code={`// Cinemachine 的核心设计：
// 传统做法: 手动写相机跟随 + 缓冲 + 限制边界 + 屏幕震动...
//           → 数百行代码、难以调参、不同场景重复劳动
//
// Cinemachine: 声明式配置
//           → 告诉它"跟随谁"、"看向谁"、"混合时间"、"视野边界"
//           → 引擎自动解算每帧的最佳 Transform

// 核心组件关系:
//   CinemachineBrain       — 挂载在主 Camera 上，负责混合/切换 VCam
//   CinemachineVirtualCamera (VCam) — 定义一种"拍摄意图"
//   CinemachineConfiner     — 限制相机活动范围 (如跟随玩家但不超出关卡边界)
//   CinemachineComposer     — 构图规则 (目标在屏幕哪个位置)
//   CinemachineNoise        — 噪声 (走路晃动、爆炸震动)
//   CinemachineImpulseSource — 冲击源 (受击/爆炸等瞬间冲击)`} />
            </div>

            <div id="cm-vcam" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">Virtual Camera 核心组件</h3>
              <CodeBlock code={`// Virtual Camera 的关键属性:
//
// Body (机身): 控制相机位置
//   Transposer      — position = follow.position + offset, 带阻尼
//   Framing Transposer — 同上，但根据 target 在屏幕上的位置微调
//   Orbital Transposer — 围绕 Follow 旋转，玩家可控制旋转角度
//   Tracked Dolly   — 沿预先定义的路径 (dolly track) 移动
//   Hard Lock        — 直接锁定到 Follow，零延迟
//
// Aim (瞄准): 控制相机朝向
//   Composer        — 将 LookAt 目标保持在屏幕指定位置 (Dead Zone / Soft Zone)
//   Group Composer  — 同时看向多个目标 (如多个敌人)，自动调整 FOV 确保都在画面内
//   POV             — 玩家控制视角旋转 (第一人称)
//   Hard Look        — 直接锁定看向 LookAt
//
// Noise (噪声): 叠加振动
//   可配置 6 个通道: Position X/Y/Z + Rotation X/Y/Z
//   每个通道独立配置振幅和频率

// === Composer 的 Dead Zone / Soft Zone 机制 ===
// 屏幕被分为三个区域:
//   Dead Zone (死区)    — 目标在此区域时相机完全不动
//   Soft Zone (软区)    — 目标移出 Dead Zone 进入此区，相机开始缓慢跟随
//   Hard (硬边界)       — 目标超过 Soft Zone 边界，相机强制拉回使目标保持在画面内
//
// 这使得相机跟随有"惰性"——角色小幅移动不会带动相机，画面更稳`} />
            </div>

            <div id="cm-brain" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">Brain — VCam 切换与混合</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                <span className="text-end-yellow">Cinemachine Brain</span> 挂载在 Main Camera 上，是所有 VCam 的总调度器。
                同一时刻只有一个活跃 VCam (优先级最高)，Brain 负责在不同 VCam 之间平滑过渡。
              </p>
              <CodeBlock code={`// === VCam 优先级与切换 ===
// 每个 VCam 有一个 Priority 值 (默认 0)
// Brain 总是激活 Priority 最高的 VCam
// 调高 → 抢占画面; 调低 → 让出画面

// 典型用法:
//   默认跟随相机:  Priority = 0
//   瞄准/瞄准镜:   Priority = 10 (右键瞄准时提高)
//   过场/对话:     Priority = 20 (对话开始时提高)
//   CG 动画:      Priority = 50
//   全屏 UI:      Priority = 100

// === 混合 (Blend) 方式 ===
// Brain 的 Custom Blends 资产定义 VCam 之间的过渡:
//   Cut        — 瞬间切换 (适合快速切换)
//   Ease In Out — 平滑过渡 (默认推荐)
//   Hard In/Out — 快然后慢 / 慢然后快
//   Linear     — 匀速切换

// 可以为特定的 (From VCam, To VCam) 对配置专属混合曲线

// === 代码控制 VCam 切换 ===
public class CameraController : MonoBehaviour {
    public CinemachineVirtualCamera followCam;
    public CinemachineVirtualCamera aimCam;

    void Update() {
        if (Input.GetMouseButton(1)) {  // 右键瞄准
            aimCam.Priority = 15;
            followCam.Priority = 0;
        } else {
            aimCam.Priority = 0;
            followCam.Priority = 15;
        }
    }
}`} />
            </div>

            <div id="cm-extensions" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">常用扩展组件</h3>
              <CodeBlock code={`// === 1. Cinemachine Impulse (屏幕震动) ===
// Impulse Source: 挂在产生震动的对象上 (枪、爆炸点)
// Impulse Listener: 挂在 CinemachineBrain 所在的 Camera 上
// 触发震动:
var source = GetComponent<CinemachineImpulseSource>();
source.GenerateImpulse();  // 默认震动
// 或自定义: source.GenerateImpulseAtPositionWithVelocity(pos, velocity);

// === 2. Cinemachine State-Driven Camera ===
// 根据 Animator 状态自动切换 VCam
// 例: Idle→FollowCam, Jump→TopDownCam, Death→DramaticCam
// 无需写代码，Animator 参数变化时自动切换

// === 3. Cinemachine ClearShot ===
// 自动在多个子 VCam 中选择"视野最好"的那个
// 场景: 当玩家和敌人之间有墙壁遮挡时，
// ClearShot 自动切换到不会被遮挡的子相机

// === 4. Cinemachine Confiner ===
// 限制相机在一个 Collider (2D/3D) 内
// 配合 Tilemap Collider 或 Mesh Collider 使用
// 相机跟随玩家但不会超出关卡边界

// === 5. Cinemachine Target Group ===
// 同时跟踪多个目标，自动调整相机确保所有目标在视野内
// 场景: 多人同屏对战、多人合影
// 可配置每个目标的权重和半径

// === 6. Cinemachine FreeLook Camera ===
// 第三人称环绕相机，三组 Rig (Top/Middle/Bottom)
// 玩家可用右摇杆/鼠标控制环绕角度

// === 7. Cinemachine Dolly Track ===
// 相机沿预设路径移动，适合轨道镜头/过场
// 可以用 Timeline 控制相机在轨道上的位置`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      },
      {
        id: "unity-ai-enemy",
        title: "AI 敌人",
        toc: [
          { id: "ai-detection", label: "检测方式" },
          { id: "ai-fov", label: "视野锥检测" },
          { id: "ai-hearing", label: "听觉检测" },
          { id: "ai-states", label: "AI 状态机" },
          { id: "ai-patrol", label: "巡逻行为" }
        ],
        content: (
          <div className="space-y-8">
            <div id="ai-detection" className="scroll-mt-6">
              <h1 className="text-2xl font-bold text-end-yellow font-mono">AI 敌人检测系统</h1>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100 mt-2">
                敌人 AI 的核心是<span className="text-end-yellow">感知系统</span>——如何让敌人"知道"玩家的存在。
                不同游戏需要不同的检测方式，常见的包括距离检测、视线检测（Raycast）、视野锥（FOV）、听觉（声音半径）等。
                通常<span className="text-end-yellow">多种检测方式组合</span>使用，才能产生自然可信的 AI 行为。
              </p>
            </div>

            <div id="ai-detection-content" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">检测方式总览</h3>
              <CodeBlock code={`// === 1. 距离检测 (Sphere/Box Overlap) — 最基础 ===
// 性能最好，适合大批敌人，但无遮挡判断
public bool IsPlayerInRange(float radius) {
    Collider[] hits = Physics.OverlapSphere(
        transform.position, radius, layerMask);
    foreach (var hit in hits) {
        if (hit.CompareTag("Player")) return true;
    }
    return false;
}
// 复杂度: O(n) 碰撞检测，用 NonAlloc 版本避免 GC
// 适用: 近战敌人、拾取物检测、触发区域


// === 2. 视线检测 (Line of Sight / Raycast) — 判断遮挡 ===
// 和距离检测配合：先判断在范围内，再判断是否被遮挡
public bool HasLineOfSight(Transform target, float maxDist) {
    Vector3 dir = target.position - transform.position;
    if (dir.magnitude > maxDist) return false;

    if (Physics.Raycast(transform.position, dir.normalized,
            out RaycastHit hit, maxDist, obstacleMask)) {
        return hit.transform == target;  // 射线击中了玩家，而非墙壁
    }
    return false;
}
// 注意: 单条射线容易产生"墙角偷窥"问题
// → 头部、胸部各发一条射线，或用 SphereCast


// === 3. 视野锥检测 (Field of View) — 模拟"眼睛" ===
// 见下一节详细展开


// === 4. 听觉检测 (Hearing / Sound Radius) — 无需视线 ===
// 模拟"听到脚步声/枪声"
// 玩家发射 SoundEvent(位置, 半径, 类型)
// 敌人在 SoundEvent 半径内 → 被警告，朝声音来源移动
// 见后续听觉检测详细展开`} />
            </div>

            <div id="ai-fov" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">视野锥检测 (FOV Cone)</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                视野锥模拟生物的"视场角"，通过角度判断 + 距离判断 + Raycast 遮挡判断三层过滤，
                实现真实可信的视觉感知。
              </p>
              <CodeBlock code={`public class FieldOfView : MonoBehaviour {
    public float viewRadius = 15f;        // 视野距离
    [Range(0, 360)] public float viewAngle = 120f;  // 视野角度
    public LayerMask obstacleMask;
    public Transform visibleTarget;       // 当前看到的目标

    void Update() {
        FindVisibleTargets();
    }

    void FindVisibleTargets() {
        visibleTarget = null;
        Collider[] targets = Physics.OverlapSphere(
            transform.position, viewRadius, targetMask);

        foreach (var target in targets) {
            Vector3 dirToTarget =
                (target.transform.position - transform.position).normalized;

            // 第1层: 角度判断 (最便宜)
            float angle = Vector3.Angle(transform.forward, dirToTarget);
            if (angle > viewAngle / 2f) continue;  // 不在视野锥内

            // 第2层: 距离判断
            float dist = Vector3.Distance(
                transform.position, target.transform.position);
            if (dist > viewRadius) continue;

            // 第3层: 遮挡判断 (最贵，放最后)
            if (Physics.Raycast(transform.position, dirToTarget,
                    dist, obstacleMask)) continue;  // 被遮挡

            visibleTarget = target.transform;
            return;
        }
    }

    // 在 Scene 视图中绘制视野锥 (Gizmos)
    void OnDrawGizmos() {
        Gizmos.color = Color.yellow;
        // ... 绘制扇形视野锥 ...
    }
}`} />
            </div>

            <div id="ai-hearing" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">听觉检测 — 声音事件系统</h3>
              <CodeBlock code={`// === 声音事件系统 ===
// 核心思想: 玩家动作产生 SoundEvent，敌人在半径内做出反应
public struct SoundEvent {
    public Vector3 position;
    public float radius;       // 可被听到的范围
    public SoundType type;     // Footstep, Gunshot, Explosion 等
    public float intensity;    // 影响反应优先级
}

public enum SoundType {
    Footstep,    // 小半径，仅近距离警觉
    Gunshot,     // 大半径，直接进入战斗
    Explosion,   // 巨大半径，所有敌人被警告
    Scream       // 中等半径
}

// 全局声音管理器
public class SoundManager : MonoBehaviour {
    public static SoundManager Instance;
    public event Action<SoundEvent> OnSoundEmitted;

    public void EmitSound(SoundEvent evt) {
        OnSoundEmitted?.Invoke(evt);
    }
}

// 玩家:
SoundManager.Instance.EmitSound(new SoundEvent {
    position = transform.position,
    radius = 30f,
    type = SoundType.Gunshot
});

// 敌人:
void OnEnable() {
    SoundManager.Instance.OnSoundEmitted += OnHeardSound;
}
void OnHeardSound(SoundEvent evt) {
    float dist = Vector3.Distance(transform.position, evt.position);
    if (dist < evt.radius) {
        lastKnownPosition = evt.position;
        // 根据声音类型决定反应层级:
        //   Footstep → 警觉 (Alert) → 前往调查
        //   Gunshot  → 立即战斗 (Combat) → 朝声源冲锋
    }
}`} />
            </div>

            <div id="ai-states" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">AI 状态机 — 完整行为流程</h3>
              <p className="text-gray-300 font-mono text-base leading-relaxed opacity-100">
                将各种检测方式串联到状态机中，形成完整的 AI 行为闭环：
              </p>
              <CodeBlock code={`//   ┌─────────────────────────────────────────┐
//   │                AI 状态流转图                 │
//   └─────────────────────────────────────────┘
//
//   Idle ──(生成/唤醒)──→ Patrol ──(发现玩家)──→ Chase ──→ Attack
//     ↑                      ↑        ←(脱战)       │        │
//     │                      └──(超时)── Alert ←────┘        │
//     │                           ↑     │                    │
//     │                           │     └──(到达最后位置)─────┘
//     │                           │          (未发现玩家)
//     └──────(所有状态, 被击杀)────┘
//
// 每个转换的条件:
// Idle → Patrol:     默认行为，无所事事时巡逻
// Patrol → Alert:    听到脚步声/看到血迹
// Patrol → Chase:    直接看到玩家
// Alert → Chase:     到达声音位置后发现玩家
// Alert → Patrol:    调查完毕，未发现玩家 (超时返回)
// Chase → Attack:    进入攻击范围
// Attack → Chase:    玩家逃出攻击范围
// Chase → Alert:     丢失玩家视线 (> 脱战时间阈值)
// [Any] → Dead:      HP <= 0 (最高优先级)

public enum EnemyState { Idle, Patrol, Alert, Chase, Attack, Dead }

public class EnemyAI : MonoBehaviour {
    public EnemyState currentState = EnemyState.Idle;
    public float detectionRadius = 10f;
    public float attackRadius = 2f;
    public float loseSightTime = 5f;  // 脱战时间

    private float lostTimer;
    private Vector3 lastKnownPos;
    private Transform player;

    void Update() {
        bool canSee = HasLineOfSight(player);
        float dist = Vector3.Distance(transform.position, player.position);

        switch (currentState) {
            case EnemyState.Idle:
                ChangeState(EnemyState.Patrol);
                break;

            case EnemyState.Patrol:
                PatrolUpdate();
                if (canSee && dist < detectionRadius)
                    ChangeState(EnemyState.Chase);
                break;

            case EnemyState.Alert:
                MoveTo(lastKnownPos);  // 前往调查
                if (canSee) ChangeState(EnemyState.Chase);
                else if (ArrivedAt(lastKnownPos))
                    ChangeState(EnemyState.Patrol);
                break;

            case EnemyState.Chase:
                ChaseUpdate(player.position);
                if (dist < attackRadius) ChangeState(EnemyState.Attack);
                else if (!canSee) {
                    lostTimer += Time.deltaTime;
                    if (lostTimer > loseSightTime) {
                        ChangeState(EnemyState.Alert);
                        lostTimer = 0;
                    }
                }
                break;

            case EnemyState.Attack:
                AttackUpdate();
                if (dist > attackRadius * 1.5f)
                    ChangeState(EnemyState.Chase);
                break;
        }
    }
}`} />
            </div>

            <div id="ai-patrol" className="scroll-mt-6">
              <h3 className="text-lg font-bold text-white font-mono border-b border-gray-700 pb-2 mb-2">巡逻行为 — 脱离范围后的回归</h3>
              <CodeBlock code={`// === 三种巡逻模式 ===

// 1. Waypoint 巡逻 — 沿预设路径点移动
public class WaypointPatrol : MonoBehaviour {
    public Transform[] waypoints;
    private int index = 0;
    public float waitTime = 2f;   // 到达后等待时间
    public float speed = 3f;

    void PatrolUpdate() {
        Vector3 target = waypoints[index].position;
        MoveTo(target);

        if (Vector3.Distance(transform.position, target) < 0.5f) {
            // 到达当前点，等待后前往下一个
            waitTimer += Time.deltaTime;
            if (waitTimer > waitTime) {
                index = (index + 1) % waypoints.Length;
                waitTimer = 0;
            }
        }
    }
}

// 2. 随机巡逻 — 在活动区域内随机选点
public class RandomPatrol : MonoBehaviour {
    public float patrolRadius = 20f;     // 活动范围半径
    public Vector3 homePosition;          // "家"的位置 (初始位置)

    Vector3 GetRandomPoint() {
        Vector3 randomDir = Random.insideUnitSphere * patrolRadius;
        randomDir.y = 0;  // 保持水平
        Vector3 candidate = homePosition + randomDir;
        // 用 NavMesh.SamplePosition 确保点在 NavMesh 上
        if (NavMesh.SamplePosition(candidate, out NavMeshHit hit,
                patrolRadius, NavMesh.AllAreas)) {
            return hit.position;
        }
        return homePosition;  // fallback
    }
}

// 3. 脱离追击范围 → 回归巡逻
public class EnemyReturnToPatrol : MonoBehaviour {
    public float maxChaseDistance = 50f;  // 最大追击距离
    private Vector3 homePosition;

    void Start() { homePosition = transform.position; }

    void ChaseUpdate() {
        float distFromHome = Vector3.Distance(
            transform.position, homePosition);

        if (distFromHome > maxChaseDistance) {
            // 追击过远 → 脱离战斗 → 回归
            ChangeState(EnemyState.Alert);
            // Alert 状态会先移动到 lastKnownPosition
            // 然后回到 Patrol，从 home 重新开始巡逻
        }
    }
}

// === NavMesh 集成巡逻 ===
// Unity 的 NavMeshAgent 自带寻路，配合上述巡逻逻辑:
NavMeshAgent agent;

void MoveTo(Vector3 target) {
    agent.SetDestination(target);  // NavMesh 自动计算路径和避障
}
// agent.remainingDistance < 0.5f → 已到达目标
// agent.pathStatus → 检查路径是否有效

// === 追击范围限制的完整逻辑 ===
// 1. 仇恨范围 (Aggro Radius):    玩家进入 → 开始追击
// 2. 脱战范围 (Deaggro Radius):  玩家脱离 → 停止追击，回到巡逻
//    (脱战范围通常比仇恨范围大 30-50%，防止边缘反复横跳)
// 3. 活动范围 (Leash Radius):    敌人离开出生点太远 → 强制返回
//
//   |←——— 活动半径 (Leash) ———→|
//   |   |← 脱战半径 ———————→|   |
//   |   |  |← 仇恨半径 —→|  |   |
//   |   |  |   [玩家]    |  |   |
//   |   |  |← 追击 ←    |  |   |
//   |   |←———— 追击 →————|  |   |
//   |←—————— 超出追击范围，回归 —→|`} />
            </div>

            <div className="h-40"></div>
          </div>
        )
      }
    ]
  }
];