---
title: CSP初赛-排序及时间复杂度专题
date: 2023-09-02
tags:
  - 信奥
description: "介绍 CSP 初赛中的时间复杂度分析和桶排序等基础排序知识。"
---
## 时间复杂度

1. 时间复杂度(Time complexity)是一个函数，
它定性描述算法的运行时间，常用大O表述，
它并不包含低阶项和首项系数。
2. 大小比较

$$O(1) < O(log_2(n)) < O(n \cdot log_2(n)) < O(n) < O(n^2) < O(n^3) < O(2^n)$$

3. 时间复杂度计算：
    1. 基本操作：$O(1)$
    2. 顺序结构：$O(T_1 + T_2 + \cdots + T_n)$
    3. 循环结构：$O(T_1 \times T_2 \times \cdots \times T_n)$
    4. 分支结构：$O(max(T_1, T_2, \cdots, T_n))$

## 排序

4. 桶排序
    1. 基于：非比较
    2. 特性：无
    3. 性质：较稳定
    4. 时间复杂度：$O(n+k)$

```cpp
#include <iostream>
using namespace std;
int main() {
    int n, a[101], count[100000], maxx = -1e9;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        count[a[i]]++;
        maxx = max(maxx, a[i]);
    }
    for (int i = 0; i <= maxx; i++) { // 可改变排序类型
        while (a[i]--) {
            cout << i << ' ';
        }
    }
    return 0;
}

```

5. 冒泡排序
    1. 基于：比较
    2. 特性：通用
    3. 性质：稳定
    4. 时间复杂度：$O(n^2)$

```cpp
#include <iostream>
using namespace std;
int main() {
    int n, a[101];
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    for (int i = 1; i <= n - 1; i++) {
        bool end = true;
        for (int j = 1; j <= n - i; j++) {
            if (a[j] > a[j + 1]) { // 可改变排序类型
                swap(a[j], a[j + 1]);
                end = false;
            }
        }
        if (end) {
            break;
        }
    }
    for (int i = 1; i <= n; i++) {
        cout << a[i] << ' ';
    }
    return 0;
}

```

6. sort排序
    1. 基于：未知
    2. 性质：未知
    3. 特性：多用于结构体及多关键字排序
    4. 时间复杂度：$未知$

```cpp
#include <iostream>
#include <algorithm>
using namespace std;
bool cmp(int x, int y) {
    return x > y;  // 可改变排序类型
}
int main() {
    int n, a[101];
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    sort(a + 1, a + 1 + n, cmp);
    for (int i = 1; i <= n; i++) {
        cout << a[i] << ' ';
    }
    return 0;
}

```

7. 快速排序
    1. 基于：比较
    2. 特性：目前速度最快
    3. 性质：不稳定
    4. 时间复杂度：$O(n \cdot log_2(n))$

```cpp
#include <iostream>
using namespace std;
int a[101];
void quicksort(int left, int right) {
    if (left >= right) {
        return;
    }
    int mid = (left + right) / 2;
    swap(a[mid], a[right]);
    int i = left, j = right - 1;
    while (i <= j) {
        while (a[i] < a[right]) {
            i++;
        }
        while (a[j] > arr[right]) {
            j--;
        }
        if (i <= j) {
            swap(a[i], a[j]);
            i++;
            j--;
        }
        swap(a[i], a[right]);
        quicksort(left, i - 1);
        quicksort(i + 1, right);
    }
}
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
    }
    quicksort(1, 1 + n);
    for (int i = 1; i <= n; i++) { // 可改变排序类型
        cout << a[i] << ' ';
    }
    return 0;
}

```

8. 选择排序
    1. 基于：比较
    2. 特性：交换次数最小
    3. 性质：不稳定
    4. 时间复杂度：$O(n^2)$

```cpp
#include <iostream>
using namespace std;
void select_sort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[min]) { // 可改变排序类型
                min = j;
            }
        }
        if (min != i) {
            swap(a[i], a[min]);
        }
    }
}

int main() {
    int a[100], n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    select_sort(a, n);
    for (int i = 0; i < n; i++) {
        cout << a[i] << ' ';
    }
    return 0;
}

```
